const {Helper} = require('./helperFuncs.cjs');

// checking if entities all used, and all used ones are defined
class AllEntitiesUsed{
    constructor(skill){
        this.skill = skill;
        this.helper = new Helper(this.skill);
        this.definedEntities = this.helper.getEntities();
    }
    noUnusedEntities() {
        let allEntitiesUsedInEntryConditions = this.skill['dialog_nodes'].filter(node => node.conditions.includes("@")).map(node => {
            let rawEntities = this.extractEntityFromCondition(node.conditions);
            let entities = rawEntities.map(rawEntity => this.separateEntityAndValue(rawEntity).entity);
            return entities;
        }).flat();
        // TODO: get entities from responses and context
        let unusedEntities = this.definedEntities.entityNames.filter(entity => allEntitiesUsedInEntryConditions.includes(entity) == false);

        return {"bool": unusedEntities.length == 0, "unusedEntities": unusedEntities};
    }
    // note, the below one of the more likely to want to disable e.g. lots of cases where just want to use parent entity and not specify value
    noUnusedEntityValues(){
        // in entry conditions - note, entity value needs to match top level entity it's inside
        let allEntitiesWithValuesUsedInEntryConditions = this.skill['dialog_nodes'].filter(node => node.conditions.includes("@")).map(node => {
            let rawEntities = this.extractEntityFromCondition(node.conditions);
            let entities = rawEntities.map(rawEntity => this.separateEntityAndValue(rawEntity));
            return entities;
        }).flat().filter(entityObj => entityObj.value != null);

        let allUsedValues = allEntitiesWithValuesUsedInEntryConditions.map(entityObj => entityObj.value);
        let allDefinedValues = this.definedEntities.entitiesWithValues.map(entity => Object.values(entity).flat()).flat();
        // for purposes of thischeck, ignoring where the value is used but top level entity is undefined
        // TODO: check if there is a case where need to check that entity value matches top level, may be handled by the defined check already?
        let unusedEntityValues = allDefinedValues.filter(entity => {
            // get whether used
            // TODO: confirm whether matches with parent entity
            return allUsedValues.includes(entity) === false; 
        }).flat();

        // if no unused entities no need to evaluate anything else and can return from here
        if (unusedEntityValues.length == 0){
            return {"bool": true, "unusedEntityValues": []};
        }

        let unusedEntityValuesWithParentEntity = unusedEntityValues.map(value => {
            let valueObj = {};
            valueObj["value"] = value;
            let parent = this.definedEntities.entitiesWithValues.filter(entityObj => Object.values(entityObj)[0].includes(value)).map(entityObj => Object.keys(entityObj)[0])[0];
            valueObj["parent"] = parent;
            return valueObj;
        });

        return {"bool": unusedEntityValues.length == 0, "unusedEntityValues": unusedEntityValuesWithParentEntity};
        // TODO: similar check but get entities from responses and context
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