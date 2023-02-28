// sample watson skill taken and adapted from https://github.com/watson-developer-cloud/assistant-skill-analysis/blob/master/tests/resources/test_workspaces/skill-Customer-Care-Sample.json
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const testSkill = require('../dataToTest/data.json');
const { AllIntentsUsed } = require('./allIntentsUsed.cjs');
const { AllMultiline } = require('./allMultiline.cjs');
const { AllSequential } = require('./allSequential.cjs');
const { Helper } = require('./helperFuncs.cjs');
const { KeyValReverseCheck } = require('./keyValReverseCheck.cjs');

// // // TEST SUITE CLASS TO RUN ON ALL TESTS ON THE GIVEN SKILL OR SKILLS // // //
// // SHOULD ALSO LOG WHERE THE ISSUES ARE // // 

class StaticCheckRunner {
    constructor(skills, intentVar = null, intentMapping, intentMappingReverse, advancedMode = false) {
        this.skills = skills; // all skills TODO: (check formatting of how they get combined if extracted in diff ways)
        this.intentVar = intentVar; // optional variable name used to store the intent
        this.intentMapping = intentMapping; // optional variable name used to store mappings of intent name: description for user
        this.intentMappingReverse = intentMappingReverse; // optional variable name used to store mappings of intent description: intent name
        this.advancedMode = advancedMode;
    }

    help() {
        console.log('TODO: add instructions and list of what this can do');
    }

    runSomeChecks(toRun = ['some array of different check that can be run']) {
        // TODO:
    }

    checkMappingsAllMatchReverse() {
        // TODO: refactor into different methods to call in different combinations
    }

    checkAllMultilineWhereExpected() {
        // TODO: refactor into different methods to call in different combinations
    }

    checkAllSequentialWhereExpected() {
        // TODO: refactor into different methods to call in different combinations
    }

    checkAllIntentsUsed(skill, skillName, intentMappings) {
        // TODO: refactor into different methods to call in different combinations
        let allIntentsUsed = new AllIntentsUsed(skill, this.intentVar ? this.intentVar : null);
        let allIntentsUsedInEntryCondition = allIntentsUsed.inEntryCondition();
        let allIntentsUsedInMappings = allIntentsUsed.inMapping(intentMappings);

        allIntentsUsedInEntryCondition.bool == true ?
        console.log("\x1b[32m%s\x1b[0m", `${skillName}: All intents have been used in entry conditions`) :
        console.log("\x1b[31m%s\x1b[0m", `${skillName}: Not all intents have been used in entry conditions`);

        allIntentsUsedInMappings.bool == true ?
        console.log("\x1b[32m%s\x1b[0m", `${skillName}: All intents have been used in mappings`) :
        console.log("\x1b[31m%s\x1b[0m", `${skillName}: Not all intents have been used in mappings`);
        // giving more details + / - diff of intents in skill vs conditions/mapping
        // TODO: add detail of where problems are, add unit tests for each aspect of this
        if (this.advancedMode == true) {
            let extraInConditions = allIntentsUsedInEntryCondition.extra;
            let unusedInConditions = allIntentsUsedInEntryCondition.unused;

            let extraInMappings = allIntentsUsedInMappings.extra;
            let unusedInMappings = allIntentsUsedInMappings.unused;
        }
        
        return { 'entryConditions': allIntentsUsedInEntryCondition, 'mapping' : allIntentsUsedInMappings };
    }

    getSkillName(skill) {
        return skill.hasOwnProperty('name') ? skill['name'] : 'Anonymous skill';
    }

    runAllChecks() {
        let resultsMap = [];
        for (let [index, skill] of this.skills.entries()){
            let skillName = this.getSkillName(skill);
            // console.log(`::RESULTS FOR SKILL #${index + 1} - ${skillName}::`)
            // instantiating objects that take in skill as param
            let helperFuncs = new Helper(skill);
            let allMultiline = new AllMultiline(skill);
            let allSequential = new AllSequential(skill);

            let intentList = helperFuncs.getListOfIntents();

            let intentMappings = helperFuncs.retrieveNamedContextVariable(this.intentMapping);
            let reverseMapping = helperFuncs.retrieveNamedContextVariable(this.reverseMapping);

            let allIntentsUsedInEntryCondition = this.checkAllIntentsUsed(skill, skillName, intentMappings);
            let intentMappingsAllMatchReverse = true;
            // here accounting for multiple intent mappings to check against a single reverse mapping
            // TODO: check if multiples of one or the other and check multiple reverse if needed?
            for (let mappingVar of intentMappings) {
                // boolean logic should return true only if all match else false
                let currentMappingMatches = new KeyValReverseCheck(mappingVar, reverseMapping).check().allMatch; // getting just boolean part of return
                intentMappingsAllMatchReverse = intentMappingsAllMatchReverse && currentMappingMatches;
            }
            // let allIntentsUsedInEntryCondition = allIntentsUsed.inEntryCondition().bool;
            let allMultilineWhereNeeded = allMultiline.check().bool;
            let allSequentialWhereNeeded = allSequential.check().bool;
            
            resultsMap[skillName] = {
                'intents_all_used_in_entry_conditions' : allIntentsUsedInEntryCondition,
                'all_multiline_where_multiple_responses' : allMultilineWhereNeeded,
                'all_sequential_where_one_response' : allSequentialWhereNeeded,
                'all_mappings_match_reverse' : intentMappingsAllMatchReverse
            };
            // logging in colour depending on whether tests failed or passed (blanket fail if failed anywhere for that skill)
            
            // currently the two below are yellow if failed, others red as bigger issues
            resultsMap[skillName]["all_multiline_where_multiple_responses"] == true ?
            console.log("\x1b[32m%s\x1b[0m", `${skillName}: All nodes with multiple responses are multiline`) :
            console.log("\x1b[33m%s\x1b[0m", `${skillName}: Not all nodes with multiple responses are multiline`);

            resultsMap[skillName]["all_sequential_where_one_response"] == true ?
            console.log("\x1b[32m%s\x1b[0m", `${skillName}: All nodes with one response are sequential`) :
            console.log("\x1b[33m%s\x1b[0m", `${skillName}: Not all nodes with one response are sequential`);

            resultsMap[skillName]["all_mappings_match_reverse"] == true ?
            console.log("\x1b[32m%s\x1b[0m", `${skillName}: All mappings match the reverse mapping`) :
            console.log("\x1b[31m%s\x1b[0m", `${skillName}: Not all mappings match the reverse mapping`); 
        }
        return resultsMap;
    }
}

let fakeSkill = {"name": "Test Skill", "intents": [{"intent": "first_intent", "examples": []}, {"intent": "third_intent", "examples": []}, {"intent": "second_intent", "examples": []}], "dialog_nodes": [
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

const testCheckRunner = new StaticCheckRunner([fakeSkill], "test_string", advancedMode = true);
testCheckRunner.runAllChecks();