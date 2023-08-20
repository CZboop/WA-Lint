class ValidTree {
    constructor (skill) {
        this.skill = skill;
    }
    run(){
    }
    noRefsToNonExistentNodes(){
        // possible places to reference - parent, sibling, jump to
        const allValidNodeIds = this.skill.dialogNodes.map(node => node.dialog_node);
        const nodesWithInvalidRefs = this.skill.dialogNodes.filter(node => !allValidNodeIds.contains(node.parent) || !allValidNodeIds.contains(node.previous_sibling) || !allValidNodeIds.contains(node.next_step.dialog_node)); // TODO: handle if doesn't have some of these properties
        // NOTE: how to be able to also return which ref is invalid - where being made and where to
        return nodesWithInvalidRefs;
    }
    noRepeatedPreviousSiblings(){
        const allPreviousSiblings = this.skill.dialogNodes.map(node => node.previous_sibling);
        const repeatedPreviousSiblings = allPreviousSiblings.filter((item, index) => allPreviousSiblings.indexOf(item) != index);
        // TODO: return nice readable which can use to return full detail of what issues where
        return repeatedPreviousSiblings;
        
    }
    noMultipleChildNodesWithNoPreviousSiblings(){
        // i.e. multiple nodes with same parent and no prev sibling trying to be first in the hierarchy
        // getting nodes which had a parent and no previous siblings
        const nodesWithParentAndNoPrevSibling = this.skill.dialogNodes.filter(node => node.hasOwnProperty("parent") && !node.hasOwnProperty("previous_sibling"));
        const parentsOfNodesWithNoPrevSibling = nodesWithParentAndNoPrevSibling.map(node => node.parent);
        if (parentsOfNodesWithNoPrevSibling.length != new Set(parentsOfNodesWithNoPrevSibling).length) {
            return {}; // no issues stop evaluating
        }
        // from above, getting repeated parents
        const repeatedParentNodes = parentsOfNodesWithNoPrevSibling.filter((element, index) => { return parentsOfNodesWithNoPrevSibling.indexOf(element) != index });
        // then using parents to get the nodes back
        const nodesWithRepeatedParentNodes = nodesWithParentAndNoPrevSibling.filter(node => repeatedParentNodes.includes(node.parent));
        return nodesWithRepeatedParentNodes; // TODO: proper return
    }
}

module.exports = {
    ValidTree
}