// looking for context variables that aren't using correct syntax
// e.g. missing the dollar sign
const settings = require('./settings.json'); // note if not explicitly exported shouldn't/don't need {} named import

class CheckVarSyntax{
    constructor (skill) {
        this.skill = skill;
        // TODO: use the exceptions within main check
        this.exceptions = settings.checkVarSyntax.exceptions.filter(exception => exception.enabled == true);
    }
    run(){
        // NOTE: what scope? looking in entry conditions, context setting, maybe responses
        // need to exclude anything within quotes/strings - will be escaped by default, and need to account for both double and single quotes
        return this.checkEntryConditions();
    }
    checkEntryConditions(){
        // TODO: split by logical operators as these are still valid if not space between them and a variable for example
        // TODO: also ensure that within brackets e.g. inside func/method calls checking for vars to be used properly
        // TODO: add more sophisticated checks depending on the exception, e.g. if intent/entity exists, what the next characters are etc.
        let nodesWithProblematicEntryConditions = this.skill['dialog_nodes'].filter(node => {
            return this.getOutsideQuotes(node.conditions).some(conditionPart => !this.isException(conditionPart))
        })
        return nodesWithProblematicEntryConditions.map(node => node.dialog_node);
    }
    // checking if any of the exceptions match the condition, basic just using startswith currently
    isException(condition){
        // TODO: add numbers as exceptions (incl. negative? and decimal)
        let isException = this.exceptions.some(exception => condition.startsWith(exception.name));
        return isException;
    }
    getOutsideQuotes(string){
        // TODO: take the string as it would be in the value of the key in dialog node, get anything that not inside quotes, split by spaces
        // e.g. of what working with "@sys-something || input.text == \"something\" && @sys-number || input.text == \"that\" || $time == now"
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