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
        // TODO: handle multiple conditions for one node
        let singleEqualsInConditions = this.skill['dialog_nodes'].filter(node => {return node.conditions.includes("=") && !node.conditions.includes("==")});
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