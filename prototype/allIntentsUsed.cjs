const {Helper} = require('./helperFuncs.cjs');

class AllIntentsUsed{
    constructor(skill, intentVar = null){
        this.skill = skill;
        this.intentVar = intentVar;
        this.helper = new Helper(this.skill);
    }
    inEntryCondition() {
        const skillIntents = this.helper.getListOfIntents();
        const dialogNodes = this.skill['dialog_nodes'];
        const intentsUsedInConditions = [];
        for (let intent of skillIntents){
            // looking for the raw intent name if no intentVar variable, else using that with syntax for context variable
            let nodesUsingSkill = null;
            if (this.intentVar == null) {
                let intentFormatted = `#${intent}`;
                nodesUsingSkill = dialogNodes.filter(node => node['conditions'] == intentFormatted);
            } else {
                let intentFormattedRegex = new RegExp(`(\\$${this.intentVar})[\\s]*(==)[\\s]*(\"${intent}\")`, "g");
                // console.log(intentFormattedRegex);
                nodesUsingSkill = dialogNodes.filter(node => intentFormattedRegex.test(node['conditions']));
            }
            
            if (nodesUsingSkill.length > 0){
                intentsUsedInConditions.push(intent);
            }
            // potentially check for intents used in more than one node too
        }
        // Note: above just gets from entry conditions if match the intents in the skill
        // below gets all intents from conditions so will catch invalid intent names trying to be used in entry condition
        let allIntentsUsedInEntryConditions = [];
        if (this.intentVar == null) {
            allIntentsUsedInEntryConditions = dialogNodes.filter(node => node.hasOwnProperty('conditions') ? node['conditions'].startsWith('#') : false).map(node => node['conditions'].slice(1));
        } else {
            allIntentsUsedInEntryConditions = dialogNodes.filter(node => node.hasOwnProperty('conditions') ? node['conditions'].startsWith(`\$${this.intentVar}`): false).map(node => node['conditions'].split('=')[node['conditions'].split('=').length - 1].trim().replace('\\', '').replace(/\"/g, ''));
        }

        const allUsed = this.helper.checkArrayEquality(intentsUsedInConditions, skillIntents);
        const unused = this.helper.returnArrayDiff(skillIntents, intentsUsedInConditions).filter(elem => elem.hasOwnProperty('minus')).map(elem => elem.minus);
        const extra = this.helper.returnArrayDiff(skillIntents, allIntentsUsedInEntryConditions).filter(elem => elem.hasOwnProperty('plus')).map(elem => elem.plus);
        // unused = in skill intent list not in entry conditions
        // extra = not in skill intent list but in entry condition as if intent
        return {'bool' : allUsed, 'unused' : unused, 'extra': extra};
    }
    inMapping(mapping, reverse = false) {
        let intentArray = this.helper.getListOfIntents();
        let mappingArray = reverse == false ? Object.keys(mapping) : Object.values(mapping);
        mappingArray.sort();
        intentArray.sort();
        const allUsed = this.helper.checkArrayEquality(mappingArray, intentArray);
        const unused = this.helper.returnArrayDiff(intentArray, mappingArray).filter(elem => elem.hasOwnProperty('minus')).map(elem => elem.minus);
        const extra = this.helper.returnArrayDiff(intentArray, mappingArray).filter(elem => elem.hasOwnProperty('plus')).map(elem => elem.plus);
        // unused = in skill intent list not in mapping
        // extra = not in skill intent list but in mapping as if intent
        return {'bool' : allUsed, 'unused' : unused, 'extra': extra};
    }
}
// TODO: potentially have a check later between unused and extra, if using wrong syntax e.g. invalid whitespace
// Note: within main checker might be important to show extras as well as just the boolean?
module.exports = {
    AllIntentsUsed
 }