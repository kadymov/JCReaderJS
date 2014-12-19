/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

function handleFileSelect(evt) {
  var 
    reader = new FileReader(),
    isCodeVizulalizer = !!document.getElementById('codeViz').checked;

  reader.onload = (function (theFile) {
    return function (e) {
      var
        buffer = e.target.result,
        classReader = new DataManager.ClassReader(buffer),
        result = classReader.readStructure(DataManager.ClassStructure), 
        vizualizer;

      vizualizer = isCodeVizulalizer ? new Vizualizers.CodeVizualizer(result) : new Vizualizers.TableVisualizer(result);
      document.getElementById('out').innerHTML = vizualizer.vizualize();
    };
  })(evt.target.files[0]);

  reader.readAsArrayBuffer(evt.target.files[0]);
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('file').addEventListener('change', handleFileSelect, false);
});
