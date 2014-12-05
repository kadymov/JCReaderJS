/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

var Utils = (function(Utils, unefined) {
  'use strict';

  var BinReader = (function(undefined) {
    var DATA_TYPE = (function() {
      var DataType = [];

      DataType[DataType['int8'] = 0] = 'int8';
      DataType[DataType['uInt8'] = 1] = 'uInt8';
      DataType[DataType['int16'] = 2] = 'int16';
      DataType[DataType['uInt16'] = 3] = 'uInt16';
      DataType[DataType['int32'] = 4] = 'int32';
      DataType[DataType['uInt32'] = 5] = 'uInt32';
      DataType[DataType['float32'] = 6] = 'float32';
      DataType[DataType['float64'] = 7] = 'float64';

      DataType[DataType['int8Array'] = 8] = 'int8Array';
      DataType[DataType['uInt8Array'] = 9] = 'uInt8Array';
      DataType[DataType['int16Array'] = 10] = 'int16Array';
      DataType[DataType['uInt16Array'] = 11] = 'uInt16Array';
      DataType[DataType['int32Array'] = 12] = 'int32Array';
      DataType[DataType['uInt32Array'] = 13] = 'uInt32Array';
      DataType[DataType['float32Array'] = 14] = 'float32Array';
      DataType[DataType['float64Array'] = 15] = 'float64Array';

      DataType[DataType['utf8char'] = 16] = 'utf8char';
      DataType[DataType['utf8String'] = 17] = 'utf8String';

      DataType[DataType['Custom'] = 18] = 'Custom';

      return DataType;
    })();


    var Reader = (function() {
      function Reader (reader) {
        this.offset = 0;
        this.dataView = new DataView(reader);
      }

      Reader.prototype.getOffset = function() {
        return this.offset;
      };

      Reader.prototype.setOffset = function(offset) {
        this.offset = offset;
      };

      Reader.prototype.incOffset = function(amount) {
        if (amount === undefined) {
          amount = 1;
        }
        this.offset += amount;
      };

      Reader.prototype.getUtf8Char = function() {
        var byte = this.dataView.getUint8(this.offset);
        this.incOffset(1);
        return String.fromCharCode(byte);
      };

      Reader.prototype.getInt8 = function() {
        var result = this.dataView.getInt8(this.offset);
        this.incOffset(1);
        return result;
      };

      Reader.prototype.getUInt8 = function() {
        var result = this.dataView.getUint8(this.offset);
        this.incOffset(1);
        return result;
      };

      Reader.prototype.getInt16 = function() {
        var result = this.dataView.getInt16(this.offset);
        this.incOffset(2);
        return result;
      };

      Reader.prototype.getUInt16 = function() {
        var result = this.dataView.getUint16(this.offset);
        this.incOffset(2);
        return result;
      };

      Reader.prototype.getInt32 = function() {
        var result = this.dataView.getInt32(this.offset);
        this.incOffset(4);
        return result;
      };

      Reader.prototype.getUInt32 = function() {
        var result = this.dataView.getUint32(this.offset);
        this.incOffset(4);
        return result;
      };

      Reader.prototype.getFloat32 = function() {
        var result = this.dataView.getFloat32(this.offset);
        this.incOffset(4);
        return result;
      };

      Reader.prototype.getFloat64 = function() {
        var result = this.dataView.getFloat64(this.offset);
        this.incOffset(8);
        return result;
      };

      Reader.prototype.getArray = function(type, length) {
        var readerFunc, result = [];

        switch (type) {
          case DATA_TYPE.utf8char:
            readerFunc = this.getUtf8Char;
            break;
          case DATA_TYPE.int8Array:
            readerFunc = this.getInt8;
            break;
          case DATA_TYPE.uInt8Array:
            readerFunc = this.getUInt8;
            break;
          case DATA_TYPE.int16Array:
            readerFunc = this.getInt16;
            break;
          case DATA_TYPE.uInt16Array:
            readerFunc = this.getUInt16;
            break;
          case DATA_TYPE.int32Array:
            readerFunc = this.getInt32;
            break;
          case DATA_TYPE.uInt32Array:
            readerFunc = this.getUInt32;
            break;
          case float32Array:
            readerFunc = this.getFloat32;
            break;
          case DATA_TYPE.float64Array:
            readerFunc = this.getFloat64;
            break;
          default:
            return null;
        }

        for (var i = 0; i < length; i++) {
          result.push(readerFunc.call(this));
        }

        return result;
      };

      Reader.prototype.getUtf8String = function(length) {
        var byteArray = this.getArray(DATA_TYPE.utf8char, length);
        return byteArray.join('');
      };

      return Reader;
    })();

    return {
      Reader: Reader,
      DATA_TYPE: DATA_TYPE
    }
  })();

  Utils.BinReader = BinReader;

  return Utils;

})(Utils || {});
