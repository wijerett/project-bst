import { Node } from "./bst.js";
import { Tree } from "./bst.js";


const node = new Node();
let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);


test('is present', () => {
    expect(tree.includes(5)).toBe(true);
});

test('is inserted', () => {
    tree.insert(99);
    expect(tree.includes(99)).toBe(true);
});