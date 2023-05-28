const {Helper} = require('./helperFuncs.cjs');

// checking if entities all used, and all used ones are defined
class AllEntitiesUsed{
    constructor(skill){
        this.skill = skill;
        this.helper = new Helper(this.skill);
    }
    allEntitiesUsed() {
        // in entry conditions

        // in context

        // in response
    }

    noUndefinedEntities() {
        // in entry conditions
        let entitiesInConditions = this.skill["dialog_nodes"].filter(node => node.conditions.includes("@"));
        let entitiesInConditionsUndefined = entitiesInConditions.filter(node => node.conditions);

        // in context

        // in response

    }

    extractEntityFromCondition(condition){
        // for entity with colon and brackets
        // @.*:.*\(.*\w\)
        // for entity with colon no brackets
        // @.*:\w+
        // for entity with no colon
        // @\w+
        // checking either/any match out of these and use that
        let entityMatches = condition.match(/(@.*:.*\(.*\w\))|(@.*:\w+)|(@\w+)/).filter(match => match != undefined);
        // will return matches for all groups even if not match, and may be overlap between groups so getting longest match to return
        let entityMatch = entityMatches[0];
        if (entityMatches.length > 1) {
            for (let i = 1; i < entityMatches.length; i++){
                if (entityMatches[i].length > entityMatch.length) {
                    entityMatch = entityMatches[i];
                }
            }
        }

        return entityMatch;
    }

}

module.exports = {
    AllEntitiesUsed
 }