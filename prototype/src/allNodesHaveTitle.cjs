class AllNodesHaveTitle {
    constructor (skill) {
        this.skill = skill;
    }
    check (){
        // TODO: make sure responses and others that don't expect to have title are excluded (but nothing unnecessary excluded)
        let standardNodes = this.skill["dialog_nodes"].filter(node => node.type == "standard");
        let nodesWithoutTitles = standardNodes.filter(node => {
            // TODO: are there other ways a missing title could show? null?
            return !node.hasOwnProperty("title") || node.title == "";
        });
        let allNodesHaveTitlesBool = nodesWithoutTitles.length === 0;
        let nodesWithoutTitlesIds = nodesWithoutTitles.map(node => node.dialog_node);

        return {"bool" : allNodesHaveTitlesBool, "nodesWithoutTitles" : nodesWithoutTitlesIds};
    }
}

module.exports = {
    AllNodesHaveTitle
 }