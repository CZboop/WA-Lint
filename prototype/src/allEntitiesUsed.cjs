const {Helper} = require('./helperFuncs.cjs');

// checking if entities all used, and all used ones are defined
class AllEntitiesUsed{
    constructor(skill){
        this.skill = skill;
        this.helper = new Helper(this.skill);
        this.definedEntities = this.helper.getEntities();
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
    // TODO: here or in one of the methods used, add the missing entity as part of return so know the issue e.g. if multiple in one node condition
    // TODO: add boolean return to this or main method to be able to check just boolean or more detail
    noUndefinedEntitiesInConditions(){
        // finding which conditions have @ as starting point for evaluating
        let entitiesInConditions = this.skill["dialog_nodes"].filter(node => node.conditions.includes("@"));
        // order to do things: 
        // get .extractEntityFromCondition(condition) > .separateEntityAndValue(entity) > .isDefined() > evaluate return from isdefined to see what nodes to return
        // filtering to preserve the whole node so can return node id etc.
        let entitiesInConditionsUndefined = entitiesInConditions.filter(node => {
            let entityFromNode = this.extractEntityFromCondition(node.conditions);
            let entityAndValue = this.separateEntityAndValue(entityFromNode);
            let isNodeEntityAndValueDefined = this.isDefined(entityAndValue.entity, entityAndValue.value);
            let isNodeEntityDefined = isNodeEntityAndValueDefined.entityDefined;
            let isNodeEntityValueDefined = isNodeEntityAndValueDefined.valueDefined;

            // add the node entity and value to the node to return later
            node["isNodeEntityDefined"] = isNodeEntityDefined;
            node["isNodeEntityValueDefined"] = isNodeEntityValueDefined;

            return isNodeEntityDefined == false || isNodeEntityValueDefined == false;
        });
        
        // mapping to return relevant info from the node
        let nodesWithUndefinedEntities = entitiesInConditionsUndefined.map(node => {
            let nodeInfo = {};
            nodeInfo["nodeId"] = node.dialog_node;
            nodeInfo["isNodeEntityDefined"] = node.isNodeEntityDefined;
            nodeInfo["isNodeEntityValueDefined"] = node.isNodeEntityValueDefined;

            return nodeInfo;
        });
        // retutning an array of objects where each object is a node
        return nodesWithUndefinedEntities;
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

    isDefined(entity, value = null){
        // return boolean for the top level entity being defined and the value being within that entity
        let entityInDefinedArray = this.definedEntities.entitiesWithValues.filter(element => element.hasOwnProperty(entity));
        let isEntityInDefinedArray = false;
        let isEntityValueInValueArray;
        if (entityInDefinedArray.length != 0) {
            isEntityInDefinedArray = true;
        }
        // assumes only one entity can be present with same name/top level value
        else {
            isEntityValueInValueArray = "N/A - parent entity not found";
        }
        if (value === null && isEntityValueInValueArray === undefined) {
            isEntityValueInValueArray = "N/A - no value provided"
        }
        else {
            if (isEntityInDefinedArray) {
                console.log(entityInDefinedArray[0])
                isEntityValueInValueArray = entityInDefinedArray[0][entity].filter(element => element == value).length > 0;
            }
        }
        return {"entityDefined": isEntityInDefinedArray, "valueDefined" : isEntityValueInValueArray};
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