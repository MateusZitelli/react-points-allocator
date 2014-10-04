/**
 * @jsx React.DOM
 */

var React = require('react');

var Option = React.createClass({
  propTypes: {
    points: React.PropTypes.number,
    option: React.PropTypes.string.isRequired,
    remainingPoints: React.PropTypes.number,
    maxPoints: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func
  },

  render() {
    return (
      <li className="option">
        <h2>{this.props.option}</h2>
        <input type="range"
               min="0"
               max={this.props.maxPoints}
               value={this.props.points}
               onChange={this._notifyChange} />
      </li>
    );
  },

  _notifyChange(e) {
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
