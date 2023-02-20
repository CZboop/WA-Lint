const {KeyValReverseCheck} = require('./keyValReverseCheck.cjs');

// // // TESTING BOOLEAN OF WHETHER KEYS AND VALUES ARE REVERSED // // //

test('can say that two empty objects reversed', () => {
    let mapOne = {};
    let reverseMap = {};
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().allMatch).toEqual(true);
})

test('can say that two objects that match exactly are not the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().allMatch).toEqual(false);
})

test('can tell that two short objects are the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'some value' : 'key1',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().allMatch).toEqual(true);
})

test('says two objects that almost match reversed, with one difference, are not the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'some value' : 'key0',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().allMatch).toBe(false)
})

test('can tell objects with same elements reversed, in different order, are the reverse of each other', () => {
    let mapOne = {
        'key6' : 'last value',
        'key2' : 'another value',
        'key1' : 'some value',
        'key4' : 'fourth value',
        'key3' : 'value three',
        'key5' : 'penultimate value'
    };
    let reverseMap = {
        'some value' : 'key1',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().allMatch).toBe(true);
})

// // // TESTING DIFF OF WHICH KEYS AND VALUES ARE REVERSED // // //

test('can say that two empty objects reversed', () => {
    let mapOne = {};
    let reverseMap = {};
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().matches).toEqual([]);
})

test('can say that two objects that match exactly are not the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().matches).toEqual(
        [{"diff": ["key1", "some value"]}, {"diff": ["key2", "another value"]}, {"diff": ["key3", "value three"]}, 
        {"diff": ["key4", "fourth value"]}, {"diff": ["key5", "penultimate value"]}, {"diff": ["key6", "last value"]}, 
        {"diff": ["key1", "some value"]}, {"diff": ["key2", "another value"]}, {"diff": ["key3", "value three"]}, 
        {"diff": ["key4", "fourth value"]}, {"diff": ["key5", "penultimate value"]}, {"diff":["key6","last value"]}]
    );
})

test('can tell that two short objects are the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'some value' : 'key1',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().matches).toEqual(
        [{"same": ["key1", "some value"]}, {"same": ["key2", "another value"]}, {"same": ["key3", "value three"]}, 
        {"same": ["key4", "fourth value"]}, {"same": ["key5", "penultimate value"]}, {"same": ["key6", "last value"]}, 
        {"same": ["some value", "key1"]}, {"same": ["another value", "key2"]}, {"same": ["value three", "key3"]}, 
        {"same": ["fourth value", "key4"]}, {"same": ["penultimate value", "key5"]}, {"same":["last value", "key6"]}]
    );
})

test('says two objects that almost match reversed, with one difference, are not the reverse of each other', () => {
    let mapOne = {
        'key1' : 'some value',
        'key2' : 'another value',
        'key3' : 'value three',
        'key4' : 'fourth value',
        'key5' : 'penultimate value',
        'key6' : 'last value'
    };
    let reverseMap = {
        'some value' : 'key0',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().matches).toEqual(
        [{"diff": ["key1", "some value"]}, {"same": ["key2", "another value"]}, {"same": ["key3", "value three"]}, 
        {"same": ["key4", "fourth value"]}, {"same": ["key5", "penultimate value"]}, {"same": ["key6", "last value"]}, 
        {"diff": ["some value", "key0"]}, {"same": ["another value", "key2"]}, {"same": ["value three", "key3"]}, 
        {"same": ["fourth value", "key4"]}, {"same": ["penultimate value", "key5"]}, {"same":["last value", "key6"]}]
    )
})

test('can tell objects with same elements reversed, in different order, are the reverse of each other', () => {
    let mapOne = {
        'key6' : 'last value',
        'key2' : 'another value',
        'key1' : 'some value',
        'key4' : 'fourth value',
        'key3' : 'value three',
        'key5' : 'penultimate value'
    };
    let reverseMap = {
        'some value' : 'key1',
        'another value' : 'key2',
        'value three' : 'key3',
        'fourth value' : 'key4',
        'penultimate value' : 'key5',
        'last value' : 'key6'
    };
    expect(new KeyValReverseCheck(mapOne, reverseMap).check().matches).toEqual(
        [{"same": ["key6", "last value"]}, {"same": ["key2", "another value"]}, {"same": ["key1", "some value"]}, 
        {"same": ["key4", "fourth value"]}, {"same": ["key3", "value three"]}, {"same": ["key5", "penultimate value"]}, 
        {"same": ["some value", "key1"]}, {"same": ["another value", "key2"]}, {"same": ["value three", "key3"]}, 
        {"same": ["fourth value", "key4"]}, {"same": ["penultimate value", "key5"]}, {"same":["last value", "key6"]}]
    );
})