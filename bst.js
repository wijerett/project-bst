


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

tree.insert(18);
tree.prettyPrint();

// let emptyTree = new Tree([]);
// emptyTree.insert(5);
// emptyTree.prettyPrint();
