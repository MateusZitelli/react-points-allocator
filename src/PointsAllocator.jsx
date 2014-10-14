/**
* @jsx React.DOM
*/

'use strict';

var React = require('react');

var Allocator = require('./Allocator.jsx');
var arrayForm = require('../utils/arrayForm.js');
var sum = require('../utils/sum.js');

// Define Array.form in case of it isn't supported by the browser yet
arrayForm();

var PointsAllocator = React.createClass({
  propTypes: {
    points: React.PropTypes.number.isRequired,
    options: React.PropTypes.array.isRequired,
    pointsSuffix: React.PropTypes.string,
    rangesSize: React.PropTypes.number,
    initialRanges: React.PropTypes.array,
    hints: React.PropTypes.array,
    notNull: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },

  componentWillMount() {
    if(!this.props.rangesSize){
      this.props.rangesSize = this.props.points;
    }
  },

  getInitialState() {
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
        }, () => 0 );

      initialState.remainingPoints = this.props.points;
    }

    return initialState; 
  },

  render() {
    return (
      <div className="points-allocator">
        <div className="points">
          <header className="points-text">
            {this.state.remainingPoints}
            <span className="points-suffix">
              {this.props.pointsSuffix}
            </span>
          </header>
          <progress className="points-progress"
                    value={this.state.remainingPoints}
                    max={this.props.points} />
        </div>
        <Allocator remainingPoints={this.state.remainingPoints}
                   rangePoints={this.state.rangePoints}
                   options={this.props.options}
                   onChange={this._onRangeChange}
                   maxPoints={this.props.rangesSize}
                   hints={this.props.hints}
                   notNull={this.props.notNull} />
      </div>
    );
  },

  _onRangeChange(rangeKey, value) {
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
