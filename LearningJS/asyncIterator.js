async function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        // yay, can use await!
        let ret = await new Promise(resolve => setTimeout(resolve, 1000, "abcd"));
        console.log(ret);   //await的返回值是Promise resolve的返回值，即abcd
        yield i;
    }
}

(async () => {
    // let generator = generateSequence(1, 5);
    // for await (let value of generator) {
    //     console.log(value); // 1, then 2, then 3, then 4, then 5
    // }

    generator = generateSequence(1, 5);
    generator.next().then(function (result) {
        console.log(result);
    });
})();
