/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

var DataManager = (function (DataManager, undefined) {
  'use strict';

  var ClassStructure = (function (undefined) {

    // Imports
    var
      DATA_TYPE = Utils.BinReader.DATA_TYPE,
      ConstantClass = DataManager.Constants.ConstantClass;


    /*                      Constant Pool (cp_info)
     ******************************************************************************/

    function cp_info (binReader)  {
      var
        tag = binReader.getUInt8(),
        consClassStr = ConstantClass[tag],
        structure = null;

      binReader.incOffset(-1);

      switch (ConstantClass[consClassStr]) {
        case ConstantClass.CONSTANT_Class :
          structure = CONSTANT_Class_info;
          break;
        case ConstantClass.CONSTANT_Fieldref :
        case ConstantClass.CONSTANT_Methodref :
        case ConstantClass.CONSTANT_InterfaceMethodref :
          structure = CONSTANT_Fieldref_info;
          break;
        case ConstantClass.CONSTANT_String :
          structure = CONSTANT_String_info;
          break;
        case ConstantClass.CONSTANT_Integer :
        case ConstantClass.CONSTANT_Float :
          structure = CONSTANT_Integer_info;
          break;
        case ConstantClass.CONSTANT_Long :
        case ConstantClass.CONSTANT_Double :
          structure = CONSTANT_Long_info;
          break;
        case ConstantClass.CONSTANT_NameAndType :
          structure = CONSTANT_NameAndType_info;
          break;
        case ConstantClass.CONSTANT_Utf8 :
          structure = CONSTANT_Utf8_info;
          break;
        default :
          throw new Error('Tag is not defined, tag = ' + tag);
      }

      return structure;
    }

    var CONSTANT_Class_info = [
      {name : 'tag',                      type : DATA_TYPE.uInt8 },
      {name : 'name_index',               type : DATA_TYPE.uInt16 }
    ];


    var
      CONSTANT_Fieldref_info,
      CONSTANT_Methodref_info,
      CONSTANT_InterfaceMethodref_info;

    CONSTANT_Fieldref_info = CONSTANT_Methodref_info = CONSTANT_InterfaceMethodref_info = [
      {name : 'tag',                      type : DATA_TYPE.uInt8 },
      {name : 'class_index',              type : DATA_TYPE.uInt16 },
      {name : 'name_and_type_index',      type : DATA_TYPE.uInt16 }
    ];


    var CONSTANT_String_info = [
      {name : 'tag',                      type : DATA_TYPE.uInt8 },
      {name : 'string_index',             type : DATA_TYPE.uInt16 }
    ];


    var CONSTANT_Integer_info,
      CONSTANT_Float_info;

    CONSTANT_Integer_info = CONSTANT_Float_info = [
      {name : 'tag',                      type : DATA_TYPE.uInt8 },
      {name : 'bytes',                    type : DATA_TYPE.uInt32 }
    ];


    var
      CONSTANT_Long_info,
      CONSTANT_Double_info;

    CONSTANT_Long_info = CONSTANT_Double_info = [
      {name : 'tag',                      type : DATA_TYPE.uInt8 },
      {name : 'high_bytes',               type : DATA_TYPE.uInt32 },
      {name : 'low_bytes',                type : DATA_TYPE.uInt32 }
    ];

    var CONSTANT_NameAndType_info = [
      {name : 'tag',                      type : DATA_TYPE.uInt8 },
      {name : 'name_index',               type : DATA_TYPE.uInt16 },
      {name : 'descriptor_index',         type : DATA_TYPE.uInt16 }
    ];

    var CONSTANT_Utf8_info = [
      {name : 'tag',                      type : DATA_TYPE.uInt8 },
      {name : 'length',                   type : DATA_TYPE.uInt16 },
      {
        name    : 'bytes',
        type    : DATA_TYPE.utf8String,
        length  : 'length'
      }
    ];


    /*                          Fields (field_info)
     ******************************************************************************/

    var field_info = [
      { name : 'access_flags',            type : DATA_TYPE.uInt16 },
      { name : 'name_index',              type : DATA_TYPE.uInt16 },
      { name : 'descriptor_index',        type : DATA_TYPE.uInt16 },

      { name : 'attributes_count',        type : DATA_TYPE.uInt16 },
      {
        name    : 'attributes',
        type    : DATA_TYPE.Custom,
        struc   : attribute_info,
        length  : 'attributes_count'
      }
    ];

    /*                          Methods (field_info)
     ******************************************************************************/
    var method_info = [
      { name : 'access_flags',            type : DATA_TYPE.uInt16 },
      { name : 'name_index',              type : DATA_TYPE.uInt16 },
      { name : 'descriptor_index',        type : DATA_TYPE.uInt16 },
      { name : 'attributes_count',        type : DATA_TYPE.uInt16 },
      {
        name    : 'attributes',
        type    : DATA_TYPE.Custom,
        struc   : attribute_info,
        length  : 'attributes_count'
      }
    ];

    /*                     Attribute info (attribute_info)
     ******************************************************************************/

    function attribute_info(binReader, constantPool) {
      var id = binReader.getUInt16() - 1,
        attrClass = constantPool[id].bytes,
        structure = null;

      binReader.incOffset(-2);

      switch (attrClass) {
        case 'ConstantValue' :
          structure = ConstantValue_attribute;
          break;
        case 'Code' :
          structure = Code_attribute;
          break;
        case 'Exceptions' :
          structure = Exceptions_attribute;
          break;
        case 'InnerClasses' :
          structure = InnerClasses_attribute;
          break;
        case 'Synthetic' :
          structure = Synthetic_attribute;
          break;
        case 'SourceFile' :
          structure = SourceFile_attribute;
          break;
        case 'LineNumberTable' :
          structure = LineNumberTable_attribute;
          break;
        case 'LocalVariableTable' :
          structure = LocalVariableTable_attribute;
          break;
        case 'Deprecated' :
          structure = Deprecated_attribute;
          break;
        default :
          structure = Default_attribute;
      }

      return structure;
    }

    var Default_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 },
      {
        name    : 'info',
        type    : DATA_TYPE.uInt8Array,
        length  : 'attribute_length'
      }
    ];

    var ConstantValue_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 },
      { name : 'constantvalue_index',     type : DATA_TYPE.uInt16 }
    ];

    var Code_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 },
      { name : 'max_stack',               type : DATA_TYPE.uInt16 },
      { name : 'max_locals',              type : DATA_TYPE.uInt16 },

      { name : 'code_length',             type : DATA_TYPE.uInt32 },
      {
        name : 'code',
        type : DATA_TYPE.uInt8Array,
        length : 'code_length'
      },

      { name : 'exception_table_length',  type : DATA_TYPE.uInt16 },
      {
        name    : 'exception_table',
        type    : DATA_TYPE.Custom,
        struc   : [
          { name : 'start_pc',                type : DATA_TYPE.uInt16 },
          { name : 'end_pc',                  type : DATA_TYPE.uInt16 },
          { name : 'handler_pc',              type : DATA_TYPE.uInt16 },
          { name : 'catch_type',              type : DATA_TYPE.uInt16 }
        ],
        length  : 'exception_table_length'
      },

      { name : 'attributes_count',        type : DATA_TYPE.uInt16 },
      {
        name    : 'attributes',
        type    : DATA_TYPE.Custom,
        struc   : attribute_info,
        length  : 'attributes_count'
      }
    ];

    var Exceptions_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 },
      { name : 'number_of_exceptions',    type : DATA_TYPE.uInt16 },
      {
        name : 'exception_index_table',
        type : DATA_TYPE.uInt16Array,
        length : 'number_of_exceptions'
      }
    ];

    var InnerClasses_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 },

      { name : 'number_of_classes',       type : DATA_TYPE.uInt16 },
      {
        name    : 'classes',
        type    : DATA_TYPE.Custom,
        struc   : [
          { name : 'inner_class_info_index',      type : DATA_TYPE.uInt16 },
          { name : 'outer_class_info_index',      type : DATA_TYPE.uInt16 },
          { name : 'inner_name_index',            type : DATA_TYPE.uInt16 },
          { name : 'inner_class_access_flags',    type : DATA_TYPE.uInt16 }
        ],
        length  : 'number_of_classes'
      }
    ];

    var Synthetic_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 }
    ];

    var SourceFile_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 },
      { name : 'sourcefile_index',        type : DATA_TYPE.uInt16 },
    ];

    var LineNumberTable_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 },

      { name : 'line_number_table_length',type : DATA_TYPE.uInt16 },
      {
        name    : 'line_number_table',
        type    : DATA_TYPE.Custom,
        struc   : [
          { name : 'start_pc',      type : DATA_TYPE.uInt16 },
          { name : 'line_number',      type : DATA_TYPE.uInt16 }
        ],
        length  : 'line_number_table_length'
      }

    ];

    var LocalVariableTable_attribute = [
      { name : 'attribute_name_index',            type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',                type : DATA_TYPE.uInt32 },

      { name : 'local_variable_table_length',     type : DATA_TYPE.uInt16 },
      {
        name    : 'line_number_table',
        type    : DATA_TYPE.Custom,
        struc   : [
          { name : 'start_pc',                type : DATA_TYPE.uInt16 },
          { name : 'length',                  type : DATA_TYPE.uInt16 },
          { name : 'name_index',              type : DATA_TYPE.uInt16 },
          { name : 'descriptor_index',        type : DATA_TYPE.uInt16 },
          { name : 'index',                   type : DATA_TYPE.uInt16 },
        ],
        length  : 'local_variable_table_length'
      }
    ];

    var Deprecated_attribute = [
      { name : 'attribute_name_index',    type : DATA_TYPE.uInt16 },
      { name : 'attribute_length',        type : DATA_TYPE.uInt32 }
    ];

    /* *****************************************************************************
     Class File
     ******************************************************************************/

    var ClassFile = [
      {name : 'magic',                type : DATA_TYPE.uInt32 },
      {name : 'minor_version',        type : DATA_TYPE.uInt16 },
      {name : 'major_version',        type : DATA_TYPE.uInt16 },

      // Constant Pool
      {name : 'constant_pool_count',  type : DATA_TYPE.uInt16 },
      {
        name    : 'constant_pool',
        type    : DATA_TYPE.Custom,
        struc   : cp_info,
        length  : 'constant_pool_count',
        lengthCorrect : -1
      },

      {name : 'access_flags',         type : DATA_TYPE.uInt16 },
      {name : 'this_class',           type : DATA_TYPE.uInt16 },
      {name : 'super_class',          type : DATA_TYPE.uInt16 },

      // Interfaces
      {name : 'interfaces_count',     type : DATA_TYPE.uInt16 },
      {
        name    : 'interfaces',
        type    : DATA_TYPE.uInt16Array,
        length  : 'interfaces_count'
      },

      // Fields
      {name : 'fields_count',         type : DATA_TYPE.uInt16 },
      {
        name    : 'fields',
        type    : DATA_TYPE.Custom,
        struc   : field_info,
        length  : 'fields_count'
      },

      // Methods
      {name : 'methods_count',        type : DATA_TYPE.uInt16 },
      {
        name    : 'methods',
        type    : DATA_TYPE.Custom,
        struc   : method_info,
        length  : 'methods_count'
      },

      // Attributes
      {name : 'attributes_count',     type : DATA_TYPE.uInt16 },
      {
        name    : 'attributes',
        type    : DATA_TYPE.Custom,
        struc   : attribute_info,
        length  : 'attributes_count'
      }
    ];

    return ClassFile;
  })();

  DataManager.ClassStructure = ClassStructure;

  return DataManager;

})(DataManager || {});