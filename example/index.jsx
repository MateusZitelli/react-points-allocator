/**
* @jsx React.DOM
*/

var Example = React.createClass({
  render: function(){
    return (
      <div>
        <PointsAllocator points={100}
                         initialRanges={[50, 50, 0]}
                         rangesSize={50}
                         options={['Study', 'Work', 'Sleep']} />
      </div>
    );
  }
});

React.renderComponent(
  <Example />,
  document.getElementById('container')
);
