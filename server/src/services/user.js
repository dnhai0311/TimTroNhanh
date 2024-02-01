import db from "../models";

export const getCurrentUserService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.USER.findOne({
        where: { id },
        raw: true,
        attributes: ["id", "name", "avatar", "phone", "money", "facebook"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "FAILED TO GET PRICES",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateUserAvatar = async (id, newAvatarUrl) => {
  await db.USER.update({ avatar: newAvatarUrl }, { where: { id } });
};

export const updateUserInfo = async (id, updatedInfo) => {
  await db.USER.update(updatedInfo, { where: { id } });
};
