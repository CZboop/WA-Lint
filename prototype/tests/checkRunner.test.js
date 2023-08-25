// // // TESTING CHECK RUNNER THAT NICELY RETURNS ALL OR SOME OF THE CHECKS ON AN ARRAY OF SKILLS // // //
let { CheckRunner } = require('../src/checkRunner.cjs');

// clearing mocks so that console spy doesn't remember logs from previous tests //
afterEach(() => {    
    jest.clearAllMocks();
  });

// // // GET SKILL NAME // // //
test('skill name returned if it has one', () => {
    let testSkill = {"name": "Test Skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};
    const checkRunner = new CheckRunner(testSkill);
    expect(checkRunner.getSkillName(testSkill)).toBe('Test Skill');
})

test('anonymous skill returned if skill doesn\'t have a name', () => {
    let testSkill = {"intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};
    const checkRunner = new CheckRunner(testSkill);
    expect(checkRunner.getSkillName(testSkill)).toBe('Anonymous skill');
})

// // // CHECKING MAPPINGS ALL MATCH REVERSE METHOD // // // 
// single mapping node that matches - array return
// TODO: fix failing test
test('single mapping node that matches reverse returns array with one true',() => {
    let testSkill = {"intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node",
            "reverse_map": {
                "one_" : "one",
                "two__" : "two",
                "three___" : "three"
            }
        },
        "metadata": {},
        "conditions": "true",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response"], "selection_policy": "sequential"}},
        "context": {"test_var" : "value if from this node",
            "needle": "search complete"},
        "metadata": {},
        "conditions": "false",
        "dialog_node": "Opening"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value",
            "intent_map": {
                "one" : "one_",
                "two" : "two__",
                "three" : "three___"
            }
        },
        "metadata": {},
        "conditions": "$maybe == true",
        "dialog_node": "Opening"}]};
    const checkRunner = new CheckRunner(testSkill, intentMapping = 'intent_map', intentMappingReverse = 'reverse_map');
    expect(checkRunner.checkMappingsAllMatchReverse(testSkill)).toBe([true]);
})

// single mapping node that matches - console log
test('', () => {
    expect().toBe();
})

// single mapping node that doesn't match - array return
test('', () => {
    expect().toBe();
})

// single mapping node that doesn't match - console log
test('', () => {
    expect().toBe();
})

// multiple mapping nodes that match - array return
test('', () => {
    expect().toBe();
})

// multiple mapping nodes that match - console log
test('', () => {
    expect().toBe();
})

// multiple mapping nodes that don't match - array return
test('', () => {
    expect().toBe();
})

// multiple mapping nodes that don't match - console log
test('', () => {
    expect().toBe();
})

// error logged if not finding the mappings in context
// TODO: fix failing test
test('log message with error if mappings not found in context', () => {
    let testSkill = {"intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
    {
    "type": "standard",
    "title": "A node",
    "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "sequential"}},
    "context": {"a_context_var" : "a value",
        "test_var": "value if from another node"},
    "metadata": {},
    "conditions": "$intent_name==\"first_intent\"",
    "dialog_node": "just_a_node"},
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
let consoleSpy = jest.spyOn(console, 'log');

let reverseMatchCheck = new CheckRunner(testSkill, intentMapping = "intent_mapping_context").checkMappingsAllMatchReverse(testSkill);
expect(consoleSpy.mock.calls[0][1]).toBe('Anonymous skill: No intent mappings found called intent_mapping_context');
})

// // // CHECK ALL MULTILINE WHERE EXPECTED // // // 
// testing that returns expected / same as running the check
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
    expect(new CheckRunner(testSkill).checkAllMultilineWhereExpected(testSkill).bool).toBe(true);
})

test('returns false if not all nodes with multiple responses are set as multiline', () => {
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
    expect(new CheckRunner(testSkill).checkAllMultilineWhereExpected(testSkill).bool).toBe(false);
})

// testing that logs the right thing - nodes that aren't correct for multiline test
test('logs message that not all multiline if not all nodes with multiple responses are set as multiline', () => {
    let testSkill = {"intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "just_a_node"},
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
    let consoleSpy = jest.spyOn(console, 'log');

    let multilineCheck = new CheckRunner(testSkill).checkAllMultilineWhereExpected(testSkill);
    expect(consoleSpy.mock.calls[0][1]).toBe('Anonymous skill: Not all nodes with multiple responses are multiline');
})

test('logs problem nodes if not all nodes with multiple responses are set as multiline', () => {
    let testSkill = {"intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"first_intent\"",
        "dialog_node": "just_a_node"},
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
    let consoleSpy = jest.spyOn(console, 'log');

    let multilineCheck = new CheckRunner(testSkill).checkAllMultilineWhereExpected(testSkill);
    expect(consoleSpy.mock.calls[1][1]).toBe('Nodes that should be multiline:\n - just_a_node');
})


// // // CHECK ALL SEQUENTIAL WHERE EXPECTED // // // 
// testing that returns expected / same as running the check
test('returns true if all nodes with single responses are set as sequential', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
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
    expect(new CheckRunner(testSkill).checkAllSequentialWhereExpected(testSkill).bool).toBe(true);
})

test('returns false if not all nodes with single responses are set as sequential', () => {
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
    expect(new CheckRunner(testSkill).checkAllSequentialWhereExpected(testSkill).bool).toBe(false);
})

// testing that logs the right thing - nodes that aren't correct for sequential test
test('logs message that not all sequential if not all nodes with single responses are set as sequential', () => {
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
    let consoleSpy = jest.spyOn(console, 'log');

    let sequentialCheck = new CheckRunner(testSkill).checkAllSequentialWhereExpected(testSkill);
    expect(consoleSpy.mock.calls[0][1]).toBe('test skill: Not all nodes with single responses are sequential');
})

test('logs problem nodes if not all nodes with single responses are set as sequential', () => {
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
        "dialog_node": "Opening 0"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "Opening 1"},
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
    let consoleSpy = jest.spyOn(console, 'log');

    let sequentialCheck = new CheckRunner(testSkill).checkAllSequentialWhereExpected(testSkill);
    // console.log(consoleSpy.mock.calls);
    expect(consoleSpy.mock.calls[1][1]).toBe('Nodes that should be sequential:\n - Opening 0\n - Opening 1');
})

// // // CHECK ALL INTENTS USED // // // 


// // // RUN ALL CHECKS // // //

// // //
// test('', () => {
//     expect().toBe();
// })

// // // TEST READ SETTINGS // // //


// // // TEST LOAD SKILLS FROM FILES // // //


// // // TEST LOAD SKILLS FROM API // // // 