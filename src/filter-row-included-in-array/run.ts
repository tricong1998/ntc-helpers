/**
 * 
 * ts-node /Users/ntc/Job/study/ntc-helpers/src/filter-row-included-in-array/run.ts 
 * --fileInput=./src/filter-row-included-in-array/tests/input.csv 
 * --arr=aaa 
 * --fileOutput=./src/filter-row-included-in-array/tests/output.csv
 */

import { FilterRowIncludedInArray } from './impl';

(async () => {
  try {
    await new FilterRowIncludedInArray().run();
  } catch (error) {
    console.log('FilterRowIncludedInArray Error', {error: error.message})
  }  
})();
