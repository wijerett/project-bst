


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
    console.log(uniqueArray);
    //sort
    //call a recursive helper on the sorted array
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
}

//[10, 1, 21, 2].sort((a, b) => a - b)
// → [1, 2, 10, 21]

let nums = [10, 1, 21, 2];
console.log(nums.sort());