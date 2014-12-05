/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

var Utils = (function (Utils, undefided) {
  'use strict';

  var Helper = (function(undefined) {

    function is (obj, type, insensitive) {
      var className = Object.prototype.toString.call(obj).slice(8, -1);

      if (insensitive) {
        className = className.toLowerCase();
        type = type.toLowerCase();
      }

      return type ?
        (obj !== undefined && obj !== null
        && className === type) : className;
    }

    function isString (obj) {
      return is(obj, 'String');
    }

    function isNumber (obj) {
      return is(obj, 'Number');
    }

    function isObject (obj) {
      return is(obj, 'Object');
    }

    function isArray (obj) {
      return is(obj, 'Array');
    }

    function isFunction (obj) {
      return is(obj, 'Function');
    }

    return {
      is: is,
      isString : isString,
      isNumber : isNumber,
      isObject : isObject,
      isArray : isArray,
      isFunction : isFunction
    };
  })();

  Utils.Helper = Helper;

  return Utils;

})(Utils || {});
