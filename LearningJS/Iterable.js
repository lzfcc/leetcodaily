class Range {
    constructor() {
        if (arguments.length < 1) {
            this.from = 0;
            this.to = 0;
        } else if (arguments.length == 1) {
            this.from = 0;
            this.to = arguments[0];
        } else if (arguments.length == 2) {
            const from = arguments[0];
            const to = arguments[1];
            if (from > to) {
                throw new Error("Range error!");
                return;
            }
            this.from = arguments[0];
            this.to = arguments[1];
        } else {
            throw new Error("Too many parameters!");
        }
    }

    // for..of calls this method once in the very beginning
    // [Symbol.iterator]() {
    //     // ...it returns the iterator object:
    //     // onward, for..of works only with that object, asking it for next values
    //     return {
    //         current: this.from,
    //         last: this.to,

    //         // next() is called on each iteration by the for..of loop
    //         next() {
    //             // it should return the value as an object {done:.., value :...}
    //             if (this.current < this.last) {
    //                 return { done: false, value: this.current++ };
    //             } else {
    //                 return { done: true };
    //             }
    //         }
    //     };

    *[Symbol.iterator]() {
        // ...it returns the iterator object:
        // onward, for..of works only with that object, asking it for next values
        for (let value = this.from; value < this.to; value++) {
            yield value;
        }
    }
};

try {
    let rng1 = new Range(4, 4);
    console.log([...rng1])

    let rng2 = new Range(7);
    console.log([...rng2])

    let rng3 = new Range(2, 5);
    console.log([...rng3])

    let rng4 = new Range(5, 2);
    console.log([...rng4])


} catch (e) {
    console.log(e);
}




let plus = (function* plus() {
    // Pass a question to the outer code and wait for an answer
    let result = yield "2 + 2?"; // (*)
    console.log(result);
}());

let question = plus.next().value; // <-- yield returns the value

plus.next(4); // --> pass the result into the generator


function* pseudoRandom(seed) {
    let previous = seed;
    let next;
    while(true) {
        next = previous * 16807 % 2147483647
        yield next
        previous = next;
    }
}

let generator = pseudoRandom(1);

console.log(generator.next().value); // 16807
console.log(generator.next().value); // 282475249
console.log(generator.next().value); // 1622650073