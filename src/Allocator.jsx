/**
 * @jsx React.DOM
 */

var React = require('react');

var Option = require('./Option.jsx');

var Allocator = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    remainingPoints: React.PropTypes.number.isRequired,
    maxPoints: React.PropTypes.number.isRequired,
    rangePoints: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func
  },

  render() {
    var optionsDom = this.props.options.map((option, i) => 
      <Option option={option}
              remainingPoints={this.props.remainingPoints}
              onChange={this.props.onChange}
              maxPoints={this.props.maxPoints}
              points={this.props.rangePoints[i]}
              key={i} />
    );

    return (
      <ul className="allocator">
        {optionsDom}
      </ul>
    );
  }

});

module.exports = Allocator;
