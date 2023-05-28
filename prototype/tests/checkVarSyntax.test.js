let { CheckVarSyntax } = require('../src/checkVarSyntax.cjs');

// ========= TESTING METHOD TO FLAG ANYTHING THAT LOOKS LIKE A VARIABLE NOT DECLARED PROPERLY (MISSING DOLLAR SIGN) ========== //

// TESTING REGEX TO FIND ANYTHING OUTSIDE PROPERLY USED QUOTES - .getOutsideQuotes() method

test('get outside quotes method returns input excluding escaped double quotes', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test that included \"escaped quotes\" no escaped quotes";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "that", "included", "no", "escaped", "quotes"]);
})

test('get outside quotes method returns input excluding non escaped single quotes', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test that included 'single quotes' no single quotes";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "that", "included", "no", "single", "quotes"]);
})

test('get outside quotes method returns same as input if no quotes', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test that included no quotes at all";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "that", "included", "no", "quotes", "at", "all"]);
})

test('get outside quotes method ignores one single quote/ apostrophes', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test that didn't include quotes but an apostrophe";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "that", "didn't", "include", "quotes", "but", "an", "apostrophe"]);
})

test('get outside quotes method ignores one escaped double quote', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test with one \"escaped quote";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "with", "one", "\"escaped", "quote"]);
})

// === TESTING ABLE TO TELL WHEN SOMETHING IS AN EXCEPTION - .isException() METHOD ==== // 
// note this takes in an element in array of split conditions so not the whole of the node condition
test('testing $ var syntax exception returns true', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testCondition = "$test_variable";
    expect(testSyntaxChecker.isException(testCondition)).toBe(true);
})

test('testing # intent syntax exception returns true', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testCondition = "#test_intent";
    expect(testSyntaxChecker.isException(testCondition)).toBe(true);
})

test('testing input.text input syntax exception returns true', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testCondition = "input.text==";
    expect(testSyntaxChecker.isException(testCondition)).toBe(true);
})

test('testing random word undeclared as variable non-exception returns false', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testCondition = "real_variable_missing_dollar";
    expect(testSyntaxChecker.isException(testCondition)).toBe(false);
})

// ===== TESTING ABLE TO RETURN WHICH NODES HAVE ISSUES IN ENTRY CONDITIONS - .checkEntryConditions() METHOD ===== // 
test('testing one node with issue with no exceptions detected', () => {
    let testSkill = {"name": "test skill", "intents": [{"intent": "true_intent", "examples": []}, {"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text", "Some more text"], "selection_policy": "multiline"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "intent_name==\"first_intent\"",
        "dialog_node": "node_999"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name == \"second_intent\"",
        "dialog_node": "node_546"},
        {
        "type": "standard",
        "title": "A node",
        "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
        "context": {"a_context_var" : "a value",
            "test_var": "value if from another node"},
        "metadata": {},
        "conditions": "$intent_name==\"third_intent \"",
        "dialog_node": "node_123"},
        {
        "type": "standard",
        "title": "The node",
        "output": {"text": {"values": ["A response", "Another response"], "selection_policy": "multiline"}},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "node_143"},
        {
        "type": "standard",
        "title": "Node",
        "output": {"text": {"values": ["It's a response"], "selection_policy": "sequential"}},
        "context": {"placeholder" : null,
            "test_var": "another value"},
        "metadata": {},
        "conditions": "$intent_name <= \"true_intent\"",
        "dialog_node": "node_888"}]};
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    expect(testSyntaxChecker.checkEntryConditions().sort()).toEqual(["node_999"].sort());
})

test('testing one node with no issues but one exception ignored', () => {
    expect().toBe();
})

test('testing multiple nodes with issues detected', () => {
    expect().toBe();
})

test('testing a node with mixture of issues and exceptions detected', () => {
    expect().toBe();
})