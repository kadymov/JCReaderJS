/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

var DataManager = (function (DataManager, undefined) {
  'use strict';

  var ConstAccessFlags = (function (ConstAccessFlags) {
    ConstAccessFlags[ConstAccessFlags['ACC_PUBLIC'] = 0x0001] = 'ACC_PUBLIC';
    ConstAccessFlags[ConstAccessFlags['ACC_FINAL'] = 0x0010] = 'ACC_FINAL';
    ConstAccessFlags[ConstAccessFlags['ACC_SUPER'] = 0x0020] = 'ACC_SUPER';
    ConstAccessFlags[ConstAccessFlags['ACC_INTERFACE'] = 0x0200] = 'ACC_INTERFACE';
    ConstAccessFlags[ConstAccessFlags['ACC_ABSTRACT'] = 0x0400] = 'ACC_ABSTRACT';
    return ConstAccessFlags;
  })({});

  var ConstantClass = (function (ConstantClass) {
    ConstantClass[ConstantClass['CONSTANT_Class'] = 7] = 'CONSTANT_Class';
    ConstantClass[ConstantClass['CONSTANT_Fieldref'] = 9] = 'CONSTANT_Fieldref';
    ConstantClass[ConstantClass['CONSTANT_Methodref'] = 10] = 'CONSTANT_Methodref';
    ConstantClass[ConstantClass['CONSTANT_InterfaceMethodref'] = 11] = 'CONSTANT_InterfaceMethodref';
    ConstantClass[ConstantClass['CONSTANT_String'] = 8] = 'CONSTANT_String';
    ConstantClass[ConstantClass['CONSTANT_Integer'] = 3] = 'CONSTANT_Integer';
    ConstantClass[ConstantClass['CONSTANT_Float'] = 4] = 'CONSTANT_Float';
    ConstantClass[ConstantClass['CONSTANT_Long'] = 5] = 'CONSTANT_Long';
    ConstantClass[ConstantClass['CONSTANT_Double'] = 6] = 'CONSTANT_Double';
    ConstantClass[ConstantClass['CONSTANT_NameAndType'] = 12] = 'CONSTANT_NameAndType';
    ConstantClass[ConstantClass['CONSTANT_Utf8'] = 1] = 'CONSTANT_Utf8';
    return ConstantClass;
  })({});

  var FildsAccessFlags = (function (FildsAccessFlags) {
    FildsAccessFlags[FildsAccessFlags['ACC_PUBLIC'] = 0x0001] = 'ACC_PUBLIC';
    FildsAccessFlags[FildsAccessFlags['ACC_PRIVATE'] = 0x0002] = 'ACC_PRIVATE';
    FildsAccessFlags[FildsAccessFlags['ACC_PROTECTED'] = 0x0004] = 'ACC_PROTECTED';
    FildsAccessFlags[FildsAccessFlags['ACC_STATIC'] = 0x0008] = 'ACC_STATIC';
    FildsAccessFlags[FildsAccessFlags['ACC_FINAL'] = 0x0010] = 'ACC_FINAL';
    FildsAccessFlags[FildsAccessFlags['ACC_VOLATILE'] = 0x0040] = 'ACC_VOLATILE';
    FildsAccessFlags[FildsAccessFlags['ACC_TRANSIENT'] = 0x0080] = 'ACC_TRANSIENT';
    return FildsAccessFlags;
  })({});

  var MethodsAccessFlags = (function (MethodsAccessFlags) {
    MethodsAccessFlags[MethodsAccessFlags['ACC_PUBLIC'] = 0x0001] = 'ACC_PUBLIC';
    MethodsAccessFlags[MethodsAccessFlags['ACC_PRIVATE'] = 0x0002] = 'ACC_PRIVATE';
    MethodsAccessFlags[MethodsAccessFlags['ACC_PROTECTED'] = 0x0004] = 'ACC_PROTECTED';
    MethodsAccessFlags[MethodsAccessFlags['ACC_STATIC'] = 0x0008] = 'ACC_STATIC';
    MethodsAccessFlags[MethodsAccessFlags['ACC_FINAL'] = 0x0010] = 'ACC_FINAL';
    MethodsAccessFlags[MethodsAccessFlags['ACC_SYNCHRONIZED'] = 0x0020] = 'ACC_SYNCHRONIZED';
    MethodsAccessFlags[MethodsAccessFlags['ACC_NATIVE'] = 0x0100] = 'ACC_NATIVE';
    MethodsAccessFlags[MethodsAccessFlags['ACC_ABSTRACT'] = 0x0400] = 'ACC_ABSTRACT';
    MethodsAccessFlags[MethodsAccessFlags['ACC_STRICT'] = 0x0800] = 'ACC_STRICT';
    return MethodsAccessFlags;
  })({});

  DataManager.Constants = {
    ConstAccessFlags : ConstAccessFlags,
    ConstantClass : ConstantClass,
    FildsAccessFlags : FildsAccessFlags,
    MethodsAccessFlags : MethodsAccessFlags
  };

  return DataManager;

})(DataManager || {});
