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

function genRandomArray(size, min, max, isSorted = false) {
    let arr = [];

    for (let i = 0; i < size; i++) {
        arr.push(randomInt(min, max));
    }

    if (isSorted) quickSort(arr);

    return arr;
}

function genShuffledArray(first, last) {
    let nums = [];

    for (let i = first; i <= last; i++) {
        nums.push(i);
    }

    let shuffledNums = [];

    while (nums.length > 0) {
        let random = randomInt(0, nums.length - 1);
        shuffledNums.push(nums[random]);
        nums.splice(random, 1);
    }

    return shuffledNums;
}

let arr1 = genShuffledArray(1, 20);
let arr2 = [4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3];
let arr3 = genRandomArray(10, 0, 100);

wConsoleLog("Shuffled array:", arr1);
wConsoleLog(quickSort(arr1));
wConsoleLog("Set array:", arr2);
wConsoleLog(quickSort(arr2));
wConsoleLog("Random array:", arr3);
wConsoleLog(quickSort(arr3));
