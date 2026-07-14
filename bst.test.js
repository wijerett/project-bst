import { Tree } from "./bst.js";



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

test('returns number of edges from given values node to deepest leaf', () => {
    expect(tree.height(67)).toBe(2);
});

test('returns number of edges from given values node to root', () => {
    expect(tree.depth(6345)).toBe(2);
});

test('returns true for a balanced tree', () => {
    expect(tree.isBalanced()).toBe(true);
});

test('checks if tree is balanced', () => {
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    expect(tree.isBalanced()).toBe(false);
});

test('rebalance unbalanced tree', () => {
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
});