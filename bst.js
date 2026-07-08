


class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    let uniqueArray = [...new Set(array)];
    uniqueArray = uniqueArray.sort((a, b) => a - b);
    let root = this.#buildTreeRecursive(uniqueArray, 0, uniqueArray.length - 1 );
    return root;
  }

  #buildTreeRecursive(sortedArray, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let root = new Node(sortedArray[mid]);
    
    root.left = this.#buildTreeRecursive(sortedArray, start, mid - 1);
    root.right = this.#buildTreeRecursive(sortedArray, mid + 1, end);
    
    return root;
  }

  includes(value, node = this.root) {
    //case 1: node is null
    if (node === null) return false;
    //case 2: node.data === value
    if (value === node.data) return true;
    //case 3: decide to recurse into node.left or node.right
    if (value > node.data) {
      return this.includes(value, node.right);
    }
    if (value < node.data) {
      return this.includes(value, node.left);
    }
  }

  insert(value, node = this.root) {
    //accept and insert a new node with that value into the tree
    const temp = new Node(value);
    if (node === null) {
      this.root = temp;
      return;
    }
    while (node !== null) {
      if (node.data === value) return;
      if (node.data > value && node.left !== null) {
        node = node.left;
      } else if ( node.data < value && node.right !== null) {
        node = node.right;
      } else break;
    }
    if (node.data > value) node.left = temp;
    else node.right = temp;
    return node;
  }

  #findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  deleteItem(value, node = this.root) {
    // if no children set pointer from deleted nodes parent to null
    if (node === null) {
      return null;
    }
    if (value === node.data) {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null && node.right !== null) {
        return node.right;
      }
      if (node.left !== null && node.right === null) {
        return node.left;
      }
      if (node.left !== null && node.right !== null) {
        let successorValue = this.#findMin(node.right);
        node.data = successorValue;
        node.right = this.deleteItem(node.right, successorValue);
      }
      return node;
    }
    // if node has a child set the pointer from deleted node to point to child
    // if node has 2 children usually pick in-order successor(smallest value in the right subtree)
    // the inorder successor will always be bigger than the values in the left subtree and will be the smallest of all the children in the right subtree
    //1. search for the node with the target value
    //2. once found check how many children it has
      //0 remove it -> return null
      //1 replace it with its child and parents pointer skips over it points to its child directly -> return node.right or node.left
      //2 find the in order successor, smallest value in the right subtree, copy that value into the
      //   current node then recursively delete the successor from right subtree -> find in-order successor, copy its value into node.data
                                                                                      //delete successor from node.right
      //return node
  }


  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }
    this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}





let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// tree.insert(2);
// tree.prettyPrint();

// let emptyTree = new Tree([]);
// emptyTree.insert(5);
// emptyTree.prettyPrint();
