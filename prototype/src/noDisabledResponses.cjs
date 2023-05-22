class NoDisabledResponses {
    constructor (skill) {
        this.skill = skill;
    }
    run(){
        // get all response type nodes from the skill
        let allResponsesInSkill = this.skill['dialog_nodes'].filter(node => node.type === 'response_condition');
        // if no response type nodes in skill, return true and empty array of node ids, skip further evaluation
        if (allResponsesInSkill.length === 0){
            return {'bool' : true, 'nodeIds' : []};
        }
        // get response nodes which are disabled
        let disabledResponses = allResponsesInSkill.filter(response => response.disabled == true);
        if (disabledResponses.length === 0) {
            return {'bool' : true, 'nodeIds' : []};
        }
        // if disabled response nodes are disabled, return the node ids
        else {
            let responseIds = disabledResponses.map(responses => responses.dialog_node);
            return {'bool' : false, 'nodeIds' : responseIds};
        }
    }
}

module.exports = {
    NoDisabledResponses
}