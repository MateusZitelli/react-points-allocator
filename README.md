#React PointsAllocator

> Simple React.js component to distribute a limited number of points between options.

##Usage
Generate an allocator like this:

![React PointsAllocator](http://i.imgur.com/0j93mc1.png)

Using the component with those propos:

```javascript
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


