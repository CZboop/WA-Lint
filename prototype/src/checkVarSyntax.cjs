// looking for context variables that aren't using correct syntax
// e.g. missing the dollar sign
// import settings from './settings.json';

class CheckVarSyntax{
    constructor (skill) {
        this.skill = skill;
        // TODO: use the exceptions within main check
        // this.exceptions = settings.checkVarSyntax.exceptions;
    }
    run(){
        // NOTE: what scope? looking in entry conditions, context setting, maybe responses
        // need to exclude anything within quotes/strings - will be escaped by default, and need to account for both double and single quotes
        return this.checkEntryConditions();
        
    }
    checkEntryConditions(){
        // NOTE: not sure how feasible to use just regex to get anything outside escaped quotes, using regex with string manipulation to filter instead
        let allNodeEntryConditions = this.skill['dialog_nodes'].filter(node => {

        })
    }
    getOutsideQuotes(string){
        // TODO: take the string as it would be in the value of the key in dialog node, get anything that not inside quotes, split by spaces
        // e.g. of what working with "@sys-something || input.text == \"something\" && @sys-number || input.text == \"that\""
        let splitNotInEscapedDoubleQuotes = string.split(/".*?"/); // note removing the parentheses around capturing group = delimiter not in returned array
        splitNotInEscapedDoubleQuotes = splitNotInEscapedDoubleQuotes.map(element => element.trim()); // removing whitespace
        let joinedNoEscapedQuotes = splitNotInEscapedDoubleQuotes.join(" ");
        // TODO: make single quotes check word boundary so can ignore if two apostrophes?
        let splitNotInSingleQuotes = joinedNoEscapedQuotes.split(/'.*?'/);
        splitNotInSingleQuotes = splitNotInSingleQuotes.map(element => element.trim());
        // TODO: test these regex thoroughly/separately - trying to split across the escaped quotes and anything inside to remove anything between
        return splitNotInSingleQuotes.join(" ").split(" "); // joining and splitting on space as starting can have elements with multi space
    }
}

module.exports = {
    CheckVarSyntax
}