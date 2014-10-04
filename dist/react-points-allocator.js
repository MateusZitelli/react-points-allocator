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
/*!*********************************!*\
  !*** ./src/PointsAllocator.jsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	* @jsx React.DOM
	*/
	
	'use strict';
	
	var React = __webpack_require__(/*! react */ 1);
	
	var Allocator = __webpack_require__(/*! ./Allocator.jsx */ 2);
	var arrayForm = __webpack_require__(/*! ../utils/arrayForm.js */ 3);
	var sum = __webpack_require__(/*! ../utils/sum.js */ 4);
	
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
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs":"react","commonjs2":"react","amd":"react"} ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/*!***************************!*\
  !*** ./src/Allocator.jsx ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	
	var React = __webpack_require__(/*! react */ 1);
	
	var Option = __webpack_require__(/*! ./Option.jsx */ 5);
	
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
/*!****************************!*\
  !*** ./utils/arrayForm.js ***!
  \****************************/
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
/*!**********************!*\
  !*** ./utils/sum.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	var sum = function(array){
	  return array.reduce(function(prev, curr)  {return prev + curr;}, 0);
	};
	
	module.exports = sum;


/***/ },
/* 5 */
/*!************************!*\
  !*** ./src/Option.jsx ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	
	var React = __webpack_require__(/*! react */ 1);
	
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


/***/ }
/******/ ])
});

//# sourceMappingURL=react-points-allocator.js.map