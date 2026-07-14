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
      throw new Error("No callback is given as argument");
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

  inOrderForEachR(callback, node = this.root) {
//Recursion
    if (typeof callback !== "function") {
      throw new Error("No callback is given as argument")
    }
    if (node === null) return;
    this.inOrderForEachR(callback, node.left);
    callback(node);
    this.inOrderForEachR(callback, node.right);
  }

  inOrderForEachI(callback) {
//Iteration
    if (typeof callback !== "function") {
      throw new Error("No callback is given as argument")
    }
    let stack = [];
    let current = this.root;

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
      let popped = stack.pop();
      callback(popped);
      current = popped.right;
    }
  }

  preOrderForEachR(callback, node = this.root) {
//Recursion
    if (typeof callback !== "function") {
      throw new Error("No callback is given as argument")
    }
    if (node === null) return;
    callback(node);
    this.preOrderForEachR(callback, node.left);
    this.preOrderForEachR(callback, node.right);
  }

  preOrderForEachI(callback) {
//Iteration
    if (typeof callback !== "function") {
      throw new Error("No callback is given as argument")
    }
    if (this.root === null) return;
    let stack = [this.root];

    while (stack.length > 0) {
      let current = stack.pop();
      callback(current);
      if (current.right) {
        stack.push(current.right);
      }
      if (current.left) {
        stack.push(current.left);
      }
    }
  }


  postOrderForEachR(callback, node = this.root) {
//Recursion
    if (typeof callback !== "function") {
      throw new Error("No callback is given as argument")
    }
    if (node === null) return;
    this.postOrderForEachR(callback, node.left);
    this.postOrderForEachR(callback, node.right);
    callback(node);
  }

  postOrderForEachI(callback) {
//Iteration
    if (typeof callback !== "function") {
      throw new Error("No callback is given as argument")
    }
    if (this.root === null) return;

    let stack1 = [this.root];
    let stack2 = [];

    while (stack1.length > 0) {
      let popped = stack1.pop();
      stack2.push(popped);
      if (popped.left) {
        stack1.push(popped.left);
      }
      if (popped.right) {
        stack1.push(popped.right)
      }
    }
    while (stack2.length > 0) {
      let popped = stack2.pop();
      callback(popped);
    }
  }

  // #findNode(value, node = this.root){
  //   if (node === null) return null;
  //   if (value === node.data) return node;
  //   if (value < node.data) {
  //     return this.#findNode(value, node.left);
  //   }
  //   if (value > node.data) {
  //     return this.#findNode(value, node.right);
  //   }
  // }

  // heightOfBinary(node = this.root) {
  //   if (node === null) {
  //     return -1;
  //   }
  //   const leftHeight = this.heightOfBinary(node.left);
  //   const rightHeight = this.heightOfBinary(node.right);
  //   return Math.max(leftHeight, rightHeight) + 1;
  // }

  // height(value) {
  //   let node = this.#findNode(value);
  //   if (node === null) return undefined;
  //   return this.heightOfBinary(node);
  // }


  height(value, node = this.root) {
    if (node === null) return undefined;
    if (value < node.data) return this.height(value, node.left);
    if (value > node.data) return this.height(value, node.right);
    return this.#calculateHeight(node);
  }

  #calculateHeight(node) {
    if (node === null) return -1;
    return Math.max(this.#calculateHeight(node.left), this.#calculateHeight(node.right)) + 1;
  }


  depth(value, node = this.root, count = 0) {
    if (node === null) return undefined;
    if (value === node.data) return count;
    if (value < node.data) {
      return this.depth(value, node.left, count + 1);
    }
    if (value > node.data) {
      return this.depth(value, node.right, count + 1);
    }
  }




  isBalanced() {
    
  }




  rebalance() {

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



let tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);

// let tree = new Tree([2]);

// tree.prettyPrint();
// tree.deleteItem(6345);
// tree.prettyPrint();

// tree.prettyPrint();
// tree.insert(99);
// tree.prettyPrint();

tree.prettyPrint();

// console.log(tree.includes(1100));

// tree.levelOrderForEach(node => console.log(node.data));
// tree.levelOrderForEach();

// tree.preOrderForEachR(node => console.log(node.data));
// tree.preOrderForEachI(node => console.log(node.data));


// tree.inOrderForEachR(node => console.log(node.data));
// tree.inOrderForEachI(node => console.log(node.data));


// tree.postOrderForEachR(node => console.log(node.data));
// tree.postOrderForEachI(node => console.log(node.data));

console.log(tree.height(15));

// console.log(tree.depth(18));