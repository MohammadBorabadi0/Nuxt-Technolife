import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/verifyToken.js";

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // validate
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "لطفا مقادیر نام و ایمیل و رمز عبور را وارد کنید",
      });
    }

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res
        .status(403)
        .json({ success: false, message: "این ایمیل از قبل وجود دارد" });
    }

    // const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    generateToken(res, newUser._id);

    return res.status(201).json({
      success: true,
      message: "کاربر با موفقیت ایجاد شد",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "مقادیر ایمیل و رمز عبور را وارد کنید",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "شما هنوز ثبت نام نکرده اید" });
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res
        .status(403)
        .json({ success: false, message: "رمز عبور شما اشتباه است" });
    }

    generateToken(res, user._id);

    return res.status(200).json({
      success: true,
      message: "ورود با موفقیت انجام شد",
      data: user,
      token: req.cookies.jwt,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "کاربری با این مشخصات پیدا نشد" });
    }

    return res.json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }

  //     const user = await User.findOne({ _id: id });

  //     return res.status(200)
  //         .json({ success: true, data: user });

  // } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ success: false, message: 'Server Error' });
  // }

  // let token;

  // // Read JWT from the 'jwt' cookie
  // token = req.cookies.token;

  // if (token) {
  //     try {
  //         console.log('yes');
  //         const decoded = jwt.verify(token, 'jwtsec');
  //         req.user = await User.findById(decoded.userId).select('-password');

  //         return res.json({ success: true, user: req.user });
  //     } catch (error) {
  //         console.error(error);
  //         return res.status(401)
  //             .json({ success: false, message: 'Not authorized, token failed' })
  //     }
  // } else {
  //     res.status(401);
  //     return res.status(401)
  //         .json({ success: false, message: 'Not authorized, no token' })
  // }

  // try {
  //     const token = req.cookies.token;

  //     const { userId } = jwt.verify(token, 'jwtsec', (err, decode) => {
  //         if (err) {
  //             console.log({ err });
  //             return res.json({ success: false, message: 'توکن صحیح نیست' })
  //         } else { return decode }
  //     });

  //     const user = await User.findOne({ _id: userId });
  //     res.json({ success: true, data: user });
  // } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ success: false, message: 'Internal server error' });
  // }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "کاربری با این مشخصات پیدا نشد" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور بوجود آمد" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, isAdmin } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "کاربری با این مشخصات پیدا نشد" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.isAdmin = isAdmin;

    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
      message: "ویرایش کاربر با موفقیت انجام شد",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور بوجود آمد" });
  }
};

// const updateUserProfile = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       mobile,
//       newPassword,
//       nationalCode,
//       cardNumber,
//     } = req.body;
//     const { id } = req.params;
//     const user = await User.findOne({ _id: id });

//     console.log({ newPassword });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "کاربری با این مشخصات پیدا نشد" });
//     }

//     user.firstName = firstName || user.firstName;
//     user.lastName = lastName || user.lastName;
//     user.email = email || user.email;
//     user.mobile = mobile || user.mobile;
//     user.nationalCode = nationalCode || user.nationalCode;
//     user.cardNumber = cardNumber || user.cardNumber;
//     user.password = newPassword || user.password;

//     await user.save();

//     return res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
//   }
// };

const updateUserProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobile,
      email,
      newPassword,
      cardNumber,
      nationalCode,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      user.email = email || user.email;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.mobile = mobile || user.mobile;
      user.cardNumber = cardNumber || user.cardNumber;
      user.nationalCode = nationalCode || user.nationalCode;

      if (newPassword) {
        user.password = newPassword;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        message: "اطلاعات کاربر با موفقیت بروزرسانی گردید.",
        data: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          mobile: updatedUser.mobile,
          nationalCode: updatedUser.nationalCode,
          cardNumber: updatedUser.cardNumber,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "کاربری با این مشخصات پیدا نشد",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "کاربری با این مشخصات پیدا نشد" });
    }
    return res
      .status(200)
      .json({ success: true, message: "کاربر با موفقیت حذف شد" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور بوجود آمد" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: "خروج از حساب کاربری با موفقیت انجام شد",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
};

export {
  createUser,
  loginUser,
  getAllUsers,
  getUserProfile,
  getUserById,
  updateUser,
  updateUserProfile,
  deleteUser,
  logout,
};
