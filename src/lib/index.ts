import _ from 'lodash';

const isValidEntryIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  if (list.length == 0) return false; // empty list
  if (entryIndex < 0) return false; // negative index
  if (entryIndex >= list.length) return false; // index out of bounds
  return true; // valid index
};

const isValidEntryindexes = <ELEM extends any>(
  list: ELEM[],
  entryIndexes: number[],
  strict: boolean = true
) => {
  if (list.length == 0) return false; // empty list
  if (entryIndexes.length == 0) return false; // empty index array
  if (strict) {
    const isValid = entryIndexes.every((entryIndex) => {
      return isValidEntryIndex(list, entryIndex) == true;
    });
    return isValid;
  } else {
    const isValid = entryIndexes.some((entryIndex) => {
      return isValidEntryIndex(list, entryIndex) == true;
    });
    return isValid;
  }
};

const getValidEntryindexes = <ELEM extends any>(list: ELEM[], entryIndexes: number[]) => {
  if (list.length == 0) return []; // empty list
  if (entryIndexes.length == 0) return []; // empty index array
  const output = entryIndexes.filter((entryIndex) => {
    return isValidEntryIndex(list, entryIndex) == true;
  });
  return output; // valid index array
};

// swap elements
const swapElements = <ELEM extends any>(list: ELEM[], from: number, to: number) => {
  if (!isValidEntryIndex(list, from)) return list; // invalid from index
  if (!isValidEntryIndex(list, to)) return list; // invalid to index
  else if (from == to) return list; // same index
  else {
    const output = [...list];
    const fromElem = output[from];
    const toElem = output[from];
    output[from] = toElem;
    output[to] = fromElem;
    return output;
  }
};
const moveElementToNextIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return swapElements(list, entryIndex, entryIndex + 1);
};
const moveElementToBackIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return swapElements(list, entryIndex, entryIndex - 1);
};
const moveElementToLastIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return swapElements(list, entryIndex, list.length - 1);
};
const moveElementToFirstIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return swapElements(list, entryIndex, 0);
};
// remove element
const removeElementAtindexes = <ELEM extends any>(list: ELEM[], entryindexes: number[]) => {
  if (!isValidEntryindexes(list, entryindexes)) return list; // invalid index
  const output = [...list];
  return output.filter((item, index) => {
    return entryindexes.includes(index) == false;
  });
};
const removeElementAtLastIndex = <ELEM extends any>(list: ELEM[]) => {
  return removeElementAtindexes(list, [list.length - 1]); // remove element at last index
};
const removeElementAtFirstIndex = <ELEM extends any>(list: ELEM[]) => {
  return removeElementAtindexes(list, [0]); // remove element at first index
};
const removeElementAfterThisIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return removeElementAtindexes(list, [entryIndex + 1]); // remove element at index
};
const removeElementBeforeThisIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return removeElementAtindexes(list, [entryIndex - 1]); // remove element at index
};
// insert element
const insertElementAtIndex = <ELEM extends any>(
  list: ELEM[],
  entryIndex: number,
  element: ELEM
) => {
  if (!isValidEntryIndex(list, entryIndex)) return list; // invalid index
  const output = [...list];
  output.splice(entryIndex, 0, element); // insert element at index
  return output;
};
const insertElementAtLastIndex = <ELEM extends any>(list: ELEM[], element: ELEM) => {
  return insertElementAtIndex(list, list.length, element); // insert element at last index
};
const insertElementAtFirstIndex = <ELEM extends any>(list: ELEM[], element: ELEM) => {
  return insertElementAtIndex(list, 0, element); // insert element at first index
};
const insertElementAfterThisIndex = <ELEM extends any>(
  list: ELEM[],
  entryIndex: number,
  element: ELEM
) => {
  return insertElementAtIndex(list, entryIndex + 1, element); // insert element at index
};
const insertElementBeforeThisIndex = <ELEM extends any>(
  list: ELEM[],
  entryIndex: number,
  element: ELEM
) => {
  return insertElementAtIndex(list, entryIndex - 1, element); // insert element at index
};

const isFirstElement = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  if (!isValidEntryIndex(list, entryIndex)) return false; // invalid index
  if (entryIndex == 0) return true; // first index
  return false; // not first index
};
const isLastElement = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  if (!isValidEntryIndex(list, entryIndex)) return false; // invalid index
  if (entryIndex == list.length - 1) return true; // last index
  return false; // not last index
};

const firstElement = <ELEM extends any>(list: ELEM[]) => {
  if (list.length == 0) return undefined; // empty list
  return list[0]; // first element
};
const lastElement = <ELEM extends any>(list: ELEM[]) => {
  if (list.length == 0) return undefined; // empty list
  return list[list.length - 1]; // last element
};
const selectElement = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  // @ts-ignore
  let output = list.find((item, index) => {
    return index == entryIndex;
  });
  return output;
};
const selectElements = <ELEM extends any>(
  list: ELEM[],
  entryIndexes: number[],
  strict: boolean = false
) => {
  let output = [...list] as (ELEM | undefined)[]; // copy list
  const validEntryIndexes = getValidEntryindexes(list, entryIndexes); // get valid indexes
  if (!strict) {
    if (entryIndexes.length == 0) return []; // empty list
    output = entryIndexes.map((item) => {
      return selectElement(list, item); // select element at index
    });
  } else {
    if (validEntryIndexes.length == 0) return []; // empty list
    output = validEntryIndexes.map((item) => {
      return selectElement(list, item); // select element at index
    });
  }
  return output; // selected elements
};

const takeElementsFromLeft = <ELEM extends any>(list: ELEM[], count: number) => {
  return _.take(list, count);
};
const takeElementsFromRight = <ELEM extends any>(list: ELEM[], count: number) => {
  return _.takeRight(list, count);
};
const dropElementsFromLeft = <ELEM extends any>(list: ELEM[], count: number) => {
  return _.drop(list, count);
};
const dropElementsFromRight = <ELEM extends any>(list: ELEM[], count: number) => {
  return _.dropRight(list, count);
};

export default {
  isValidEntryIndex,
  isValidEntryindexes,
  getValidEntryindexes,
  swapElements,
  moveElementToNextIndex,
  moveElementToBackIndex,
  moveElementToLastIndex,
  moveElementToFirstIndex,
  removeElementAtindexes,
  removeElementAtLastIndex,
  removeElementAtFirstIndex,
  removeElementAfterThisIndex,
  removeElementBeforeThisIndex,
  insertElementAtIndex,
  insertElementAtLastIndex,
  insertElementAtFirstIndex,
  insertElementAfterThisIndex,
  insertElementBeforeThisIndex,
  isFirstElement,
  isLastElement,
  firstElement,
  lastElement,
  selectElement,
  selectElements,
  takeElementsFromLeft,
  takeElementsFromRight,
  dropElementsFromLeft,
  dropElementsFromRight,
};
