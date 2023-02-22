class AllSequential{
    constructor(skill){
        this.skill = skill;
    }
    check() {
        // handle not having the keys getting below
        let nodesWithSingleResponse = this.skill['dialog_nodes'].filter(node => {
            if (Object.keys(node).includes('output') && Object.keys(node['output']).includes('text') && Object.keys(node['output']['text']).includes('values')){
                return node['output']['text']['values'].length === 1; 
            } 
            else {
                return false;
            }
        });
        let selectionPolicyMapped = nodesWithSingleResponse.map(node => node['output']['text']['selection_policy']);
        let nodesWithOneResponseButMultiline = nodesWithSingleResponse.filter(node => node['output']['text']['selection_policy'] != 'sequential');
        let problemNodeNames = nodesWithOneResponseButMultiline.map(node => node.hasOwnProperty('dialog_node') ? node['dialog_node']: node['title']);
        const booleanAllSequential = selectionPolicyMapped.every(element => element === 'sequential');
        // returning boolean if all single responses have sequential selection, nodes is those that have single response but aren't sequential selection
        return {'bool': booleanAllSequential, 'nodes': problemNodeNames};
    }
}

module.exports = {
    AllSequential
}