/**
 * @jsx React.DOM
 */

var React = require('react');

var Allocator = React.createClass({
  propTypes: {
    options: React.PropTypes.array
  },

  render() {
    var optionsDom = this.props.options.map((option, i) => (
      <li className="option" key={i}>
        <h2>{option}</h2>
        <input type="range" min="0" max={this.props.points}></input>
      </li>
    ));

    return (
      <ul className="allocator">
        {optionsDom}
      </ul>
    );
  }

});

module.exports = Allocator;
