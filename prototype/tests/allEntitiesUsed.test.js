let {AllEntitiesUsed} = require('../src/allEntitiesUsed.cjs');

//===== TESTING ALL ENTITIES USED AND NO UNDEFINED ENTITIES =====//

// TESTING EXTRACTING ENTITY FROM CONDITION WITH AN @ - .extractEntityFromCondition() method //
test('entity with @entity basic format can be extracted', () => {
    let testSkill = [];
    let testCondition = "@an_entity == \"something\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toBe("@an_entity");
})

test('entity with @entity:value colon then specific value format can be extracted', () => {
    let testSkill = [];
    let testCondition = "@an_entity:value == \"something else\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toBe("@an_entity:value");
})

test('entity with @entity:(value with space) colon then brackets for specific value with spaces format can be extracted', () => {
    let testSkill = [];
    let testCondition = "@an_entity:(value with spaces)== \"another thing\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toBe("@an_entity:(value with spaces)");
})