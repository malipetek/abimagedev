import crypto from 'crypto';
/**
 * @param {string} myshopifyUrl
 * @param {string} uri
 * @returns {string|null}
 */
export function getImageIdentifier(myshopifyUrl, uri) {
    let image_identifier = null;
    if (!myshopifyUrl || !uri) {
        return null;
    }
    try {
        const u = new URL(uri);
        // replace _100x100_crop_center stuff
        image_identifier = u.pathname.replace(/_\d+x\d+(?:_[a-z0-9_-]+)*\./i, '.');
        image_identifier = crypto.createHash('shake128').update(`${myshopifyUrl}${image_identifier}`).digest('hex');
    } catch (e) {
        // ignore
    }
    return image_identifier;
}


/**
 * @typedef {object} FileEntry
 * @property {string} alt
 * @property {string} originalSource
 */
/**
 * @param {string} store
 * @param {string} password
 * @param {FileEntry[]} files
 */
export const createFiles = async (store, password, files) => {
    const url = `https://${store}/admin/api/2021-07/graphql.json`;

    const query = `mutation fileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
        files {
            alt
            createdAt
        }
    userErrors {
                code
                field
                message
            }
        }
    }`;

    const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

    let chunks = array_chunks(files, 250);

    for (let chunk of chunks) {
        let fetchData = await fetch(url, {
            'method': 'POST',
            'headers': {
                'X-Shopify-Access-Token': password,
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify({
                query: query,
                variables: {
                    files: chunk
                }
            })
        });

        let fetchJson = await fetchData.json();
    }

    return true;
};