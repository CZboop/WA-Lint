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
        // TODO: actually change this to have a settings file and based on what in there the main run all function can run some things?
    }

    createReport(){
        // TODO:
    }

    checkMappingsAllMatchReverse(skill) {
        // check if object has helperfuncs yet and assign if not - in practice may or may not need to add here, 
        if (!Object.hasOwnProperty(this, 'helperFuncs')) {
            console.log('did not have helperFuncs property')
            this.helperFuncs = new Helper(skill);
        }
        let intentMappings = this.helperFuncs.retrieveNamedContextVariable(this.intentMapping);
        let reverseMapping = this.helperFuncs.retrieveNamedContextVariable(this.reverseMapping);
        console.log(intentMappings);
        console.log(reverseMapping);
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
        // TODO: add error throwing/logging for if reverse not found
        // TODO: add error throwing if these properties were not passed in original constructor
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

    checkAllMultilineWhereExpected(skill) {
        let skillName = this.getSkillName(skill);
        let allMultiline = new AllMultiline(skill);
        let multilineCheck = allMultiline.check();
        let allMultilineWhereNeeded = multilineCheck.bool;
        allMultilineWhereNeeded ?
        console.log("\x1b[32m%s\x1b[0m", `${skillName}: All nodes with multiple responses are multiline`) :
        console.log("\x1b[33m%s\x1b[0m", `${skillName}: Not all nodes with multiple responses are multiline`);

        if (!allMultilineWhereNeeded){
            let problemNodes = multilineCheck.nodes;
            console.log("\x1b[33m%s\x1b[0m", `Nodes that should be multiline:\n - ${problemNodes.join("\n - ")}`);
        }
        return multilineCheck;
    }

    checkAllSequentialWhereExpected(skill) {
        // TODO: refactor into different methods to call in different combinations
        // console.log('sequential called')
        let skillName = this.getSkillName(skill);
        let allSequential = new AllSequential(skill);
        let sequentialCheck = allSequential.check();
        let allSequentialWhereNeeded = sequentialCheck.bool;
        allSequentialWhereNeeded ?
        console.log("\x1b[32m%s\x1b[0m", `${skillName}: All nodes with single responses are sequential`) :
        console.log("\x1b[33m%s\x1b[0m", `${skillName}: Not all nodes with single responses are sequential`);

        if (!allSequentialWhereNeeded){
            let problemNodes = sequentialCheck.nodes;
            console.log("\x1b[33m%s\x1b[0m", `Nodes that should be sequential:\n - ${problemNodes.join("\n - ")}`);
        }
        return sequentialCheck;
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
        // TODO: add numbers if already anonymous - need refactoring for that but this is probably rare in practice
        return skill.hasOwnProperty('name') ? skill['name'] : 'Anonymous skill';
    }

    runAllChecks() {
        let resultsMap = [];
        for (let [index, skill] of this.skills.entries()){
            // this will be updating as iterate through skills so can change but easy access in the other methods
            this.skillName = this.getSkillName(skill);
            // console.log(`::RESULTS FOR SKILL #${index + 1} - ${skillName}::`)
            // instantiating objects that take in skill as param
            this.helperFuncs = new Helper(skill);
            let allSequential = new AllSequential(skill);

            let intentList = helperFuncs.getListOfIntents();

            let allIntentsUsedInEntryCondition = this.checkAllIntentsUsed(skill, intentMappings);
            let intentMappingsAllMatchReverse = this.checkMappingsAllMatchReverse(intentMappings, reverseMapping)   

            
            let allSequentialWhereNeeded = this.checkAllSequentialWhereExpected(skill).bool;
            let allMultilineWhereNeeded = this.checkAllMultilineWhereExpected(skill).bool;
            
            resultsMap[this.skillName] = {
                'intents_all_used_in_entry_conditions' : allIntentsUsedInEntryCondition,
                'all_multiline_where_multiple_responses' : allMultilineWhereNeeded,
                'all_sequential_where_one_response' : allSequentialWhereNeeded,
                'all_mappings_match_reverse' : intentMappingsAllMatchReverse
            };
            // logging in colour depending on whether tests failed or passed (blanket fail if failed anywhere for that skill)
            
            // currently the two below are yellow if failed, others red as bigger issues
            

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

// TODO: write report of test results
// TODO: look into feasibilty to connect direct with API key etc. 

module.exports = {
    StaticCheckRunner
}