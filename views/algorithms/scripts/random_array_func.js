"use strict";

function quickSort(arr, arrStart = 0, arrEnd = arr.length) {

    if (arrEnd - arrStart > 3) {
        let pivot = pickPivotAndPrepareArray(arr); //issue is here

        console.log(arr[pivot]);

        swapValuesInArray(arr, pivot, arrEnd - 1);

        while (true) {
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

            if (largerIndFromLeft <= smallerIndFromRight) {
                swapValuesInArray(arr, largerIndFromLeft, smallerIndFromRight);
            } else {
                swapValuesInArray(arr, largerIndFromLeft, arrEnd - 1);
                break;
            }
        }

        return arr;
    }

    return simpleSort(arr);
}

function pickPivotAndPrepareArray(arr) {
    let pivotOptions = [];
    pivotOptions.push(arr[0]);
    pivotOptions.push(arr[Math.floor((arr.length - 1) / 2)]);
    pivotOptions.push(arr[arr.length - 1]);

    simpleSort(pivotOptions);

    arr[0] = pivotOptions[0];
    arr[Math.floor((arr.length - 1) / 2)] = pivotOptions[1];
    arr[arr.length - 1] = pivotOptions[2];

    return Math.floor((arr.length - 1) / 2);
}

function swapValuesInArray(arr, firstIndex, secondIndex) {
    let placeholder = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = placeholder;
}

function simpleSort(arr) {
    for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < arr.length; i++) {
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

    quickSort(arr);

    return arr;
}

console.log(generateRandomArray(10, 0, 100));