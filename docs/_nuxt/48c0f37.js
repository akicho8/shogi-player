(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{482:function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0});var l=w(n(491)),r=w(n(492)),f=w(n(495)),c=w(n(487)),_=w(n(498)),d=w(n(499)),P=w(n(500)),h=w(n(501)),k=w(n(502)),y=w(n(503)),v=w(n(14));function w(e){return e&&e.__esModule?e:{default:e}}var m=function(){function e(t){var n=this;(0,k.default)(this,e),Object.defineProperty(this,"attributes",{value:t,writable:!1,enumerable:!1,configurable:!1}),v.default.forIn(t,(function(e,t){(0,c.default)(n,t,{value:e,writable:!1,enumerable:!0,configurable:!1})})),"name"in this||Object.defineProperty(this,"name",{value:t.name||t.key.toString(),writable:!1,enumerable:!0,configurable:!1})}return(0,y.default)(e,null,[{key:"memory_record_reset",value:function(e){return this._values=void 0,this._keys_hash=void 0,this._codes_hash=void 0,this._keys=void 0,this._codes=void 0,this._names=void 0,this._records=e,this}},{key:"memory_record_create_index_or",value:function(e){var t=this;return this.values.reduce((function(a,n){return e.forEach((function(e){var o=n[e];if(null!=o){if(o in a)throw new Error([t.name+"#"+e+" "+(0,h.default)(o)+" is duplicate","Existing: "+(0,h.default)((0,P.default)(a)),"Conflict: "+(0,h.default)(n)].join("\n"));a[o]=n}})),a}),{})}},{key:"lookup",value:function(e){return e instanceof this?e:"number"==typeof e?this.codes_hash[e]:this.keys_hash[e]}},{key:"fetch",value:function(e){var element=this.lookup(e);if(!element)throw new Error([this.name+".fetch("+(0,h.default)(e)+") does not match anything","keys: "+(0,h.default)(this.keys),"codes: "+(0,h.default)(this.codes)].join("\n"));return element}},{key:"fetch_if",value:function(e){if(null!=e)return this.fetch(e)}},{key:"define",get:function(){throw new Error(this.name+".define() is not implemented")}},{key:"values",get:function(){var e=this;return void 0!==this._values||(this._values=v.default.map(this.__source_records,(function(t,i){return"code"in(t=(0,d.default)({},t,{index:i}))||(t=(0,d.default)({},t,{code:i})),"key"in t||(t=(0,d.default)({},t,{key:"_key"+i})),(0,_.default)(new e(t))}))),this._values}},{key:"keys_hash",get:function(){return null!=this._keys_hash||(this._keys_hash=this.memory_record_create_index_or(["key"])),this._keys_hash}},{key:"codes_hash",get:function(){return null!=this._codes_hash||(this._codes_hash=this.memory_record_create_index_or(["code"])),this._codes_hash}},{key:"keys",get:function(){return null!=this._keys||(this._keys=(0,P.default)(this.keys_hash)),this._keys}},{key:"codes",get:function(){return null!=this._codes||(this._codes=this.values.map((function(e){return e.code}))),this._codes}},{key:"names",get:function(){return null!=this._names||(this._names=this.values.map((function(e){return e.name}))),this._names}},{key:"__source_records",get:function(){return null!=this._records||(this._records=this.define),this._records}}]),e}();if(t.default=m,e.argv[1]===o){var L=function(e){function t(){return(0,k.default)(this,t),(0,r.default)(this,(t.__proto__||(0,l.default)(t)).apply(this,arguments))}return(0,f.default)(t,e),(0,y.default)(t,null,[{key:"define",get:function(){return[{key:"black",name:"☗"},{key:"white",name:"☖"},{code:7}]}}]),t}(m);console.log(L.keys),console.log(L.codes);var S=L.values[0];console.log(S.key),console.log(S.code),console.log(S.name),console.log(L.values),console.log(L.lookup("black").name),console.log(L.lookup("black").code),console.log(L.lookup("_key2").name);var N=L.lookup("black");console.log(N instanceof L),console.log(L.lookup(0)),console.log(L.lookup(1)),console.log(L.lookup(2)),console.log(L.values[0]==L.values[0]),console.log(L.values.map((function(e){return e.key}))),console.log((0,P.default)(L.keys_hash)),console.log(L.fetch("unknown"))}}).call(this,n(131),"/index.js")},486:function(e,t,n){"use strict";t.__esModule=!0;var o=f(n(493)),l=f(n(494)),r="function"==typeof l.default&&"symbol"==typeof o.default?function(e){return typeof e}:function(e){return e&&"function"==typeof l.default&&e.constructor===l.default&&e!==l.default.prototype?"symbol":typeof e};function f(e){return e&&e.__esModule?e:{default:e}}t.default="function"==typeof l.default&&"symbol"===r(o.default)?function(e){return void 0===e?"undefined":r(e)}:function(e){return e&&"function"==typeof l.default&&e.constructor===l.default&&e!==l.default.prototype?"symbol":void 0===e?"undefined":r(e)}},487:function(e,t,n){e.exports={default:n(531),__esModule:!0}},490:function(e,t,n){"use strict";n.r(t),function(e,o){n.d(t,"PresetInfo",(function(){return h}));n(479);var l=n(129),r=n(130),f=n(480),c=n(481),_=n(478),d=n(482);function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=Object(_.a)(e);if(t){var l=Object(_.a)(this).constructor;n=Reflect.construct(o,arguments,l)}else n=o.apply(this,arguments);return Object(c.a)(this,n)}}var h=function(e){Object(f.a)(n,e);var t=P(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,null,[{key:"define",get:function(){return[{key:"詰将棋",sfen:"position sfen 4k4/9/9/9/9/9/9/9/9 b 2r2b4g4s4n4l18p 1",first_location_key:"black",piece_box:[["K",1]]},{key:"詰将棋 - 美濃",sfen:"position sfen ln1g5/1ks6/1ppp5/p8/9/9/9/9/9 b BGSNL2rb2g2s2n2l14p 1",first_location_key:"black",piece_box:[["K",1]]},{key:"詰将棋 - 矢倉",sfen:"position sfen 7nl/6gk1/5gspp/5pp2/9/9/9/9/9 b BGSNL2rbg2s2n2l14p 1",first_location_key:"black",piece_box:[["K",1]]},{key:"戦型 右四間 vs 四間飛車",sfen:"position sfen ln1g1g1nl/1ks2r3/1pppp1bpp/p3spp2/9/P1P1SP1PP/1P1PP1P2/1BK1GR3/LNSG3NL b - 25",first_location_key:"black",piece_box:[]},{key:"全部駒箱",sfen:"position sfen 9/9/9/9/9/9/9/9/9 b - 1",first_location_key:"black",piece_box:[["B",2],["R",2],["L",4],["N",4],["S",4],["G",4],["P",18],["K",2]]},{key:"平手",sfen:"position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1",first_location_key:"black",piece_box:[]},{key:"香落ち",sfen:"position sfen lnsgkgsn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["L",1]]},{key:"右香落ち",sfen:"position sfen 1nsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["L",1]]},{key:"角落ち",sfen:"position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1]]},{key:"飛車落ち",sfen:"position sfen lnsgkgsnl/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["R",1]]},{key:"飛香落ち",sfen:"position sfen lnsgkgsn1/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["R",1],["L",1]]},{key:"二枚落ち",sfen:"position sfen lnsgkgsnl/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1],["R",1]]},{key:"三枚落ち",sfen:"position sfen lnsgkgsn1/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1],["R",1],["L",1]]},{key:"四枚落ち",sfen:"position sfen 1nsgkgsn1/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1],["R",1],["L",2]]},{key:"六枚落ち",sfen:"position sfen 2sgkgs2/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1],["R",1],["L",2],["N",2]]},{key:"八枚落ち",sfen:"position sfen 3gkg3/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1],["R",1],["L",2],["N",2],["S",2]]},{key:"十枚落ち",sfen:"position sfen 4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1],["R",1],["L",2],["N",2],["S",2],["G",2]]},{key:"十九枚落ち",sfen:"position sfen 4k4/9/9/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1],["R",1],["L",2],["N",2],["S",2],["G",2],["P",9]]},{key:"二十枚落ち",sfen:"position sfen 9/9/9/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",first_location_key:"white",piece_box:[["B",1],["R",1],["L",2],["N",2],["S",2],["G",2],["P",9],["K",1]]},{key:"青空将棋",sfen:"position sfen lnsgkgsnl/1r5b1/9/9/9/9/9/1B5R1/LNSGKGSNL b - 1",first_location_key:"black",piece_box:[]}]}}]),n}(n.n(d).a);e.argv[1]===o&&(console.log(h.fetch("平手")),console.log(h.fetch("香落ち").first_location_key))}.call(this,n(131),"/index.js")},491:function(e,t,n){e.exports={default:n(526),__esModule:!0}},492:function(e,t,n){"use strict";t.__esModule=!0;var o,l=n(486),r=(o=l)&&o.__esModule?o:{default:o};t.default=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":(0,r.default)(t))&&"function"!=typeof t?e:t}},493:function(e,t,n){e.exports={default:n(527),__esModule:!0}},494:function(e,t,n){e.exports={default:n(528),__esModule:!0}},495:function(e,t,n){"use strict";t.__esModule=!0;var o=f(n(496)),l=f(n(497)),r=f(n(486));function f(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":(0,r.default)(t)));e.prototype=(0,l.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(o.default?(0,o.default)(e,t):e.__proto__=t)}},496:function(e,t,n){e.exports={default:n(529),__esModule:!0}},497:function(e,t,n){e.exports={default:n(530),__esModule:!0}},498:function(e,t,n){e.exports={default:n(532),__esModule:!0}},499:function(e,t,n){e.exports={default:n(533),__esModule:!0}},500:function(e,t,n){e.exports={default:n(534),__esModule:!0}},501:function(e,t,n){e.exports={default:n(535),__esModule:!0}},502:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},503:function(e,t,n){"use strict";t.__esModule=!0;var o,l=n(487),r=(o=l)&&o.__esModule?o:{default:o};t.default=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,r.default)(e,n.key,n)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()}}]);