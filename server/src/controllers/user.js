import * as userServices from "../services/user";
import { HashPassword } from "../services/auth";
import { deleteImage } from "../middlewares/cloudinary";
import { getPublicId } from "../ultils/commons/getPublicId";

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
  const { avatar, name, facebook, newPassword, oldPassword } = req.body;

  try {
    if (avatar) {
      const response = await userServices.getAvatar(id);
      const publicId = getPublicId(response.avatar);
      deleteImage(publicId);
      await userServices.updateUserAvatar(id, avatar);
    }

    // Kiểm tra mật khẩu đã đúng hay chưa, nếu chưa đúng thì không được đổi
    if (oldPassword && newPassword) {
      const isPasswordCorrect = await userServices.checkPassword(
        id,
        oldPassword
      );
      if (!isPasswordCorrect) {
        return res.status(200).json({
          success: false,
          message: "Sai mật khẩu",
        });
      }
      await userServices.updateUserPassword(id, HashPassword(newPassword));
    }
    if (name || facebook) {
      await userServices.updateUserInfo(id, {
        name,
        facebook,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
    });
  } catch (error) {
    console.error("Failed at controller:", error);
    return res.status(500).json({
      success: false,
      message: "Cập nhật không thành công",
    });
  }
};
