export function miniMaxSum(arr: number[]): void {
  arr.sort((a, b) => a - b);

  const minSum = arr.slice(0, 4).reduce((a, b) => a + b, 0);

  const maxSum = arr.slice(1).reduce((a, b) => a + b, 0);

  console.log(`${minSum} ${maxSum}`);
}
