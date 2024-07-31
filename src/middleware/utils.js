import Users from "../models/user.js";
// ************************ send token ******************************
export const sendToken = async (res, user, message) => {
  try {
    const token = user.getAuthToken();
    let users = await Users.findById(user._id);
    users.accessToken = token;
    await users.save();
    const content = {
      accessToken: token,
      customer: {
        firstName: users?.firstName,
        lastName: users?.lastName,
        id: users?.id,
      },
    };

    return res
      .status(200)
      .json({ success: true, title: "Success", message, content });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

