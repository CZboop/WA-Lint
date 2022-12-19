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
    let nodesWithOneResponse = skill['dialog_nodes'].filter(node => node['output']['text']['values'].length == 1);
    return all(nodesWithOneResponse['output']['text']['selection_policy'] == 'sequential') ;
}

function checkAllNodesWithMultipleResponsesMultiline(skill) {
    // handle not having the keys getting below
    let nodesWithMultiResponse = skill['dialog_nodes'].filter(node => node['output']['text']['values'].length > 1);
    return all(nodesWithMultiResponse['output']['text']['selection_policy'] == 'multiline') ;
}

function checkAllIntentsUsedInAnEntryCondition(skill, intentVar = null){
    const skillIntents = getListOfIntents(skill);
    const dialogNodes = skill['dialog_nodes'];
    const intentsUsedInConditions = [];
    for (intent of skillIntents){
        // looking for the raw intent name if no intentVar variable, else using that with syntax for context variable
        let intentFormatted = intentVar == null ? `#${intent}`: `$${intentVar}`;
        let nodesUsingSkill = dialogNodes.filter(node => skillIntents.includes(intentFormatted));
        if (nodesUsingSkill.length > 0){
            intentsUsedInConditions.push(intent);
        }
        // potentially check for intents used in more than one node too
    }
    return intentsUsedInConditions == skillIntents;
}

module.exports = {
    getListOfIntents,
    retrieveNamedContextVariable,
    checkKeyValuesAlign,
    checkAllIntentsUsedInAnEntryCondition,
    checkAllNodesWithOneResponseSequential,
    checkAllNodesWithMultipleResponsesMultiline
 }

// console.log(getListOfIntents(skill));
// console.log(retrieveNamedContextVariable(skill, 'intent_descriptions'))
// console.log(retrieveNamedContextVariable(skill, 'intent_descriptions_reverse'))
// let mapping = retrieveNamedContextVariable(skill, 'intent_descriptions')[0];
// let reverseMapping = retrieveNamedContextVariable(skill, 'intent_descriptions_reverse')[0];
// console.log(checkKeyValuesAlign(mapping, reverseMapping));
