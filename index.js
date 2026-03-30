function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    ']': '[',
    '}': '{',
  };
  for (const ch of s) {
    if (!map[ch]) {
      
    } else {
      if () return false; 
    }
  }
  return stack.length === 0;
}