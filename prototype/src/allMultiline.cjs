class AllMultiline {
    constructor (skill) {
        this.skill = skill;
    }
    check (){
        // handle not having the keys getting below
        let nodesWithMultiResponse = this.skill['dialog_nodes'].filter(node => {
            if (Object.keys(node).includes('output') && Object.keys(node['output']).includes('text') && Object.keys(node['output']['text']).includes('values')){
                return node['output']['text']['values'].length > 1; 
            } 
            else {
                return false;
            }
        });
        let selectionPolicyMapped = nodesWithMultiResponse.map(node => node['output']['text']['selection_policy']);
        let nodesWithMultipleResponsesButSequential = nodesWithMultiResponse.filter(node => node['output']['text']['selection_policy'] != 'multiline');
        let problemNodeNames = nodesWithMultipleResponsesButSequential.map(node => node.hasOwnProperty('dialog_node') ? node['dialog_node']: node['title']);
        const booleanAllMultiline = selectionPolicyMapped.every(element => element === 'multiline');
        // returning boolean if all multiple responses have mutliline selection, nodes is those that have multiple responses but aren't multiline selection
        return {'bool': booleanAllMultiline, 'nodes': problemNodeNames};
    }
}

module.exports = {
    AllMultiline
 }