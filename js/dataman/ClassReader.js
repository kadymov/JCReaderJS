/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

var DataManager = (function (DataManager, undefined) {
  'use strict';

  // Imports
  var
    DATA_TYPE = Utils.BinReader.DATA_TYPE,
    Helper = Utils.Helper;
  
  function ClassReader (buffer, debugMode) {
    this._binReader = new Utils.BinReader.Reader(buffer);
    this._debugMode = !!debugMode;
  }

  ClassReader.prototype.readStructure = function (structure, constant_pool) {
    var
      resultObj = {},
      binReader = this._binReader;

    for (var i = 0, len = structure.length; i < len; i++) {
      var el = structure[i],
        value = null;

      if (this.debugMode) console.debug('%cReading structure field %c"' + el.name +
        '"%c type is %c"' + DATA_TYPE[el.type] + '"',
        'color: #000', 'color: #080', 'color: #000', 'color: #080');

      switch (el.type) {
        case DATA_TYPE.int8 :
          value = binReader.getInt8();
          break;
        case DATA_TYPE.uInt8 :
          value = binReader.getUInt8();
          break;
        case DATA_TYPE.int16 :
          value = binReader.getInt16();
          break;
        case DATA_TYPE.uInt16 :
          value = binReader.getUInt16();
          break;
        case DATA_TYPE.int32 :
          value = binReader.getInt32();
          break;
        case DATA_TYPE.uInt32 :
          value = binReader.getUInt32();
          break;
        case DATA_TYPE.float32 :
          value = binReader.getFloat32();
          break;
        case DATA_TYPE.float64 :
          value = binReader.getFloat64();
          break;

        case DATA_TYPE.int8Array :
        case DATA_TYPE.uInt8Array :
        case DATA_TYPE.int16Array :
        case DATA_TYPE.uInt16Array :
        case DATA_TYPE.int32Array :
        case DATA_TYPE.uInt32Array :
        case DATA_TYPE.float32Array :
        case DATA_TYPE.float64Array :
          var arrayLen = Helper.isString(el.length) ? resultObj[el.length] : el.length;
          value = binReader.getArray(el.type, arrayLen);
          break;

        case DATA_TYPE.utf8String :
          var arrayLen = Helper.isString(el.length) ? resultObj[el.length] : el.length;
          value = binReader.getUtf8String(arrayLen);
          break;

        case DATA_TYPE.Custom :
          if (el.length) {
            var customLength = 0;
            value = [];

            if (Helper.isNumber(el.length)) {
              customLength = el.length;
            } else if (Helper.isString(el.length)) {
              customLength = resultObj[el.length];
              if (el.lengthCorrect) customLength += el.lengthCorrect;
            }

            for (var j = 0; j < customLength; j++) {
              var struc = Helper.isFunction(el.struc) ? el.struc(this._binReader, constant_pool) : el.struc;
              value.push(this.readStructure(struc, constant_pool));
            }

          } else {
            var struc = Helper.isFunction(el.struc) ? el.struc(this._binReader, constant_pool) : el.struc;
            value = this.readStructure(struc, constant_pool);
          }
          break;
      }

      resultObj[el.name] = value;
      if (el.name === 'constant_pool') constant_pool = value;
    }

    return resultObj;
  };

  DataManager.ClassReader = ClassReader;

  return DataManager;
})(DataManager || {});