/**
* @jsx React.DOM
*/

var Example = React.createClass({
  render: function(){
    return (
      <PointsAllocator points={100}
                       options={['Study', 'Work', 'Sleep']}
                       initialRanges={[40, 40, 0]}
                       rangesSize={50} />
    );
  }
});

React.renderComponent(
  <Example />,
  document.getElementById('container')
);
