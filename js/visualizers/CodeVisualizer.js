/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

var Vizualizers = (function (Vizualizers) {
  'use strict';

  function addTabs(text) {
    var 
      depth = 0,
      tab = '&nbsp;&nbsp;&nbsp;&nbsp ';

      function crTabs(count) {
        var res = '';
        for (var i = 0; i < count; i++) {
          res += tab;
        }

        return res;
      }

      var result = text.split('\n').map(function(el) {
        var 
          res,
          op = el.match(/{/g),
          cl = el.match(/}/g),
          opCount = op ? op.length : 0,
          clCount = cl ? cl.length : 0;

        depth -= clCount;
        res = crTabs(depth) + el
        depth += opCount;

        return res;
      });

      return result.join('\n');
  }

  function setLines(code) {
    return '<ul class="code">' + code.replace(/^(.+)$/gm, '<li>$&</li>') + '</ul>';
  }

  function format(code) {
    code = addTabs(code);

    code = code.replace(/\b(class|public|private|protected|static|final|synchronized|native|abstract|strict|boolean|byte|char|double|float|int|long|short|void)\b/g,
      '<span class="keyword">$1</span>');

    return code;
  }

  function codeHilight(code) {
    code = code.replace(/(\/\/.+)/g, '<span class="comment">$1</span>');
    code = code.replace(/(0x[\dabcdef]+)/gi, '<span class="number">$1</span>');
    return code;
  }


  function CodeVizualizer(obj) {
    this._objRoot = obj;
  }

  CodeVizualizer.prototype.vizualize = function (obj) {
    obj = obj || this._objRoot;

    var code = CodeManager.decompile(obj);

    code = format(code);
    code = setLines(code);
    code = codeHilight(code);

    return code;
  };


  Vizualizers.CodeVizualizer = CodeVizualizer;

  return Vizualizers;
})(Vizualizers || {});
