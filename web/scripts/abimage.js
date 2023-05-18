"use strict";function e(e,t,n,r,i){for(t=t.split?t.split("."):t,r=0;r<t.length;r++)e=e?e[t[r]]:i;return e===i?n:e}var t="undefined",n="object",r="any",i="*",o="undefined"!=typeof process?process:{};o.env&&o.env.NODE_ENV;var a="undefined"!=typeof window;function u(e,t){return t.charAt(0)[e]()+t.slice(1)}null!=o.versions&&o.versions.node,"undefined"!=typeof Deno&&Deno.core,a&&"nodejs"===window.name||"undefined"!=typeof navigator&&(navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom"));var c=u.bind(null,"toUpperCase"),s=u.bind(null,"toLowerCase");function l(e){return h(e)?c("null"):"object"==typeof e?function(e){return p(e.constructor)?e.constructor.name:null}(e):Object.prototype.toString.call(e).slice(8,-1)}function f(e,t){void 0===t&&(t=!0);var n=l(e);return t?s(n):n}function d(e,t){return typeof t===e}var p=d.bind(null,"function"),g=d.bind(null,"string"),m=d.bind(null,"undefined"),v=d.bind(null,"boolean");function h(e){return null===e}function y(e){if(!function(e){return e&&("object"==typeof e||null!==e)}(e))return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function b(e){return e instanceof Error||g(e.message)&&e.constructor&&function(e){return"number"===f(e)&&!isNaN(e)}(e.constructor.stackTraceLimit)}function I(e,t){if("object"!=typeof t||h(t))return!1;if(t instanceof e)return!0;var n=f(new e(""));if(b(t))for(;t;){if(f(t)===n)return!0;t=Object.getPrototypeOf(t)}return!1}function w(e,t){var n=e instanceof Element||e instanceof HTMLDocument;return n&&t?function(e,t){return void 0===t&&(t=""),e&&e.nodeName===t.toUpperCase()}(e,t):n}function S(e){var t=[].slice.call(arguments,1);return function(){return e.apply(void 0,[].slice.call(arguments).concat(t))}}function E(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function P(e){return function(e){for(var t,n=Object.create(null),r=/([^&=]+)=?([^&]*)/g;t=r.exec(e);){var i=E(t[1]),o=E(t[2]);"[]"===i.substring(i.length-2)?(n[i=i.substring(0,i.length-2)]||(n[i]=[])).push(o):n[i]=""===o||o}for(var a in n){var u=a.split("[");u.length>1&&(O(n,u.map((function(e){return e.replace(/[?[\]\\ ]/g,"")})),n[a]),delete n[a])}return n}(function(e){if(e){var t=e.match(/\?(.*)/);return t&&t[1]?t[1].split("#")[0]:""}return a&&window.location.search.substring(1)}(e))}function O(e,t,n){for(var r=t.length-1,i=0;i<r;++i){var o=t[i];if("__proto__"===o||"constructor"===o)break;o in e||(e[o]={}),e=e[o]}e[t[r]]=n}function x(){for(var e="",t=0,n=4294967295*Math.random()|0;t++<36;){var r="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[t-1],i=15&n;e+="-"==r||"4"==r?r:("x"==r?i:3&i|8).toString(16),n=t%8==0?4294967295*Math.random()|0:n>>4}return e}d.bind(null,"symbol"),I.bind(null,TypeError),I.bind(null,SyntaxError),S(w,"form"),S(w,"button"),S(w,"input"),S(w,"select");var j="global",_="__global__",k=typeof self===n&&self.self===self&&self||typeof global===n&&global.global===global&&global||void 0;function N(e){return k[_][e]}function A(e,t){return k[_][e]=t}function T(e){delete k[_][e]}function U(e,t,n){var r;try{if(M(e)){var i=window[e];r=i[t].bind(i)}}catch(e){}return r||n}k[_]||(k[_]={});var z={};function M(e){if(typeof z[e]!==t)return z[e];try{var n=window[e];n.setItem(t,t),n.removeItem(t)}catch(t){return z[e]=!1}return z[e]=!0}function D(){return D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},D.apply(this,arguments)}var C="function",V="undefined",q="@@redux/"+Math.random().toString(36),L=function(){return typeof Symbol===C&&Symbol.observable||"@@observable"}(),R=" != "+C;function $(e,t,n){var r;if(typeof t===C&&typeof n===V&&(n=t,t=void 0),typeof n!==V){if(typeof n!==C)throw new Error("enhancer"+R);return n($)(e,t)}if(typeof e!==C)throw new Error("reducer"+R);var i=e,o=t,a=[],u=a,c=!1;function s(){u===a&&(u=a.slice())}function l(){return o}function f(e){if(typeof e!==C)throw new Error("Listener"+R);var t=!0;return s(),u.push(e),function(){if(t){t=!1,s();var n=u.indexOf(e);u.splice(n,1)}}}function d(e){if(!y(e))throw new Error("Act != obj");if(typeof e.type===V)throw new Error("ActType "+V);if(c)throw new Error("Dispatch in reducer");try{c=!0,o=i(o,e)}finally{c=!1}for(var t=a=u,n=0;n<t.length;n++)(0,t[n])();return e}return d({type:"@@redux/INIT"}),(r={dispatch:d,subscribe:f,getState:l,replaceReducer:function(e){if(typeof e!==C)throw new Error("next reducer"+R);i=e,d({type:"@@redux/INIT"})}})[L]=function(){var e,t=f;return(e={subscribe:function(e){if("object"!=typeof e)throw new TypeError("Observer != obj");function n(){e.next&&e.next(l())}return n(),{unsubscribe:t(n)}}})[L]=function(){return this},e},r}function J(e,t){var n=t&&t.type;return"action "+(n&&n.toString()||"?")+"reducer "+e+" returns "+V}function B(){var e=[].slice.call(arguments);return 0===e.length?function(e){return e}:1===e.length?e[0]:e.reduce((function(e,t){return function(){return e(t.apply(void 0,[].slice.call(arguments)))}}))}function H(){var e=arguments;return function(t){return function(n,r,i){var o,a=t(n,r,i),u=a.dispatch,c={getState:a.getState,dispatch:function(e){return u(e)}};return o=[].slice.call(e).map((function(e){return e(c)})),D({},a,{dispatch:u=B.apply(void 0,o)(a.dispatch)})}}}var F="__anon_id",W="__user_id",X="__user_traits",G="userId",K="anonymousId",Q=["bootstrap","params","campaign","initializeStart","initialize","initializeEnd","ready","resetStart","reset","resetEnd","pageStart","page","pageEnd","pageAborted","trackStart","track","trackEnd","trackAborted","identifyStart","identify","identifyEnd","identifyAborted","userIdChanged","registerPlugins","enablePlugin","disablePlugin","online","offline","setItemStart","setItem","setItemEnd","setItemAborted","removeItemStart","removeItem","removeItemEnd","removeItemAborted"],Y=["name","EVENTS","config","loaded"],Z=Q.reduce((function(e,t){return e[t]=t,e}),{registerPluginType:function(e){return"registerPlugin:"+e},pluginReadyType:function(e){return"ready:"+e}}),ee=/^utm_/,te=/^an_prop_/,ne=/^an_trait_/;function re(e){var t=e.storage.setItem;return function(n){return function(r){return function(i){if(i.type===Z.bootstrap){var o=i.params,a=i.user,u=i.persistedUser,c=i.initialUser,s=u.userId===a.userId;u.anonymousId!==a.anonymousId&&t(F,a.anonymousId),s||t(W,a.userId),c.traits&&t(X,D({},s&&u.traits?u.traits:{},c.traits));var l=Object.keys(i.params);if(l.length){var f=o.an_uid,d=o.an_event,p=l.reduce((function(e,t){if(t.match(ee)||t.match(/^(d|g)clid/)){var n=t.replace(ee,"");e.campaign["campaign"===n?"name":n]=o[t]}return t.match(te)&&(e.props[t.replace(te,"")]=o[t]),t.match(ne)&&(e.traits[t.replace(ne,"")]=o[t]),e}),{campaign:{},props:{},traits:{}});n.dispatch(D({type:Z.params,raw:o},p,f?{userId:f}:{})),f&&setTimeout((function(){return e.identify(f,p.traits)}),0),d&&setTimeout((function(){return e.track(d,p.props)}),0),Object.keys(p.campaign).length&&n.dispatch({type:Z.campaign,campaign:p.campaign})}}return r(i)}}}}function ie(e){return function(t,n){if(void 0===t&&(t={}),void 0===n&&(n={}),n.type===Z.setItemEnd){if(n.key===F)return D({},t,{anonymousId:n.value});if(n.key===W)return D({},t,{userId:n.value})}switch(n.type){case Z.identify:return Object.assign({},t,{userId:n.userId,traits:D({},t.traits,n.traits)});case Z.reset:return[W,F,X].forEach((function(t){e.removeItem(t)})),Object.assign({},t,{userId:null,anonymousId:null,traits:{}});default:return t}}}function oe(e){return{userId:e.getItem(W),anonymousId:e.getItem(F),traits:e.getItem(X)}}var ae=function(e){return"__TEMP__"+e};function ue(e){var t=e.storage,n=t.setItem,r=t.removeItem,i=t.getItem;return function(e){return function(t){return function(o){var a=o.userId,u=o.traits,c=o.options;if(o.type===Z.reset&&([W,X,F].forEach((function(e){r(e)})),[G,K,"traits"].forEach((function(e){T(ae(e))}))),o.type===Z.identify){i(F)||n(F,x());var s=i(W),l=i(X)||{};s&&s!==a&&e.dispatch({type:Z.userIdChanged,old:{userId:s,traits:l},new:{userId:a,traits:u},options:c}),a&&n(W,a),u&&n(X,D({},l,u))}return t(o)}}}}var ce={};function se(e,t){ce[e]&&p(ce[e])&&(ce[e](t),delete ce[e])}function le(e,t,n){return new Promise((function(r,i){return t()?r(e):n<1?i(D({},e,{queue:!0})):new Promise((function(e){return setTimeout(e,10)})).then((function(o){return le(e,t,n-10).then(r,i)}))}))}var fe=function(e){var t=e.data,n=e.action,r=e.instance,i=e.state,o=e.allPlugins,a=e.allMatches,u=e.store,c=e.EVENTS;try{var s=i.plugins,l=i.context,f=n.type,d=f.match(de),g=t.exact.map((function(e){return e.pluginName}));d&&(g=a.during.map((function(e){return e.pluginName})));var m=function(e,t){return function(n,r,i){var o=r.config,a=r.name,u=a+"."+n.type;i&&(u=i.event);var c=n.type.match(de)?function(e,t,n,r,i){return function(o,a){var u=r?r.name:e,c=a&&we(a)?a:n;if(r&&(!(c=a&&we(a)?a:[e]).includes(e)||1!==c.length))throw new Error("Method "+t+" can only abort "+e+" plugin. "+JSON.stringify(c)+" input valid");return D({},i,{abort:{reason:o,plugins:c,caller:t,_:u}})}}(a,u,t,i,n):function(e,t){return function(){throw new Error(e.type+" action not cancellable. Remove abort in "+t)}}(n,u);return{payload:Pe(n),instance:e,config:o||{},abort:c}}}(r,g),v=t.exact.reduce((function(e,t){var n=t.pluginName,r=t.methodName,i=!1;return r.match(/^initialize/)||r.match(/^reset/)||(i=!s[n].loaded),l.offline&&r.match(/^(page|track|identify)/)&&(i=!0),e[""+n]=i,e}),{});return Promise.resolve(t.exact.reduce((function(e,i,a){var u=i.pluginName;return Promise.resolve(e).then((function(e){function i(){return Promise.resolve(e)}var a=function(){if(t.namespaced&&t.namespaced[u])return Promise.resolve(t.namespaced[u].reduce((function(e,t,n){return Promise.resolve(e).then((function(e){return t.method&&p(t.method)?(function(e,t){var n=Ee(e);if(n&&n.name===t){var r=Ee(n.method);throw new Error([t+" plugin is calling method "+e,"Plugins cant call self","Use "+n.method+" "+(r?"or "+r.method:"")+" in "+t+" plugin insteadof "+e].join("\n"))}}(t.methodName,t.pluginName),Promise.resolve(t.method({payload:e,instance:r,abort:(n=e,i=u,a=t.pluginName,function(e,t){return D({},n,{abort:{reason:e,plugins:t||[i],caller:f,from:a||i}})}),config:ve(t.pluginName,s,o),plugins:s})).then((function(t){var n=y(t)?t:{};return Promise.resolve(D({},e,n))}))):e;var n,i,a}))}),Promise.resolve(n))).then((function(t){e[u]=t}));e[u]=n}();return a&&a.then?a.then(i):i()}))}),Promise.resolve({}))).then((function(e){return Promise.resolve(t.exact.reduce((function(n,i,a){try{var c=t.exact.length===a+1,l=i.pluginName,p=o[l];return Promise.resolve(n).then((function(t){var n=e[l]?e[l]:{};if(d&&(n=t),be(n,l))return me({data:n,method:f,instance:r,pluginName:l,store:u}),Promise.resolve(t);if(be(t,l))return c&&me({data:t,method:f,instance:r,store:u}),Promise.resolve(t);if(v.hasOwnProperty(l)&&!0===v[l])return u.dispatch({type:"queue",plugin:l,payload:n,_:{called:"queue",from:"queueMechanism"}}),Promise.resolve(t);var i=m(e[l],o[l]);return Promise.resolve(p[f]({abort:i.abort,payload:n,instance:r,config:ve(l,s,o),plugins:s})).then((function(i){var o=y(i)?i:{},a=D({},t,o),c=e[l];if(be(c,l))me({data:c,method:f,instance:r,pluginName:l,store:u});else{var s=f+":"+l;(s.match(/:/g)||[]).length<2&&!f.match(pe)&&!f.match(ge)&&r.dispatch(D({},d?a:n,{type:s,_:{called:s,from:"submethod"}}))}return Promise.resolve(a)}))}))}catch(e){return Promise.reject(e)}}),Promise.resolve(n))).then((function(e){if(!(f.match(de)||f.match(/^registerPlugin/)||f.match(ge)||f.match(pe)||f.match(/^params/)||f.match(/^userIdChanged/))){if(c.plugins.includes(f),e._&&e._.originalAction===f)return e;var n=D({},e,{_:{originalAction:e.type,called:e.type,from:"engineEnd"}});Ie(e,t.exact.length)&&!f.match(/End$/)&&(n=D({},n,{type:e.type+"Aborted"})),u.dispatch(n)}return e}))}))}catch(e){return Promise.reject(e)}},de=/Start$/,pe=/^bootstrap/,ge=/^ready/;function me(e){var t=e.pluginName,n=e.method+"Aborted"+(t?":"+t:"");e.store.dispatch(D({},e.data,{type:n,_:{called:n,from:"abort"}}))}function ve(e,t,n){var r=t[e]||n[e];return r&&r.config?r.config:{}}function he(e,t){return t.reduce((function(t,n){return n[e]?t.concat({methodName:e,pluginName:n.name,method:n[e]}):t}),[])}function ye(e,t){var n=e.replace(de,""),r=t?":"+t:"";return[""+e+r,""+n+r,n+"End"+r]}function be(e,t){var n=e.abort;return!!n&&(!0===n||Se(n,t)||n&&Se(n.plugins,t))}function Ie(e,t){var n=e.abort;if(!n)return!1;if(!0===n||g(n))return!0;var r=n.plugins;return we(n)&&n.length===t||we(r)&&r.length===t}function we(e){return Array.isArray(e)}function Se(e,t){return!(!e||!we(e))&&e.includes(t)}function Ee(e){var t=e.match(/(.*):(.*)/);return!!t&&{method:t[1],name:t[2]}}function Pe(e){return Object.keys(e).reduce((function(t,n){return"type"===n||(t[n]=y(e[n])?Object.assign({},e[n]):e[n]),t}),{})}function Oe(e,t,n){var r={};return function(i){return function(o){return function(a){try{var u,c=function(e){return u?e:o(f)},s=a.type,l=a.plugins,f=a;if(a.abort)return Promise.resolve(o(a));if(s===Z.enablePlugin&&i.dispatch({type:Z.initializeStart,plugins:l,disabled:[],fromEnable:!0,meta:a.meta}),s===Z.disablePlugin&&setTimeout((function(){return se(a.meta.rid,{payload:a})}),0),s===Z.initializeEnd){var d=t(),g=Object.keys(d),m=g.filter((function(e){return l.includes(e)})).map((function(e){return d[e]})),h=[],y=[],b=a.disabled,I=m.map((function(e){var t=e.name;return le(e,e.loaded,1e4).then((function(n){return r[t]||(i.dispatch({type:Z.pluginReadyType(t),name:t,events:Object.keys(e).filter((function(e){return!Y.includes(e)}))}),r[t]=!0),h=h.concat(t),e})).catch((function(e){if(e instanceof Error)throw new Error(e);return y=y.concat(e.name),e}))}));Promise.all(I).then((function(e){var t={plugins:h,failed:y,disabled:b};setTimeout((function(){g.length===I.length+b.length&&i.dispatch(D({},{type:Z.ready},t))}),0)}))}var w=function(){if(s!==Z.bootstrap)return/^ready:([^:]*)$/.test(s)&&setTimeout((function(){return function(e,t,n){var r=t(),i=e.getState(),o=i.plugins,a=i.queue,u=i.user;if(!i.context.offline&&a&&a.actions&&a.actions.length){var c=a.actions.reduce((function(e,t,n){return o[t.plugin].loaded?(e.process.push(t),e.processIndex.push(n)):(e.requeue.push(t),e.requeueIndex.push(n)),e}),{processIndex:[],process:[],requeue:[],requeueIndex:[]});if(c.processIndex&&c.processIndex.length){c.processIndex.forEach((function(t){var i=a.actions[t],c=i.plugin,s=i.payload.type,l=r[c][s];if(l&&p(l)){var f=function(e,t){return void 0===e&&(e={}),void 0===t&&(t={}),[G,K].reduce((function(n,r){return e.hasOwnProperty(r)&&t[r]&&t[r]!==e[r]&&(n[r]=t[r]),n}),e)}(i.payload,u);l({payload:f,config:o[c].config,instance:n});var d=s+":"+c;e.dispatch(D({},f,{type:d,_:{called:d,from:"queueDrain"}}))}}));var s=a.actions.filter((function(e,t){return!~c.processIndex.indexOf(t)}));a.actions=s}}}(i,t,e)}),0),Promise.resolve(function(e,t,n,r,i){try{var o=p(t)?t():t,a=e.type,u=a.replace(de,"");if(e._&&e._.called)return Promise.resolve(e);var c=n.getState(),s=(d=o,void 0===(g=c.plugins)&&(g={}),void 0===(m=e.options)&&(m={}),Object.keys(d).filter((function(e){var t=m.plugins||{};return v(t[e])?t[e]:!1!==t.all&&(!g[e]||!1!==g[e].enabled)})).map((function(e){return d[e]})));a===Z.initializeStart&&e.fromEnable&&(s=Object.keys(c.plugins).filter((function(t){var n=c.plugins[t];return e.plugins.includes(t)&&!n.initialized})).map((function(e){return o[e]})));var l=s.map((function(e){return e.name})),f=function(e,t,n){var r=ye(e).map((function(e){return he(e,t)}));return t.reduce((function(n,r){var i=r.name,o=ye(e,i).map((function(e){return he(e,t)})),a=o[0],u=o[1],c=o[2];return a.length&&(n.beforeNS[i]=a),u.length&&(n.duringNS[i]=u),c.length&&(n.afterNS[i]=c),n}),{before:r[0],beforeNS:{},during:r[1],duringNS:{},after:r[2],afterNS:{}})}(a,s);return Promise.resolve(fe({action:e,data:{exact:f.before,namespaced:f.beforeNS},state:c,allPlugins:o,allMatches:f,instance:n,store:r,EVENTS:i})).then((function(e){function t(){var t=function(){if(a.match(de))return Promise.resolve(fe({action:D({},s,{type:u+"End"}),data:{exact:f.after,namespaced:f.afterNS},state:c,allPlugins:o,allMatches:f,instance:n,store:r,EVENTS:i})).then((function(e){e.meta&&e.meta.hasCallback&&se(e.meta.rid,{payload:e})}))}();return t&&t.then?t.then((function(){return e})):e}if(Ie(e,l.length))return e;var s,d=function(){if(a!==u)return Promise.resolve(fe({action:D({},e,{type:u}),data:{exact:f.during,namespaced:f.duringNS},state:c,allPlugins:o,allMatches:f,instance:n,store:r,EVENTS:i})).then((function(e){s=e}));s=e}();return d&&d.then?d.then(t):t()}))}catch(e){return Promise.reject(e)}var d,g,m}(a,t,e,i,n)).then((function(e){var t=o(e);return u=1,t}))}();return Promise.resolve(w&&w.then?w.then(c):c(w))}catch(e){return Promise.reject(e)}}}}}function xe(e){return function(t){return function(t){return function(n){var r=n.type,i=n.key,o=n.value,a=n.options;if(r===Z.setItem||r===Z.removeItem){if(n.abort)return t(n);r===Z.setItem?e.setItem(i,o,a):e.removeItem(i,a)}return t(n)}}}}var je=function(){var e=this;this.before=[],this.after=[],this.addMiddleware=function(t,n){e[n]=e[n].concat(t)},this.removeMiddleware=function(t,n){var r=e[n].findIndex((function(e){return e===t}));-1!==r&&(e[n]=[].concat(e[n].slice(0,r),e[n].slice(r+1)))},this.dynamicMiddlewares=function(t){return function(n){return function(r){return function(i){var o={getState:n.getState,dispatch:function(e){return n.dispatch(e)}},a=e[t].map((function(e){return e(o)}));return B.apply(void 0,a)(r)(i)}}}}};function _e(e){return function(t,n){void 0===t&&(t={});var r={};if("initialize:aborted"===n.type)return t;if(/^registerPlugin:([^:]*)$/.test(n.type)){var i=ke(n.type,"registerPlugin"),o=e()[i];if(!o||!i)return t;var a=n.enabled;return r[i]={enabled:a,initialized:!!a&&Boolean(!o.initialize),loaded:!!a&&Boolean(o.loaded()),config:o.config||{}},D({},t,r)}if(/^initialize:([^:]*)$/.test(n.type)){var u=ke(n.type,Z.initialize),c=e()[u];return c&&u?(r[u]=D({},t[u],{initialized:!0,loaded:Boolean(c.loaded())}),D({},t,r)):t}if(/^ready:([^:]*)$/.test(n.type))return r[n.name]=D({},t[n.name],{loaded:!0}),D({},t,r);switch(n.type){case Z.disablePlugin:return D({},t,Ne(n.plugins,!1,t));case Z.enablePlugin:return D({},t,Ne(n.plugins,!0,t));default:return t}}}function ke(e,t){return e.substring(t.length+1,e.length)}function Ne(e,t,n){return e.reduce((function(e,r){return e[r]=D({},n[r],{enabled:t}),e}),n)}function Ae(e){try{return JSON.parse(JSON.stringify(e))}catch(e){}return e}var Te={last:{},history:[]};function Ue(e,t){void 0===e&&(e=Te);var n=t.options,r=t.meta;if(t.type===Z.track){var i=Ae(D({event:t.event,properties:t.properties},Object.keys(n).length&&{options:n},{meta:r}));return D({},e,{last:i,history:e.history.concat(i)})}return e}var ze={actions:[]};function Me(e,t){void 0===e&&(e=ze);var n=t.payload;switch(t.type){case"queue":var r;return r=n&&n.type&&n.type===Z.identify?[t].concat(e.actions):e.actions.concat(t),D({},e,{actions:r});case"dequeue":return[];default:return e}}var De=/#.*$/;function Ce(e){var t=/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/g.exec(e);return"/"+(t&&t[3]?t[3].split("?")[0].replace(De,""):"")}var Ve,qe=function(e){if(void 0===e&&(e={}),!a)return e;var t=document,n=t.title,r=t.referrer,i=window,o=i.location,u=i.innerWidth,c=i.innerHeight,s=o.hash,l=o.search,f=function(e){var t=function(){if(a)for(var e,t=document.getElementsByTagName("link"),n=0;e=t[n];n++)if("canonical"===e.getAttribute("rel"))return e.getAttribute("href")}();return t?t.match(/\?/)?t:t+e:window.location.href.replace(De,"")}(l),d={title:n,url:f,path:Ce(f),hash:s,search:l,width:u,height:c};return r&&""!==r&&(d.referrer=r),D({},d,e)},Le={last:{},history:[]};function Re(e,t){void 0===e&&(e=Le);var n=t.options;if(t.type===Z.page){var r=Ae(D({properties:t.properties,meta:t.meta},Object.keys(n).length&&{options:n}));return D({},e,{last:r,history:e.history.concat(r)})}return e}Ve={};var $e={initialized:!1,sessionId:x(),app:null,version:null,debug:!1,offline:!!a&&!navigator.onLine,os:{name:"na"},userAgent:a?navigator.userAgent:"node",library:{name:"analytics",version:"0.11.0"},timezone:void 0,locale:void 0,campaign:{},referrer:Ve};function Je(e,t){void 0===e&&(e=$e);var n=e.initialized,r=t.campaign;switch(t.type){case Z.campaign:return D({},e,{campaign:r});case Z.offline:return D({},e,{offline:!0});case Z.online:return D({},e,{offline:!1});default:return n?e:D({},$e,e,{initialized:!0})}}var Be=["plugins","reducers","storage"];function He(){return A("analytics",[]),function(e){return function(t,n,r){var i=e(t,n,r),o=i.dispatch;return Object.assign(i,{dispatch:function(e){return k[_].analytics.push(e.action||e),o(e)}})}}}function Fe(e){return function(){return B(B.apply(null,arguments),He())}}function We(e){return e?function(e){return"array"===f(e)}(e)?e:[e]:[]}function Xe(e,t,n){void 0===e&&(e={});var r,i,o=x();return t&&(ce[o]=(r=t,i=function(e){for(var t,n=e||Array.prototype.slice.call(arguments),r=0;r<n.length;r++)if(p(n[r])){t=n[r];break}return t}(n),function(e){i&&i(e),r(e)})),D({},e,{rid:o,ts:(new Date).getTime()},t?{hasCallback:!0}:{})}function Ge(t){void 0===t&&(t={});var n=t.reducers||{},r=t.initialUser||{},i=(t.plugins||[]).reduce((function(e,t){if(p(t))return e.middlewares=e.middlewares.concat(t),e;if(t.NAMESPACE&&(t.name=t.NAMESPACE),!t.name)throw new Error("https://lytics.dev/errors/1");var n=t.EVENTS?Object.keys(t.EVENTS).map((function(e){return t.EVENTS[e]})):[];e.pluginEnabled[t.name]=!(!1===t.enabled||t.config&&!1===t.config.enabled),delete t.enabled,t.methods&&(e.methods[t.name]=Object.keys(t.methods).reduce((function(e,n){var r;return e[n]=(r=t.methods[n],function(){for(var e=Array.prototype.slice.call(arguments),t=new Array(r.length),n=0;n<e.length;n++)t[n]=e[n];return t[t.length]=j,r.apply({instance:j},t)}),e}),{}),delete t.methods);var r=Object.keys(t).concat(n),i=new Set(e.events.concat(r));if(e.events=Array.from(i),e.pluginsArray=e.pluginsArray.concat(t),e.plugins[t.name])throw new Error(t.name+"AlreadyLoaded");return e.plugins[t.name]=t,e.plugins[t.name].loaded||(e.plugins[t.name].loaded=function(){return!0}),e}),{plugins:{},pluginEnabled:{},methods:{},pluginsArray:[],middlewares:[],events:[]}),o=t.storage?t.storage:{getItem:N,setItem:A,removeItem:T},u=function(e){return function(t,n,r){return n.getState("user")[t]||(r&&y(r)&&r[t]?r[t]:oe(e)[t]||N(ae(t))||null)}}(o),c=i.plugins,s=i.events.filter((function(e){return!Y.includes(e)})).sort(),l=new Set(s.concat(Q).filter((function(e){return!Y.includes(e)}))),f=Array.from(l).sort(),d=function(){return c},m=new je,v=m.addMiddleware,h=m.removeMiddleware,b=m.dynamicMiddlewares,I=function(){throw new Error("Abort disabled inListener")},w=P(),S=oe(o),E=D({},S,r,w.an_uid?{userId:w.an_uid}:{},w.an_aid?{anonymousId:w.an_aid}:{});E.anonymousId||(E.anonymousId=x());var O=D({enable:function(e,t){return new Promise((function(n){ee.dispatch({type:Z.enablePlugin,plugins:We(e),_:{originalAction:Z.enablePlugin}},n,[t])}))},disable:function(e,t){return new Promise((function(n){ee.dispatch({type:Z.disablePlugin,plugins:We(e),_:{originalAction:Z.disablePlugin}},n,[t])}))}},i.methods),j={identify:function(e,t,n,r){try{var i=g(e)?e:null,o=y(e)?e:t,a=n||{},c=j.user();A(ae(G),i);var s=i||o.userId||u(G,j,o);return Promise.resolve(new Promise((function(e){ee.dispatch(D({type:Z.identifyStart,userId:s,traits:o||{},options:a,anonymousId:c.anonymousId},c.id&&c.id!==i&&{previousId:c.id}),e,[t,n,r])})))}catch(e){return Promise.reject(e)}},track:function(e,t,n,r){try{var i=y(e)?e.event:e;if(!i||!g(i))throw new Error("EventMissing");var o=y(e)?e:t||{},a=y(n)?n:{};return Promise.resolve(new Promise((function(e){ee.dispatch({type:Z.trackStart,event:i,properties:o,options:a,userId:u(G,j,t),anonymousId:u(K,j,t)},e,[t,n,r])})))}catch(e){return Promise.reject(e)}},page:function(e,t,n){try{var r=y(e)?e:{},i=y(t)?t:{};return Promise.resolve(new Promise((function(o){ee.dispatch({type:Z.pageStart,properties:qe(r),options:i,userId:u(G,j,r),anonymousId:u(K,j,r)},o,[e,t,n])})))}catch(e){return Promise.reject(e)}},user:function(t){if(t===G||"id"===t)return u(G,j);if(t===K||"anonId"===t)return u(K,j);var n=j.getState("user");return t?e(n,t):n},reset:function(e){return new Promise((function(t){ee.dispatch({type:Z.resetStart},t,e)}))},ready:function(e){return j.on(Z.ready,e)},on:function(e,t){if(!e||!p(t))return!1;if(e===Z.bootstrap)throw new Error(".on disabled for "+e);var n=/Start$|Start:/;if("*"===e){var r=function(e){return function(e){return function(r){return r.type.match(n)&&t({payload:r,instance:j,plugins:c}),e(r)}}},i=function(e){return function(e){return function(r){return r.type.match(n)||t({payload:r,instance:j,plugins:c}),e(r)}}};return v(r,Ke),v(i,Qe),function(){h(r,Ke),h(i,Qe)}}var o=e.match(n)?Ke:Qe,a=function(n){return function(n){return function(r){return r.type===e&&t({payload:r,instance:j,plugins:c,abort:I}),n(r)}}};return v(a,o),function(){return h(a,o)}},once:function(e,t){if(!e||!p(t))return!1;if(e===Z.bootstrap)throw new Error(".once disabled for "+e);var n=j.on(e,(function(e){t({payload:e.payload,instance:j,plugins:c,abort:I}),n()}));return n},getState:function(t){var n=ee.getState();return t?e(n,t):Object.assign({},n)},dispatch:function(e){var t=g(e)?{type:e}:e;if(Q.includes(t.type))throw new Error("reserved action "+t.type);var n=D({},t,{_:D({originalAction:t.type},e._||{})});ee.dispatch(n)},enablePlugin:O.enable,disablePlugin:O.disable,plugins:O,storage:{getItem:o.getItem,setItem:function(e,t,n){ee.dispatch({type:Z.setItemStart,key:e,value:t,options:n})},removeItem:function(e,t){ee.dispatch({type:Z.removeItemStart,key:e,options:t})}},setAnonymousId:function(e,t){j.storage.setItem(F,e,t)},events:{core:Q,plugins:s}},_=i.middlewares.concat([function(e){return function(e){return function(t){return t.meta||(t.meta=Xe()),e(t)}}},b(Ke),Oe(j,d,{all:f,plugins:s}),xe(o),re(j),ue(j),b(Qe)]),k={context:Je,user:ie(o),page:Re,track:Ue,plugins:_e(d),queue:Me},U=B,z=B;if(a&&t.debug){var M=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;M&&(U=M({trace:!0,traceLimit:25})),z=function(){return 0===arguments.length?He():y(typeof arguments[0])?Fe():Fe().apply(null,arguments)}}var L,R=function(e){return Object.keys(e).reduce((function(t,n){return Be.includes(n)||(t[n]=e[n]),t}),{})}(t),W=i.pluginsArray.reduce((function(e,t){var n=t.name,r=t.config,o=t.loaded,a=i.pluginEnabled[n];return e[n]={enabled:a,initialized:!!a&&Boolean(!t.initialize),loaded:Boolean(o()),config:r||{}},e}),{}),X={context:R,user:E,plugins:W},ee=$(function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++){var i=t[r];typeof e[i]===C&&(n[i]=e[i])}var o,a=Object.keys(n);try{!function(e){Object.keys(e).forEach((function(t){var n=e[t];if(typeof n(void 0,{type:"@@redux/INIT"})===V||typeof n(void 0,{type:q})===V)throw new Error("reducer "+t+" "+V)}))}(n)}catch(e){o=e}return function(e,t){if(void 0===e&&(e={}),o)throw o;for(var r=!1,i={},u=0;u<a.length;u++){var c=a[u],s=e[c],l=(0,n[c])(s,t);if(typeof l===V){var f=J(c,t);throw new Error(f)}i[c]=l,r=r||l!==s}return r?i:e}}(D({},k,n)),X,z(U(H.apply(void 0,_))));ee.dispatch=(L=ee.dispatch,function(e,t,n){var r=D({},e,{meta:Xe(e.meta,t,We(n))});return L.apply(null,[r])});var te=Object.keys(c);ee.dispatch({type:Z.bootstrap,plugins:te,config:R,params:w,user:E,initialUser:r,persistedUser:S});var ne=te.filter((function(e){return i.pluginEnabled[e]})),ce=te.filter((function(e){return!i.pluginEnabled[e]}));return ee.dispatch({type:Z.registerPlugins,plugins:te,enabled:i.pluginEnabled}),i.pluginsArray.map((function(e,t){var n=e.bootstrap,r=e.config,o=e.name;n&&p(n)&&n({instance:j,config:r,payload:e}),ee.dispatch({type:Z.registerPluginType(o),name:o,enabled:i.pluginEnabled[o],plugin:e}),i.pluginsArray.length===t+1&&ee.dispatch({type:Z.initializeStart,plugins:ne,disabled:ce})})),j}var Ke="before",Qe="after",Ye="cookie",Ze=rt(),et=it,tt=it;function nt(e){return Ze?it(e,"",-1):T(e)}function rt(){if(void 0!==Ze)return Ze;var e="cookiecookie";try{it(e,e),Ze=-1!==document.cookie.indexOf(e),nt(e)}catch(e){Ze=!1}return Ze}function it(e,t,n,r,i,o){if("undefined"!=typeof window){var a=arguments.length>1;return!1===Ze&&(a?A(e,t):N(e)),a?document.cookie=e+"="+encodeURIComponent(t)+(n?"; expires="+new Date(+new Date+1e3*n).toUTCString()+(r?"; path="+r:"")+(i?"; domain="+i:"")+(o?"; secure":""):""):decodeURIComponent((("; "+document.cookie).split("; "+e+"=")[1]||"").split(";")[0])}}var ot="localStorage",at=M.bind(null,"localStorage");U("localStorage","getItem",N),U("localStorage","setItem",A),U("localStorage","removeItem",T);var ut="sessionStorage",ct=M.bind(null,"sessionStorage");function st(e){var t=e;try{if("true"===(t=JSON.parse(e)))return!0;if("false"===t)return!1;if(y(t))return t;parseFloat(t)===t&&(t=parseFloat(t))}catch(e){}if(null!==t&&""!==t)return t}U("sessionStorage","getItem",N),U("sessionStorage","setItem",A),U("sessionStorage","removeItem",T);var lt=at(),ft=ct(),dt=rt();function pt(e,t){if(e){var n=gt(t),r=!yt(n),i=mt(n)?st(localStorage.getItem(e)):void 0;if(r&&!m(i))return i;var o=vt(n)?st(et(e)):void 0;if(r&&o)return o;var a=ht(n)?st(sessionStorage.getItem(e)):void 0;if(r&&a)return a;var u=N(e);return r?u:{localStorage:i,sessionStorage:a,cookie:o,global:u}}}function gt(e){return e?g(e)?e:e.storage:r}function mt(e){return lt&&bt(e,ot)}function vt(e){return dt&&bt(e,Ye)}function ht(e){return ft&&bt(e,ut)}function yt(e){return e===i||"all"===e}function bt(e,t){return e===r||e===t||yt(e)}function It(e,t,n){return{location:e,current:t,previous:n}}var wt={setItem:function(e,t,n){if(e&&!m(t)){var r={},i=gt(n),o=JSON.stringify(t),a=!yt(i);return mt(i)&&(r[ot]=It(ot,t,st(localStorage.getItem(e))),localStorage.setItem(e,o),a)?r[ot]:vt(i)&&(r[Ye]=It(Ye,t,st(et(e))),tt(e,o),a)?r[Ye]:ht(i)&&(r[ut]=It(ut,t,st(sessionStorage.getItem(e))),sessionStorage.setItem(e,o),a)?r[ut]:(r[j]=It(j,t,N(e)),A(e,t),a?r[j]:r)}},getItem:pt,removeItem:function(e,t){if(e){var n=gt(t),r=pt(e,i),o={};return!m(r.localStorage)&&mt(n)&&(localStorage.removeItem(e),o[ot]=r.localStorage),!m(r.cookie)&&vt(n)&&(nt(e),o[Ye]=r.cookie),!m(r.sessionStorage)&&ht(n)&&(sessionStorage.removeItem(e),o[ut]=r.sessionStorage),!m(r.global)&&bt(n,j)&&(T(e),o[j]=r.global),o}}};function St(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Et(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Pt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Et(Object(n),!0).forEach((function(t){St(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Et(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}let Ot;const xt=new Uint8Array(16);function jt(){if(!Ot&&(Ot="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!Ot))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return Ot(xt)}const _t=[];for(let e=0;e<256;++e)_t.push((e+256).toString(16).slice(1));var kt={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};const Nt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Ge(Pt(Pt({},{storage:wt}),e))}({app:"abimage",version:"1.0.2",plugins:[function(e){const t="https://abimagedev-production.up.railway.app/track";return{name:"abimage-provider",config:{},initialize:({config:e})=>{window.abimageLoaded=!0},page:({payload:e})=>{const{meta:n,session:r}=e;fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({date:n.ts,session:r})})},track:({payload:e})=>{const{meta:n,userId:r,event:i,properties:o}=e;fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({date:n.ts,page:n.page,session:r,event:i,properties:o})})},loaded:()=>!!window.abimageLoaded}}()]}),{storage:At}=Nt,Tt=At.getItem("__abmg_ssi")||function(e,t,n){if(kt.randomUUID&&!t&&!e)return kt.randomUUID();const r=(e=e||{}).random||(e.rng||jt)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=r[e];return t}return function(e,t=0){return(_t[e[t+0]]+_t[e[t+1]]+_t[e[t+2]]+_t[e[t+3]]+"-"+_t[e[t+4]]+_t[e[t+5]]+"-"+_t[e[t+6]]+_t[e[t+7]]+"-"+_t[e[t+8]]+_t[e[t+9]]+"-"+_t[e[t+10]]+_t[e[t+11]]+_t[e[t+12]]+_t[e[t+13]]+_t[e[t+14]]+_t[e[t+15]]).toLowerCase()}(r)}();At.setItem("__abmg_ssi",Tt),Nt.identify(Tt),Nt.page();const Ut=[],zt=[...document.images],Mt=new IntersectionObserver(((e,t)=>{e.forEach((e=>{if(e.isIntersecting)Nt.track("imageView",{image:e.target.src,width:e.target.width,height:e.target.height,screen_width:screen.availWidth,screen_height:screen.availHeight}),Ut.push(e.target.src);else{const t=Ut.indexOf(e.target.src);-1!==t&&(Ut.splice(t,1),Nt.track("imageHide",{image:e.target.src}))}}))}),{root:null,rootMargin:"0px",threshold:.5});zt.forEach((e=>{Mt.observe(e)}));const Dt=function(){let e;return{stop:()=>{clearInterval(e)},start:()=>{e=setInterval((()=>{Ut.length>0&&Nt.track("imageViewTick",{images:Ut});const e=[...document.images].filter((e=>!zt.includes(e)));e.forEach((e=>{Mt.observe(e)})),zt.forEach((t=>{e.includes(t)||Mt.unobserve(t)})),zt.splice(0,zt.length,...e),Ut.forEach((t=>{e.includes(t)||Ut.splice(Ut.indexOf(t),1)}))}),1e4)}}}();Dt.start(),document.addEventListener("visibilitychange",(()=>{document.hidden?Dt.stop():Dt.start()}));
