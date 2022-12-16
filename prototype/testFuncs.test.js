// testing that the functions to be used in tests works as expected X)
const sampleSkill = require('./dataToTest/data.json')
const {getListOfIntents, checkKeyValuesAlign, retrieveNamedContextVariable} = require('./testFuncs.js');

test('can retrieve list of intents', (sampleSkill) => {
    // const testSkill = {
    //     "name" : "test skill",
    //     "intents" : [
    //         {"intent": "not_a_real_intent",
    //             "examples": [{"text": "Example intent"}]},
    //         {"intent": "another_intent",
    //             "examples": [{"text": "An example"}]},
    //         {"intent": "something_else",
    //             "examples": [{"text": "Another example"}]}],
    //     "description": "A test skill",
    //     "dialog_nodes": [
    //         {}]};
    expect(
        getListOfIntents(sampleSkill)
    ).toBe(["not_a_real_intent", "another_intent", "something_else"]);
})

test('can tell that keys and values are reversed', () => {
    expect(checkKeyValuesAlign(sampleSkill)).toBe(true);
})