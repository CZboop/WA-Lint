const {NoDisabledResponses} = require('../src/noDisabledResponses.cjs');

// // // TESTING BOOLEAN // // //

test('workspace with no disabled responses returns true in boolean', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "response_condition",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "node_1212"},
        {
        "type": "response_condition",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "response_1432"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};

    expect(new NoDisabledResponses(testSkill).run().bool).toEqual(true);
})

test('workspace with one disabled response returns false in boolean', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "response_condition",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "disabled" : true,
        "metadata": {},
        "conditions": "true",
        "dialog_node": "node_1212"},
        {
        "type": "response_condition",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "response_1432"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};

    expect(new NoDisabledResponses(testSkill).run().bool).toEqual(false);
})

test('workspace with multiple disabled response returns false in boolean', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "response_condition",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "disabled" : true,
        "metadata": {},
        "conditions": "true",
        "dialog_node": "node_1212"},
        {
        "type": "response_condition",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "disabled" : true,
        "metadata": {},
        "conditions": "false",
        "dialog_node": "response_1432"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};

    expect(new NoDisabledResponses(testSkill).run().bool).toEqual(false);
})

test('workspace with no responses at all returns true in boolean', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"}]};

    expect(new NoDisabledResponses(testSkill).run().bool).toEqual(true);
})

// // // TESTING CORRECT LIST OF RESPONSE NODES RETURNED // // //