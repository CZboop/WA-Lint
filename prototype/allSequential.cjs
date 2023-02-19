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
        return selectionPolicyMapped.every(element => element === 'sequential');
    }
}

module.exports = {
    AllSequential
}