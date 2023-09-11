"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp = require("fp-ts");
var function_1 = require("fp-ts/function");
// Create an empty tree
var emptyTree = { tag: 'Leaf' };
// Function to insert a value into the tree
function insert(tree, value) {
    return tree.tag === 'Leaf'
        ? { tag: 'Node', value: value, left: emptyTree, right: emptyTree }
        : value < tree.value
            ? (0, function_1.pipe)(tree, fp.Eq, function (eq) {
                return eq.equals(tree, { tag: 'Node', value: tree.value, left: insert(tree.left, value), right: tree.right });
            })
            : (0, function_1.pipe)(tree, fp.Eq, function (eq) {
                return eq.equals(tree, { tag: 'Node', value: tree.value, left: tree.left, right: insert(tree.right, value) });
            });
}
// Function to perform an in-order traversal
function inOrderTraversal(tree, visit) {
    if (tree.tag === 'Node') {
        inOrderTraversal(tree.left, visit);
        visit(tree.value);
        inOrderTraversal(tree.right, visit);
    }
}
// Example usage
var tree = emptyTree;
tree = insert(tree, 2);
tree = insert(tree, 1);
tree = insert(tree, 3);
var result = [];
inOrderTraversal(tree, function (value) { return result.push(value); });
console.log(result); // Output: [1, 2, 3]
