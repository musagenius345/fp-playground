const { Map, List } = require('immutable');

// Create an empty tree
const emptyTree = Map({});

// Function to insert a value into the tree
function insert(tree, value) {
  if (tree.isEmpty()) {
    return Map({ value, left: emptyTree, right: emptyTree });
  }

  if (value < tree.get('value')) {
    return tree.set('left', insert(tree.get('left'), value));
  } else {
    return tree.set('right', insert(tree.get('right'), value));
  }
}

// Function to perform an in-order traversal
function inOrderTraversal(tree, visit) {
  if (tree.isEmpty()) {
    return;
  }

  inOrderTraversal(tree.get('left'), visit);
  visit(tree.get('value'));
  inOrderTraversal(tree.get('right'), visit);
}

// Example usage
let tree = emptyTree;
tree = insert(tree, 2);
tree = insert(tree, 1);
tree = insert(tree, 3);

const result = [];
inOrderTraversal(tree, (value) => result.push(value));

console.log(result); // Output: [1, 2, 3]
