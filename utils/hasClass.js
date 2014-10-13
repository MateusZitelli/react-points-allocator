var rclass = /[\t\r\n\f]/g;

var hasClass = function(element, selector) {
  var className = " " + selector + " ";
  var i = 0;

  if (element.nodeType === 1 && (" " + element.className + " ")
    .replace(rclass, " ").indexOf(className) >= 0) {
    return true;
  }

  return false;
};

module.exports = hasClass;
