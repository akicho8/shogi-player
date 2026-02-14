import * as DeepObjectDiff from "deep-object-diff"

describe("DeepObjectDiff", () => {
  it(".updatedDiff", () => {
    const a = {vec: {x: 0, y: 0}}
    const b = {vec: {x: 0, y: 1}}
    const c = {vec: {y: 1}}
    console.log(DeepObjectDiff.updatedDiff(a, b))
    expect(DeepObjectDiff.updatedDiff(a, b)).toEqual(c)
  })
  
  it(".updatedDiff", () => {
    const a = {vec: {x: 0, y: {i: 0, j: 0}}}
    const b = {vec: {x: 0, y: {i: 0, j: 1}}}
    const c = {vec: {y: {j: 1}}}
    console.log(DeepObjectDiff.updatedDiff(a, b))
    expect(DeepObjectDiff.updatedDiff(a, b)).toEqual(c)
    // console.log(DeepObjectDiff.updatedDiff(a, b))
  })
  

})
