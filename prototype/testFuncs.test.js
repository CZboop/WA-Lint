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

test('can say that two empty objects reversed', () => {
    let mapOne = {};
    let reverseMap = {};
    expect(functions.checkKeyValuesAlign(mapOne, reverseMap)).toEqual(true);
})

test('can say that two objects that match exactly are not the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    expect(functions.checkKeyValuesAlign(mapOne, reverseMap)).toEqual(false);
})

test('can tell that two short objects are the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'some value' : 'key1',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(functions.checkKeyValuesAlign(mapOne, reverseMap)).toEqual(true);
})

test('says two objects that almost match reversed, with one difference, are not the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'some value' : 'key0',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(functions.checkKeyValuesAlign(mapOne, reverseMap)).toBe(false)
})

test('can tell objects with same elements reversed, in different order, are the reverse of each other', () => {
    let mapOne = {
        'key6' : 'last value',
        'key2' : 'another value',
        'key1' : 'some value',
        'key4' : 'fourth value',
        'key3' : 'value three',
        'key5' : 'penultimate value'
    };
    let reverseMap = {
        'some value' : 'key1',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(functions.checkKeyValuesAlign(mapOne, reverseMap)).toBe(true);
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
    expect(functions.retrieveNamedContextVariable(testSkill, "needle")).toEqual(["search complete"]);
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
    expect(functions.retrieveNamedContextVariable(testSkill, "test_var").sort()).toEqual(["value if from this node", "value if from another node", "another value"].sort());
})

// // // TESTING CAN CHECK ALL INTENTS ARE USED IN AT LEAST ONE ENTRY CONDITION // // //

test('returns false if no intents used in entry conditions', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill)).toBe(false);
})

test('returns false if not all intents used in entry conditions', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "#first_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "#second_intent",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill)).toBe(false);
})

test('returns true if no intents in the skill and none in entry conditions', () =>{
    let testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill)).toBe(true);
})

test('returns false if intents in entry conditions that aren\'t in intent list', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "#false",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill)).toBe(false);
})

test('returns true if all intents used in hashtag format', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "false_intent", "examples": []}, {"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#first_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#second_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#third_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "#false_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "#true_intent",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill)).toBe(true);
})

test('returns true if all intents used in variable format', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "false_intent", "examples": []}, {"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "$intent_name==\"false_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill, intentVar = "intent_name")).toBe(true);
})

test('returns false if not all intents used in hashtag format', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "unused_intent", "examples": []},{"intent": "false_intent", "examples": []}, {"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#first_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#second_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#third_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "#false_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "#true_intent",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill)).toBe(false);
})

test('returns false if not all intents used in variable format', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "unused_intent", "examples": []}, {"intent": "false_intent", "examples": []}, {"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "$intent_name==\"false_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill, intentVar = "intent_name")).toBe(false);
})

test('returns true if all intents used in hashtag format, plus some other entry conditions', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#first_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#second_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "#third_intent",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "#true_intent",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill)).toBe(true);
})

test('returns true if all intents used in variable format, plus some other entry conditions', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(functions.checkAllIntentsUsedInAnEntryCondition(testSkill, intentVar = "intent_name")).toBe(true);
})

// still to test for above, whitespace around intent name in quotes not ok for var, and whitespace between for var except between equals?
// maybe look at making the main func for above smarter, try and find attempts at using intent with syntax issues?

// // // TESTING CAN CHECK ALL RESPONSES WITH MULTIPLE RESPONSES ARE MULTILINE // // //

// // // TESTING CAN CHECK ALL RESPONSES WITH ONE RESPONSE ARE SEQUENTIAL // // //