import { createSelector } from 'reselect'


const indexSelector = state => state.index
const rangeSelector = state => state.range


export const selectorTest = createSelector(
  [indexSelector, rangeSelector], 
  (index,range) => ({index,range})
)
