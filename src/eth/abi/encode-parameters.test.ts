/*
  This file is part of web3x.

  web3x is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  web3x is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with web3x.  If not, see <http://www.gnu.org/licenses/>.
*/

import { abi } from '.';

describe('encodeParameters', function() {
  const tests = [
    {
      params: [['uint256', 'string'], ['2345675643', 'Hello!%']],
      result:
        '0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000',
    },
    {
      params: [['uint64[]', 'bytes32'], [['34', '434'], '0x324567dfff']],
      result:
        '0x0000000000000000000000000000000000000000000000000000000000000040324567dfff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000001b2',
    },
    {
      params: [
        ['address', 'address', 'address', 'address'],
        [
          '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
          '0x10f8bf6a479f320ead074411a4b0e7944ea8c9c1',
          '0xfff8bf6a479f320ead074411a4b0e7944ea8c9c1',
          '0xddd8bf6a479f320ead074411a4b0e7944ea8c9c1',
        ],
      ],
      result:
        '0x00000000000000000000000090f8bf6a479f320ead074411a4b0e7944ea8c9c100000000000000000000000010f8bf6a479f320ead074411a4b0e7944ea8c9c1000000000000000000000000fff8bf6a479f320ead074411a4b0e7944ea8c9c1000000000000000000000000ddd8bf6a479f320ead074411a4b0e7944ea8c9c1',
    },
  ];

  tests.forEach(function(test) {
    it('should convert correctly', function() {
      expect(abi.encodeParameters.apply(abi, test.params)).toEqual(test.result);
    });
  });
});

