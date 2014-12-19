/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/
var CodeManager = (function(CodeManager) {
    'use strict';

    // import
    var Constants = DataManager.Constants;

    function getFlags(flags, flagsEnum) {
      var result = [];

      for (var i in flagsEnum) {
        if (!flagsEnum.hasOwnProperty(i)) continue;

        if ((flags & flagsEnum[i]) !== 0) {
            result.push(i.toLowerCase().split('_')[1]);
        }
      }

      return result.join(' ');
    }

    function getParamType(param) {
      var 
        returnType = '',
        isArray = false;

      if (param.charAt(0) === '[') {
        isArray = true;
        param = param.substr(1);
      }

      if (param.length === 1) {
        switch (param.charAt(0)) {
          case 'Z':
            returnType = 'boolean';
            break;
          case 'B':
            returnType = 'byte';
            break;
          case 'C':
            returnType = 'char';
            break;
          case 'D':
            returnType = 'double';
            break;
          case 'F':
            returnType = 'float';
            break;
          case 'I':
            returnType = 'int';
            break;
          case 'J':
            returnType = 'long';
            break;
          case 'I':
            returnType = 'short';
            break;
          case 'V':
            returnType = 'void';
            break;
          default:
            returnType = param;
        }
      } else {
        if (param.charAt(0) === 'L') {
          returnType = param.replace(/\//g, '.').substr(1);
        } else {
          returnType = param.replace(/\//g, '.');
        }
      }
      return returnType + (isArray ? '[]' : '');
    }

    function getDescriptor(desc) {
      var 
        params = desc.match(/\([^\)]*/)[0].replace(/\(|\)/g, '').replace(/\//g, '.').replace(/;$/gm, '').split(';'),
        returnType = desc.replace(/\([^\)]*\)/, '').replace(';', '');
      
      return {
        retType: getParamType(returnType),
        params: params.map(function(el) {
          return getParamType(el);
        }).join(', ')
      };
    }

    function createCommentsLine(line, method, obj) {
      var 
        locVarOp = line.match(/\b(istore|iload)[_\s](\d+)/),
        constPool = obj.constant_pool;

      if (locVarOp) {
        var varId = parseInt(locVarOp[2]),
          localVars = method.attributes[0].attributes.filter(function(el) {
            return constPool[el.attribute_name_index - 1].bytes === 'LocalVariableTable';
          })[0];
        return ' // ' + locVarOp[1] + ' ' + constPool[localVars.line_number_table[varId].name_index - 1].bytes;
      }
      return '';
    }

    function addComments(code, method, obj) {
      return code.split(/\r\n|\n/).map(function(el) {
        return el + createCommentsLine(el, method, obj);
      }).join('\r\n');
    }

    function decompile(obj) {
      var 
        methods = obj.methods,
        constPool = obj.constant_pool,
        thisClassIndex = constPool[obj.this_class - 1].name_index,
        thisClass = constPool[thisClassIndex - 1].bytes.replace(/\//g, '.'),
        fields = obj.fields,
        codeBlock = [];

      methods.forEach(function(el) {
        var 
          codeData = el.attributes && el.attributes[0] && el.attributes[0].code,
          disasembler,
          name = '',
          code = '',
          methodDesc,
          accessFlags = '';

        if (codeData) {
          disasembler = new CodeManager.Disasembler(codeData);
          code = disasembler.disasm(true);
          accessFlags = getFlags(el.access_flags, Constants.MethodsAccessFlags);
          name = constPool[el.name_index - 1].bytes;
          methodDesc = getDescriptor(constPool[el.descriptor_index - 1].bytes);
          code = addComments(code, el, obj);
          codeBlock.push(accessFlags + ' ' + methodDesc.retType + ' ' + name + '(' + methodDesc.params + ') { \r\n' + code + '\r\n}');
        }
      });

      var fieldsStr = fields.map(function(el) {
          var 
            fieldFlag = getFlags(el.access_flags, Constants.FildsAccessFlags),
            fieldName = constPool[el.name_index - 1].bytes,
            fieldDescr = constPool[el.descriptor_index - 1].bytes.replace(/\//g, '.').replace(';', '');
          return fieldFlag + ' ' + fieldDescr + ' ' + fieldName + ';';
      }).join('\r\n');
      
      return 'class ' + thisClass + ' { \r\n\r\n' + fieldsStr + '\r\n\r\n' + codeBlock.join('\r\n\r\n') + '\r\n}';
    }

    CodeManager.decompile = decompile;

    return CodeManager;
})(CodeManager || {});