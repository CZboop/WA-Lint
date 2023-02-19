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
        return selectionPolicyMapped.every(element => element === 'multiline');
    }
}

module.exports = {
    AllMultiline
 }