export const buildPathWithParams = (path, params) => {
  let finalPath = path;
  Object.keys(params).forEach((key) => {
    finalPath = finalPath.replace(`:${key}`, params[key]);
  });
  return finalPath;
};
