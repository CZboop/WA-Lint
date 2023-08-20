const {ValidTree} = require('../src/validTree.cjs');

// === TESTING CAN CHECK THE NODES REPRESENT A VALID TREE STRUCTURE THAT CAN BE REBUILT WITHOUT CONFLICTS === //

// -- TESTING NO REFERENCES TO INVALID NODES .noRefsToNonExistentNodes METHOD-- //
// no invalid references returns object with true boolean and no further details
test('no refs to non existent nodes method returns object with true boolean and no details of nodes where there are issues', () => {
    const testSkill = {};
    const undertestClass = new ValidTree(testSkill);
    expect(undertestClass.noRefsToNonExistentNodes()).toBe({"bool": true, "details": []});
})

// invalid reference in jump to/next step returns object with false boolean and expected details of the issue
test('', () => {
    expect().toBe();
})

// invalid reference in previous sibling returns object with false boolean and expected details of the issue
test('', () => {
    expect().toBe();
})

// invalid reference in parent returns object with false boolean and expected details of the issue
test('', () => {
    expect().toBe();
})

// multiple invalid references in mixture of contexts returns object with false boolean and expected details of the issue
test('', () => {
    expect().toBe();
})

// -- TESTING NO REPEATED PREVIOUS SIBLINGS -- //
test('', () => {
    expect().toBe();
})

// -- TESTING NO REPEATED PARENTS FOR NODES WITH NO PREVIOUS SIBLINGS -- //
test('', () => {
    expect().toBe();
})

// -- TESTING RUN METHOD FOR ALL CHECKS -- //
test('', () => {
    expect().toBe();
})