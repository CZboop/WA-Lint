class ValidTree {
    constructor (skill) {
        this.skill = skill;
    }
    run(){
    }
    noRefsToNonExistentNodes(){

    }
    noRepeatedPreviousSiblings(){

    }
    noMultipleChildNodesWithNoPreviousSiblings(){
        // i.e. multiple nodes with same parent and no prev sibling trying to be first in the hierarchy
    }
}

module.exports = {
    ValidTree
}