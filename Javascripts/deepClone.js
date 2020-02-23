// Clone your object and merge with newData when you specify
// This function will conduct a shallow copy with array if you 
// specify it at newData pattern, you must clone object inside it 
// by your self if you want deep clone it too.
// In default, array in olbObject also deepClone too.
// Ex:
// Full clone
// const oldObject = {
//     a:{
//         b:1,
//         c:[1,2,3]
//     }
// }
// let newObject = deepClone(oldObject);
// => That is full deep clone object even the object of array inside
// Specify element to clone
// const oldObject = {
//     a:{
//         b:{
//             value:10
//           },
//         c:[1,2,3]
//     }
// }
// let newData={
//     a:{
//         b:oldObject.a.b
//     }
// }
// let newObject = deepClone(oldObject,newData);
// => That is conduct a shallow copy but will deep clone
// with element [b] inside [a]
// With array
// const oldObject = {
//     a:{
//         b:{
//             value:10
//           },
//         c:[1,2,3]
//     }
// }
// let newData={
//     a:{
//         c:oldObject.a.c
//     }
// }
// let newObject = deepClone(oldObject,newData);
// => This is conduct a shallow copy like before but 
// with array was sepecify it will not conduct a deep clone
// the objects in side, just a normal assign variable.
// With array but deep clone.
// const oldObject = {
//     a:{
//         b:{
//             value:10
//           },
//         c:[1,2,3]
//     }
// }
// let newData={
//     a:{
//         c:deepClone(oldObject.a.c)
//     }
// }
// let newObject = deepClone(oldObject,newData);
// => You can fix it like that, now a new array also deep clone too.

const deepClone = (object, newData = 'undefined') => {
    let newObject = null;
    if (Array.isArray(object)) {
        if (newData !== 'undefined' && newData != null) {
            newObject = newData;
        }
        else if (newData == null) {
            newObject = null;
        }
        else {
            newObject = [...object];
            for (const key in newObject) {
                if (newObject.hasOwnProperty(key)) {
                    const element = newObject[key];
                    newObject[key] = deepClone(element);
                }
            }
        }
    }
    else if (typeof object === 'object') {
        if (newData !== 'undefined' && newData != null) {
            newObject = { ...object };
            for (const key in newObject) {
                if (newObject.hasOwnProperty(key) && newData.hasOwnProperty(key)) {
                    const element = newObject[key];
                    newObject[key] = deepClone(element, newData[key]);
                }
            }
        }
        else if (newData == null) {
            newObject = null;
        }
        else {
            newObject = { ...object };
            for (const key in newObject) {
                if (newObject.hasOwnProperty(key)) {
                    const element = newObject[key];
                    newObject[key] = deepClone(element);
                }
            }
        }
    }
    else {
        if (newData !== 'undefined' && newData != null) {
            newObject = newData;
        }
        else if (newData == null) {
            newObject = null;
        }
        else {
            newObject = object;
        }
    }
    return newObject;
}

export { deepClone }
