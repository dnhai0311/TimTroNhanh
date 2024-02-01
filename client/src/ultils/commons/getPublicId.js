export const getPublicId = (url) => {
  const matches = url.match(/\/v\d+\/(.+?)\.jpg/)[1];
  return matches;
};
