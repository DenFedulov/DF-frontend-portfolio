"use strict";

function quickSort(arr, arrStart = 0, arrEnd = arr.length, count = 0) {
  if (arrEnd - arrStart > 3) {
    let pivot = Math.floor((arrEnd - 1) / 2);

    swapValuesInArray(arr, pivot, arrEnd - 1);

    for (let i = arrStart; i < arrEnd; i++) {
      let largerIndFromLeft = arrEnd - 1;
      let smallerIndFromRight = arrEnd - 1;

      for (let l = arrStart; l < arrEnd - 2; l++) {
        if (arr[l] > arr[arrEnd - 1]) {
          largerIndFromLeft = l;
          break;
        }
      }
      for (let r = arrEnd - 2; r > arrStart; r--) {
        if (arr[r] < arr[arrEnd - 1]) {
          smallerIndFromRight = r;
          break;
        }
      }

      if (largerIndFromLeft <= smallerIndFromRight) {
        swapValuesInArray(arr, largerIndFromLeft, smallerIndFromRight);
      } else {
        swapValuesInArray(arr, largerIndFromLeft, arrEnd - 1);
        quickSort(arr, arrStart, largerIndFromLeft, ++count);
        quickSort(arr, largerIndFromLeft + 1, arrEnd, ++count);
        break;
      }
    }

    return arr;
  }

  return simpleSort(arr);
}

function swapValuesInArray(arr, firstIndex, secondIndex) {
  let placeholder = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = placeholder;
}

function simpleSort(arr, arrStart = 0, arrEnd = arr.length) {
  for (let j = arrStart; j < arrEnd; j++) {
    for (let i = arrStart; i < arrEnd; i++) {
      if (arr[i] > arr[i + 1]) {
        swapValuesInArray(arr, i, i + 1);
      }
    }
  }
}
