/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

var CodeManager = (function (CodeManager) {
  'use strict';

  // Imports
  var
    Instructions = CodeManager.Instructions.Instructions,
    simgleOp = CodeManager.Instructions.simgleOp,
    binaryOp = CodeManager.Instructions.binaryOp,
    ternaryOp = CodeManager.Instructions.ternaryOp,
    quaternaryOp = CodeManager.Instructions.quaternaryOp;

  function Disasembler (codeArray) {
    this.code = codeArray;
  }

  Disasembler.prototype.disasm = function (hideComments) {
    var code = this.code,
      pos = 0,
      len = code.length,
      opCode, opName,
      result = [],
      line = '';

    while (pos < len) {
      opCode = code[pos++];
      opName = Instructions[opCode];

      if (simgleOp.indexOf(opCode) !== -1) {
        var op1 = '0x' + code[pos++].toString(16);
        line = opName + ' ' + op1 + (!hideComments ? ' // 0x' + opCode.toString(16) + ' ' + op1 : '');
      } else if (binaryOp.indexOf(opCode) !== -1) {
        var op1 = '0x' + code[pos++].toString(16),
          op2 = '0x' + code[pos++].toString(16);

        line = opName + ' ' + op1 + ', ' + op2 +
        (!hideComments ? ' // 0x' + opCode.toString(16) + ' ' + op1 + ' ' + op2 : '');
      } else if (ternaryOp.indexOf(opCode) !== -1) {
      } else if (quaternaryOp.indexOf(opCode) !== -1) {
      } else {
        line = opName + (!hideComments ? ' // 0x' + opCode.toString(16) : '');
      }

      result.push(line);
    }

    return result.join('\r\n');
  };

  CodeManager.Disasembler = Disasembler;

  return CodeManager;
})(CodeManager || {});
