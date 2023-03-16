// // // TESTING CHECK RUNNER THAT NICELY RETURNS ALL OR SOME OF THE CHECKS ON AN ARRAY OF SKILLS // // //
let { StaticCheckRunner } = require('../src/checkRunner.cjs');

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
    const checkRunner = new StaticCheckRunner(testSkill);
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
    const checkRunner = new StaticCheckRunner(testSkill);
    expect(checkRunner.getSkillName(testSkill)).toBe('Anonymous skill');
})

// // // CHECKING MAPPINGS ALL MATCH REVERSE CHECK METHOD // // // 

// // // CHECK ALL MULTILINE WHERE EXPECTED // // // 


// // // CHECK ALL SEQUENTIAL WHERE EXPECTED // // // 

// // // CHECK ALL INTENTS USED // // // 


// // // RUN ALL CHECKS // // //

// // //
// test('', () => {
//     expect().toBe();
// })