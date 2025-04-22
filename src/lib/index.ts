import _ from 'lodash';

type IIndexMode = 'in-scope' | 'back-of-scope' | 'next-of-scope';

const getLastIndex = <ELEM extends any>(list: ELEM[]) => {
  if (list.length == 0) return 'empty'; // empty list
  if (list.length == 1) return 0; // single element list
  if (list.length > 1) return list.length - 1; // multi element list
  return 'empty'; // default
};
const getFirstIndex = <ELEM extends any>(list: ELEM[]) => {
  if (list.length == 0) return 'empty'; // empty list
  if (list.length == 1) return 0; // single element list
  if (list.length > 1) return 0; // multi element list
  return 'empty'; // default
};
const getIndexMode = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  let output: IIndexMode = 'back-of-scope';
  if (list.length == 0) {
    if (entryIndex > 0) {
      output = 'next-of-scope'; // empty list
    }
    if (entryIndex < 0) {
      output = 'back-of-scope'; // empty list
    }
  }
  if (entryIndex < list.length && entryIndex >= 0) {
    output = 'in-scope'; // in-scope
  }
  // empty list
  else if (entryIndex < 0) {
    output = 'back-of-scope'; // negative index
  } // negative index
  else if (entryIndex >= list.length) {
    output = 'next-of-scope'; // index out of bounds
  } // index out of bounds

  return output;
};
const makeValidIndex = <ELEM extends any>(
  list: ELEM[],
  entryIndex: number,
  onEdge: boolean = false
) => {
  const indexMode = getIndexMode(list, entryIndex);
  const lastIndex = getLastIndex(list);
  let output;
  if (onEdge == true) {
    if (indexMode == 'back-of-scope') {
      output = -1; // negative index
    } else if (indexMode == 'next-of-scope') {
      if (lastIndex == 'empty') {
        output = 0; // empty list
      } else {
        output = lastIndex + 1; // index out of bounds
      }
    } else {
      output = entryIndex; // in-scope
    }
  } else {
    if (indexMode == 'back-of-scope') {
      output = 0; // negative index
    } else if (indexMode == 'next-of-scope') {
      if (lastIndex == 'empty') {
        output = 0; // empty list
      } else {
        output = lastIndex; // index out of bounds
      }
    } else {
      output = entryIndex; // in-scope
    }
  }
  return output;
};
const isValidEntryIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  let output = false;
  if (list.length == 0) output = false; // empty list
  else if (entryIndex < 0) output = false; // negative index
  else if (entryIndex >= list.length) output = false; // index out of bounds
  else {
    output = true; // valid index
  } // valid index
  console.log('isValidEntryIndex', output);
  return output;
};
const isValidEntryIndexes = <ELEM extends any>(
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
const getValidEntryIndexes = <ELEM extends any>(list: ELEM[], entryIndexes: number[]) => {
  if (list.length == 0) return []; // empty list
  if (entryIndexes.length == 0) return []; // empty index array
  const output = entryIndexes.filter((entryIndex) => {
    return isValidEntryIndex(list, entryIndex) == true;
  });
  return output; // valid index array
};
// swap elements
const swapElements = <ELEM extends any>(list: ELEM[], from: number, to: number) => {
  if (from == to) return list; // same index
  const validFromIndex = makeValidIndex(list, from);
  const validToIndex = makeValidIndex(list, to);
  const output = [...list];
  const fromElem = output[validFromIndex];
  const toElem = output[validToIndex];
  output[validFromIndex] = toElem;
  output[validToIndex] = fromElem;
  return output;
};
const moveElementToNextIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return swapElements(list, entryIndex, entryIndex + 1);
};
const moveElementToBackIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return swapElements(list, entryIndex, entryIndex - 1);
};
const moveElementToFirstIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return swapElements(list, entryIndex, 0);
};
const moveElementToLastIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return swapElements(list, entryIndex, list.length - 1);
};
// remove element
const removeElementAtIndexes = <ELEM extends any>(list: ELEM[], entryIndexes: number[]) => {
  if (!isValidEntryIndexes(list, entryIndexes, false)) return list; // invalid index
  const output = [...list];
  // @ts-ignore
  return output.filter((item, index) => {
    return entryIndexes.includes(index) == false;
  });
};
const removeElementAfterThisIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return removeElementAtIndexes(list, [entryIndex + 1]); // remove element at index
};
const removeElementBeforeThisIndex = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  return removeElementAtIndexes(list, [entryIndex - 1]); // remove element at index
};
const removeElementAtFirstIndex = <ELEM extends any>(list: ELEM[]) => {
  return removeElementAtIndexes(list, [0]); // remove element at first index
};
const removeElementAtLastIndex = <ELEM extends any>(list: ELEM[]) => {
  return removeElementAtIndexes(list, [list.length - 1]); // remove element at last index
};

