import lib from './lib';
const kmList = lib;
export default kmList;
export * from './lib';

let list = [11, 22, 33];

list = kmList.moveElementToBackIndex(list,0);
console.log(list); // [33, 22, 11]
