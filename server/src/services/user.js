import db from "../models";
import bcrypt from "bcryptjs";

export const getAvatar = async (id) => {
  try {
    const response = await db.USER.findByPk(id);
    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "FAILED TO GET IMAGE",
      avatar: response.avatar,
    };
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserService = async (id) => {
  try {
    const response = await db.USER.findOne({
      where: { id },
      raw: true,
      attributes: ["id", "name", "avatar", "phone", "money", "facebook"],
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "FAILED TO GET USER",
      response,
    };
  } catch (error) {
    throw error;
  }
};

export const updateUserAvatar = async (id, newAvatarUrl) => {
  try {
    await db.USER.update({ avatar: newAvatarUrl }, { where: { id } });
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (id, updatedInfo) => {
  try {
    await db.USER.update(updatedInfo, { where: { id } });
  } catch (error) {
    throw error;
  }
};

export const updateUserPassword = async (id, newPassword) => {
  try {
    await db.USER.update({ password: newPassword }, { where: { id } });
  } catch (error) {
    throw error;
  }
};

export const checkPassword = async (userId, enteredPassword) => {
  try {
    const user = await db.USER.findOne({
      where: { id: userId },
    });

    if (!user) {
      return false;
    }

    const isPasswordCorrect = bcrypt.compareSync(
      enteredPassword,
      user.password
    );
    return isPasswordCorrect;
  } catch (error) {
    throw error;
  }
};
