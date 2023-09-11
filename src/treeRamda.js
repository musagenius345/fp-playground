const R = require('ramda');

// Create an empty tree
const emptyTree = R.pipe(
  R.assoc('value', null),
  R.assoc('left', null),
  R.assoc('right', null)
)({});

// Function to insert a value into the tree
function insert(tree, value) {
  if (tree.value === null) {
    return R.pipe(
      R.assoc('value', value),
      R.assoc('left', emptyTree),
      R.assoc('right', emptyTree)
    )({});
  }

  if (value < tree.value) {
    return R.assoc('left', insert(tree.left, value), tree);
  } else {
    return R.assoc('right', insert(tree.right, value), tree);
  }
}

// Function to perform an in-order traversal
function inOrderTraversal(tree, visit) {
  if (tree.value === null) {
    return;
  }

  inOrderTraversal(tree.left, visit);
  visit(tree.value);
  inOrderTraversal(tree.right, visit);
}

// Example usage
let tree = emptyTree;
tree = insert(tree, 2);
tree = insert(tree, 1);
tree = insert(tree, 3);

const result = [];
inOrderTraversal(tree, (value) => result.push(value));

console.log(result); // Output: [1, 2, 3]
