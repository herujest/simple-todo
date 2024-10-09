import {miniMaxSum} from './minimaxsum';
import {plusMinus} from './plusMinus';
import {timeConversion} from './timeConversion';

// Problem solving basic - test 1
const arr1 = [1, 3, 5, 7, 9];
miniMaxSum(arr1);

// Problem solving basic - test 2
const arr2 = [-4, 3, -9, 0, 4, 1];
plusMinus(arr2);

// Problem solving basic - test 3
const time12Hour = '07:05:45PM';
const militaryTime = timeConversion(time12Hour);
console.log(militaryTime);
