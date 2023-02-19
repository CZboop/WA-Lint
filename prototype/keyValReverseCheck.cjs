class KeyValReverseCheck {
    constructor (initialObj, reverseObj) {
        this.initialObj = initialObj;
        this.reverseObj = reverseObj;
    }
    check() {
        // TODO: have it check key value pairs against each other to prevent edge cases where they match but not aligned on key values
        // sorting here but for finding the differences later
        const initialKeys = Object.keys(this.initialObj).sort();
        const initialVals = Object.values(this.initialObj).sort();
        const reverseKeys = Object.keys(this.reverseObj).sort();
        const reverseVals = Object.values(this.reverseObj).sort();

        const matches  = initialKeys.every(item => reverseVals.includes(item)) && reverseKeys.every(item => initialVals.includes(item));
        return matches;
        // const matches  = Object.keys(initialObj).every(item => Object.values(reverseObj).includes(item)) && Object.keys(reverseObj).every(item => Object.values(initialObj).includes(item));
        // TODO: return which ones don't match
        // if (matches) {
        //     return {'allMatch': true, 'mismatches' : null};
        // }
        // else {
        //     // const inInitialNotReverse = ;
        //     // const inReverseNotInitial = ;
        //     // do initial, reverse + and i
        //     return {'allMatch': false, 'mismatches' : []};
        // }
    }
}

module.exports = {
    KeyValReverseCheck
}
