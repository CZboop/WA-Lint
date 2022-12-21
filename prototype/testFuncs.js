// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// // const data = require("./data.json");
// const sampleSkill = require('./dataToTest/data.json');

function getListOfIntents(skill) {
    const intentList = skill['intents'].map(intent => {return intent.intent});
    return intentList;
}

function retrieveNamedContextVariable(skill, contextVar) {
    let hasContext = skill['dialog_nodes'].filter(obj => obj['context']!={} && obj['context']!=null );
    return hasContext.map(context => context['context'][contextVar] ).filter(context => context != undefined);
    // above should account for potentially giving multiple results?
}

// checking that keys of one object match values of other and vice versa
// maybe check for multiple similarity levels eg all match and also whether exact match no extras in either?
function checkKeyValuesAlign(initialObj, reverseObj) {
    return Object.keys(initialObj).every(item => Object.values(reverseObj).includes(item)) && Object.keys(reverseObj).every(item => Object.values(initialObj).includes(item));
}
// TODO: for above, make it handle getting from multiple nodes/sources at same time
// or maybe another one to check that all with given same name match?

// checking that if more than one response, selection policy is multiline else sequential
// note, this will fail initially for sample skill
function checkAllNodesWithOneResponseSequential(skill) {
    // handle not having the keys getting below
    let nodesWithSingleResponse = skill['dialog_nodes'].filter(node => {
        if (Object.keys(node).includes('output') && Object.keys(node['output']).includes('text') && Object.keys(node['output']['text']).includes('values')){
            return node['output']['text']['values'].length === 1; 
        } 
        else {
            return false;
        }
    });
    let selectionPolicyMapped = nodesWithSingleResponse.map(node => node['output']['text']['selection_policy']);
    return selectionPolicyMapped.every(element => element === 'sequential');
}

function checkAllNodesWithMultipleResponsesMultiline(skill) {
    // handle not having the keys getting below
    let nodesWithMultiResponse = skill['dialog_nodes'].filter(node => {
        if (Object.keys(node).includes('output') && Object.keys(node['output']).includes('text') && Object.keys(node['output']['text']).includes('values')){
            return node['output']['text']['values'].length > 1; 
        } 
        else {
            return false;
        }
    });
    let selectionPolicyMapped = nodesWithMultiResponse.map(node => node['output']['text']['selection_policy']);
    return selectionPolicyMapped.every(element => element === 'multiline');
}

function checkAllIntentsUsedInAnEntryCondition(skill, intentVar = null){
    const skillIntents = getListOfIntents(skill);
    const dialogNodes = skill['dialog_nodes'];
    const intentsUsedInConditions = [];
    for (let intent of skillIntents){
        // looking for the raw intent name if no intentVar variable, else using that with syntax for context variable
        let intentFormatted = intentVar == null ? `#${intent}`: `$${intentVar}=="${intent}"`;
        let nodesUsingSkill = dialogNodes.filter(node => node['conditions'] == intentFormatted);
        if (nodesUsingSkill.length > 0){
            intentsUsedInConditions.push(intent);
        }
        // potentially check for intents used in more than one node too
    }
    return checkArrayEquality(intentsUsedInConditions, skillIntents);
}

function checkArrayEquality(array1, array2) {
    // either null
    if (!array1 || !array2) {
        return false;
    }
    // length doesn't match
    if (array1.length != array2.length) {
        return false;
    }
    // sort both
    array1 = array1.sort();
    array2 = array2.sort();
    // loop through and check each index matches
    for (let i=0; i < array1.length; i++) {
        // note want to check for type as well here
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

// TODO: add func to check all intents in the mapping/reverse mapping
function checkAllIntentsInMapping(intentArray, mapping, reverse = false) {
    let mappingArray = reverse == false ? Object.keys(mapping) : Object.values(mapping);
    mappingArray.sort();
    intentArray.sort();
    return checkArrayEquality(mappingArray, intentArray);
}

module.exports = {
    getListOfIntents,
    retrieveNamedContextVariable,
    checkKeyValuesAlign,
    checkAllIntentsUsedInAnEntryCondition,
    checkAllNodesWithOneResponseSequential,
    checkAllNodesWithMultipleResponsesMultiline,
    checkArrayEquality,
    checkAllIntentsInMapping
 }

//  console.log(checkAllIntentsUsedInAnEntryCondition(sampleSkill));
//  console.log(checkAllNodesWithMultipleResponsesMultiline(sampleSkill));
//  console.log(checkAllNodesWithOneResponseSequential(sampleSkill));

// console.log(getListOfIntents(skill));
// console.log(retrieveNamedContextVariable(skill, 'intent_descriptions'))
// console.log(retrieveNamedContextVariable(skill, 'intent_descriptions_reverse'))
// let mapping = retrieveNamedContextVariable(skill, 'intent_descriptions')[0];
// let reverseMapping = retrieveNamedContextVariable(skill, 'intent_descriptions_reverse')[0];
// console.log(checkKeyValuesAlign(mapping, reverseMapping));
