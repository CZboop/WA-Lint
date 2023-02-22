let {AllSequential} = require('./allSequential.cjs');

// // // TESTING CAN CHECK ALL RESPONSES WITH ONE RESPONSE ARE SEQUENTIAL // // //
// // TESTING THE BOOLEAN CHECK OF ALL FINE OR NOT // // 
test('returns true if all nodes with single responses are set as sequential', () => {
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
    expect(new AllSequential(testSkill).check().bool).toBe(true);
})

test('returns false if not all nodes with single responses are sequential', () => {
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
        "output": {"text": {"values": ["Some text"], "selection_policy": "multiline"}},
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
        "output": {"text": {"values": ["It's a response"], "selection_policy": "multiline"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(new AllSequential(testSkill).check().bool).toBe(false);
})

test('returns false if all nodes with single response are multiline', () => {
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
        "output": {"text": {"values": ["Some text"], "selection_policy": "multiline"}},
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
        "output": {"text": {"values": ["It's a response"], "selection_policy": "multiline"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Opening"}]};
    expect(new AllSequential(testSkill).check().bool).toBe(false);
})

// // TESTING THE RETURNED NODES OF WHICH NODES MIGHT HAVE PROBLEM // // 

test('returns empty node array if all nodes with single responses are set as sequential', () => {
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
    expect(new AllSequential(testSkill).check().nodes).toEqual([]);
})

test('returns correct array of node names / ids with potential issue if not all nodes with single responses are sequential', () => {
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
        "output": {"text": {"values": ["Some text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "Issue node 1"},
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
        "output": {"text": {"values": ["It's a response"], "selection_policy": "multiline"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "Issue node 2"}]};
    expect(new AllSequential(testSkill).check().nodes.sort()).toEqual(["Issue node 1", "Issue node 2"].sort());
})

test('returns correct array of problem nodes if all nodes with single response are multiline', () => {
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
        "output": {"text": {"values": ["Some text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"second_intent\"",
        "dialog_node": "node_problem_123"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "node_problem_321"},
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
        "output": {"text": {"values": ["It's a response"], "selection_policy": "multiline"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name==\"true_intent\"",
        "dialog_node": "node_problem_1234"}]};
    expect(new AllSequential(testSkill).check().nodes.sort()).toEqual(["node_problem_1234", "node_problem_123", "node_problem_321"].sort());
})