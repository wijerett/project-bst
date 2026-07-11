import { Node } from "./bst.js";
import { Tree } from "./bst.js";


const node = new Node();
let tree;
beforeEach(() => {
    tree = new Tree([1, 67, 6345, 324]);
})



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


test('inOrder visits nodes in sorted order', () => {
    let result = [];
    tree.inOrderForEachR(node => result.push(node.data));
    expect(result).toEqual([1, 67, 324, 6345]);
});


test('inOrder visits nodes in sorted order', () => {
    let result = [];
    tree.inOrderForEachI(node => result.push(node.data));
    expect(result).toEqual([1, 67, 324, 6345]);
});

test('returns values by root, left, then right', () => {
    let result = [];
    tree.preOrderForEachR(node => result.push(node.data));
    expect(result).toEqual([67, 1, 324, 6345]);
});

test('returns values by root, left, then right', () => {
    let result = [];
    tree.preOrderForEachI(node => result.push(node.data));
    expect(result).toEqual([67, 1, 324, 6345]);
});

test('returns values by left, right, then root', () => {
    let result = [];
    tree.postOrderForEachR(node => result.push(node.data));
    expect(result).toEqual([1, 6345, 324, 67]);
});

test('returns values by left, right, then root', () => {
    let result = [];
    tree.postOrderForEachI(node => result.push(node.data));
    expect(result).toEqual([1, 6345, 324, 67]);
});