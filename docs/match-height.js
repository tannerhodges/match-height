!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.MatchHeight=e():t.MatchHeight=e()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=function(t){var e=t.Element.prototype;"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),n=0;e[n]&&e[n]!==this;)++n;return Boolean(e[n])}),"function"!=typeof e.closest&&(e.closest=function(t){for(var e=this;e&&1===e.nodeType;){if(e.matches(t))return e;e=e.parentNode}return null})};function o(t){for(var e="",n=0;n<t;n+=1)e+="-";return e}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return Array.prototype.slice.call(e.querySelectorAll(t))}function i(t){return"string"==typeof t?a(t):t instanceof Element?[t]:t?Array.prototype.slice.call(t):[]}function u(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var h=function(){function t(){var e,n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=this.reset.bind(this),"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e),window.addEventListener("resize",(function(){return n.update()})),this.groupCounter=1}var e,n,r;return e=t,(n=[{key:"findElements",value:function(){this.groups=this.group(a("[data-match-height]"))}},{key:"group",value:function(t){return t.reduce((function(t,e){var n=e.getAttribute("data-match-height"),r=e.closest("[data-match-height-group]");return r&&(n=r.getAttribute("data-match-height-group")+"-"+n),t[n]=(t[n]||[]).concat(e),t}),{})}},{key:"isEnabled",value:function(t){if(!t||!t[0])return!1;var e=t[0],n=e.closest("[data-match-height-enable]");if(n){var r=n.getAttribute("data-match-height-enable");return"true"===r||"false"!==r&&window.matchMedia(r).matches}var o=e.closest("[data-match-height-disable]");if(o){var a=o.getAttribute("data-match-height-disable");return"true"!==a&&("false"===a||!window.matchMedia(a).matches)}return!0}},{key:"match",value:function(t){var e=t.reduce((function(t,e){return e.style.height="",Math.max(t,e.offsetHeight)}),0);t.forEach((function(t){return t.style.height="".concat(e,"px")}))}},{key:"update",value:function(t){var e=this.getGroups(t);for(var n in e){var r=e[n];this.isEnabled(r)?this.match(r):r.forEach((function(t){return t.style.height=""}))}}},{key:"reset",value:function(){this.findElements(),this.update()}},{key:"getNewGroupID",value:function(){var t="group-".concat(this.groupCounter);return this.groupCounter+=1,t}},{key:"getGroupID",value:function(t){var e=(t=i(t)).shift();if(!e)return null;var n=e.getAttribute("data-match-height"),r=e.closest("[data-match-height-group]");return r&&(n=r.getAttribute("data-match-height-group")+"-"+n),n}},{key:"getGroups",value:function(t){return t?("string"==typeof t&&this.groups[t]?e=t:(t=i(t),e=this.getGroupID(t)),this.groups[e]?(n={},r=e,o=this.groups[e],r in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,n):{}):this.groups;var e,n,r,o}},{key:"getControl",value:function(t){var e=(t=i(t)).shift();return e?e.closest("[data-match-height-enable], [data-match-height-disable]"):null}},{key:"add",value:function(t,e){t=i(t),e=e||this.getNewGroupID(),t.forEach((function(t){return t.setAttribute("data-match-height",e)})),this.groups[e]=(this.groups[e]||[]).concat(t),this.update(e)}},{key:"remove",value:function(t){if("string"==typeof t&&this.groups[t])delete this.groups[t];else{var e,n=this,r=i(t),o=[];r.forEach((function(t){var e=n.getGroupID(t);t.removeAttribute("data-match-height"),n.groups[e]=n.groups[e].filter((function(e){return e&&e!==t})),n.groups[e].length?o.push(e):(delete n.groups[e],o=o.filter((function(t){return t!==e})))})),(e=o,e.filter((function(t,e,n){return n.indexOf(t)===e}))).forEach((function(t){return n.update(t)}))}}},{key:"debug",value:function(t){var e,n=this.getGroups(t);if(e=n,0!==Object.getOwnPropertyNames(e).length){for(var r in n)if(u(n,r)){var a=n[r],i=this.getControl(a),c={};c.isEnabled=this.isEnabled(a),c.control=i,c.enable=i?i.getAttribute("data-match-height-enable"):void 0,c.disable=i?i.getAttribute("data-match-height-disable"):void 0,c.groupID=r,c.group=a,console.log("\n---------------------------".concat(o(r.length),'-\n🐛 Match Height Debugger: "').concat(r,'"\n---------------------------').concat(o(r.length),"-\n\n👇 Click into the object below to inspect your elements.\n\n")),console.log(c),console.log("\n")}}else console.log("\n😢 Oh no! Match Height couldn't find a matching group for \"".concat(t,"\".\n\n--------------------------------------------------------------------------------------------\nℹ️ NOTE: Make sure the elements you're trying to debug have a [data-match-height] attribute.\n--------------------------------------------------------------------------------------------\n\n"))}}])&&c(e.prototype,n),r&&c(e,r),t}();r(window);var s=new h;window.MatchHeight=s,"undefined"!=typeof $&&($.fn.matchHeight=function(){window.MatchHeight.add(this)});e.default=s}]).default}));
//# sourceMappingURL=match-height.js.map