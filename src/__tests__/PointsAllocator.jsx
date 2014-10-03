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

  // it('not be renderable without the required props', () => {
  //   expect(() => {
  //     TestUtils.renderIntoDocument(<PointsAllocator />);
  //   }).toThrow();
  // });

  it('be renderable when the props are passed correctly', () => {
    var instance = TestUtils
      .renderIntoDocument(<PointsAllocator
                            points={10}
                            options={['Q1','Q2']} />);
    expect(TestUtils.isCompositeComponent(instance)).toBe(true);
  });

  it('show the correct number of available points', () => {
    var instance = TestUtils
      .renderIntoDocument(<PointsAllocator points={10} options={[]} />);

    var points = TestUtils
      .findRenderedDOMComponentWithClass(instance, 'points');

    expect(points.getDOMNode().textContent).toBe('10');
  });

  it('render all the options inside the Allocator', () => {
    var options = ['Q1', 'Q2'];
    var instance = TestUtils
      .renderIntoDocument(<PointsAllocator
                            points={10}
                            options={options} />);
    var allocatorDomNode = TestUtils
      .findRenderedDOMComponentWithClass(instance, 'allocator').getDOMNode(); 

    for(var index in options){
      expect(allocatorDomNode.textContent)
        .toContain(options[index]);
    }
  });
});
