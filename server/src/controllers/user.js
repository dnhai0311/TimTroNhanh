import * as userServices from "../services/user";

export const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await userServices.getCurrentUserService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at controller " + error,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const { avatar, name, facebook } = req.body;

  try {
    if (avatar) {
      await userServices.updateUserAvatar(id, avatar);
    }
    await userServices.updateUserInfo(id, { name, facebook });
    return res.status(200).json({
      success: true,
      message: "User information updated successfully",
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user information",
    });
  }
};
