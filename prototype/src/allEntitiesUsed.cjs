const {Helper} = require('./helperFuncs.cjs');

// checking if entities all used, and all used ones are defined
class AllEntitiesUsed{
    constructor(skill){
        this.skill = skill;
        this.helper = new Helper(this.skill);
        // let definedEntities = this.helper.getEntities();
    }
    allEntitiesUsed() {
        // in entry conditions

        // in context

        // in response
    }

    noUndefinedEntities() {
        // in entry conditions
        

        // in context

        // in response
        

    }
    noUndefinedEntitiesInConditions(){
        let entitiesInConditions = this.skill["dialog_nodes"].filter(node => node.conditions.includes("@"));
        entitiesInConditions = entitiesInConditions.map(node => {
            node["entityInCondition"] = this.extractEntityFromCondition(node.conditions);
            return node;
        });
        let entitiesInConditionsUndefined = entitiesInConditions.filter(node => node.entityInCondition);

        return entitiesInConditions;
    }

    // takes full entity and gets the top level and value if applicable
    separateEntityAndValue(entity){
        if (entity.includes("(")){
            let entityName = entity.split(":")[0];
            let entityValue = entity.split(":")[1];
            let entityParent = entityName.substring(1); 
            entityValue = entityValue.substring(1, entityValue.length - 1);
            return {"entity": entityParent, "value": entityValue};
        }
        else if (entity.includes(":")) {
            let entityParent = entity.split(":")[0].substring(1); 
            let entityValue = entity.split(":")[1];
            return {"entity": entityParent, "value": entityValue};
        }
        else {
            // return whole thing minus @, no value
            return {"entity": entity.substring(1), "value": null};
        }
    }

    // takes in return value of this.separateEntityAndValue, return if either/both are defined as applicable
    isDefined(entityAndValue){
        // 
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