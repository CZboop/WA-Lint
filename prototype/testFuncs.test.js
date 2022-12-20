// testing that the functions to be used in tests works as expected X)
const sampleSkill = require('./dataToTest/data.json');

let functions = require('./testFuncs.js')

// // // TESTING FUNCTION FOR GETTING BOOLEAN ARRAY EQUALITY // // //

test('can tell empty arrays are equal', () => {
    expect(functions.checkArrayEquality([], [])).toBe(true);
})

test('can tell unequal arrays with one element each are unequal', () => {
    expect(functions.checkArrayEquality(['element'], ['alement'])).toBe(false);
})

test('can tell equal arrays with one element each are equal', () => {
    expect(functions.checkArrayEquality(['element'], ['element'])).toBe(true);
})

test('can tell unequal length arrays with same elements are not equal', () => {
    expect(functions.checkArrayEquality(['1', '1', '1', '1'], ['1', '1', '1'])).toBe(false);
})

test('can tell long equal arrays are equal', () => {
    let longArray1 = ['one', 'two', 'three', 'four', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    let longArray2 = ['one', 'two', 'three', 'four', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    expect(functions.checkArrayEquality(longArray1, longArray2)).toBe(true);
})

test('can tell long unequal arrays with same length are unequal', () => {
    let longArray1 = ['one', 'two', 'three', 'four', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    let longArray2 = ['five', 'six', 'seven', 'eight', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    expect(functions.checkArrayEquality(longArray1, longArray2)).toBe(false);
})

test('can tell long arrays with same elements shuffled are equal', () => {
    let longArray1 = ['one', 'two', 'three', 'four', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    let longArray2 = ['an array', 'four', 'three', 'two', 'a', 'once upon', 'was', 'there', 'time', 'one'];
    expect(functions.checkArrayEquality(longArray1, longArray2)).toBe(true);
})

test('can tell arrays with same values in different data types are not equal', () => {
    let array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let array2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    expect(functions.checkArrayEquality(array1, array2)).toBe(false);
})

// // // TESTING FUNCTION TO GET LIST OF ALL INTENTS // // // 

test('can retrieve list of intents', () => {
    expect(
        functions.getListOfIntents(sampleSkill)
    ).toEqual(["Customer_Care_Store_Hours", "Thanks", "Customer_Care_Appointments", "Customer_Care_Store_Location", "Cancel", "General_Connect_to_Agent", "Goodbye", "General_Greetings", "Help"]
    );
})

// // // TESTING FUNCTION TO CHECK KEYS AND VALUES ARE REVERSED // // //

test('can tell that keys and values are reversed', () => {
    let mapOne = functions.retrieveNamedContextVariable(sampleSkill, 'intent_descriptions');
    let reverseMap = functions.retrieveNamedContextVariable(sampleSkill, 'intent_descriptions_reverse');
    console.log(mapOne);
    console.log(reverseMap);
    expect(functions.checkKeyValuesAlign(mapOne, reverseMap)).toEqual(true);
})

// // // TESTING CAN GET CONTEXT VARIABLE VALUE BASED ON NAME // // //

test('can get context variable present if present once', () => {
    const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
        {

        },

    ]}
    expect().toEqual();
})

test('can get all instances of context variable if present multiple times', () => {
    expect().toEqual();
})

// // // TESTING CAN CHECK ALL INTENTS ARE USED IN AT LEAST ONE ENTRY CONDITION // // //

// // // TESTING CAN CHECK ALL RESPONSES WITH MULTIPLE RESPONSES ARE MULTILINE // // //

// // // TESTING CAN CHECK ALL RESPONSES WITH ONE RESPONSE ARE SEQUENTIAL // // //