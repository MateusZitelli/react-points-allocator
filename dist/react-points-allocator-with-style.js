(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["PointsAllocator"] = factory(require("react"));
	else
		root["PointsAllocator"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @jsx React.DOM
	*/

	'use strict';

	var React = __webpack_require__(1);

	var Allocator = __webpack_require__(2);
	var arrayForm = __webpack_require__(3);
	var sum = __webpack_require__(4);

	// Define Array.form in case of it isn't supported by the browser yet
	arrayForm();

	var PointsAllocator = React.createClass({displayName: 'PointsAllocator',
	  propTypes: {
	    points: React.PropTypes.number.isRequired,
	    options: React.PropTypes.array.isRequired,
	    rangesSize: React.PropTypes.number,
	    initialRanges: React.PropTypes.array,
	    onChange: React.PropTypes.func
	  },

	  componentWillMount:function() {
	    if(!this.props.rangesSize){
	      this.props.rangesSize = this.props.points;
	    }
	  },

	  getInitialState:function() {
	    var initialState = {};
	    var rangesSum;

	    if(!!this.props.initialRanges){
	      rangesSum = sum(this.props.initialRanges);

	      initialState.rangePoints = this.props.initialRanges;
	      initialState.remainingPoints = this.props.points - rangesSum; 
	    }else{
	      // Generate a Array of zeroes with size equal to the number of options
	      initialState.rangePoints = Array.from({
	          length: this.props.options.length
	        }, function()  {return 0;} );

	      initialState.remainingPoints = this.props.points;
	    }

	    return initialState; 
	  },

	  render:function() {
	    return (
	      React.DOM.div({className: "points-allocator"}, 
	        React.DOM.div({className: "points"}, 
	          React.DOM.header({className: "points-text"}, this.state.remainingPoints), 
	          React.DOM.progress({className: "points-progress", 
	                    value: this.state.remainingPoints, 
	                    max: this.props.points})
	        ), 
	        Allocator({remainingPoints: this.state.remainingPoints, 
	                   rangePoints: this.state.rangePoints, 
	                   options: this.props.options, 
	                   onChange: this._onRangeChange, 
	                   maxPoints: this.props.rangesSize})
	      )
	    );
	  },

	  _onRangeChange:function(rangeKey, value) {
	    var newState = this.state;

	    newState.rangePoints[rangeKey] = value;
	    newState.remainingPoints = this.props.points - sum(newState.rangePoints); 

	    this.setState(newState);

	    if(this.props.onChange){
	      this.props.onChange(newState);
	    }
	  }

	});

	module.exports = PointsAllocator;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */

	var React = __webpack_require__(1);

	var Option = __webpack_require__(5);

	var Allocator = React.createClass({displayName: 'Allocator',
	  propTypes: {
	    options: React.PropTypes.array.isRequired,
	    remainingPoints: React.PropTypes.number.isRequired,
	    maxPoints: React.PropTypes.number.isRequired,
	    rangePoints: React.PropTypes.array.isRequired,
	    onChange: React.PropTypes.func
	  },

	  render:function() {
	    var optionsDom = this.props.options.map(function(option, i)  
	      {return Option({option: option, 
	              remainingPoints: this.props.remainingPoints, 
	              onChange: this.props.onChange, 
	              maxPoints: this.props.maxPoints, 
	              points: this.props.rangePoints[i], 
	              key: i});}.bind(this)
	    );

	    return (
	      React.DOM.ul({className: "allocator"}, 
	        optionsDom
	      )
	    );
	  }

	});

	module.exports = Allocator;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
	var arrayForm = function(){
	  if (!Array.from) {
	    Array.from = (function () {
	      var toStr = Object.prototype.toString;
	      var isCallable = function (fn) {
	        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
	      };
	      var toInteger = function (value) {
	        var number = Number(value);
	        if (isNaN(number)) { return 0; }
	        if (number === 0 || !isFinite(number)) { return number; }
	        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	      };
	      var maxSafeInteger = Math.pow(2, 53) - 1;
	      var toLength = function (value) {
	        var len = toInteger(value);
	        return Math.min(Math.max(len, 0), maxSafeInteger);
	      };

	      // The length property of the from method is 1.
	      return function from(arrayLike/*, mapFn, thisArg */) {
	        // 1. Let C be the this value.
	        var C = this;

	        // 2. Let items be ToObject(arrayLike).
	        var items = Object(arrayLike);

	        // 3. ReturnIfAbrupt(items).
	        if (arrayLike == null) {
	          throw new TypeError("Array.from requires an array-like object - not null or undefined");
	        }

	        // 4. If mapfn is undefined, then let mapping be false.
	        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
	        var T;
	        if (typeof mapFn !== 'undefined') {
	          // 5. else      
	          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
	          if (!isCallable(mapFn)) {
	            throw new TypeError('Array.from: when provided, the second argument must be a function');
	          }

	          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
	          if (arguments.length > 2) {
	            T = arguments[2];
	          }
	        }

	        // 10. Let lenValue be Get(items, "length").
	        // 11. Let len be ToLength(lenValue).
	        var len = toLength(items.length);

	        // 13. If IsConstructor(C) is true, then
	        // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
	        // 14. a. Else, Let A be ArrayCreate(len).
	        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

	        // 16. Let k be 0.
	        var k = 0;
	        // 17. Repeat, while k < len… (also steps a - h)
	        var kValue;
	        while (k < len) {
	          kValue = items[k];
	          if (mapFn) {
	            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	          } else {
	            A[k] = kValue;
	          }
	          k += 1;
	        }
	        // 18. Let putStatus be Put(A, "length", len, true).
	        A.length = len;
	        // 20. Return A.
	        return A;
	      };
	    }());
	  }
	}

	module.exports = arrayForm;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var sum = function(array){
	  return array.reduce(function(prev, curr)  {return prev + curr;}, 0);
	};

	module.exports = sum;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */

	var React = __webpack_require__(1);

	if (true)
	  __webpack_require__(6);


	var Option = React.createClass({displayName: 'Option',
	  propTypes: {
	    points: React.PropTypes.number,
	    option: React.PropTypes.string.isRequired,
	    remainingPoints: React.PropTypes.number,
	    maxPoints: React.PropTypes.number.isRequired,
	    onChange: React.PropTypes.func
	  },

	  render:function() {
	    return (
	      React.DOM.li({className: "allocator-option"}, 
	        React.DOM.header({className: "option-title"}, this.props.option), 
	        React.DOM.span({className: "option-value"}, this.props.points), 
	        React.DOM.input({className: "option-range", type: "range", 
	               min: "0", 
	               max: this.props.maxPoints, 
	               value: this.props.points, 
	               onChange: this._notifyChange})
	      )
	    );
	  },

	  _notifyChange:function(e) {
	    var newPoints = parseInt(e.currentTarget.value);

	    // Don't let use more points that those that are available
	    if(newPoints - this.props.points > this.props.remainingPoints){
	      newPoints = this.props.points + this.props.remainingPoints;
	    }

	    if(this.props.onChange){
	      this.props.onChange(this.props.key, newPoints); 
	    }
	  }
	});

	module.exports = Option;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mateus/dev/react-components/react-points-alocator/node_modules/css-loader/index.js!/home/mateus/dev/react-components/react-points-alocator/src/Option.css", function() {
			var newContent = require("!!/home/mateus/dev/react-components/react-points-alocator/node_modules/css-loader/index.js!/home/mateus/dev/react-components/react-points-alocator/src/Option.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	exports.push([module.id, "input[type=range] {\n    /*removes default webkit styles*/\n    -webkit-appearance: none;\n    \n    /*fix for FF unable to apply focus style bug */\n    border: 1px solid white;\n    \n    /*required for proper track sizing in FF*/\n    width: 300px;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    width: 300px;\n    height: 5px;\n    background: #ddd;\n    border: none;\n    border-radius: 3px;\n}\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    border: none;\n    height: 16px;\n    width: 16px;\n    border-radius: 50%;\n    background: goldenrod;\n    margin-top: -4px;\n}\ninput[type=range]:focus {\n    outline: none;\n}\ninput[type=range]:focus::-webkit-slider-runnable-track {\n    background: #ccc;\n}\ninput[type=range]::-moz-range-track {\n    width: 300px;\n    height: 5px;\n    background: #ddd;\n    border: none;\n    border-radius: 3px;\n}\ninput[type=range]::-moz-range-thumb {\n    border: none;\n    height: 16px;\n    width: 16px;\n    border-radius: 50%;\n    background: goldenrod;\n}\n\n/*hide the outline behind the border*/\ninput[type=range]:-moz-focusring{\n    outline: 1px solid white;\n    outline-offset: -1px;\n}\ninput[type=range]::-ms-track {\n    width: 300px;\n    height: 16px;\n    background: #ddd;\n    border: none;\n    border-radius: 10px;\n    /*remove default tick marks*/\n    color: transparent;\n}\ninput[type=range]::-ms-fill-lower {\n    outline: none;\n    background: #777;\n    border-radius: 10px 0 0 10px;\n}\ninput[type=range]::-ms-thumb {\n    border: none;\n    height: 16px;\n    width: 16px;\n    border-radius: 50%;\n    background: goldenrod;\n}\ninput[type=range]:focus::-ms-track {\n    background: #ccc;\n}\ninput[type=range]:focus::-ms-fill-lower {\n    background: #888;\n}\n", ""]);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};

	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;

		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}

	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ])
});
