import { Node } from "./bst.js";
import { Tree } from "./bst.js";


const node = new Node();
let tree = new Tree([1, 67, 6345, 324]);


test('is present', () => {
    expect(tree.includes(1)).toBe(true);
});

test('is inserted', () => {
    tree.insert(99);
    expect(tree.includes(99)).toBe(true);
});

test('is deleted', () => {
    tree.deleteItem(67);
    expect(tree.includes(67)).toBe(false);
})

test('calls callback on each node', () => {
    let mock = jest.fn();
    tree.levelOrderForEach(mock);
    expect(mock).toHaveBeenCalledTimes(4);
});