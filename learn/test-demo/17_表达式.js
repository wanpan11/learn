if (
  // Check if we're inside unbatchedUpdates
  (8 & 8) !== 0 && // Check if we're not already rendering
  (8 & (16 | 32)) === 0
) {
  console.log(1);
}
