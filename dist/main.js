
      (function(modules) {
        function require(fileName) {
          const fn = modules[fileName];

          const module = { exports : {} };

          fn(require, module, module.exports);

          return module.exports;
        }

        require('/Users/ygm/Documents/my-code/simple-webpack/src/index.js');
      })({'/Users/ygm/Documents/my-code/simple-webpack/src/index.js': function(require, module, exports) { "use strict";

var _largeNumber = require("./large-number.js");

var _largeNumber2 = _interopRequireDefault(_largeNumber);

var _getStrNumber = require("./getStrNumber.js");

var _getStrNumber2 = _interopRequireDefault(_getStrNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s1 = (0, _getStrNumber2.default)();
var s2 = (0, _getStrNumber2.default)();

document.write(s1 + " + " + s2 + " = ", (0, _largeNumber2.default)(s1, s2)); },'./large-number.js': function(require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = add;

var _getStrNumber = require("./getStrNumber.js");

var _getStrNumber2 = _interopRequireDefault(_getStrNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * @name add
 * @description
 * 计算两个整数字符串相加
 * @param { string } a 整数字符串a
 * @param { string } b 整数字符串b
 * @return { string }
 */
function add(a, b) {
  var i = a.length - 1;
  var j = b.length - 1;
  var carry = 0;
  var ret = '';

  while (i >= 0 || j >= 0) {
    var x = 0;
    var y = 0;
    var sum = void 0;

    if (i >= 0) {
      x = a[i] - '0';
      i--;
    }

    if (j >= 0) {
      y = b[j] - '0';
      j--;
    }

    sum = x + y + carry;

    if (sum >= 10) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }

    ret = sum + ret;
  }

  if (carry) {
    ret = carry + ret;
  }

  return ret;
} },'./getStrNumber.js': function(require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getStrNumber = function getStrNumber() {
  return parseInt(Math.random() * 1000).toString();
};

exports.default = getStrNumber; },});
    