let {AllMultiline} = require('../src/allMultiline.cjs');

// // // TESTING CAN CHECK ALL RESPONSES WITH MULTIPLE RESPONSES ARE MULTILINE // // //
test('returns true if all nodes with multiple responses are set as multiline', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response", "Another response"], "selection_policy": "multiline"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(new AllMultiline(testSkill).check().bool).toBe(true);
})

test('returns false if not all nodes with multiple responses are multiline', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response", "Another response", "Last response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(new AllMultiline(testSkill).check().bool).toBe(false);
})

test('returns false if all nodes with multiple responses are sequential', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response", "Another response", "Last response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(new AllMultiline(testSkill).check().bool).toBe(false);
})

// // // TESTING THE RETURNED NODES THAT SHOULD BE MULTILINE/HAS MULTIPLE TEXT RESPONSES BUT AREN'T // // // 

test('returns empty problem node array if all nodes with multiple responses are set as multiline', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response", "Another response"], "selection_policy": "multiline"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(new AllMultiline(testSkill).check().nodes).toEqual([]);
})

test('returns correct problem node list if not all nodes with multiple responses are multiline', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response", "Another response", "Last response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(new AllMultiline(testSkill).check().nodes).toEqual(["Opening"]);
})

test('returns expected node array of nodes that should be multiline but aren\'t if all nodes with multiple responses are sequential', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "Opening 1"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response", "Another response", "Last response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening 2"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(new AllMultiline(testSkill).check().nodes.sort()).toEqual(["Opening 1", "Opening 2"].sort());
})
