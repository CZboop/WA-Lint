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
    // TODO: in general needs to account for multiple conditions, split along operators?
    noUndefinedEntitiesInConditions(){
        // finding which conditions have @ as starting point for evaluating
        let entitiesInConditions = this.skill["dialog_nodes"].filter(node => node.conditions.includes("@"));
        // order to do things: 
        // get .extractEntityFromCondition(condition) > .separateEntityAndValue(entity) > .isDefined() > evaluate return from isdefined to see what nodes to return
        // filtering to preserve the whole node so can return node id etc.
        let entitiesInConditionsUndefined = entitiesInConditions.filter(node => {
            let entitiesFromNode = this.extractEntityFromCondition(node.conditions);
            let entitiesAndValues = entitiesFromNode.map(entity => this.separateEntityAndValue(entity));
            let isNodeEntityAndValueDefined = entitiesAndValues.map(entityAndValue => {
                return this.isDefined(entityAndValue.entity, entityAndValue.value);
            });
            let allNodeEntitiesDefinedBool = isNodeEntityAndValueDefined.every(element => element.entityDefined == true);
            let allNodeEntityValuesDefinedBool = isNodeEntityAndValueDefined.every(element => element.valueDefined != false);
            console.log(isNodeEntityAndValueDefined)
            // let undefinedEntities = ;
            // let undefinedEntityValues = ;

            // add the node entity and value to the node to return later
            node["undefinedEntities"] = isNodeEntityAndValueDefined.filter(element => element.entityDefined == false).map(element => element.entity);
            node["undefinedValues"] = isNodeEntityAndValueDefined.filter(element => element.valueDefined == false).map(element => element.value);

            return allNodeEntitiesDefinedBool == false || allNodeEntityValuesDefinedBool == false;
        });
        
        // mapping to return relevant info from the node
        let nodesWithUndefinedEntities = entitiesInConditionsUndefined.map(node => {
            let nodeInfo = {};
            nodeInfo["nodeId"] = node.dialog_node;
            nodeInfo["undefinedEntities"] = node.undefinedEntities;
            nodeInfo["undefinedValues"] = node.undefinedValues;

            return nodeInfo;
        });
        // returning an array of objects where each object is a node
        return {"bool": nodesWithUndefinedEntities.length == 0, "details" : nodesWithUndefinedEntities};
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
        return {"entity": entity, "value": value,"entityDefined": isEntityInDefinedArray, "valueDefined" : isEntityValueInValueArray};
    }

    extractMultipleEntitiesFromCondition(condition){
        // using lookahead to split before the @ symbols to preserve entities but have one entity per element
        let conditionsArray = condition.split(/(?=@)/);
        let extractedEntitiesArray = [];
        for (let i = 0; i < conditionsArray.length; i++){
            extractedEntitiesArray.push(this.extractEntityFromCondition(conditionsArray[i])[0]);
        }
        return extractedEntitiesArray;
    }

    extractEntityFromCondition(condition){
        // split in case of multiple entities in same condition, if will just find if more than one @
        // kind of recursive will go back and forth between the two methods
        if (condition.split('@').length > 2){
            return this.extractMultipleEntitiesFromCondition(condition);
        }
        else {
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
        // TODO: refactor to an array so can use same operations on this and if multiple conditions in same node
        return [entityMatch];
        }
        
    }
}

module.exports = {
    AllEntitiesUsed
 }