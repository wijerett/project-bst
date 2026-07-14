
import { Tree } from "./bst.js";


// let tree = new Tree([11, 12, 13, 14, 15, 16, 17,
// 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);


function genRandomArray(size = 15, max = 100) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

let tree = new Tree(genRandomArray());

tree.prettyPrint();

console.log(tree.isBalanced());

tree.levelOrderForEach(node => console.log(node.data));

tree.preOrderForEachR(node => console.log(node.data));
tree.preOrderForEachI(node => console.log(node.data));


tree.inOrderForEachR(node => console.log(node.data));
tree.inOrderForEachI(node => console.log(node.data));


tree.postOrderForEachR(node => console.log(node.data));
tree.postOrderForEachI(node => console.log(node.data));

tree.insert(104);
tree.insert(105);
tree.insert(106);
tree.insert(107);
tree.prettyPrint();
console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());