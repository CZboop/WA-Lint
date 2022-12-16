// sample watson skill taken and adapted from https://github.com/watson-developer-cloud/assistant-skill-analysis/blob/master/tests/resources/test_workspaces/skill-Customer-Care-Sample.json
const skill = require('./dataToTest/data.json');

const getListOfIntents = (skill) => {
    return skill['intents'].map(intent => intent.intent);
}

const retrieveNamedContextVariable = (skill, contextVar) => {
    let hasContext = skill['dialog_nodes'].filter(obj => obj['context']!={} && obj['context']!=null );
    return hasContext.map(context => context['context'][contextVar] ).filter(context => context != undefined);
    // above should account for potentially giving multiple results?
}

// checking that keys of one object match values of other and vice versa
// maybe check for multiple similarity levels eg all match and also whether exact match no extras in either?
const checkKeyValuesAlign = (initialObj, reverseObj) => {
    // && Object.keys(reverseObj) == Object.values(initialObj)
    console.log(Object.keys(initialObj));
    console.log(Object.values(reverseObj));
    return Object.keys(initialObj).every(item => Object.values(reverseObj).includes(item) );
}

console.log(getListOfIntents(skill));
console.log(retrieveNamedContextVariable(skill, 'intent_descriptions'))
console.log(retrieveNamedContextVariable(skill, 'intent_descriptions_reverse'))
let mapping = retrieveNamedContextVariable(skill, 'intent_descriptions')[0];
let reverseMapping = retrieveNamedContextVariable(skill, 'intent_descriptions_reverse')[0];
console.log(checkKeyValuesAlign(mapping, reverseMapping));