import lib from './lib';
const kmList = lib;
export default kmList;
export * from './lib';

let list = [1, 2, 3, 4];

list = kmList.insertElementBeforeThisIndex(list, 1, 3333);
