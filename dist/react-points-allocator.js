!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("react")):"function"==typeof define&&define.amd?define(["react"],n):"object"==typeof exports?exports.PointsAllocator=n(require("react")):e.PointsAllocator=n(e.React)}(this,function(e){return function(e){function n(t){if(r[t])return r[t].exports;var o=r[t]={exports:{},id:t,loaded:!1};return e[t].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=e,n.c=r,n.p="",n(0)}([function(e,n,r){"use strict";var t=r(1),o=r(4),i=r(6),s=r(7);i();var a=t.createClass({displayName:"PointsAllocator",propTypes:{points:t.PropTypes.number.isRequired,options:t.PropTypes.array.isRequired,rangesSize:t.PropTypes.number,initialRanges:t.PropTypes.array,onChange:t.PropTypes.func},componentWillMount:function(){this.props.rangesSize||(this.props.rangesSize=this.props.points)},getInitialState:function(){var e,n={};return this.props.initialRanges?(e=s(this.props.initialRanges),n.rangePoints=this.props.initialRanges,n.remainingPoints=this.props.points-e):(n.rangePoints=Array.from({length:this.props.options.length},function(){return 0}),n.remainingPoints=this.props.points),n},render:function(){return t.DOM.div({className:"points-allocator"},t.DOM.div({className:"points"},t.DOM.header({className:"points-text"},this.state.remainingPoints),t.DOM.progress({className:"points-progress",value:this.state.remainingPoints,max:this.props.points})),o({remainingPoints:this.state.remainingPoints,rangePoints:this.state.rangePoints,options:this.props.options,onChange:this._onRangeChange,maxPoints:this.props.rangesSize}))},_onRangeChange:function(e,n){var r=this.state;r.rangePoints[e]=n,r.remainingPoints=this.props.points-s(r.rangePoints),this.setState(r),this.props.onChange&&this.props.onChange(r)}});e.exports=a},function(n){n.exports=e},function(e,n,r){n=e.exports=r(3)(),n.push([e.id,"input[type=range]{-webkit-appearance:none;border:1px solid #fff;width:300px}input[type=range]::-webkit-slider-runnable-track{width:300px;height:5px;background:#ddd;border:none;border-radius:3px}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;border:none;height:16px;width:16px;border-radius:50%;background:goldenrod;margin-top:-4px}input[type=range]:focus{outline:none}input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}input[type=range]::-moz-range-track{width:300px;height:5px;background:#ddd;border:none;border-radius:3px}input[type=range]::-moz-range-thumb{border:none;height:16px;width:16px;border-radius:50%;background:goldenrod}input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}input[type=range]::-ms-track{width:300px;height:16px;background:#ddd;border:none;border-radius:10px;color:transparent}input[type=range]::-ms-fill-lower{outline:none;background:#777;border-radius:10px 0 0 10px}input[type=range]::-ms-thumb{border:none;height:16px;width:16px;border-radius:50%;background:goldenrod}input[type=range]:focus::-ms-track{background:#ccc}input[type=range]:focus::-ms-fill-lower{background:#888}",""])},function(e){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],n=0;n<this.length;n++){var r=this[n];e.push(r[2]?"@media "+r[2]+"{"+r[1]+"}":r[1])}return e.join("")},e}},function(e,n,r){var t=r(1),o=r(5),i=t.createClass({displayName:"Allocator",propTypes:{options:t.PropTypes.array.isRequired,remainingPoints:t.PropTypes.number.isRequired,maxPoints:t.PropTypes.number.isRequired,rangePoints:t.PropTypes.array.isRequired,onChange:t.PropTypes.func},render:function(){var e=this.props.options.map(function(e,n){return o({option:e,remainingPoints:this.props.remainingPoints,onChange:this.props.onChange,maxPoints:this.props.maxPoints,points:this.props.rangePoints[n],key:n})}.bind(this));return t.DOM.ul({className:"allocator"},e)}});e.exports=i},function(e,n,r){var t=r(1);r(9);var o=t.createClass({displayName:"Option",propTypes:{points:t.PropTypes.number,option:t.PropTypes.string.isRequired,remainingPoints:t.PropTypes.number,maxPoints:t.PropTypes.number.isRequired,onChange:t.PropTypes.func},render:function(){return t.DOM.li({className:"allocator-option"},t.DOM.header({className:"option-title"},this.props.option),t.DOM.span({className:"option-value"},this.props.points),t.DOM.input({className:"option-range",type:"range",min:"0",max:this.props.maxPoints,value:this.props.points,onChange:this._notifyChange}))},_notifyChange:function(e){var n=parseInt(e.currentTarget.value);n-this.props.points>this.props.remainingPoints&&(n=this.props.points+this.props.remainingPoints),this.props.onChange&&this.props.onChange(this.props.key,n)}});e.exports=o},function(e){var n=function(){Array.from||(Array.from=function(){var e=Object.prototype.toString,n=function(n){return"function"==typeof n||"[object Function]"===e.call(n)},r=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n},t=Math.pow(2,53)-1,o=function(e){var n=r(e);return Math.min(Math.max(n,0),t)};return function(e){var r=this,t=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var i,s=arguments.length>1?arguments[1]:void 0;if("undefined"!=typeof s){if(!n(s))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(i=arguments[2])}for(var a,p=o(t.length),u=n(r)?Object(new r(p)):new Array(p),d=0;p>d;)a=t[d],u[d]=s?"undefined"==typeof i?s(a,d):s.call(i,a,d):a,d+=1;return u.length=p,u}}())};e.exports=n},function(e){var n=function(e){return e.reduce(function(e,n){return e+n},0)};e.exports=n},function(e){function n(e){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(t(r.parts[s]))}else{for(var a=[],s=0;s<r.parts.length;s++)a.push(t(r.parts[s]));i[r.id]={id:r.id,refs:1,parts:a}}}}function r(e){for(var n=[],r={},t=0;t<e.length;t++){var o=e[t],i=o[0],s=o[1],a=o[2],p={css:s,media:a};r[i]?r[i].parts.push(p):n.push(r[i]={id:i,parts:[p]})}return n}function t(e){var n=document.createElement("style"),r=document.head||document.getElementsByTagName("head")[0];return n.type="text/css",r.appendChild(n),o(n,e),function(t){if(t){if(t.css===e.css&&t.media===e.media)return;o(n,e=t)}else r.removeChild(n)}}function o(e,n){var r=n.css,t=n.media;if(t&&e.setAttribute("media",t),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var i={};e.exports=function(e){var t=r(e);return n(t),function(e){for(var o=[],s=0;s<t.length;s++){var a=t[s],p=i[a.id];p.refs--,o.push(p)}if(e){var u=r(e);n(u)}for(var s=0;s<o.length;s++){var p=o[s];if(0===p.refs){for(var d=0;d<p.parts.length;d++)p.parts[d]();delete i[p.id]}}}}},function(e,n,r){var t=r(2);"string"==typeof t&&(t=[[e.id,t,""]]);r(8)(t)}])});