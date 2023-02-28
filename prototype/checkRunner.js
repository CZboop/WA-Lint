// sample watson skill taken and adapted from https://github.com/watson-developer-cloud/assistant-skill-analysis/blob/master/tests/resources/test_workspaces/skill-Customer-Care-Sample.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const skill = require('./dataToTest/data.json');
const { AllIntentsUsed } = require('./allIntentsUsed.cjs');
const { AllMultiline } = require('./allMultiline.cjs');
const { AllSequential } = require('./allSequential.cjs');
const { Helper } = require('./helperFuncs.cjs');
const { KeyValReverseCheck } = require('./keyValReverseCheck.cjs');

// // // TEST SUITE CLASS TO RUN ON ALL TESTS ON THE GIVEN SKILL OR SKILLS // // //
// // SHOULD ALSO LOG WHERE THE ISSUES ARE // // 

class StaticCheckRunner {
    constructor(skills, intentVar = null, intentMapping, intentMappingReverse) {
        this.skills = skills; // all skills TODO: (check formatting of how they get combined if extracted in diff ways)
        this.intentVar = intentVar; // optional variable name used to store the intent
        this.intentMapping = intentMapping; // optional variable name used to store mappings of intent name: description for user
        this.intentMappingReverse = intentMappingReverse; // optional variable name used to store mappings of intent description: intent name
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

    checkAllIntentsUsed() {
        // TODO: refactor into different methods to call in different combinations
    }

    runAllChecks() {
        let resultsMap = [];
        for (let skill of this.skills){
            // instantiating objects that take in skill as param
            let helperFuncs = new Helper(skill);
            // TODO: find what going wrong in AllIntentsUsed, not recognising intentVar and some undefined errors
            let allIntentsUsed = new AllIntentsUsed(skill, this.intentVar ? this.intentVar : null);
            let allMultiline = new AllMultiline(skill);
            let allSequential = new AllSequential(skill);

            let intentList = helperFuncs.getListOfIntents(skill);

            let intentMappings = helperFuncs.retrieveNamedContextVariable(this.intentMapping);
            let reverseMapping = helperFuncs.retrieveNamedContextVariable(this.reverseMapping);

            let allIntentsUsedInEntryCondition = allIntentsUsed.inEntryCondition().bool;
            let allIntentsUsedInMapping = allIntentsUsed.inMapping(intentMappings).bool;

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
            let skillName = skill.hasOwnProperty('name') ? skill['name'] : 'Anonymous skill';
            resultsMap[skillName] = {
                'intents_all_used_in_entry_conditions' : allIntentsUsedInEntryCondition,
                'all_multiline_where_multiple_responses' : allMultilineWhereNeeded,
                'all_sequential_where_one_response' : allSequentialWhereNeeded,
                'all_mappings_match_reverse' : intentMappingsAllMatchReverse
            };
            // logging in colour depending on whether tests failed or passed (blanket fail if failed anywhere for that skill)
            resultsMap[skillName]["intents_all_used_in_entry_conditions"] == true ?
            console.log("\x1b[32m%s\x1b[0m", `${skillName}: All intents have been used in entry conditions`) :
            console.log("\x1b[31m%s\x1b[0m", `${skillName}: Not all intents have been used in entry conditions`);
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

const testCheckRunner = new StaticCheckRunner([skill], "test_string");
testCheckRunner.runAllChecks();