#!/usr/bin/env node


export class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
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
    if (node === null) return false;
    if (value === node.data) return true;
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

  deleteItem(value) {
    this.root = this.#deleteRecursive(value, this.root);
  }

  #deleteRecursive(value, node) {
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      node.left =  this.#deleteRecursive(value, node.left);
      return node;
    }
    if (value > node.data) {
      node.right =  this.#deleteRecursive(value, node.right);
      return node;
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
        node.right = this.#deleteRecursive(successorValue, node.right);
        return node;
      }
      return node;
    }
  }

  levelOrderForEach(callback) {
    if (this.root === null) return;
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    let queue = [this.root];
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  inOrderForEach(callback) {
    
  }

  preOrderForEach(callback) {

  }

  postOrderForEach(callback) {

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

//let tree = new Tree([2]);

// tree.prettyPrint();
// tree.deleteItem(6345);
// tree.prettyPrint();

// tree.prettyPrint();
// tree.insert(99);
// tree.prettyPrint();

tree.prettyPrint();
// console.log(tree.includes(1100));

//tree.levelOrderForEach(node => console.log(node.data));
//tree.levelOrderForEach();