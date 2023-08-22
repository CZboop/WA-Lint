class ValidTree {
    constructor (skill) {
        this.skill = skill;
    }
    run(){
        // run all of the methods and return all the info
        const noRefsToNonExistentNodes = this.noRefsToNonExistentNodes();
        const noRepeatedPreviousSiblings = this.noRepeatedPreviousSiblings();
        const noMultipleChildNodesWithNoPreviousSiblings = this.noMultipleChildNodesWithNoPreviousSiblings();

        const resultObj = {};

        resultObj["noRefsToNonExistentNodes"] = noRefsToNonExistentNodes;
        resultObj["noRepeatedPreviousSiblings"] = noRepeatedPreviousSiblings;
        resultObj["noMultipleChildNodesWithNoPreviousSiblings"] = noMultipleChildNodesWithNoPreviousSiblings;

        return resultObj;
    }
    noRefsToNonExistentNodes(){
        // possible places to reference - parent, sibling, jump to
        // getting all node ids to use as reference - these are the only valid ones to reference
        const allValidNodeIds = this.skill.dialog_nodes.map(node => node.dialog_node).filter(node => !!node); // remove falsy
        // for each of the possible properties to reference other nodes, filter to invalid and map to add a type property so we know which ref is invalid
        const nodesWithInvalidParent = this.skill.dialog_nodes.filter(node => node.hasOwnProperty("parent")).filter(node => !allValidNodeIds.includes(node.parent)).map(node => {return {"type": "parent", "node": node} });
        const nodesWithInvalidPrevSibling = this.skill.dialog_nodes.filter(node => node.hasOwnProperty("previous_sibling")).filter(node => !allValidNodeIds.includes(node.previous_sibling)).map(node => {return {"type": "previous_sibling", "node": node} });
        const nodesWithInvalidNextStep = this.skill.dialog_nodes.filter(node => node.hasOwnProperty("next_step")).filter(node => node.next_step.hasOwnProperty("dialog_node")).filter(node => !allValidNodeIds.includes(node.next_step.dialog_node)).map(node => {return {"type": "next_step", "node": node} });

        // combine all the arrays made above
        const nodesWithInvalidRefs = nodesWithInvalidParent.concat(nodesWithInvalidPrevSibling, nodesWithInvalidNextStep);
        // boolean for whether any invalid
        const isNoInvalid = nodesWithInvalidRefs.length === 0;
        const detailsOfInvalid = [];

        // iterate to add meaningful info on each issue to detailsOfInvalid array
        for (let i = 0; i < nodesWithInvalidRefs.length; i++) {
            const type = nodesWithInvalidRefs[i].type;
            const nodeFrom = nodesWithInvalidRefs[i].node.dialog_node;
            const nodeTo = type === "parent" ? nodesWithInvalidRefs[i].node.parent : type === "previous_sibling" ? nodesWithInvalidRefs[i].node.previous_sibling : nodesWithInvalidRefs[i].node.next_step.dialog_node;
            const detailsObj = {"type": type, "nodeFrom": nodeFrom, "nodeTo": nodeTo};
            detailsOfInvalid.push(detailsObj);
        }
        // create and return final object
        return {"bool" : isNoInvalid, "details" : detailsOfInvalid};
    }
    noRepeatedPreviousSiblings(){
        const allPreviousSiblings = this.skill.dialog_nodes.map(node => node.previous_sibling).filter(sibling => !!sibling); //remove anything falsy
        const repeatedPreviousSiblings = allPreviousSiblings.filter((item, index) => allPreviousSiblings.indexOf(item) != index);
        // getting only unique values once we know the previous sibling has been found to be repeated
        const repeatedPreviousSiblingsSet = repeatedPreviousSiblings.filter((item, index) => repeatedPreviousSiblings.indexOf(item) === index);
        const isNoRepeatedPreviousSiblings = repeatedPreviousSiblings.length === 0;
        const repeatedPreviousSiblingDetails = [];
        console.log("REPEATED PREV SIBLINGS SET: " + repeatedPreviousSiblingsSet);
        for (let i = 0; i < repeatedPreviousSiblingsSet.length; i++) {
            let currentPreviousSibling = repeatedPreviousSiblingsSet[i];
            let nodesWithCurrentPreviousSiblings = this.skill.dialog_nodes.filter(node => node.previous_sibling === currentPreviousSibling).map(node => node.dialog_node);
            let currentDetails = {};
            currentDetails["sharedSibling"] = currentPreviousSibling;
            currentDetails["nodes"] = nodesWithCurrentPreviousSiblings.sort();
            repeatedPreviousSiblingDetails.push(currentDetails);
        }
        return {"bool" : isNoRepeatedPreviousSiblings, "details" : repeatedPreviousSiblingDetails};
    }
    noMultipleChildNodesWithNoPreviousSiblings(){
        // i.e. multiple nodes with same parent and no prev sibling trying to be first in the hierarchy
        // getting nodes which had a parent and no previous siblings
        const nodesWithParentAndNoPrevSibling = this.skill.dialog_nodes.filter(node => node.hasOwnProperty("parent") && !node.hasOwnProperty("previous_sibling"));
        const parentsOfNodesWithNoPrevSibling = nodesWithParentAndNoPrevSibling.map(node => node.parent).filter(parent => !!parent);
        // from above, getting repeated parents
        const repeatedParentNodes = parentsOfNodesWithNoPrevSibling.filter((element, index) => { return parentsOfNodesWithNoPrevSibling.indexOf(element) != index });
        const repeatedParentNodesSet = repeatedParentNodes.filter((element, index) => {return repeatedParentNodes.indexOf(element) === index});
        // then using parents to get the nodes back
        // const topNodesWithRepeatedParentNodes = nodesWithParentAndNoPrevSibling.filter(node => repeatedParentNodes.includes(node.parent));
        const isNoMultipleTopChildNodes = repeatedParentNodesSet.length === 0;
        const sameParentMultipleTopChildrenDetails = [];
        for (let i = 0; i < repeatedParentNodesSet.length; i++) {
            let currentDetails = {};
            let parentNode = repeatedParentNodesSet[i];
            let competingChildNodes = nodesWithParentAndNoPrevSibling.filter(node => node.parent === parentNode).map(node => node.dialog_node);
            currentDetails["parentNode"] = parentNode;
            currentDetails["childNodes"] = competingChildNodes.sort();

            sameParentMultipleTopChildrenDetails.push(currentDetails);
        }
        return {"bool" : isNoMultipleTopChildNodes, "details" : sameParentMultipleTopChildrenDetails};
    }
}

// TODO: test for repeated node ids? can this happen?

module.exports = {
    ValidTree
}