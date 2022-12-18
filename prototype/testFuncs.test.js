// testing that the functions to be used in tests works as expected X)
const sampleSkill = require('./dataToTest/data.json');

let functions = require('./testFuncs.js')

test('can retrieve list of intents', () => {
    expect(
        functions.getListOfIntents(sampleSkill)
    ).toEqual(["Customer_Care_Store_Hours", "Thanks", "Customer_Care_Appointments", "Customer_Care_Store_Location", "Cancel", "General_Connect_to_Agent", "Goodbye", "General_Greetings", "Help"]
    );
})

test('can tell that keys and values are reversed', () => {
    let mapOne = functions.retrieveNamedContextVariable(sampleSkill, 'intent_descriptions');
    let reverseMap = functions.retrieveNamedContextVariable(sampleSkill, 'intent_descriptions_reverse');
    console.log(mapOne);
    console.log(reverseMap);
    expect(functions.checkKeyValuesAlign(mapOne, reverseMap)).toEqual(true);
})