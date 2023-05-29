let {AllEntitiesUsed} = require('../src/allEntitiesUsed.cjs');

//===== TESTING ALL ENTITIES USED AND NO UNDEFINED ENTITIES =====//

// TESTING EXTRACTING ENTITY FROM CONDITION WITH AN @ - .extractEntityFromCondition() method //
test('entity with @entity basic format can be extracted', () => {
    let testSkill = {"entities": []};
    let testCondition = "@an_entity == \"something\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toEqual(["@an_entity"]);
})

test('entity with @entity:value colon then specific value format can be extracted', () => {
    let testSkill = {"entities": []};
    let testCondition = "@an_entity:value == \"something else\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toEqual(["@an_entity:value"]);
})

test('entity with @entity:(value with space) colon then brackets for specific value with spaces format can be extracted', () => {
    let testSkill = {"entities": []};
    let testCondition = "@an_entity:(value with spaces)== \"another thing\"";
    expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toEqual(["@an_entity:(value with spaces)"]);
})
// testing multiple conditions within one node - calling the .extractMultipleEntitiesFromCondition() method
test('entity with multiple @entity:(value with space) colon then brackets for specific value with spaces format can be extracted', () => {
  let testSkill = {"entities": []};
  let testCondition = "@an_entity:(value with spaces)== \"another thing\" || @another_entity:(another value)";
  expect(new AllEntitiesUsed(testSkill).extractEntityFromCondition(testCondition)).toEqual(["@an_entity:(value with spaces)", "@another_entity:(another value)"]);
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
    expect(new AllEntitiesUsed(testSkill).isDefined(testEntity)).toEqual({"entity": "an_entity", "value": null, "entityDefined": true, "valueDefined" : "N/A - no value provided"});
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
    expect(new AllEntitiesUsed(testSkill).isDefined(testEntity)).toEqual({"entity": "another_entity", "value": null,"entityDefined": false, "valueDefined" : "N/A - parent entity not found"});
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
    expect(new AllEntitiesUsed(testSkill).isDefined(testEntity, testValue)).toEqual({"entity": "an_entity", "value": "entity", "entityDefined": true, "valueDefined" : true});
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
    expect(new AllEntitiesUsed(testSkill).isDefined(testEntity, testValue)).toEqual({"entity": "an_entity", "value": "intent", "entityDefined": true, "valueDefined" : false});
})

// TESTING RETURN OF WHICH NODES HAVE UNDEFINED ENTITIES OR ENTITY VALUES - .noUndefinedEntitiesInConditions() METHOD //
// testing details returned by method
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().details).toEqual([]);
})

test('skill with one undefined entity (no specific value) used in node conditions returns array with one object, with matching node id and missing entity info arrays', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().details).toEqual([{"nodeId": "node_123", "undefinedEntities": ["test_entity"], "undefinedValues": []}]);
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().details).toEqual([{"nodeId": "node_123", "undefinedEntities": ["test_entity"], "undefinedValues": []}, {"nodeId": "node_456", "undefinedEntities": ["testing_entity"], "undefinedValues": []}, {"nodeId": "node_789", "undefinedEntities": ["tested_entity"], "undefinedValues": []}]);
})

test('skill with one defined entity and undefined value in colon and no brackets format used in node conditions returns array with matching objects', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().details).toEqual([{"nodeId": "node_123", "undefinedEntities": [], "undefinedValues": ["test"]}]);
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().details).toEqual([{"nodeId": "node_123", "undefinedEntities": [], "undefinedValues": ["test value"]}]);
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().details).toEqual([]);
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().details).toEqual([]);
})

// testing boolean return
test('skill with no undefined entities in node conditions used returns true', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().bool).toBe(true);
})

test('skill with one undefined entity (no specific value) used in node conditions returns false', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().bool).toBe(false);
})

test('skill with multiple undefined entities (no specific values) used in node conditions returns false', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().bool).toBe(false);
})

test('skill with one defined entities and undefined value in colon and no brackets format used in node conditions returns false', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().bool).toBe(false);
})

test('skill with one defined entities and undefined value in colon and brackets format used in node conditions returns false', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().bool).toBe(false);
})

test('skill with one defined entities and defined value in colon and no brackets format used in node conditions returns true', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().bool).toBe(true);
})

test('skill with one defined entities and defined value in colon and brackets format used in node conditions returns true', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUndefinedEntitiesInConditions().bool).toBe(true);
})

// TESTING EXTRACTING MULTIPLE CONDITIONS FROM ONE NODE - .extractMultipleEntitiesFromCondition() METHOD //
// note this will be triggered from the extractEntityFromCondition only if there are multiple @s in the condition, so no need to handle single @
test('entity with two @entity basic format can be extracted', () => {
  let testSkill = {"entities": []};
  let testCondition = "@an_entity == \"something\" && @another_entity";
  expect(new AllEntitiesUsed(testSkill).extractMultipleEntitiesFromCondition(testCondition).sort()).toEqual(["@an_entity", "@another_entity"].sort());
})

test('entity with three @entity:value colon format can be extracted', () => {
  let testSkill = {"entities": []};
  let testCondition = "@an_entity:value1 == \"something\" && @another_entity:value2 || @third_entity:value3";
  expect(new AllEntitiesUsed(testSkill).extractMultipleEntitiesFromCondition(testCondition).sort()).toEqual(["@an_entity:value1", "@another_entity:value2", "@third_entity:value3"].sort());
})

test('entity with four @entity:value colon format can be extracted', () => {
  let testSkill = {"entities": []};
  let testCondition = "@an_entity:(value one) == \"something\" && @another_entity:(value two) || @third_entity:(value three) || @entity_four:(value four) || input.text == \"ignore this\"";
  expect(new AllEntitiesUsed(testSkill).extractMultipleEntitiesFromCondition(testCondition).sort()).toEqual(["@an_entity:(value one)", "@another_entity:(value two)", "@third_entity:(value three)", "@entity_four:(value four)"].sort());
})

// TESTING CHECK THAT NO UNUSED ENTITIES - .noUnusedEntities() METHOD //
// testing from node entry conditions
test('if no unused entities in entry conditions, boolean return is true', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUnusedEntities().bool).toBe(true);
})

test('if unused entities in entry conditions, boolean return is false', () => {
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
    ]},
    {
      "entity": "another_entity",
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
  expect(new AllEntitiesUsed(testSkill).noUnusedEntities().bool).toBe(false);
})

test('if no unused entities in entry conditions, unused entity return is empty array', () => {
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
  expect(new AllEntitiesUsed(testSkill).noUnusedEntities().unusedEntities).toEqual([]);
})

test('if unused entity in entry conditions, unused entity return is array containing unused entities', () => {
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
    ]},
    {
      "entity": "another_entity",
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
  expect(new AllEntitiesUsed(testSkill).noUnusedEntities().unusedEntities).toEqual(["another_entity"]);
})

test('if multiple unused entities in entry conditions, unused entity return is array containing unused entities', () => {
  let testSkill = {"entities": [{
    "entity": "another_entity",
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
    ]},
    {
      "entity": "unused_entity",
      "values": [
        {
          "type": "synonyms",
          "value": "an_entity",
          "synonyms": [
            "entity"
          ]
        }]},
        {
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
  expect(new AllEntitiesUsed(testSkill).noUnusedEntities().unusedEntities.sort()).toEqual(["another_entity", "unused_entity"].sort());
})