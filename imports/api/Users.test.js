const add = (a, b) => {
    if (typeof b !== 'number') {
        return a + a;
    }
    return a + b;
};
const square = (a) => a * a;

describe('Add', function () {

    it('should add two numbers', function () {
        const res = add(11, 9);
        if (res !== 20) {
            throw new Error('Sum was not equal to the expected value');
        }
    });

    it('should double a single number', function () {
        const res = add(44);

        if (res !== 88) {
            throw new Error('Number was not doubled');
        }
    });
});

describe('Square', function () {

    it('should square a number', function () {
        const res = square(9);

        if (res !== 81) {
            throw new Error('did not square number');
        }
    });
});


