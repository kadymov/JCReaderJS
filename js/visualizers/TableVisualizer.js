var Vizualizers = (function (Vizualizers, undefined) {
  'use strict';

  // Import
  var
    Helper = Utils.Helper,
    Constants = DataManager.Constants;

  function TableVisualizer (obj) {
    this._objRoot = obj;
  }

  function setLines(code) {
    return '<ul class="code">' + code.replace(/^(.+)$/gm, '<li>$&</li>') + '</ul>';
  }

  function codeHilight(code) {
    code = code.replace(/(\/\/.+)/g, '<span class="comment">$1</span>');
    code = code.replace(/(0x[\dabcdef]+)/gi, '<span class="number">$1</span>');
    return code;
  }

  TableVisualizer.prototype.getDescription = function (name, value) {
    var pool = this._objRoot.constant_pool;

    switch (name) {
      case 'code' :
        var disasembler = new CodeManager.Disasembler(value),
          code = disasembler.disasm();

        code = setLines(code);
        code = codeHilight(code);

        return '<span class="code-title">Code:</span>' + code;
      case 'tag' :
        return '<span class="descr">' + Constants.ConstantClass[value] + '</span>';
      case 'attribute_name_index' :
      case 'descriptor_index' :
      case 'sourcefile_index' :
      case 'name_index' :
        return '<span class="descr">' + pool[value - 1].bytes + '</span>';
      case 'name_and_type_index' :
        var res = this._objRoot.constant_pool[value - 1];
        return '<span class="descr">' + pool[res.name_index - 1].bytes + ' ' +
          pool[res.descriptor_index - 1].bytes + '</span>';
      default :
        return '';
    }
  };

  TableVisualizer.prototype._vizualize = function (obj) {
    var table = '<table>';

    for (var name in obj) {
      if (!obj.hasOwnProperty(name))
        continue;

      var value = obj[name], descr = this.getDescription(name, value);

      value = Helper.isObject(value) || Helper.isArray(value) ? this._vizualize(value) : value;
      value = Helper.isNumber(value) ? '0x' + value.toString(16) : value;

      table += '<tr><td class="param-name">' + name + '</td><td>' + value + descr + '</td><tr>';
    }

    return table + '</table>';
  }

  TableVisualizer.prototype.vizualize = function (obj) {
    return this._vizualize(this._objRoot);
  };

  Vizualizers.TableVisualizer = TableVisualizer;

  return Vizualizers;
})(Vizualizers || {});
