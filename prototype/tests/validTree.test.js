const {ValidTree} = require('../src/validTree.cjs');

// === TESTING CAN CHECK THE NODES REPRESENT A VALID TREE STRUCTURE THAT CAN BE REBUILT WITHOUT CONFLICTS === //

// -- TESTING NO REFERENCES TO INVALID NODES .noRefsToNonExistentNodes METHOD-- //
// no invalid references returns object with true boolean and no further details
test('no refs to non existent nodes method returns object with true boolean and no details of nodes where there are issues', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    expect(undertestClass.noRefsToNonExistentNodes()).toEqual({"bool": true, "details": []});
})

// invalid reference in jump to/next step returns object with false boolean and expected details of the issue
test('no refs to non existent nodes method, when invaid ref to next step, returns object with false boolean and details of nodes where there are issues', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "dialog_node": "node_333"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    expect(undertestClass.noRefsToNonExistentNodes()).toEqual({"bool": false, "details": [{"nodeFrom" : "node_1_1", "nodeTo": "node_333", "type" : "next_step"}]});
})

// invalid reference in previous sibling returns object with false boolean and expected details of the issue
test('no refs to non existent nodes method, when invaid ref to previous sibling, returns object with false boolean and details of nodes where there are issues', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
                "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1",
            "previous_sibling": "node_202"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    expect(undertestClass.noRefsToNonExistentNodes()).toEqual({"bool": false, "details": [{"nodeFrom" : "node_1", "nodeTo": "node_202", "type" : "previous_sibling"}]});
})

// invalid reference in parent returns object with false boolean and expected details of the issue
test('no refs to non existent nodes method, when invaid ref to parent, returns object with false boolean and details of nodes where there are issues', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_3"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
                "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    expect(undertestClass.noRefsToNonExistentNodes()).toEqual({"bool": false, "details": [{"nodeFrom" : "node_1_2", "nodeTo": "node_3", "type" : "parent"}]});
})

// multiple invalid references in mixture of contexts returns object with false boolean and expected details of the issues
test('', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_3"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
                "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1"
          },
          {
            "type": "standard",
            "title": "Dummy node 1",
            "output": {},
            "metadata": {},
            "next_step": {
                "dialog_node": "node_200"
            },
            "conditions": "true",
            "digress_in": "returns",
            "dialog_node": "node_2_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Dummy node 2",
            "output": {},
            "metadata": {},
            "next_step": {
                "dialog_node": "node_202"
            },
            "conditions": "true",
            "digress_in": "returns",
            "dialog_node": "node_2_2",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Dummy node 3",
            "output": {},
            "metadata": {},
            "conditions": "true",
            "digress_in": "returns",
            "dialog_node": "node_2_3",
            "parent": "node_88"
          },
          {
            "type": "standard",
            "title": "Dummy node 4",
            "output": {},
            "metadata": {},
            "conditions": "true",
            "digress_in": "returns",
            "dialog_node": "node_2_4",
            "previous_sibling": "node_444"
          },
          {
            "type": "standard",
            "title": "Dummy node 5",
            "output": {},
            "metadata": {},
            "conditions": "true",
            "digress_in": "returns",
            "dialog_node": "node_2_5",
            "previous_sibling": "node_3000"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    const expectedDetails = [{"nodeFrom" : "node_1_2", "nodeTo": "node_3", "type" : "parent"}, {"nodeFrom" : "node_2_1", "nodeTo": "node_200", "type" : "next_step"}, {"nodeFrom" : "node_2_2", "nodeTo": "node_202", "type" : "next_step"}, {"nodeFrom" : "node_2_3", "nodeTo": "node_88", "type" : "parent"}, {"nodeFrom" : "node_2_4", "nodeTo": "node_444", "type" : "previous_sibling"}, {"nodeFrom" : "node_2_5", "nodeTo": "node_3000", "type" : "previous_sibling"}];
    const actualDetails = undertestClass.noRefsToNonExistentNodes().details;
    expect(undertestClass.noRefsToNonExistentNodes().bool).toEqual(false);
    expect(actualDetails.length).toEqual(expectedDetails.length);
    // need to check like this as array of objects can't easily sort but want to ignore order
    expectedDetails.forEach(item => {
        expect(actualDetails).toContainEqual(item);
     });
})

// -- TESTING NO REPEATED PREVIOUS SIBLINGS -- //
// 
test('no repeated previous siblings returns true in bool and empty details array if there are no repeated previous siblings', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1",
            "previous_sibling": "node_333"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1",
            "previous_sibling": "node_22"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    expect(undertestClass.noRepeatedPreviousSiblings().bool).toBe(true);
    expect(undertestClass.noRepeatedPreviousSiblings().details).toEqual([]);
})

// 
test('no repeated previous siblings returns false in bool and expected details array if there is one repeated previous sibling', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1",
            "previous_sibling": "node_22"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1",
            "previous_sibling": "node_22"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    expect(undertestClass.noRepeatedPreviousSiblings().bool).toBe(false);
    expect(undertestClass.noRepeatedPreviousSiblings().details).toEqual([{"nodes": ["node_1", "node_1_1"], "sharedSibling": "node_22"}]);
})

// 
test('no repeated previous siblings returns false in bool and expected details array if there are multiple repeated previous siblings', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_22",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },{
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_23",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },{
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_24",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1",
            "previous_sibling": "node_22"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1",
            "previous_sibling": "node_22"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    const actualDetails = undertestClass.noRepeatedPreviousSiblings().details;
    const expectedDetails = [{"nodes": ["node_1", "node_1_1"].sort(), "sharedSibling": "node_22"}, {"nodes": ["node_1_22", "node_1_23", "node_1_24"].sort(), "sharedSibling": "node_1_1"}];
    console.log(actualDetails);
    expect(undertestClass.noRepeatedPreviousSiblings().bool).toBe(false);
    expect(expectedDetails.length).toEqual(actualDetails.length);
    expectedDetails.forEach(item => {
        expect(actualDetails).toContainEqual(item);
     });
})

