import flatten from "flat";

export const cloneObject = (obj) => {
  if (!obj) return null;
  console.log(obj);
  const copy = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      copy[key] = cloneObject(obj[key]);
    } else {
      copy[key] = obj[key];
    }
  });

  return copy;
};

export const flattenObject = (objToFlatten) => {
  const flattenedObj = flatten(objToFlatten);
  const res = {};

  Object.keys(flattenedObj).forEach((key) => {
    if (!key.includes("typename")) {
      res[key] = flattenedObj[key];
    }
  });

  return res;
};
