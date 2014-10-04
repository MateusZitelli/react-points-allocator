var sum = function(array){
  return array.reduce((prev, curr) => prev + curr, 0);
};

module.exports = sum;
