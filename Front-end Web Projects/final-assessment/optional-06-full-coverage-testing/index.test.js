import { test } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

//tambahan test setelah submit
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

test ('should return 0 if "a" is not a number', () => {
    //arrange
    const operandA = '4';
    const operandB = 5;
        
    //action
    const result = sum(operandA, operandB);
    
    assert.equal(result, 0, 'expected sum to return 0 if "a" is not a number');
});

test ('should return 0 if "b" is not a number', () => {
    //arrange
    const operandA = 4;
    const operandB = '5';
        
    //action
    const result = sum(operandA, operandB);
    
    assert.equal(result, 0, 'expected sum to return 0 if "b" is not a number');
});  

test ('should return 0 if "a" is a negative number', () => {
    //arrange
    const operandA = -4;
    const operandB = 5;
        
    //action
    const result = sum(operandA, operandB);
    
    assert.equal(result, 0, 'expected sum to return 0 if "a" is a negative number');
});  

test ('should return 0 if "b" is a negative number', () => {
    //arrange
    const operandA = 4;
    const operandB = -5;
        
    //action
    const result = sum(operandA, operandB);
    
    assert.equal(result, 0, 'expected sum to return 0 if "b" is a negative number');
});  