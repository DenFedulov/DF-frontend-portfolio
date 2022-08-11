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

function randomInt(min, max) {
    return Math.floor((max + 1 - min) * Math.random() + min);
}

function generateRandomArray(size, min, max, isSorted = false) {
    let arr = [];

    for (let i = 0; i < size; i++) {
        arr.push(randomInt(min, max));
    }

    if (isSorted) quickSort(arr);

    return arr;
}

wConsoleLog("Set array: ", quickSort([3, 9, 11, 1, 10, 20, 18, 17, 19, 7, 5, 15, 13, 8, 2, 16, 6, 14, 12, 4]));
wConsoleLog("Set array: ", quickSort([4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3]));

wConsoleLog("Random array: ", generateRandomArray(10, 0, 100, true));
