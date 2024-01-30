# WA Lint 🧹

Prototype linter for IBM Watson Assistant dialog skills. Uses JSON versions of files to check a few rules including:

- All entities defined are used, all entities used are defined
- All intents defined are used, all intents used are defined
- All nodes have titles
- All nodes with one response are sequential, all nodes with multiple are multiline
- All variables are used with the correct syntax
- No responses are disabled
- No single equals are used
- No encoding errors in training
- No invalid node relationships in the tree
