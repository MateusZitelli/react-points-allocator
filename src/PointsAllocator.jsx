/**
* @jsx React.DOM
*/

'use strict';

var React = require('react');

var Allocator = require('./Allocator.jsx');

var PointsAllocator = React.createClass({
  propTypes: {
    points: React.PropTypes.number.isRequired,
    options: React.PropTypes.array.isRequired
  },
  render() {
    return (
      <div className="PointsAllocator">
        <div className="points">{this.props.points}</div>
        <Allocator points={this.props.points} options={this.props.options} />
      </div>
    );
  }
});

module.exports = PointsAllocator;
