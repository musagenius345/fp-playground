import * as fp from 'fp-ts';
import { pipe } from 'fp-ts/function';

// Define a binary tree data structure
type BinaryTree<A> =
  | { tag: 'Leaf' }
  | { tag: 'Node'; value: A; left: BinaryTree<A>; right: BinaryTree<A> };

// Create an empty tree
const emptyTree: BinaryTree<number> = { tag: 'Leaf' };

// Function to insert a value into the tree
function insert<A>(tree: BinaryTree<A>, value: A): BinaryTree<A> {
  return tree.tag === 'Leaf'
    ? { tag: 'Node', value, left: emptyTree, right: emptyTree }
    : value < tree.value
    ? pipe(tree, fp.Eq, (eq) =>
        eq.equals(tree, { tag: 'Node', value: tree.value, left: insert(tree.left, value), right: tree.right })
      )
    : pipe(tree, fp.Eq, (eq) =>
        eq.equals(tree, { tag: 'Node', value: tree.value, left: tree.left, right: insert(tree.right, value) })
      );
}

// Function to perform an in-order traversal
function inOrderTraversal<A>(tree: BinaryTree<A>, visit: (value: A) => void): void {
  if (tree.tag === 'Node') {
    inOrderTraversal(tree.left, visit);
    visit(tree.value);
    inOrderTraversal(tree.right, visit);
  }
}

// Example usage
let tree: BinaryTree<number> = emptyTree;
tree = insert(tree, 2);
tree = insert(tree, 1);
tree = insert(tree, 3);

const result: number[] = [];
inOrderTraversal(tree, (value) => result.push(value));

console.log(result); // Output: [1, 2, 3]
