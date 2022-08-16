"use strict";

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

function genShuffledIntRangeArray(min, max) {
    let nums = [];

    for (let i = min; i <= max; i++) {
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

function genRandomNoDupArray(size, min, max) {
    let arr = genShuffledIntRangeArray(min, max);
    if (size < max - min) {
        arr.length = size;
    }

    return arr;
}

function genSortedRandomNoDupArray(size, min, max) {
    let nums = [];

    for (let i = min; i <= max; i++) {
        nums.push(i);
    }

    while (nums.length > size) {
        nums.splice(randomInt(0, nums.length - 1), 1);
    }

    return nums;
}