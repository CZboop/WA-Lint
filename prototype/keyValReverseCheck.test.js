const {KeyValReverseCheck} = require('./keyValReverseCheck.cjs');

// // // TESTING FUNCTION TO CHECK KEYS AND VALUES ARE REVERSED // // //

test('can say that two empty objects reversed', () => {
    let mapOne = {};
    let reverseMap = {};
    expect(new KeyValReverseCheck(mapOne, reverseMap).check()).toEqual(true);
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
    expect(new KeyValReverseCheck(mapOne, reverseMap).check()).toEqual(false);
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
    expect(new KeyValReverseCheck(mapOne, reverseMap).check()).toEqual(true);
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
    expect(new KeyValReverseCheck(mapOne, reverseMap).check()).toBe(false)
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
    expect(new KeyValReverseCheck(mapOne, reverseMap).check()).toBe(true);
})
