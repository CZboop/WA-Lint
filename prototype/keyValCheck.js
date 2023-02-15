class checkKeyValuesAlign {
    constructor (initialObj, reverseObj) {
        this.initialObj = initialObj;
        this.reverseObj = reverseObj;
    }
    check() {
    // TODO: have it check key value pairs against each other to prevent edge cases where they match but not aligned on key values
    // sorting here but for finding the differences later
    const initialKeys = Object.keys(initialObj).sort();
    const initialVals = Object.values(initialObj).sort();
    const reverseKeys = Object.keys(reverseObj).sort();
    const reverseVals = Object.values(reverseObj).sort();

    const matches  = initialKeys.every(item => reverseVals.includes(item)) && reverseKeys.every(item => initialVals.includes(item));
    // return matches;
    // const matches  = Object.keys(initialObj).every(item => Object.values(reverseObj).includes(item)) && Object.keys(reverseObj).every(item => Object.values(initialObj).includes(item));
    // TODO: return which ones don't match
    if (matches) {
        return {'allMatch': true, 'mismatches' : null};
    }
    else {
        // const inInitialNotReverse = ;
        // const inReverseNotInitial = ;
        // do initial, reverse + and i
        return {'allMatch': false, 'mismatches' : []};
    }
}
}
