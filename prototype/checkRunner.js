// sample watson skill taken and adapted from https://github.com/watson-developer-cloud/assistant-skill-analysis/blob/master/tests/resources/test_workspaces/skill-Customer-Care-Sample.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const skill = require('./dataToTest/data.json');
const functions = require('./testFuncs.cjs');

// // // TEST SUITE TO RUN ON ALL TESTS ON THE GIVEN SKILL OR SKILLS // // //

class StaticCheckRunner {
    constructor(skills, intentVar = null, intentMapping, intentMappingReverse) {
        this.skills = skills; // all skills TODO: (check formatting of how they get combined if extracted in diff ways)
        this.intentVar = intentVar; // optional variable name used to store the intent
        this.intentMapping = intentMapping; // optional variable name used to store mappings of intent name: description for user
        this.intentMappingReverse = intentMappingReverse; // optional variable name used to store mappings of intent description: intent name
    }

    runAllChecks() {
        let resultsMap = [];
        for (let skill of this.skills){
            let intentList = functions.getListOfIntents(skill);
            let intentMappings = functions.retrieveNamedContextVariable(skill, this.intentMapping);
            let reverseMapping = functions.retrieveNamedContextVariable(skill, this.reverseMapping);
            let intentMappingsAllMatchReverse = true;
            for (let mappingVar of intentMappings) {
                // boolean logic should return true only if all match else false
                let currentMappingMatches = functions.checkKeyValuesAlign(mappingVar, reverseMapping);
                intentMappingsAllMatchReverse = intentMapping && currentMappingMatches;
            }
            let allIntentsUsedInEntryCondition = functions.checkAllIntentsUsedInAnEntryCondition(skill);
            let allMultilineWhereNeeded = functions.checkAllNodesWithMultipleResponsesMultiline(skill);
            let allSequentialWhereNeeded = functions.checkAllNodesWithOneResponseSequential(skill);
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

const testCheckRunner = new StaticCheckRunner([skill]);
testCheckRunner.runAllChecks();