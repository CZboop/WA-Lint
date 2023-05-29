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

// TESTING RETURN OF WHICH NODES HAVE UNDEFINED ENTITIES OR ENTITY VALUES - .noUndefinedEntitiesInConditions() METHOD //
test('skill with no undefined entities in node conditions used returns empty array', () => {
  let testSkill = {"entities": [{
    "entity": "an_entity",
    "values": [
      {
        "type": "synonyms",
        "value": "an_entity",
        "synonyms": [
          "entity"
        ]
      }]}
    ], "dialog_nodes": [
      {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@an_entity",
      "dialog_node": "node_123"}]};
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions()).toEqual([]);
})

test('skill with one undefined entity (no specific value) used in node conditions returns array with one object, with matching node id', () => {
  let testSkill = {"entities": [{
    "entity": "an_entity",
    "values": [
      {
        "type": "synonyms",
        "value": "an_entity",
        "synonyms": [
          "entity"
        ]
      }]}
    ], "dialog_nodes": [
      {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@test_entity",
      "dialog_node": "node_123"}]};
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions()).toEqual([{"nodeId": "node_123", "isNodeEntityDefined": false, "isNodeEntityValueDefined": "N/A - parent entity not found"}]);
})

test('skill with multiple undefined entities (no specific values) used in node conditions returns array with matching objects', () => {
  let testSkill = {"entities": [{
    "entity": "an_entity",
    "values": [
      {
        "type": "synonyms",
        "value": "an_entity",
        "synonyms": [
          "entity"
        ]
      }]}
    ], "dialog_nodes": [
      {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@test_entity",
      "dialog_node": "node_123"
    },
    {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@testing_entity",
      "dialog_node": "node_456"
    },
    {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@tested_entity",
      "dialog_node": "node_789"
    }
  ]};
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions()).toEqual([{"nodeId": "node_123", "isNodeEntityDefined": false, "isNodeEntityValueDefined": "N/A - parent entity not found"}, {"nodeId": "node_456", "isNodeEntityDefined": false, "isNodeEntityValueDefined": "N/A - parent entity not found"}, {"nodeId": "node_789", "isNodeEntityDefined": false, "isNodeEntityValueDefined": "N/A - parent entity not found"}]);
})

test('skill with one defined entities and undefined value in colon and no brackets format used in node conditions returns array with matching objects', () => {
  let testSkill = {"entities": [{
    "entity": "an_entity",
    "values": [
      {
        "type": "synonyms",
        "value": "an_entity",
        "synonyms": [
          "entity"
        ]
      }]}
    ], 
    "dialog_nodes": [
      {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@an_entity:test",
      "dialog_node": "node_123"
    }
  ]};
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions()).toEqual([{"nodeId": "node_123", "isNodeEntityDefined": true, "isNodeEntityValueDefined": false}]);
})

test('skill with one defined entities and undefined value in colon and brackets format used in node conditions returns array with matching objects', () => {
  let testSkill = {"entities": [{
    "entity": "an_entity",
    "values": [
      {
        "type": "synonyms",
        "value": "an_entity",
        "synonyms": [
          "entity"
        ]
      }]}
    ], 
    "dialog_nodes": [
      {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@an_entity:(test value)",
      "dialog_node": "node_123"
    }
  ]};
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions()).toEqual([{"nodeId": "node_123", "isNodeEntityDefined": true, "isNodeEntityValueDefined": false}]);
})

test('skill with one defined entities and defined value in colon and no brackets format used in node conditions returns empty array', () => {
  let testSkill = {"entities": [{
    "entity": "an_entity",
    "values": [
      {
        "type": "synonyms",
        "value": "an_entity",
        "synonyms": [
          "entity"
        ]
      },
      {
        "type": "synonyms",
        "value": "test",
        "synonyms": [
          "entity"
        ]
      },
      ,
      {
        "type": "synonyms",
        "value": "test value",
        "synonyms": [
          "entity"
        ]
      }
    ]}
    ], 
    "dialog_nodes": [
      {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@an_entity:test",
      "dialog_node": "node_123"
    }
  ]};
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions()).toEqual([]);
})

test('skill with one defined entities and defined value in colon and brackets format used in node conditions returns empty array ', () => {
  let testSkill = {"entities": [{
    "entity": "an_entity",
    "values": [
      {
        "type": "synonyms",
        "value": "an_entity",
        "synonyms": [
          "entity"
        ]
      },
      {
        "type": "synonyms",
        "value": "test",
        "synonyms": [
          "entity"
        ]
      },
      ,
      {
        "type": "synonyms",
        "value": "test value",
        "synonyms": [
          "entity"
        ]
      }
    ]}
    ], 
    "dialog_nodes": [
      {
      "type": "standard",
      "title": "A node",
      "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
      "context": {},
      "metadata": {},
      "conditions": "@an_entity:(test value)",
      "dialog_node": "node_123"
    }
  ]};
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions()).toEqual([]);
})