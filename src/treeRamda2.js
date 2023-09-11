const R = require('ramda');

// Create an empty tree
const emptyTree = R.pipe(
  R.assoc('value', null),
  R.assoc('left', null),
  R.assoc('right', null),
  R.assoc('size', 0) // Store the size of the tree
)({});

// Function to insert a value into the tree
function insert(tree, value) {
  if (tree.value === null) {
    return R.pipe(
      R.assoc('value', value),
      R.assoc('left', emptyTree),
      R.assoc('right', emptyTree),
      R.assoc('size', 1)
    )({});
  }

  if (value < tree.value) {
    return R.pipe(
      R.assoc('left', insert(tree.left, value)),
      R.over(R.lensProp('size'), R.inc)
    )(tree);
  } else {
    return R.pipe(
      R.assoc('right', insert(tree.right, value)),
      R.over(R.lensProp('size'), R.inc)
    )(tree);
  }
}

// Function to perform an in-order traversal and return a new array with the values
function inOrderTraversal(tree, visit, offset = 0) {
  if (tree.value === null) {
    return [];
  }

  const leftValues = inOrderTraversal(tree.left, visit, offset);
  const currentValue = visit(tree.value, offset + leftValues.length);
  const rightValues = inOrderTraversal(tree.right, visit, offset + leftValues.length + 1);

  return [...leftValues, currentValue, ...rightValues];
}

// Example usage
let tree = emptyTree;
tree = insert(tree, 2);
tree = insert(tree, 1);
tree = insert(tree, 3);

const result = inOrderTraversal(tree, (value, index) => value);

console.log(result); // Output: [1, 2, 3]
