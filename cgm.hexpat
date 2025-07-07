#pragma endian big

import type.base;

#include "std/mem.pat"
#include "std/io"

fn to_hex(auto value) {
  return std::format("0x{:04X}", value);
};

bitfield HeaderB {
  Class: 11 [[format("to_hex")]];
  Len: 5;
};

struct Command {
  if ($ % 2 != 0) {
    u8 Pad [[highlight_hidden]];
  } 
  HeaderB Header;
  u8 Data[Header.Len];
};

Command commands[while(!std::mem::eof())] @ 0x00;