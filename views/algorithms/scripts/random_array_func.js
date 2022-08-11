"use strict";

function quickSort(arr, arrStart = 0, arrEnd = arr.length) {

    if (isSorted(arr)) return arr;

    if (arrEnd - arrStart > 3) {
        let pivot = Math.floor((arrEnd - 1) / 2);

        swapValuesInArray(arr, pivot, arrEnd - 1);

        for (let i = arrStart; i < arrEnd; i++) {
            let largerIndFromLeft = -1;
            let smallerIndFromRight = -1;

            for (let l = arrStart; l < arrEnd - 1; l++) {
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

            if (isSorted(arr)) return arr;

            if (largerIndFromLeft <= smallerIndFromRight) {
                swapValuesInArray(arr, largerIndFromLeft, smallerIndFromRight);
            } else {
                swapValuesInArray(arr, largerIndFromLeft, arrEnd - 1);
                quickSort(arr, arrStart, largerIndFromLeft);
                quickSort(arr, largerIndFromLeft + 1, arrEnd);
                break;
            }
        }

        return arr;
    }

    return simpleSort(arr);
}

function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
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

wConsoleLog(quickSort([3, 9, 11, 1, 10, 20, 18, 17, 19, 7, 5, 15, 13, 8, 2, 16, 6, 14, 12, 4]));

wConsoleLog(generateRandomArray(10, 0, 100, true));
wConsoleLog(generateRandomArray(10, 0, 100, true));
wConsoleLog(generateRandomArray(10, 0, 100, true));
