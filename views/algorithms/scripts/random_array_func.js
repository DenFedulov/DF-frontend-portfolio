"use strict";



function randomInt(min, max) {
    return Math.floor((max + 1 - min) * Math.random() + min);
}

function generateRandomArray(size, min, max, isSorted = false) {
    let array = [];

    for (let i = 0; i < size; i++) {
        array.push(randomInt(min, max));
    }



    return array;
}

console.log(generateRandomArray(20, 5, 100));