// sample watson skill taken and adapted from https://github.com/watson-developer-cloud/assistant-skill-analysis/blob/master/tests/resources/test_workspaces/skill-Customer-Care-Sample.json
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const importedTestSkill = require('../dataToTest/data.json');
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
        // TODO: add instructions and list of what this can do
    }

    runSomeChecks(toRun = ['some array of different check that can be run']) {
        // TODO:
    }

    checkMappingsAllMatchReverse(intentMappings, reverseMapping) {
        // here accounting for multiple intent mappings to check against a single reverse mapping
        // TODO: check if multiples of one or the other and check multiple reverse if needed?
        // rather than just checking if all match, adding to array
        // so will check if all match in each of potentially multiple mappings
        let intentMappingsMatchArray = [];
        for (let mappingVar of intentMappings) {
            // boolean logic should return true only if all match else false
            let currentMappingMatches = new KeyValReverseCheck(mappingVar, reverseMapping).check().allMatch; // getting just boolean part of return
            intentMappingsMatchArray.push(currentMappingMatches);
        }
        // TODO: get and give node id of where the mappings are coming from
        if (intentMappingsMatchArray.length == 0){
        console.log("\x1b[31m%s\x1b[0m", `${this.skillName}: No intent mappings found called ${this.intentMapping}`)
        }
        else {
            for (let [index, checkResult] of intentMappingsMatchArray.entries()) {
                checkResult == true ?
                console.log("\x1b[32m%s\x1b[0m", `Mapping ${index + 1}: All intents have been used in mappings`)
                :
                console.log("\x1b[31m%s\x1b[0m", `Mapping ${index + 1}: Not all intents have been used in mappings`);
                console.log()
            }
        }
        return intentMappingsMatchArray;
    }

    checkAllMultilineWhereExpected() {
        // TODO: refactor into different methods to call in different combinations
    }

    checkAllSequentialWhereExpected() {
        // TODO: refactor into different methods to call in different combinations
    }

    checkAllIntentsUsed(skill, intentMappings) {
        // TODO: refactor into different methods to call in different combinations
        let allIntentsUsed = new AllIntentsUsed(skill, this.intentVar ? this.intentVar : null);
        let allIntentsUsedInEntryCondition = allIntentsUsed.inEntryCondition();
        let allIntentsUsedInMappings = allIntentsUsed.inMapping(intentMappings);

        allIntentsUsedInEntryCondition.bool == true ?
        console.log("\x1b[32m%s\x1b[0m", `${this.skillName}: All intents have been used in entry conditions`) :
        console.log("\x1b[31m%s\x1b[0m", `${this.skillName}: Not all intents have been used in entry conditions`);

        allIntentsUsedInMappings.bool == true ?
        console.log("\x1b[32m%s\x1b[0m", `${this.skillName}: All intents have been used in mappings`) :
        console.log("\x1b[31m%s\x1b[0m", `${this.skillName}: Not all intents have been used in mappings`);
        // giving more details + / - diff of intents in skill vs conditions/mapping
        // TODO: add detail of where problems are, add unit tests for each aspect of this
        if (this.advancedMode == true && allIntentsUsedInMappings.bool == false && allIntentsUsedInEntryCondition.bool == false) {
            let extraInConditions = allIntentsUsedInEntryCondition.extra;
            let unusedInConditions = allIntentsUsedInEntryCondition.unused;
            console.log("\x1b[33m%s\x1b[0m", `${this.skillName} - Intent List vs Entry Condition Discrepancies:`);
            for (let extra of extraInConditions){
                console.log("\x1b[33m%s\x1b[0m", `+ ${extra}`);
            }
            for (let minus of unusedInConditions){
                console.log("\x1b[31m%s\x1b[0m", `- ${minus}`);
            }

            let extraInMappings = allIntentsUsedInMappings.extra;
            let unusedInMappings = allIntentsUsedInMappings.unused;
            // TODO: check/fix if needed how this handles having multiple mappings
            // missing in red, extra in yellow as bigger issues? missing from mapping or conditions but there in skill so can be classified into
            console.log("\x1b[33m%s\x1b[0m", `${this.skillName} - Intent List vs Mappings Discrepancies:`);
            for (let extra of extraInMappings){
                console.log("\x1b[33m%s\x1b[0m", `+ ${extra}`);
            }
            for (let minus of unusedInMappings){
                console.log("\x1b[31m%s\x1b[0m", `- ${minus}`);
            }
        }
        
        return { 'entryConditionsBool': allIntentsUsedInEntryCondition.bool, 'mappingBool' : allIntentsUsedInMappings.bool,  'entryConditionDetails': allIntentsUsedInEntryCondition, 'mappingDetails': allIntentsUsedInMappings};
    }

    getSkillName(skill) {
        // TODO: add numbers if already anonymous - need refactoring for that
        return skill.hasOwnProperty('name') ? skill['name'] : 'Anonymous skill';
    }

    runAllChecks() {
        let resultsMap = [];
        for (let [index, skill] of this.skills.entries()){
            this.skillName = this.getSkillName(skill);
            // console.log(`::RESULTS FOR SKILL #${index + 1} - ${skillName}::`)
            // instantiating objects that take in skill as param
            let helperFuncs = new Helper(skill);
            let allMultiline = new AllMultiline(skill);
            let allSequential = new AllSequential(skill);

            let intentList = helperFuncs.getListOfIntents();

            let intentMappings = helperFuncs.retrieveNamedContextVariable(this.intentMapping);
            let reverseMapping = helperFuncs.retrieveNamedContextVariable(this.reverseMapping);

            let allIntentsUsedInEntryCondition = this.checkAllIntentsUsed(skill, intentMappings);
            let intentMappingsAllMatchReverse = this.checkMappingsAllMatchReverse(intentMappings, reverseMapping)   

            let allMultilineWhereNeeded = allMultiline.check().bool;
            let allSequentialWhereNeeded = allSequential.check().bool;
            
            resultsMap[this.skillName] = {
                'intents_all_used_in_entry_conditions' : allIntentsUsedInEntryCondition,
                'all_multiline_where_multiple_responses' : allMultilineWhereNeeded,
                'all_sequential_where_one_response' : allSequentialWhereNeeded,
                'all_mappings_match_reverse' : intentMappingsAllMatchReverse
            };
            // logging in colour depending on whether tests failed or passed (blanket fail if failed anywhere for that skill)
            
            // currently the two below are yellow if failed, others red as bigger issues
            resultsMap[this.skillName]["all_multiline_where_multiple_responses"] == true ?
            console.log("\x1b[32m%s\x1b[0m", `${this.skillName}: All nodes with multiple responses are multiline`) :
            console.log("\x1b[33m%s\x1b[0m", `${this.skillName}: Not all nodes with multiple responses are multiline`);

            resultsMap[this.skillName]["all_sequential_where_one_response"] == true ?
            console.log("\x1b[32m%s\x1b[0m", `${this.skillName}: All nodes with one response are sequential`) :
            console.log("\x1b[33m%s\x1b[0m", `${this.skillName}: Not all nodes with one response are sequential`);

            resultsMap[this.skillName]["all_mappings_match_reverse"] == true ?
            console.log("\x1b[32m%s\x1b[0m", `${this.skillName}: All mappings match the reverse mapping`) :
            console.log("\x1b[31m%s\x1b[0m", `${this.skillName}: Not all mappings match the reverse mapping`); 
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
let testSkill = {
        "name": "Test Skill",
        "intents": [
          {
            "intent": "an_intent",
            "examples": []
          },
          {
            "intent": "other_intent",
            "examples": []
          },
          {
            "intent": "intent",
            "examples": []
          }
        ],
        "dialog_nodes" :
        [
            {
                "type": "standard",
                "title": "Provide location",
                "output": {
                  "text": {
                    "values": [
                      "We're located by Union Square on the corner of 13th and Broadway"
                    ],
                    "selection_policy": "sequential"
                  }
                },
                "parent": "Directions",
                "context" : {
                    "testMapping" : {
                        "first_intent" : "First Intent",
                        "second_intent" : "Second Intent",
                    },
                    "testReverseMapping" : {
                        "First Intent" : "first_intent",
                        "Second Intent" : "second_intent",
                        "Third Intent" : "third_intent"
                    }
                },
                "metadata": {},
                "conditions": "true",
                "dialog_node": "node_3_1522439390442"
              }
        ]
    }
const testCheckRunner = new StaticCheckRunner([fakeSkill], "test_string", "testMapping", "testReverseMapping", advancedMode = true);
testCheckRunner.runAllChecks();
// TODO: write report of test results
// TODO: look into feasibilty to connect direct with API key etc. 

module.exports = {
    StaticCheckRunner
}