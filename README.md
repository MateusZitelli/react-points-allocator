#React PointsAllocator ![travis](https://travis-ci.org/MateusZitelli/react-points-allocator.svg?branch=master)

> Simple React.js component to distribute a limited number of points between options.

##Install

```sh
$ npm install react-points-allocator --save-dev
```

##Build

For a production version (minified): 
```sh
$ npm run build
```

Or for development (unminified and with source-maps):
```sh
$ npm run dev-build
```

##Usage
Generate an allocator like this:

![React PointsAllocator](http://i.imgur.com/0j93mc1.png)

Using the component with those propos:

```javascript
var PointsAllocator = require('react-points-allocator');

<PointsAllocator 
  // The total number of available points
  points={100}
  
  // The options texts
  options={['Study', 'Work', 'Sleep']} 
  
  // { Optional | Default: Array of zeroes }
  // Initial value of the range related with each option
  initialRanges={[40, 40, 0]}  
  
  // { Optional | Default: points }
  // The maximum value of the ranges
  rangesSize={50} /> 
```


