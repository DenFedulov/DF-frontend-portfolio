"use strict";

function findValue(arr, target, start = 0, end = arr.length - 1, counter = 1) {
    let midInd = Math.floor((end - start) / 2) + start;

    if (end - start <= 0 && target != arr[midInd]) {
        return `Element not found in ${counter} operations`;
    }


    if (target == arr[midInd]) {
        return `Element found at index ${midInd} in ${counter} operations`;
    } else if (target < arr[midInd]) {
        return findValue(arr, target, start, midInd - 1, ++counter);
    } else {
        return findValue(arr, target, midInd + 1, end, ++counter);
    }
}