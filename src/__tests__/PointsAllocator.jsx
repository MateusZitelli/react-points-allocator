/**
 * @jsx React.DOM
 */

'use strict';

jest.autoMockOff();

describe('PointsAllocator', () => {
  var React;
  var TestUtils;
  var PointsAllocator;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    PointsAllocator = require('../PointsAllocator.jsx');
  });

  it('be requirable', () => {
    expect(!!PointsAllocator).toBe(true);
  });

  it('be renderable when the props are passed correctly', () => {
    var instance = TestUtils
      .renderIntoDocument(<PointsAllocator
                            points={10}
                            options={['Q1','Q2']} />);
    expect(TestUtils.isCompositeComponent(instance)).toBe(true);
  });

  it('show the correct number of available points correctly', () => {

    // Instance with no points used
    var instanceEmpty = TestUtils
      .renderIntoDocument(<PointsAllocator points={10}
                                           options={[]} />);

    // Instance with 5 points used in one option 
    var instanceFilled = TestUtils
      .renderIntoDocument(<PointsAllocator points={10}
                                           options={['Q']}
                                           initialRanges={[5]}/>);

    var pointsEmpty = TestUtils
      .findRenderedDOMComponentWithClass(instanceEmpty, 'points-text');
    var pointsFilled = TestUtils
      .findRenderedDOMComponentWithClass(instanceFilled, 'points-text');

    expect(pointsEmpty.getDOMNode().textContent).toBe('10');
    expect(pointsFilled.getDOMNode().textContent).toBe('5');
  });

  it('render all the options inside the Allocator', () => {
    var options = ['Q1', 'Q2'];
    var instance = TestUtils
      .renderIntoDocument(<PointsAllocator
                            points={10}
                            options={options} />);

    var allocatorDOMNode = TestUtils
      .findRenderedDOMComponentWithClass(instance, 'allocator').getDOMNode(); 

    for(var index in options){
      expect(allocatorDOMNode.textContent)
        .toContain(options[index]);
    }
  });

 
  it('handle range changes when callback is passed', () => {
    var fn = jest.genMockFunction();
    var instance = TestUtils
      .renderIntoDocument(<PointsAllocator
                            points={10}
                            options={['Q']}
                            onChange={fn} />);

    var range = instance.getDOMNode()
      .getElementsByClassName('option-range')[0];

    TestUtils.Simulate.change(range); 

    expect(fn).toBeCalled();
    expect(fn).toBeCalledWith({ remainingPoints: 10, rangePoints: [0] });
  });

  it('define correctly the rangesSizes', () => {
    var instance = TestUtils
      .renderIntoDocument(<PointsAllocator
                            points={10}
                            options={['Q']}
                            rangesSize={5} />);
    var range = instance.getDOMNode()
      .getElementsByClassName('option-range')[0];
    expect(range.getAttribute('max')).toBe('5');
  });

  it('loads the ranges with based on the initialRanges correctly', () => {
    var range;
    var initialRanges = [10, 20, 30];

    var instance = TestUtils
      .renderIntoDocument(<PointsAllocator points={60}
                                           options={['Q1', 'Q2', 'Q3']}
                                           initialRanges={initialRanges} />);

    var rangesDOMNodes = instance.getDOMNode()
      .getElementsByClassName('option-range');


    for(var index = 0; index < rangesDOMNodes.length; index++){
      range = rangesDOMNodes[index];
      expect(parseInt(range.value)).toBe(initialRanges[index]);
    }
  });
});
