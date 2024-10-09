export function plusMinus(arr: number[]): void {
  const n = arr.length;
  let positiveCount = 0,
    negativeCount = 0,
    zeroCount = 0;

  // Loop once through the array and count
  for (let i = 0; i < n; i++) {
    if (arr[i] > 0) {
      positiveCount++;
    } else if (arr[i] < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
  }

  // Calculate and print ratios
  console.log((positiveCount / n).toFixed(6));
  console.log((negativeCount / n).toFixed(6));
  console.log((zeroCount / n).toFixed(6));
}
