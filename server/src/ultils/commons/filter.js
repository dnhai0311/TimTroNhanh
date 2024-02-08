import { getPublicId } from "./getPublicId";

export const filter = (oldPaths, newPaths) => {
  const oldImageArray = JSON.parse(oldPaths);
  const oldPublicIdArray = oldImageArray.map(getPublicId);

  const newPublicIdArray = newPaths.map(getPublicId);

  const lostPaths = oldPublicIdArray.filter(
    (oldPublicId) => !newPublicIdArray.includes(oldPublicId)
  );
  return lostPaths;
};
