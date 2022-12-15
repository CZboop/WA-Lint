// sample watson skill taken and adapted from https://github.com/watson-developer-cloud/assistant-skill-analysis/blob/master/tests/resources/test_workspaces/skill-Customer-Care-Sample.json
const skill = require('../dataToTest/data.json');

const getListOfIntents = (skill) => {
    return skill['intents'].map(intent => intent.intent);
}

const retrieveNamedContextVariable = (skill, contextVar) => {
    let hasContext = skill['dialog_nodes'].filter(obj => obj['context']!={} );
    return hasContext.filter(context => context.hasOwnProperty(contextVar));
    // abaove returning empty atm
}

// checking that keys of one object match values of other and vice versa
const checkKeyValuesAlign = (initialObj, reverseObj) => {

}

console.log(getListOfIntents(skill));
console.log(retrieveNamedContextVariable(skill, 'intent_descriptions'))