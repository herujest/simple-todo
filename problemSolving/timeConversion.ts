export function timeConversion(s: string): string {
  let hour = parseInt(s.substring(0, 2));
  const minuteAndSecond = s.substring(2, 8);
  const period = s.substring(8, 10);

  if (period === 'AM') {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour += 12;
  }

  const hourString = hour.toString().padStart(2, '0');

  return `${hourString}${minuteAndSecond}`;
}
