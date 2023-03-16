const {Helper} = require('../src/helperFuncs.cjs');
const sampleSkill = require('../dataToTest/data.json');

// // // TESTING FUNCTION FOR GETTING BOOLEAN ARRAY EQUALITY // // //

test('can tell empty arrays are equal', () => {
    expect(new Helper(null).checkArrayEquality([], [])).toBe(true);
})

test('can return false if one of the arrays is falsey', () => {
    expect(new Helper(null).checkArrayEquality(null, [])).toBe(false);
})

test('can tell unequal arrays with one element each are unequal', () => {
    expect(new Helper(null).checkArrayEquality(['element'], ['alement'])).toBe(false);
})

test('can tell equal arrays with one element each are equal', () => {
    expect(new Helper(null).checkArrayEquality(['element'], ['element'])).toBe(true);
})

test('can tell unequal length arrays with same elements are not equal', () => {
    expect(new Helper(null).checkArrayEquality(['1', '1', '1', '1'], ['1', '1', '1'])).toBe(false);
})

test('can tell long equal arrays are equal', () => {
    let longArray1 = ['one', 'two', 'three', 'four', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    let longArray2 = ['one', 'two', 'three', 'four', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    expect(new Helper(null).checkArrayEquality(longArray1, longArray2)).toBe(true);
})

test('can tell long unequal arrays with same length are unequal', () => {
    let longArray1 = ['one', 'two', 'three', 'four', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    let longArray2 = ['five', 'six', 'seven', 'eight', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    expect(new Helper(null).checkArrayEquality(longArray1, longArray2)).toBe(false);
})

test('can tell long arrays with same elements shuffled are equal', () => {
    let longArray1 = ['one', 'two', 'three', 'four', 'once upon', 'a', 'time', 'there', 'was', 'an array'];
    let longArray2 = ['an array', 'four', 'three', 'two', 'a', 'once upon', 'was', 'there', 'time', 'one'];
    expect(new Helper(null).checkArrayEquality(longArray1, longArray2)).toBe(true);
})

test('can tell arrays with same values in different data types are not equal', () => {
    let array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let array2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    expect(new Helper(null).checkArrayEquality(array1, array2)).toBe(false);
})

// // // TESTING FUNCTION TO GET LIST OF ALL INTENTS // // // 

test('can retrieve list of intents', () => {
    expect(
        new Helper(sampleSkill).getListOfIntents()
    ).toEqual(["Customer_Care_Store_Hours", "Thanks", "Customer_Care_Appointments", "Customer_Care_Store_Location", "Cancel", "General_Connect_to_Agent", "Goodbye", "General_Greetings", "Help"]
    );
})

// // // TESTING CAN GET CONTEXT VARIABLE VALUE BASED ON NAME // // //

test('can get context variable present if present once', () => {
    const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "another_var": "another value"}},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "needle": "search complete"}},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "stored": "value"}}]};
    expect(new Helper(testSkill).retrieveNamedContextVariable("needle")).toEqual(["search complete"]);
})

test('can get all instances of context variable if present multiple times', () => {
    const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"}},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"}},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"}}]};
    expect(new Helper(testSkill).retrieveNamedContextVariable("test_var").sort()).toEqual(["value if from this node", "value if from another node", "another value"].sort());
})

// // // TESTING FINDING DIFFERENCES BETWEEN ARRAYS // // //

test('returns empty difference array for two empty arrays', () => {
    expect(new Helper(null).returnArrayDiff([], [])).toEqual([]);
})

test('returns difference for arrays that are the same but with extra in first array', () => {
    expect(new Helper(null).returnArrayDiff(['items', 'in', 'an', 'array'], 
    ['items', 'in', 'an']))
    .toEqual([{"same": "items"}, {"same": "in"}, {"same": "an"}, {"minus": "array"}]);
})

test('returns difference for arrays that are the same but with extra in second array', () => {
    expect(new Helper(null).returnArrayDiff(['an', 'array', 'of', 'different', 'words'], 
    ['an', 'array', 'of', 'lots', 'and', 'lots of', 'different', 'words']))
    .toEqual([{"same": "an"}, {"same": "array"}, {"same": "of"}, {"same": "different"}, 
    {"same": "words"}, {"plus": "lots"}, {"plus": "and"}, {"plus": "lots of"}]);
})

test('returns difference for arrays that are the same size but have different elements', () => {
    expect(new Helper(null).returnArrayDiff(['element 1', 'element 2', 'element 3', 'element 400'], 
    ['element 1', 'element 2', 'element 3', 'element 4']))
    .toEqual([{"same": "element 1"}, {"same": "element 2"}, {"same": "element 3"}, {"minus": "element 400"}, {"plus": "element 4"}]);
})

test('returns difference for arrays that are the same in the same order', () => {
    expect(new Helper(null).returnArrayDiff(['one', 'array', 'that', 'is', 'like', 'another'], 
    ['one', 'array', 'that', 'is', 'like', 'another']))
    .toEqual([{"same": "one"}, {"same": "array"}, {"same": "that"}, {"same": "is"}, {"same": "like"}, {"same": "another"}]);
})

test('returns difference for arrays that are the same in a different order', () => {
    expect(new Helper(null).returnArrayDiff(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'], 
    ['the', 'lazy', 'dog', 'jumps', 'over', 'the', 'quick', 'brown', 'fox']))
    .toEqual([{"same": "the"}, {"same": "quick"}, {"same": "brown"}, {"same": "fox"}, {"same": "jumps"}, {"same": "over"}, {"same": "the"}, {"same": "lazy"}, {"same": 
    "dog"}]);
})