// -- TESTING NO REPEATED PARENTS FOR NODES WITH NO PREVIOUS SIBLINGS -- //
// 
test('where no issues, no repeated parents for nodes with no previous siblings returns true and empty details array', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    expect(undertestClass.noMultipleChildNodesWithNoPreviousSiblings().bool).toBe(true);
    expect(undertestClass.noMultipleChildNodesWithNoPreviousSiblings().details).toEqual([]);
})

// 
test('where one issue, no repeated parents for nodes with no previous siblings returns false and expected details array', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    const actualDetails = undertestClass.noMultipleChildNodesWithNoPreviousSiblings().details;
    const expectedDetails = [{"parentNode": "node_1", "childNodes": ["node_1_1", "node_1_2"].sort()}];
    expect(undertestClass.noMultipleChildNodesWithNoPreviousSiblings().bool).toBe(false);
    expect(expectedDetails.length).toEqual(actualDetails.length);
    expectedDetails.forEach(item => {
        expect(actualDetails).toContainEqual(item);
     });
})

// 
test('where multiple issues, no repeated parents for nodes with no previous siblings returns false and expected details array', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
            {
            "type": "standard",
            "output": {
                "text": {
                "values": [
                    "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
                }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_2_1",
            "digress_out": "allow_all",
            "parent": "node_2"
            },
            {
            "type": "standard",
            "output": {
                "text": {
                "values": [
                    "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
                }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_2_2",
            "digress_out": "allow_all",
            "parent": "node_2"
            },
            {
            "type": "standard",
            "output": {
                "text": {
                "values": [
                    "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
                }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_2_3",
            "digress_out": "allow_all",
            "parent": "node_2"
            },
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    const actualDetails = undertestClass.noMultipleChildNodesWithNoPreviousSiblings().details;
    const expectedDetails = [{"parentNode": "node_1", "childNodes": ["node_1_1", "node_1_2"].sort()}, {"parentNode": "node_2", "childNodes": ["node_2_1", "node_2_2", "node_2_3"].sort()}];
    expect(undertestClass.noMultipleChildNodesWithNoPreviousSiblings().bool).toBe(false);
    expect(expectedDetails.length).toEqual(actualDetails.length);
    expectedDetails.forEach(item => {
        expect(actualDetails).toContainEqual(item);
     });
})

// -- TESTING RUN METHOD FOR ALL CHECKS -- //
// 
test('no issues returns object with key for each check and true/empty array value for each one', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    const actualObject = undertestClass.run();

    const expectedObject = {
        "noRefsToNonExistentNodes" : {"bool": true, "details": []},
        "noRepeatedPreviousSiblings" : {"bool": true, "details": []},
        "noMultipleChildNodesWithNoPreviousSiblings" : {"bool": true, "details": []}
    };
    expect(actualObject).toEqual(expectedObject);
})

// 
test('all issues returns object with key for each check and false/expected array value for each one', () => {
    const testSkill = {
        "name": "Test Skill",
        "intents": [],
        "entities": [],
        "description": "Dummy skill for testing",
        "dialog_nodes": [
          {
            "type": "standard",
            "output": {
              "text": {
                "values": [
                  "I didn't understand can you try again"
                ],
                "selection_policy": "sequential"
              }
            },
            "metadata": {},
            "conditions": "anything_else",
            "digress_in": "returns",
            "dialog_node": "node_1_2",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_3",
            "digress_out": "allow_all",
            "previous_sibling": "node_1_1",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_8",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_9",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          ,
          {
            "type": "standard",
            "title": "Directions and location",
            "output": {},
            "metadata": {},
            "next_step": {
              "behavior": "skip_user_input"
            },
            "conditions": "#Customer_Care_Store_Location",
            "digress_in": "returns",
            "dialog_node": "node_1_1",
            "digress_out": "allow_all",
            "parent": "node_1"
          },
          {
            "type": "standard",
            "title": "Opening",
            "output": {
              "text": {
                "values": [
                  "Hello, I'm a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
                ],
                "selection_policy": "sequential"
              }
            },
            "context": {
              "intent_descriptions": {
                "Customer_Care_Store_Hours": "checking store hours",
                "Thanks": "saying thanks",
                "Customer_Care_Appointments": "making an appointment",
                "Customer_Care_Store_Location": "checking locations",
                "Cancel": "cancelling something",
                "General_Connect_to_Agent": "connecting to an agent",
                "Goodbye": "saying bye",
                "General_Greetings": "saying hello",
                "Help": "getting help"
              }
            },
            "metadata": {},
            "conditions": "welcome",
            "dialog_node": "node_1",
            "parent": "node_1_2_23"
          }
        ]
      };
    const undertestClass = new ValidTree(testSkill);
    const actualObject = undertestClass.run();

    const expectedObject = {
        "noRefsToNonExistentNodes" : {"bool": false, "details": [{"type": "parent", "nodeFrom": "node_1", "nodeTo": "node_1_2_23"}]},
        "noRepeatedPreviousSiblings" : {"bool": false, "details": [{"nodes": ["node_1_2", "node_1_3"].sort(), "sharedSibling": "node_1_1"}]},
        "noMultipleChildNodesWithNoPreviousSiblings" : {"bool": false, "details": [{"parentNode": "node_1", "childNodes": ["node_1_1", "node_1_8", "node_1_9"].sort()}]}
    };
    expect(actualObject).toEqual(expectedObject);
})