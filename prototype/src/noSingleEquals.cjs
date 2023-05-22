class NoSingleEquals {
    constructor (skill) {
        this.skill = skill;
    }
    run(){
        let singleEqualsInConditions = this.findSingleEqualsInConditions();
        return {'bool' : singleEqualsInConditions.length === 0, 'nodeIds' : this.getNodeIds(singleEqualsInConditions)};
    }
    getNodeIds(nodeArray){
        return nodeArray.map(node => node['dialog_node']);
    }
    findSingleEqualsInConditions(){
        // TODO: handle multiple conditions for one node (e.g. split by && or || but they will be one string in conditions)
        // regex matches single equals but excludes !=, >=, <= which are valid
        // NOTE: regex uses different lookbehind to lookahead, not sure if syntax would also be valid e.g. =! or =< currently not valid here
        let invalidEqualsRegex = new RegExp('(?<![><!=])=(?!=)', 'g');
        let singleEqualsInConditions = this.skill['dialog_nodes'].filter(node => {return node.conditions.match(invalidEqualsRegex)});
        return singleEqualsInConditions;
    }
    // findSingleEqualsInOutput(){
    //     // TODO: handle multiple outputs for one node
    //     // TODO: get to the actual output within the node, is this always the same? i.e. always generic? and need to map objects and arrays etc.
    //     let singleEqualsInOutput = this.this.skill['dialog_nodes'].filter(node => {return node.output.generic.contains("=") && !node.output.generic.contains("==")});
    //     return singleEqualsInOutput;
    // }
}

module.exports = {
    NoSingleEquals
}