/**
 * @jsx React.DOM
 */

var React = require('react');

if (process.env.NODE_ENV !== 'test')
  require('./Option.css');


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
      <li className="allocator-option">
        <header className="option-title">{this.props.option}</header>
        <span className="option-value">{this.props.points}</span>
        <input className="option-range" type="range"
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

module.exports = Option;
