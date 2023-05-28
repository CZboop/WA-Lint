let {AllEntitiesUsed} = require('../src/allEntitiesUsed.cjs');

//===== TESTING ALL ENTITIES USED AND NO UNDEFINED ENTITIES =====//

// TESTING EXTRACTING ENTITY FROM CONDITION WITH AN @ - .extractEntityFromCondition() method //
test('entity with @entity basic format can be extracted', () => {
    let testSkill = {"entities": []};
    let testCondition = "@an_entity == \"something\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toBe("@an_entity");
})

test('entity with @entity:value colon then specific value format can be extracted', () => {
    let testSkill = {"entities": []};
    let testCondition = "@an_entity:value == \"something else\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toBe("@an_entity:value");
})

test('entity with @entity:(value with space) colon then brackets for specific value with spaces format can be extracted', () => {
    let testSkill = {"entities": []};
    let testCondition = "@an_entity:(value with spaces)== \"another thing\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toBe("@an_entity:(value with spaces)");
})

// TESTING SEPARATING ENTITY VALUE - .separateEntityAndValue() method //
test('entity with @entity basic format returns the entity minus @ symbol as entity, null as value', () => {
    let testSkill = {"entities": []};
    let testEntity = "@an_entity";
    expect(new AllEntitiesUsed(testSkill).separateEntityAndValue(testEntity)).toEqual({"entity": "an_entity", "value": null});
})

test('entity with @entity:value colon value format returns the entity before : minus @ symbol as entity, value after colon as value', () => {
    let testSkill = {"entities": []};
    let testEntity = "@an_entity:testValue";
    expect(new AllEntitiesUsed(testSkill).separateEntityAndValue(testEntity)).toEqual({"entity": "an_entity", "value": "testValue"});
})

test('entity with @entity:(value with space) colon then brackets for specific value with spaces format can be extracted', () => {
    let testSkill = {"entities": []};
    let testEntity = "@an_entity:(test value with spaces)";
    expect(new AllEntitiesUsed(testSkill).separateEntityAndValue(testEntity)).toEqual({"entity": "an_entity", "value": "test value with spaces"});
})

// TESTING CAN TELL IF AN ENTITY AND OPTIONALLY VALUE OF IT IS DEFINED - .isDefined() method //
test('defined entity with null value returns true and N/A info', () => {
    let testSkill = {"entities": [{
        "entity": "an_entity",
        "values": [
          {
            "type": "synonyms",
            "value": "an_entity",
            "synonyms": [
              "entity"
            ]
          }]}]};
    let testEntity = "an_entity";
    expect(new AllEntitiesUsed(testSkill).isDefined(testEntity)).toEqual({"entityDefined": true, "valueDefined" : "N/A - no value provided"});
})

test('undefined entity with null value returns false and N/A info', () => {
    let testSkill = {"entities": [{
        "entity": "an_entity",
        "values": [
          {
            "type": "synonyms",
            "value": "an_entity",
            "synonyms": [
              "entity"
            ]
          }]}]};
    let testEntity = "another_entity";
    expect(new AllEntitiesUsed(testSkill).isDefined(testEntity)).toEqual({"entityDefined": false, "valueDefined" : "N/A - parent entity not found"});
})

test('defined entity with valid value returns true and true', () => {
    let testSkill = {"entities": [{
        "entity": "an_entity",
        "values": [
          {
            "type": "synonyms",
            "value": "entity",
            "synonyms": [
              "entities"
            ]
          }]}]};
    let testEntity = "an_entity";
    let testValue = "entity";
    expect(new AllEntitiesUsed(testSkill).isDefined(testEntity, testValue)).toEqual({"entityDefined": true, "valueDefined" : true});
})

test('defined entity with invalid value returns true and false', () => {
    let testSkill = {"entities": [{
        "entity": "an_entity",
        "values": [
          {
            "type": "synonyms",
            "value": "an_entity",
            "synonyms": [
              "entity"
            ]
          }]}]};
          let testEntity = "an_entity";
          let testValue = "intent";
          expect(new AllEntitiesUsed(testSkill).isDefined(testEntity, testValue)).toEqual({"entityDefined": true, "valueDefined" : false});
})