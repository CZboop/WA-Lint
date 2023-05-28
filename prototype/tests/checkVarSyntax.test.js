let { CheckVarSyntax } = require('../src/checkVarSyntax.cjs');

// ========= TESTING METHOD TO FLAG ANYTHING THAT LOOKS LIKE A VARIABLE NOT DECLARED PROPERLY (MISSING DOLLAR SIGN) ========== //

// TESTING REGEX TO FIND ANYTHING OUTSIDE PROPERLY USED QUOTES - .getOutsideQuotes() method

test('get outside quotes method returns input excluding escaped double quotes', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test that included \"escaped quotes\" no escaped quotes";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "that", "included", "no", "escaped", "quotes"]);
})

test('get outside quotes method returns input excluding non escaped single quotes', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test that included 'single quotes' no single quotes";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "that", "included", "no", "single", "quotes"]);
})

test('get outside quotes method returns same as input if no quotes', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test that included no quotes at all";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "that", "included", "no", "quotes", "at", "all"]);
})

test('get outside quotes method ignores one single quote/ apostrophes', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test that didn't include quotes but an apostrophe";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "that", "didn't", "include", "quotes", "but", "an", "apostrophe"]);
})

test('get outside quotes method ignores one escaped double quote', () => {
    let testSkill = [];
    let testSyntaxChecker = new CheckVarSyntax(testSkill);
    let testString = "there once was a test with one \"escaped quote";
    expect(testSyntaxChecker.getOutsideQuotes(testString)).toEqual(["there", "once", "was", "a", "test", "with", "one", "\"escaped", "quote"]);
})