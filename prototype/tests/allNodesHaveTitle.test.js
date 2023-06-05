let {AllNodesHaveTitle} = require('../src/allNodesHaveTitle.cjs');

// TESTING MAIN .check() METHOD - BOOLEAN PLUS ARRAY OF NODES WITHOUT TITLES //
test('skill where all nodes have titles returns true in boolean', () => {
    let testSkill = {
        "dialog_nodes": [
          {
          "type": "standard",
          "title": "A node",
          "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
          "context": {},
          "metadata": {},
          "conditions": "true",
          "dialog_node": "node_123"
        }
      ]};
    expect(new AllNodesHaveTitle(testSkill).check().bool).toBe(true);
})

test('skill where a node has empty string title returns false in boolean', () => {
    let testSkill = {
        "dialog_nodes": [
          {
          "type": "standard",
          "title": "A node",
          "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
          "context": {},
          "metadata": {},
          "conditions": "true",
          "dialog_node": "node_123"
        },
        {
            "type": "standard",
            "title": "",
            "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
            "context": {},
            "metadata": {},
            "conditions": "true",
            "dialog_node": "node_456"
          }
      ]};
    expect(new AllNodesHaveTitle(testSkill).check().bool).toBe(false);
})

test('skill where a node has no title key returns false in boolean', () => {
    let testSkill = {
        "dialog_nodes": [
          {
          "type": "standard",
          "title": "A node",
          "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
          "context": {},
          "metadata": {},
          "conditions": "true",
          "dialog_node": "node_123"
        },
        {
            "type": "standard",
            "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
            "context": {},
            "metadata": {},
            "conditions": "true",
            "dialog_node": "node_456"
          }
      ]};
    expect(new AllNodesHaveTitle(testSkill).check().bool).toBe(false);
})

test('skill where all nodes have titles returns empty node array', () => {
    let testSkill = {
        "dialog_nodes": [
          {
          "type": "standard",
          "title": "A node",
          "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
          "context": {},
          "metadata": {},
          "conditions": "true",
          "dialog_node": "node_123"
        },
        {
            "type": "standard",
            "title": "Another node",
            "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
            "context": {},
            "metadata": {},
            "conditions": "true",
            "dialog_node": "node_456"
          }
      ]};
    expect(new AllNodesHaveTitle(testSkill).check().nodesWithoutTitles).toEqual([]);
})

test('skill where not all nodes have titles returns nodes without titles in node array', () => {
    let testSkill = {
        "dialog_nodes": [
          {
          "type": "standard",
          "title": "",
          "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
          "context": {},
          "metadata": {},
          "conditions": "true",
          "dialog_node": "node_123"
        },
        {
            "type": "standard",
            "output": {"text": {"values": ["Some text"], "selection_policy": "sequential"}},
            "context": {},
            "metadata": {},
            "conditions": "true",
            "dialog_node": "node_456"
          }
      ]};
    expect(new AllNodesHaveTitle(testSkill).check().nodesWithoutTitles.sort()).toEqual(["node_123", "node_456"].sort());
})