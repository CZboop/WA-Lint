class KeyValReverseCheck {
    constructor (initialObj, reverseObj) {
        this.initialObj = initialObj;
        this.reverseObj = reverseObj;
    }
    check() {
        // now checking key value pairs against each other to prevent edge cases where they match across different key/val pairs
        const keyValPairsInitial = Object.entries(this.initialObj);
        const keyValPairsReverse = Object.entries(this.reverseObj);

        const diffs = [];

        let matches = true;
        for (let [key, val] of keyValPairsInitial){
            if (keyValPairsReverse.filter(item => item[0] == val && item[1] == key).length != 1) {
                matches = false;
                diffs.push({'diff': [key, val]});
                // break;
            }
            else {
                diffs.push({'same': [key, val]});
            }
        }
        for (let [key, val] of keyValPairsReverse){
            if (keyValPairsInitial.filter(item => item[0] == val && item[1] == key).length != 1) {
                matches = false;
                diffs.push({'diff': [key, val]});
                // break;
            }
            else {
                diffs.push({'same': [key, val]});
            }
        }
        // note, idea is to be able to log the differences in a useful way at later stage to make easier to fix if there's a mismatch
        // TODO: are there repetitions across first and second object? check and remove if so
        if (matches) {
            return {'allMatch': true, 'matches' : diffs};
        }
        else {
            return {'allMatch': false, 'matches' : diffs};
        }
    }
}

module.exports = {
    KeyValReverseCheck
}
