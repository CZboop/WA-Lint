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
                console.log(intentFormattedRegex);
                nodesUsingSkill = dialogNodes.filter(node => intentFormattedRegex.test(node['conditions']));
            }
            
            if (nodesUsingSkill.length > 0){
                intentsUsedInConditions.push(intent);
            }
            // potentially check for intents used in more than one node too
        }
        const allUsed = this.helper.checkArrayEquality(intentsUsedInConditions, skillIntents);
        const unused = this.helper.returnArrayDiff(skillIntents, intentsUsedInConditions).filter(elem => elem.hasOwnProperty('minus')).map(elem => elem.minus);
        return {'bool' : allUsed, 'unused' : unused};
    }
    inMapping(mapping, reverse = false) {
        let intentArray = this.helper.getListOfIntents();
        let mappingArray = reverse == false ? Object.keys(mapping) : Object.values(mapping);
        mappingArray.sort();
        intentArray.sort();
        const allUsed = this.helper.checkArrayEquality(mappingArray, intentArray);
        const unused = this.helper.returnArrayDiff(intentArray, mappingArray).filter(elem => elem.hasOwnProperty('minus')).map(elem => elem.minus);
        return {'bool' : allUsed, 'unused' : unused};
    }
}

module.exports = {
    AllIntentsUsed
 }