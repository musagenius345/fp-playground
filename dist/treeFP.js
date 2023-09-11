import * as fp from 'fp-ts';
import { pipe } from 'fp-ts/function';
// Create an empty tree
const emptyTree = { tag: 'Leaf' };
// Function to insert a value into the tree
function insert(tree, value) {
    return tree.tag === 'Leaf'
        ? { tag: 'Node', value, left: emptyTree, right: emptyTree }
        : value < tree.value
            ? pipe(tree, fp.Eq, (eq) => eq.equals(tree, { tag: 'Node', value: tree.value, left: insert(tree.left, value), right: tree.right }))
            : pipe(tree, fp.Eq, (eq) => eq.equals(tree, { tag: 'Node', value: tree.value, left: tree.left, right: insert(tree.right, value) }));
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
let tree = emptyTree;
tree = insert(tree, 2);
tree = insert(tree, 1);
tree = insert(tree, 3);
const result = [];
inOrderTraversal(tree, (value) => result.push(value));
console.log(result); // Output: [1, 2, 3]
