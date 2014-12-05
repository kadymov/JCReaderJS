/*
    JCReaderJS - Java Class Reader / Disassembler
    The MIT License - https://raw.githubusercontent.com/kadymov/JCReaderJS/master/LICENSE
    Copyright (c) 2014 Aleksandr Kadymov (www.kadymov.pw)
*/

var CodeManager = (function (CodeManager, undefined) {
  'use strict';

  //http://en.wikipedia.org/wiki/Java_bytecode_instruction_listings

  var Instructions = (function (Instructions) {
    Instructions[Instructions['nop'] = 0x0] = 'nop';
    Instructions[Instructions['aconst_null'] = 0x1] = 'aconst_null';
    Instructions[Instructions['iconst_m1'] = 0x2] = 'iconst_m1';
    Instructions[Instructions['iconst_0'] = 0x3] = 'iconst_0';
    Instructions[Instructions['iconst_1'] = 0x4] = 'iconst_1';
    Instructions[Instructions['iconst_2'] = 0x5] = 'iconst_2';
    Instructions[Instructions['iconst_3'] = 0x6] = 'iconst_3';
    Instructions[Instructions['iconst_4'] = 0x7] = 'iconst_4';
    Instructions[Instructions['iconst_5'] = 0x8] = 'iconst_5';
    Instructions[Instructions['lconst_0'] = 0x9] = 'lconst_0';
    Instructions[Instructions['lconst_1'] = 0x0a] = 'lconst_1';
    Instructions[Instructions['fconst_0'] = 0x0b] = 'fconst_0';
    Instructions[Instructions['fconst_1'] = 0x0c] = 'fconst_1';
    Instructions[Instructions['fconst_2'] = 0x0d] = 'fconst_2';
    Instructions[Instructions['dconst_0'] = 0x0e] = 'dconst_0';
    Instructions[Instructions['dconst_1'] = 0x0f] = 'dconst_1';
    Instructions[Instructions['bipush'] = 0x10] = 'bipush';                           // 1: byte
    Instructions[Instructions['sipush'] = 0x11] = 'sipush';                           // 2: byte1, byte2
    Instructions[Instructions['ldc'] = 0x12] = 'ldc';                                 // 1: index
    Instructions[Instructions['ldc_w'] = 0x13] = 'ldc_w';                             // 2: indexbyte1, indexbyte2
    Instructions[Instructions['ldc2_w'] = 0x14] = 'ldc2_w';                           // 2: indexbyte1, indexbyte2
    Instructions[Instructions['iload'] = 0x15] = 'iload';                             // 1: index
    Instructions[Instructions['lload'] = 0x16] = 'lload';                             // 1: index
    Instructions[Instructions['fload'] = 0x17] = 'fload';                             // 1: index
    Instructions[Instructions['dload'] = 0x18] = 'dload';                             // 1: index
    Instructions[Instructions['aload'] = 0x19] = 'aload';                             // 1: index
    Instructions[Instructions['iload_0'] = 0x1a] = 'iload_0';
    Instructions[Instructions['iload_1'] = 0x1b] = 'iload_1';
    Instructions[Instructions['iload_2'] = 0x1c] = 'iload_2';
    Instructions[Instructions['iload_3'] = 0x1d] = 'iload_3';
    Instructions[Instructions['lload_0'] = 0x1e] = 'lload_0';
    Instructions[Instructions['lload_1'] = 0x1f] = 'lload_1';
    Instructions[Instructions['lload_2'] = 0x20] = 'lload_2';
    Instructions[Instructions['lload_3'] = 0x21] = 'lload_3';
    Instructions[Instructions['fload_0'] = 0x22] = 'fload_0';
    Instructions[Instructions['fload_1'] = 0x23] = 'fload_1';
    Instructions[Instructions['fload_2'] = 0x24] = 'fload_2';
    Instructions[Instructions['fload_3'] = 0x25] = 'fload_3';
    Instructions[Instructions['dload_0'] = 0x26] = 'dload_0';
    Instructions[Instructions['dload_1'] = 0x27] = 'dload_1';
    Instructions[Instructions['dload_2'] = 0x28] = 'dload_2';
    Instructions[Instructions['dload_3'] = 0x29] = 'dload_3';
    Instructions[Instructions['aload_0'] = 0x2a] = 'aload_0';
    Instructions[Instructions['aload_1'] = 0x2b] = 'aload_1';
    Instructions[Instructions['aload_2'] = 0x2c] = 'aload_2';
    Instructions[Instructions['aload_3'] = 0x2d] = 'aload_3';
    Instructions[Instructions['iaload'] = 0x2e] = 'iaload';
    Instructions[Instructions['laload'] = 0x2f] = 'laload';
    Instructions[Instructions['faload'] = 0x30] = 'faload';
    Instructions[Instructions['daload'] = 0x31] = 'daload';
    Instructions[Instructions['aaload'] = 0x32] = 'aaload';
    Instructions[Instructions['baload'] = 0x33] = 'baload';
    Instructions[Instructions['caload'] = 0x34] = 'caload';
    Instructions[Instructions['saload'] = 0x35] = 'saload';
    Instructions[Instructions['istore'] = 0x36] = 'istore';                           // 1: index
    Instructions[Instructions['lstore'] = 0x37] = 'lstore';                           // 1: index
    Instructions[Instructions['fstore'] = 0x38] = 'fstore';                           // 1: index
    Instructions[Instructions['dstore'] = 0x39] = 'dstore';                           // 1: index
    Instructions[Instructions['astore'] = 0x3a] = 'astore';                           // 1: index
    Instructions[Instructions['istore_0'] = 0x3b] = 'istore_0';
    Instructions[Instructions['istore_1'] = 0x3c] = 'istore_1';
    Instructions[Instructions['istore_2'] = 0x3d] = 'istore_2';
    Instructions[Instructions['istore_3'] = 0x3e] = 'istore_3';
    Instructions[Instructions['lstore_0'] = 0x3f] = 'lstore_0';
    Instructions[Instructions['lstore_1'] = 0x40] = 'lstore_1';
    Instructions[Instructions['lstore_2'] = 0x41] = 'lstore_2';
    Instructions[Instructions['lstore_3'] = 0x42] = 'lstore_3';
    Instructions[Instructions['fstore_0'] = 0x43] = 'fstore_0';
    Instructions[Instructions['fstore_1'] = 0x44] = 'fstore_1';
    Instructions[Instructions['fstore_2'] = 0x45] = 'fstore_2';
    Instructions[Instructions['fstore_3'] = 0x46] = 'fstore_3';
    Instructions[Instructions['dstore_0'] = 0x47] = 'dstore_0';
    Instructions[Instructions['dstore_1'] = 0x48] = 'dstore_1';
    Instructions[Instructions['dstore_2'] = 0x49] = 'dstore_2';
    Instructions[Instructions['dstore_3'] = 0x4a] = 'dstore_3';
    Instructions[Instructions['astore_0'] = 0x4b] = 'astore_0';
    Instructions[Instructions['astore_1'] = 0x4c] = 'astore_1';
    Instructions[Instructions['astore_2'] = 0x4d] = 'astore_2';
    Instructions[Instructions['astore_3'] = 0x4e] = 'astore_3';
    Instructions[Instructions['iastore'] = 0x4f] = 'iastore';
    Instructions[Instructions['lastore'] = 0x50] = 'lastore';
    Instructions[Instructions['fastore'] = 0x51] = 'fastore';
    Instructions[Instructions['dastore'] = 0x52] = 'dastore';
    Instructions[Instructions['aastore'] = 0x53] = 'aastore';
    Instructions[Instructions['bastore'] = 0x54] = 'bastore';
    Instructions[Instructions['castore'] = 0x55] = 'castore';
    Instructions[Instructions['sastore'] = 0x56] = 'sastore';
    Instructions[Instructions['pop'] = 0x57] = 'pop';
    Instructions[Instructions['pop2'] = 0x58] = 'pop2';
    Instructions[Instructions['dup'] = 0x59] = 'dup';
    Instructions[Instructions['dup_x1'] = 0x5a] = 'dup_x1';
    Instructions[Instructions['dup_x2'] = 0x5b] = 'dup_x2';
    Instructions[Instructions['dup2'] = 0x5c] = 'dup2';
    Instructions[Instructions['dup2_x1'] = 0x5d] = 'dup2_x1';
    Instructions[Instructions['dup2_x2'] = 0x5e] = 'dup2_x2';
    Instructions[Instructions['swap'] = 0x5f] = 'swap';
    Instructions[Instructions['iadd'] = 0x60] = 'iadd';
    Instructions[Instructions['ladd'] = 0x61] = 'ladd';
    Instructions[Instructions['fadd'] = 0x62] = 'fadd';
    Instructions[Instructions['dadd'] = 0x63] = 'dadd';
    Instructions[Instructions['isub'] = 0x64] = 'isub';
    Instructions[Instructions['lsub'] = 0x65] = 'lsub';
    Instructions[Instructions['fsub'] = 0x66] = 'fsub';
    Instructions[Instructions['dsub'] = 0x67] = 'dsub';
    Instructions[Instructions['imul'] = 0x68] = 'imul';
    Instructions[Instructions['lmul'] = 0x69] = 'lmul';
    Instructions[Instructions['fmul'] = 0x6a] = 'fmul';
    Instructions[Instructions['dmul'] = 0x6b] = 'dmul';
    Instructions[Instructions['idiv'] = 0x6c] = 'idiv';
    Instructions[Instructions['ldiv'] = 0x6d] = 'ldiv';
    Instructions[Instructions['fdiv'] = 0x6e] = 'fdiv';
    Instructions[Instructions['ddiv'] = 0x6f] = 'ddiv';
    Instructions[Instructions['irem'] = 0x70] = 'irem';
    Instructions[Instructions['lrem'] = 0x71] = 'lrem';
    Instructions[Instructions['frem'] = 0x72] = 'frem';
    Instructions[Instructions['drem'] = 0x73] = 'drem';
    Instructions[Instructions['ineg'] = 0x74] = 'ineg';
    Instructions[Instructions['lneg'] = 0x75] = 'lneg';
    Instructions[Instructions['fneg'] = 0x76] = 'fneg';
    Instructions[Instructions['dneg'] = 0x77] = 'dneg';
    Instructions[Instructions['ishl'] = 0x78] = 'ishl';
    Instructions[Instructions['lshl'] = 0x79] = 'lshl';
    Instructions[Instructions['ishr'] = 0x7a] = 'ishr';
    Instructions[Instructions['lshr'] = 0x7b] = 'lshr';
    Instructions[Instructions['iushr'] = 0x7c] = 'iushr';
    Instructions[Instructions['lushr'] = 0x7d] = 'lushr';
    Instructions[Instructions['iand'] = 0x7e] = 'iand';
    Instructions[Instructions['land'] = 0x7f] = 'land';
    Instructions[Instructions['ior'] = 0x80] = 'ior';
    Instructions[Instructions['lor'] = 0x81] = 'lor';
    Instructions[Instructions['ixor'] = 0x82] = 'ixor';
    Instructions[Instructions['lxor'] = 0x83] = 'lxor';
    Instructions[Instructions['iinc'] = 0x84] = 'iinc';                               // 2: index, const
    Instructions[Instructions['i2l'] = 0x85] = 'i2l';
    Instructions[Instructions['i2f'] = 0x86] = 'i2f';
    Instructions[Instructions['i2d'] = 0x87] = 'i2d';
    Instructions[Instructions['l2i'] = 0x88] = 'l2i';
    Instructions[Instructions['l2f'] = 0x89] = 'l2f';
    Instructions[Instructions['l2d'] = 0x8a] = 'l2d';
    Instructions[Instructions['f2i'] = 0x8b] = 'f2i';
    Instructions[Instructions['f2l'] = 0x8c] = 'f2l';
    Instructions[Instructions['f2d'] = 0x8d] = 'f2d';
    Instructions[Instructions['d2i'] = 0x8e] = 'd2i';
    Instructions[Instructions['d2l'] = 0x8f] = 'd2l';
    Instructions[Instructions['d2f'] = 0x90] = 'd2f';
    Instructions[Instructions['i2b'] = 0x91] = 'i2b';
    Instructions[Instructions['i2c'] = 0x92] = 'i2c';
    Instructions[Instructions['i2s'] = 0x93] = 'i2s';
    Instructions[Instructions['lcmp'] = 0x94] = 'lcmp';
    Instructions[Instructions['fcmpl'] = 0x95] = 'fcmpl';
    Instructions[Instructions['fcmpg'] = 0x96] = 'fcmpg';
    Instructions[Instructions['dcmpl'] = 0x97] = 'dcmpl';
    Instructions[Instructions['dcmpg'] = 0x98] = 'dcmpg';
    Instructions[Instructions['ifeq'] = 0x99] = 'ifeq';                               // 2: branchbyte1, branchbyte2
    Instructions[Instructions['ifne'] = 0x9a] = 'ifne';                               // 2: branchbyte1, branchbyte2
    Instructions[Instructions['iflt'] = 0x9b] = 'iflt';                               // 2: branchbyte1, branchbyte2
    Instructions[Instructions['ifge'] = 0x9c] = 'ifge';                               // 2: branchbyte1, branchbyte2
    Instructions[Instructions['ifgt'] = 0x9d] = 'ifgt';                               // 2: branchbyte1, branchbyte2
    Instructions[Instructions['ifle'] = 0x9e] = 'ifle';                               // 2: branchbyte1, branchbyte2
    Instructions[Instructions['if_icmpeq'] = 0x9f] = 'if_icmpeq';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['if_icmpne'] = 0xa0] = 'if_icmpne';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['if_icmplt'] = 0xa1] = 'if_icmplt';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['if_icmpge'] = 0xa2] = 'if_icmpge';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['if_icmpgt'] = 0xa3] = 'if_icmpgt';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['if_icmple'] = 0xa4] = 'if_icmple';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['if_acmpeq'] = 0xa5] = 'if_acmpeq';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['if_acmpne'] = 0xa6] = 'if_acmpne';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['goto'] = 0xa7] = 'goto';                               // 2: branchbyte1, branchbyte2
    Instructions[Instructions['jsr'] = 0xa8] = 'jsr';                                 // 2: branchbyte1, branchbyte2
    Instructions[Instructions['ret'] = 0xa9] = 'ret';                                 // 1: index
    Instructions[Instructions['tableswitch'] = 0xaa] = 'tableswitch';                 // 4+: [0-3 bytes padding], defaultbyte1, defaultbyte2, defaultbyte3, defaultbyte4, lowbyte1, lowbyte2, lowbyte3, lowbyte4, highbyte1, highbyte2, highbyte3, highbyte4, jump offsets...
    Instructions[Instructions['lookupswitch'] = 0xab] = 'lookupswitch';               // 4+: <0-3 bytes padding>, defaultbyte1, defaultbyte2, defaultbyte3, defaultbyte4, npairs1, npairs2, npairs3, npairs4, match-offset pairs...
    Instructions[Instructions['ireturn'] = 0xac] = 'ireturn';
    Instructions[Instructions['lreturn'] = 0xad] = 'lreturn';
    Instructions[Instructions['freturn'] = 0xae] = 'freturn';
    Instructions[Instructions['dreturn'] = 0xaf] = 'dreturn';
    Instructions[Instructions['areturn'] = 0xb0] = 'areturn';
    Instructions[Instructions['return'] = 0xb1] = 'return';
    Instructions[Instructions['getstatic'] = 0xb2] = 'getstatic';                     // 2: index1, index2
    Instructions[Instructions['putstatic'] = 0xb3] = 'putstatic';                     // 2: indexbyte1, indexbyte2
    Instructions[Instructions['getfield'] = 0xb4] = 'getfield';                       // 2: index1, index2
    Instructions[Instructions['putfield'] = 0xb5] = 'putfield';                       // 2: indexbyte1, indexbyte2
    Instructions[Instructions['invokevirtual'] = 0xb6] = 'invokevirtual';             // 2: indexbyte1, indexbyte2
    Instructions[Instructions['invokespecial'] = 0xb7] = 'invokespecial';             // 2: indexbyte1, indexbyte2
    Instructions[Instructions['invokestatic'] = 0xb8] = 'invokestatic';               // 2: indexbyte1, indexbyte2
    Instructions[Instructions['invokeinterface'] = 0xb9] = 'invokeinterface';         // 4: indexbyte1, indexbyte2, count, 0
    Instructions[Instructions['invokedynamic'] = 0xba] = 'invokedynamic';             // 4: indexbyte1, indexbyte2, 0, 0
    Instructions[Instructions['new'] = 0xbb] = 'new';                                 // 2: indexbyte1, indexbyte2
    Instructions[Instructions['newarray'] = 0xbc] = 'newarray';                       // 1: atype
    Instructions[Instructions['anewarray'] = 0xbd] = 'anewarray';                     // 2: indexbyte1, indexbyte2
    Instructions[Instructions['arraylength'] = 0xbe] = 'arraylength';
    Instructions[Instructions['athrow'] = 0xbf] = 'athrow';
    Instructions[Instructions['checkcast'] = 0xc0] = 'checkcast';                     // 2: indexbyte1, indexbyte2
    Instructions[Instructions['instanceof'] = 0xc1] = 'instanceof';                   // 2: indexbyte1, indexbyte2
    Instructions[Instructions['monitorenter'] = 0xc2] = 'monitorenter';
    Instructions[Instructions['monitorexit'] = 0xc3] = 'monitorexit';
    Instructions[Instructions['wide'] = 0xc4] = 'wide';                               // 3/5: opcode, indexbyte1, indexbyte2 or iinc, indexbyte1, indexbyte2, countbyte1, countbyte2
    Instructions[Instructions['multianewarray'] = 0xc5] = 'multianewarray';           // 3: indexbyte1, indexbyte2, dimensions
    Instructions[Instructions['ifnull'] = 0xc6] = 'ifnull';                           // 2: branchbyte1, branchbyte2
    Instructions[Instructions['ifnonnull'] = 0xc7] = 'ifnonnull';                     // 2: branchbyte1, branchbyte2
    Instructions[Instructions['goto_w'] = 0xc8] = 'goto_w';                           // 4: branchbyte1, branchbyte2, branchbyte3, branchbyte4
    Instructions[Instructions['jsr_w'] = 0xc9] = 'jsr_w';                             // 4: branchbyte1, branchbyte2, branchbyte3, branchbyte4
    Instructions[Instructions['breakpoint'] = 0xca] = 'breakpoint';
    Instructions[Instructions['impdep1'] = 0xfe] = 'impdep1';
    Instructions[Instructions['impdep2'] = 0xff] = 'impdep2';

    return Instructions;
  })({});

  var simgleOp = [
    Instructions.bipush, Instructions.ldc, Instructions.iload, Instructions.lload,
    Instructions.fload, Instructions.dload, Instructions.aload, Instructions.istore,
    Instructions.lstore, Instructions.fstore, Instructions.dstore, Instructions.astore,
    Instructions.ret, Instructions.newarray
  ];

  var binaryOp = [
    Instructions.sipush, Instructions.ldc_w, Instructions.ldc2_w, Instructions.iinc,
    Instructions.ifeq, Instructions.iflt, Instructions.ifge, Instructions.ifgt,
    Instructions.ifle, Instructions.if_icmpeq, Instructions.if_icmpne,
    Instructions.if_icmplt, Instructions.if_icmpge, Instructions.if_icmpgt,
    Instructions.if_icmple, Instructions.if_acmpeq, Instructions.if_acmpne,
    Instructions.goto, Instructions.jsr, Instructions.getstatic, Instructions.putstatic,
    Instructions.getfield, Instructions.putfield, Instructions.invokevirtual,
    Instructions.invokespecial, Instructions.invokestatic, Instructions.new,
    Instructions.anewarray, Instructions.checkcast, Instructions.instanceof,
    Instructions.ifnull, Instructions.ifnonnull
  ];

  var ternaryOp = [Instructions.multianewarray];

  var quaternaryOp = [Instructions.invokeinterface, Instructions.invokedynamic,
    Instructions.goto_w, Instructions.jsr_w];

  CodeManager.Instructions = {
    Instructions : Instructions,
    simgleOp : simgleOp,
    binaryOp : binaryOp,
    ternaryOp : ternaryOp,
    quaternaryOp : quaternaryOp
  };

  return CodeManager;
})(CodeManager || {});