class KeyValReverseCheck {
    constructor (initialObj, reverseObj) {
        this.initialObj = initialObj;
        this.reverseObj = reverseObj;
    }
    check() {
        // now checking key value pairs against each other to prevent edge cases where they match across different key/val pairs
        const keyValPairsInitial = Object.entries(this.initialObj);
        const keyValPairsReverse = Object.entries(this.reverseObj);

        let matches = true;
        for (let [key, val] of keyValPairsInitial){
            if (keyValPairsReverse.filter(item => item[0] == val && item[1] == key).length != 1) {
                matches = false;
                break;
            }
        }
        for (let [key, val] of keyValPairsReverse){
            if (keyValPairsInitial.filter(item => item[0] == val && item[1] == key).length != 1) {
                matches = false;
                break;
            }
        }
        return matches;
        // TODO: return which ones don't match/diff
        // if (matches) {
        //     return {'allMatch': true, 'mismatches' : null};
        // }
        // else {
        //     const diffArray = [];
        //     // const inInitialNotReverse = ;
        //     // const inReverseNotInitial = ;
        //     // do initial, reverse + and -
        //     return {'allMatch': false, 'mismatches' : []};
        // }
    }
}

module.exports = {
    KeyValReverseCheck
}
