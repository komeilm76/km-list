import lib from './lib';
const kmList = lib;
export default kmList;
export * from './lib';

let list = [11, 22, 33];

list = kmList.swapElements(list, 0, 2);
console.log(list); // [33, 22, 11]
