


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
    //remove duplicates
    let uniqueArray = [...new Set(array)];
    //sort
    uniqueArray = uniqueArray.sort((a, b) => a - b);
    //call a recursive helper on the sorted array

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


tree.prettyPrint();
console.log(tree.includes(11));

