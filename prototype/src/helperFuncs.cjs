class Helper {
    constructor(skill){
        this.skill = skill;
    }

    getListOfIntents() {
        const intentList = this.skill['intents'].map(intent => {return intent.intent});
        return intentList;
    }

    getEntities() {
        const entitiesList = this.skill['entities'];
        const topLevelEntities = entitiesList.map(entity => entity.entity);
        const entitiesAndValues = entitiesList.map(entity => {
            let entityName = entity["entity"];
            let entityValues = entity.values.map(value => value.value);
            
            let entityNameAndValues = {};
            entityNameAndValues[entityName] = entityValues;
            return entityNameAndValues;
        });
        return { entityNames : topLevelEntities, entitiesWithValues : entitiesAndValues};
    }
    
    retrieveNamedContextVariable(contextVar) {
        let hasContext = this.skill['dialog_nodes'].filter(obj => obj['context']!={} && obj['context']!=null );
        return hasContext.map(context => context['context'][contextVar] ).filter(context => context != undefined);
        // above should account for potentially giving multiple results?
    }

    checkArrayEquality(array1, array2) {
        // either null
        if (!array1 || !array2) {
            return false;
        }
        // length doesn't match
        if (array1.length != array2.length) {
            return false;
        }
        // sort both
        array1 = array1.sort();
        array2 = array2.sort();
        // loop through and check each index matches
        for (let i=0; i < array1.length; i++) {
            // note want to check for type as well here
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }

    returnArrayDiff(array1, array2){
        // TODO: handle multiples of the same item in array - i.e. are there the same number in each
        // combine arrays
        const combinedArray = [...array1, ...array2];

        // loop through and check each index matches
        // for ones in both, using one array so they don't get duplicated
        const inBoth = array1.filter(elem => { 
            if (array1.includes(elem) && array2.includes(elem)){
                return true;
            }
            return false;
        });
        const inOneNotTwo = combinedArray.filter(elem => { 
            if (array1.includes(elem) && !array2.includes(elem)){
                return true;
            }
            return false;
        });
        const inTwoNotOne = combinedArray.filter(elem => { 
            if (array2.includes(elem) && !array1.includes(elem)){
                return true;
            }
            return false;
        });
        const diffs = [...inBoth.map(item => {return {'same': item}}), ...inOneNotTwo.map(item => {return {'minus': item}}), 
        ...inTwoNotOne.map(item => {return {'plus': item}})];
        return diffs;
    }
}

module.exports = {
    Helper
}