describe('encodeParameters', function() {
  var test = function(t) {
    it('should correct encode paramters', function() {
      expect(abi.encodeParameters(t.types, t.values).replace('0x', '')).toBe(t.expected);
    });
  };

  test({
    types: ['address', 'address'],
    values: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c3'],
    expected:
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3',
  });
  test({
    types: ['bool[2]', 'bool[3]'],
    values: [[true, false], [false, false, true]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001',
  });
  test({ types: ['int'], values: [1], expected: '0000000000000000000000000000000000000000000000000000000000000001' });
  test({
    types: ['int'],
    values: [16],
    expected: '0000000000000000000000000000000000000000000000000000000000000010',
  });
  test({
    types: ['int'],
    values: [-1],
    expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  });
  test({
    types: ['int256'],
    values: [1],
    expected: '0000000000000000000000000000000000000000000000000000000000000001',
  });
  test({
    types: ['int256'],
    values: [16],
    expected: '0000000000000000000000000000000000000000000000000000000000000010',
  });
  test({
    types: ['int256'],
    values: [-1],
    expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  });
  test({
    types: ['int[]'],
    values: [[3]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000003',
  });
  test({
    types: ['int256[]'],
    values: [[3]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000003',
  });
  test({
    types: ['int256[]'],
    values: [[1, 2, 3]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000003',
  });
  test({
    types: ['int[]', 'int[]'],
    values: [[1, 2], [3, 4]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000004',
  });
  test({
    types: ['int[]', 'int[]', 'int[]'],
    values: [[1, 2], [3, 4], [5, 6, 7]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000000000c0' +
      '0000000000000000000000000000000000000000000000000000000000000120' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000004' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000005' +
      '0000000000000000000000000000000000000000000000000000000000000006' +
      '0000000000000000000000000000000000000000000000000000000000000007',
  });
  test({
    types: ['bytes32'],
    values: ['0x6761766f66796f726b'],
    expected: '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });
  test({
    types: ['string'],
    values: ['gavofyork'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });
  test({
    types: ['string', 'string'],
    values: ['gavofyork', 'gavofyork'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });

  test({
    types: ['bytes32', 'int'],
    values: ['0x6761766f66796f726b', 5],
    expected:
      '6761766f66796f726b0000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000005',
  });
  test({
    types: ['int', 'bytes32'],
    values: [5, '0x6761766f66796f726b'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000005' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });
  test({
    types: ['int', 'string'],
    values: [5, 'gavofyork'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000005' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });
  test({
    types: ['string', 'int'],
    values: ['gavofyork', 5],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000005' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });
  test({
    types: ['string', 'bool', 'int[]'],
    values: ['gavofyork', true, [1, 2, 3]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000003',
  });
  test({
    types: ['string', 'int[]'],
    values: ['gavofyork', [1, 2, 3]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000003',
  });
  test({
    types: ['int', 'string'],
    values: [5, 'gavofyork'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000005' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });
  test({
    types: ['int', 'string', 'int', 'int', 'int', 'int[]'],
    values: [1, 'gavofyork', 2, 3, 4, [5, 6, 7]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '00000000000000000000000000000000000000000000000000000000000000c0' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000004' +
      '0000000000000000000000000000000000000000000000000000000000000100' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000005' +
      '0000000000000000000000000000000000000000000000000000000000000006' +
      '0000000000000000000000000000000000000000000000000000000000000007',
  });
  test({
    types: ['int', 'bytes', 'int', 'bytes'],
    values: [
      5,
      '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
        '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
      3,
      '0x331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
        '431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000005' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '00000000000000000000000000000000000000000000000000000000000000e0' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
  });
  test({
    types: ['bytes3', 'bytes'],
    values: ['0xcf0011', '0x4d00000000000000000000000000000000000000000000000000000000000012'],
    expected:
      'cf00110000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '4d00000000000000000000000000000000000000000000000000000000000012',
  });
  test({
    types: ['string', 'tuple(string,string)'],
    values: ['what', ['what what', 'what what']],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000004' +
      '7768617400000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '7768617420776861740000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '7768617420776861740000000000000000000000000000000000000000000000',
  });
  test({
    types: ['tuple(bytes32,bool)', 'tuple(bool,address)'],
    values: [
      ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true],
      [true, '0x77656c636f6d6520746f20657468657265756d2e'],
    ],
    expected:
      'abdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e',
  });
  test({
    types: ['tuple(bytes32,bool)', 'tuple(bool,address)'],
    values: [
      ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true],
      [true, '0x77656c636f6d6520746f20657468657265756d2e'],
    ],
    expected:
      'abdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e',
  });
  test({
    types: ['tuple(address,uint256)', 'tuple(uint256,bool)', 'tuple(bytes32,bytes32)'],
    values: [
      ['0x77656c636f6d6520746f20657468657265756d2e', '148'],
      ['5910', true],
      [
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
      ],
    ],
    expected:
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '0000000000000000000000000000000000000000000000000000000000000094' +
      '0000000000000000000000000000000000000000000000000000000000001716' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'abdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18' +
      'abdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
  });

  test({
    types: [
      'tuple(tuple(address,address),tuple(bool,bool))',
      'tuple(tuple(bool,bool),tuple(bytes,bytes),tuple(uint256,uint256))',
      'address',
    ],
    values: [
      [['0x77656c636f6d6520746f20657468657265756d2e', '0x77656c636f6d6520746f20657468657265756d2e'], [true, false]],
      [[false, true], ['0xab1394581edfa2ef9ca71', '0x15abe391df19aef19a4561'], ['182', '1937']],
      '0x77656c636f6d6520746f20657468657265756d2e',
    ],
    expected:
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '00000000000000000000000000000000000000000000000000000000000000c0' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '00000000000000000000000000000000000000000000000000000000000000b6' +
      '0000000000000000000000000000000000000000000000000000000000000791' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '000000000000000000000000000000000000000000000000000000000000000b' +
      '0ab1394581edfa2ef9ca71000000000000000000000000000000000000000000' +
      '000000000000000000000000000000000000000000000000000000000000000b' +
      '15abe391df19aef19a4561000000000000000000000000000000000000000000',
  });

  test({
    types: [
      'tuple(tuple(uint256,bool),tuple(uint256,tuple(bytes,bytes)))',
      'bytes',
      'tuple(bool,tuple(bytes,address),bytes)',
    ],
    values: [
      [['18320', true], ['691', ['0xab1394581edfa2ef9ca71', '0x15abe391df19aef19a4561']]],
      '0xab1394581edfa2ef9ca71',
      [
        false,
        ['0xfe', '0x77656c636f6d6520746f20657468657265756d2e'],
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
      ],
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000000001c0' +
      '0000000000000000000000000000000000000000000000000000000000000200' +
      '0000000000000000000000000000000000000000000000000000000000004790' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000000002b3' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '000000000000000000000000000000000000000000000000000000000000000b' +
      '0ab1394581edfa2ef9ca71000000000000000000000000000000000000000000' +
      '000000000000000000000000000000000000000000000000000000000000000b' +
      '15abe391df19aef19a4561000000000000000000000000000000000000000000' +
      '000000000000000000000000000000000000000000000000000000000000000b' +
      '0ab1394581edfa2ef9ca71000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000000000e0' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'fe00000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000020' +
      'abdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
  });

  test({
    types: ['address', 'tuple(bool,tuple(address,address))', 'tuple(tuple(address,tuple(int256,int256)),bool)'],
    values: [
      '0x77656c636f6d6520746f20657468657265756d2e',
      [true, ['0x77656c636f6d6520746f20657468657265756d2e', '0x77656c636f6d6520746f20657468657265756d2e']],
      [['0x77656c636f6d6520746f20657468657265756d2e', ['-12451', '-12451018']], false],
    ],
    expected:
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcf5d' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff420336' +
      '0000000000000000000000000000000000000000000000000000000000000000',
  });

  test({
    types: [
      'bytes',
      'tuple(tuple(bool,bool,bool),tuple(bytes,bytes,bytes),tuple(bytes,bool,address),tuple(uint256,int256,address))',
      'tuple(bytes,tuple(tuple(int256,bool),tuple(uint256,bytes)))',
    ],
    values: [
      '0xabef15',
      [
        [true, false, true],
        ['0xabef15', '0xcdef151', '0xabfe151'],
        ['0x15abe391df19aef19a4561', true, '0x77656c636f6d6520746f20657468657265756d2e'],
        ['1840181', '-819184919', '0x77656c636f6d6520746f20657468657265756d2e'],
      ],
      ['0x77656c636f6d6520746f20657468657265756d2e', [['-18491', false], ['1918491', '0xabdcf151dae']]],
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '0000000000000000000000000000000000000000000000000000000000000360' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      'abef150000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000100' +
      '0000000000000000000000000000000000000000000000000000000000000220' +
      '00000000000000000000000000000000000000000000000000000000001c1435' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffcf2c3ae9' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '00000000000000000000000000000000000000000000000000000000000000e0' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      'abef150000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000004' +
      '0cdef15100000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000004' +
      '0abfe15100000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '000000000000000000000000000000000000000000000000000000000000000b' +
      '15abe391df19aef19a4561000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000014' +
      '77656c636f6d6520746f20657468657265756d2e000000000000000000000000' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb7c5' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000001d461b' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000006' +
      '0abdcf151dae0000000000000000000000000000000000000000000000000000',
  });

  test({
    types: [
      'tuple(bytes,tuple(address,address))',
      'tuple(address,address,address,bytes,address)',
      'tuple(address,tuple(address,tuple(address,bool)))',
    ],
    values: [
      ['0xabef15', ['0x77656c636f6d6520746f20657468657265756d2e', '0x77656c636f6d6520746f20657468657265756d2e']],
      [
        '0x77656c636f6d6520746f20657468657265756d2e',
        '0x77656c636f6d6520746f20657468657265756d2e',
        '0x77656c636f6d6520746f20657468657265756d2e',
        '0xabef15',
        '0x77656c636f6d6520746f20657468657265756d2e',
      ],
      [
        '0x81017589ab81017589ab81017589ab81017589ab',
        ['0x77656c636f6d6520746f20657468657265756d2e', ['0x81017589ab81017589ab81017589ab81017589ab', false]],
      ],
    ],
    expected:
      '00000000000000000000000000000000000000000000000000000000000000c0' +
      '0000000000000000000000000000000000000000000000000000000000000160' +
      '00000000000000000000000081017589ab81017589ab81017589ab81017589ab' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '00000000000000000000000081017589ab81017589ab81017589ab81017589ab' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      'abef150000000000000000000000000000000000000000000000000000000000' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '00000000000000000000000077656c636f6d6520746f20657468657265756d2e' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      'abef150000000000000000000000000000000000000000000000000000000000',
  });

  test({
    types: ['tuple(bytes,bytes)', 'bytes', 'tuple(tuple(bytes),tuple(bytes,bytes),tuple(bytes,bytes,bytes))'],
    values: [
      ['0xabef15', '0xa'],
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      [['0xaf'], ['0xaf', '0xbc'], ['0xaf', '0xbc', '0xde']],
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '0000000000000000000000000000000000000000000000000000000000000120' +
      '0000000000000000000000000000000000000000000000000000000000000160' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      'abef150000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0a00000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000020' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000000000c0' +
      '0000000000000000000000000000000000000000000000000000000000000180' +
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'af00000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'af00000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'bc00000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '00000000000000000000000000000000000000000000000000000000000000e0' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'af00000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'bc00000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'de00000000000000000000000000000000000000000000000000000000000000',
  });
});
