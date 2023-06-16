require('onebyonejs');
const directus = require('./directus.js');
export function getImageIdentifier(uri) {
  let image_identifier = null;
  try {
      const u = new URL(uri);
      image_identifier = u.pathname.split('/').pop();
  } catch (e) {
      image_identifier = 'unknown';
  }
  return image_identifier;
}
const TEN_SECONDS = 10e3;
const TEN_MINUTES = 10e3 * 60;
const ONE_SECOND = 1e3;
const IMAGE_TICK_INTERVAL = ONE_SECOND;

(async () => {
  try {
    await directus.auth.static('CccG9CtsALmIgu4ThKA4kAm0s7xKoF4e');
    const { data: sessions } = await directus.items('events').readByQuery({
      groupBy: 'session',
      filter: {
        processed: {
          _eq: false
        }
      }
    });

    await sessions.oneByOne(async ({ session }) => {
      const { data: paths } = await directus.items('events').readByQuery({
        filter: {
          session: {
            _eq: session,
          },
          processed: {
            _eq: false
          }
        },
        groupBy: 'path'
      });
      await paths.oneByOne(async ({ path }) => {
        const { data: imageIdentifiers } = await directus.items('events').readByQuery({
          filter: {
            session: {
              _eq: session,
            },
            path: {
              _eq: path
            },
            processed: {
              _eq: false
            }
          },
          groupBy: 'image_identifier'
        });

        const { data: events } = await directus.items('events').readByQuery({
          filter: {
            session: {
              _eq: session
            },
            path: {
              _eq: path
            },
            processed: {
              _eq: false
            }
          },
          sort: ['date'],
          limit: 1000
        });

        // try {
        //   // save events to a file
        //   fs.writeFileSync(`./events.json`, JSON.stringify(events, null, 2));
        // } catch (err) {
        //   console.error(err);
        // }
        
        // console.log(events);
        if(!events || !events.length) {
          // no events to process
          return;
        }
        let derivedEvents = [];
        /**
         * @typedef DerivedEvent
         * @property {string} event
         * @property {string} path
         * @property {number} startedAt
         * @property {number} 
         */
        let derivedEventConstruct = null;
        const now = new Date().getTime();
        const lasEvent = events[events.length - 1];
        const lastActive = new Date(lasEvent.date).getTime();
        const lastActiveDiff = now - lastActive;
        const imagesSeen = new Map;

        if (lastActiveDiff < TEN_MINUTES) {
          // if last active is less than 10 minutes ago, we will process this later
          return;
        }
        for (const event of events) {
          const type = event.event_type;
          const date = new Date(event.date).getTime();
          if (type === 'pageView' || type === 'reVisit') {
            // If event is pageview we create a derived event representing a page visit
            if(derivedEventConstruct) {
              // If we have a derived event construct we push it to the derived events array
              derivedEventConstruct = { ...derivedEventConstruct, imagesSeen: [...imagesSeen] };
              derivedEvents.push(derivedEventConstruct);
            }
            derivedEventConstruct = {
              event: 'pageVisit',
              path: event.path,
              startedAt: date,
            };
          }
          else if (type === 'imageView') {
            const visibilityRatio = ((event.event_payload.width || 1) * (event.event_payload.height || 1)) / ((event.event_payload.screen_width || 1) * (event.event_payload.screen_height || 1));
            if(imagesSeen.has(event.image_identifier)) {
              const imageRecord = imagesSeen.get(event.image_identifier);
              imageRecord.visibilityRatio = Math.max(imageRecord.visibilityRatio, visibilityRatio);
              imagesSeen.set(event.image_identifier, imageRecord);
            } else {
              imagesSeen.set(event.image_identifier, {
                visibilityRatio,
                firstSeen: date,
                seenFor: IMAGE_TICK_INTERVAL
              });
            }
          } else if (type === 'imageViewTick') {
            (event.event_payload.images || []).forEach((imageUrl) => {
              const identifier = getImageIdentifier(imageUrl);
              if (imagesSeen.has(identifier)) {
                const imageRecord = imagesSeen.get(identifier);
                imageRecord.seenFor = date - imageRecord.firstSeen;
                imagesSeen.set(event.image_identifier, imageRecord);
              } else {
                // weird situation but we will accept this as imageView
                // imagesSeen.set(identifier, {
                //   visibilityRatio: 0.5,
                //   firstSeen: date,
                //   seenFor: IMAGE_TICK_INTERVAL
                // });
              }
            });

          }else if (type === 'imageHide') {
            if (imagesSeen.has(event.image_identifier)) {
              const imageRecord = imagesSeen.get(event.image_identifier);
              imageRecord.seenFor = date - imageRecord.firstSeen;
              imagesSeen.set(event.image_identifier, imageRecord);
            } else {
              // weird situation image was not viewed but hidden somehow
              // but we will accept this as imageView
              // imagesSeen.set(event.image_identifier, {
              //   visibilityRatio: 0.5,
              //   firstSeen: date,
              //   seenFor: IMAGE_TICK_INTERVAL
              // });
            }
          }else if (type === 'addToCart') {
            derivedEventConstruct = {
              ...derivedEventConstruct,
              addToCart: {
                addedAt: date,
                addedAfter: date - derivedEventConstruct.startedAt,
                added: true,
              },
            };
        } else if (type === 'buyButtonClick') {
          derivedEventConstruct = {
            ...derivedEventConstruct,
            buyButtonClick: {
              clickedAt: date,
              clickedAfter: date - derivedEventConstruct.startedAt,

            },
          };
          } else if (type === 'imageLinkClick') {
            derivedEventConstruct = {
            ...derivedEventConstruct,
            imageLinkClick: {
              clickedAt: date,
              clickedAfter: date - derivedEventConstruct.startedAt,
            },
          };
        }

        }
        derivedEventConstruct = { ...derivedEventConstruct, imagesSeen: [...imagesSeen] };
        derivedEvents.push(derivedEventConstruct);

        directus.items('visits').createMany(derivedEvents);
      });




    });
  }
  catch (err) {
    console.error(err);
  }
})();