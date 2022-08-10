"use strict";

function quickSort(arr) {

    if (arr.length > 3) {
        let pivot = pickPivotAndPrepareArray(arr);





        return arr[pivot];
    }

    return NaN;
}

function pickPivotAndPrepareArray(arr) {
    let pivotOptions = [];
    pivotOptions.push(arr[0]);
    pivotOptions.push(arr[Math.floor((arr.length - 1) / 2)]);
    pivotOptions.push(arr[arr.length - 1]);

    for (let j = 0; j < pivotOptions.length; j++) {
        for (let i = 0; i < pivotOptions.length; i++) {
            if (pivotOptions[i] > pivotOptions[i + 1]) {
                let plhdr = pivotOptions[i];
                pivotOptions[i] = pivotOptions[i + 1];
                pivotOptions[i + 1] = plhdr;
            }
        }
    }

    arr[0] = pivotOptions[0];
    arr[Math.floor((arr.length - 1) / 2)] = pivotOptions[1];
    arr[arr.length - 1] = pivotOptions[2];

    return Math.floor((arr.length - 1) / 2);
}

function randomInt(min, max) {
    return Math.floor((max + 1 - min) * Math.random() + min);
}

function generateRandomArray(size, min, max, isSorted = false) {
    let arr = [];

    for (let i = 0; i < size; i++) {
        arr.push(randomInt(min, max));
    }

    console.log(quickSort(arr));

    return arr;
}

console.log(generateRandomArray(10, 0, 100, true));