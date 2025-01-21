import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test ('should sum correctly', () => {
    //arrange
    const operandA = 1;
    const operandB = 1;

    //action
    const result = sum(operandA, operandB);
  
    //assert
    const expectedResult = 2;
    assert.equal(result, expectedResult);
});


