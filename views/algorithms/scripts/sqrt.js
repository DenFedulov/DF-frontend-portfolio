"use strict";

function mySqrt(x) {
    let powersOf2 = [];

    for (let i = 1; i <= x; i *= 2) {
        powersOf2.push(i);
    }

    return powersOf2.length < 1 ? 0 : powersOf2.length - 1;
}