// add element
const addElementAfterThisIndex = <ELEM extends any>(
  list: ELEM[],
  entryIndex: number,
  element: ELEM
) => {
  const validEntryIndex = makeValidIndex(list, entryIndex, true);
  let output = [...list];
  // @ts-ignore
  let listUntilEntryIndex = output.filter((item, index) => {
    return index <= validEntryIndex;
  });
  // @ts-ignore
  let listAfterEntryIndex = output.filter((item, index) => {
    return index > validEntryIndex;
  });
  output = [...listUntilEntryIndex, element, ...listAfterEntryIndex] as ELEM[]; // add element at index
  return output;
};
const addElementBeforeThisIndex = <ELEM extends any>(
  list: ELEM[],
  entryIndex: number,
  element: ELEM
) => {
  return addElementAfterThisIndex(list, entryIndex - 1, element); // add element at index
};
const addElementAtFirstIndex = <ELEM extends any>(list: ELEM[], element: ELEM) => {
  return addElementAfterThisIndex(list, -1, element); // add element at first index
};
const addElementAtLastIndex = <ELEM extends any>(list: ELEM[], element: ELEM) => {
  return addElementAfterThisIndex(list, list.length, element); // add element at last index
};

const isFirstElement = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  let firstIndex = getFirstIndex(list);
  let output = false;
  if (firstIndex == entryIndex) {
    output = true; // first index
  } else {
    output = false;
  }
  return output;
};
const isLastElement = <ELEM extends any>(list: ELEM[], entryIndex: number) => {
  let lastIndex = getLastIndex(list);
  let output = false;
  if (lastIndex == entryIndex) {
    output = true; // last index
  } else {
    output = false;
  }
  return output;
};

const firstElement = <ELEM extends any>(list: ELEM[]) => {
  let output = undefined;
  let firstIndex = getFirstIndex(list);
  if (firstIndex == 'empty') {
    output = undefined;
  } else {
    output = list[firstIndex as number]; // last element
  }
  return output;
};
const lastElement = <ELEM extends any>(list: ELEM[]) => {
  let output = undefined;
  let lastIndex = getLastIndex(list);
  if (lastIndex == 'empty') {
    output = undefined;
  } else {
    output = list[lastIndex as number]; // last element
  }
  return output;
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
  const validEntryIndexes = getValidEntryIndexes(list, entryIndexes); // get valid indexes
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
  getLastIndex,
  getFirstIndex,
  getIndexMode,
  makeValidIndex,
  isValidEntryIndex,
  isValidEntryIndexes,
  getValidEntryIndexes,
  swapElements,
  moveElementToNextIndex,
  moveElementToBackIndex,
  moveElementToFirstIndex,
  moveElementToLastIndex,
  removeElementAtIndexes,
  removeElementAfterThisIndex,
  removeElementBeforeThisIndex,
  removeElementAtFirstIndex,
  removeElementAtLastIndex,
  addElementAfterThisIndex,
  addElementBeforeThisIndex,
  addElementAtFirstIndex,
  addElementAtLastIndex,
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
