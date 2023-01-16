const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');
const User = require('../models/user.model');

exports.auth = async (req, res, next) => {
  try {
    const publicApis = [
      '/auth/login',
      '/auth/web',
      '/auth/mobile',
      '/auth/register',
      '/auth/resetpass/:id',
      '/auth/setpass/:id',
      '/auth/forgotpassword',
      '/expo/save',
      '/auth/verifycontact',
      '/auth/verify/:id',
    ];

    // * convert url id to :id
    const urls = req.url.split('/');

    const newUrl = urls.map((url) => {
      if (url.length >= 24) return ':id'; // * mongoose id len = 24
      return url;
    });
    const joinNewUrl = newUrl.join('/');
    if (publicApis.includes(joinNewUrl)) return next();

    const token = req.headers.authorization.replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const [user] = await User.aggregate([
      {
        $match: {
          $and: [
            { $expr: { $eq: ['$_id', Types.ObjectId(data.id)] } },
            { isActive: true },
            { isDeleted: false },
          ],
        },
      },
      {
        $lookup: {
          from: 'others',
          localField: '_id',
          foreignField: 'userId',
          as: 'otherDetails',
        },
      },
      {
        $project: {
          firstName: 1,
          middleName: 1,
          lastName: 1,
          email: 1,
          birthDate: 1,
          gender: 1,
          contactNo: 1,
          userRoles: 1,
          image: 1,
          isActive: 1,
          isDeleted: 1,
          createdAt: 1,
          updatedAt: 1,
          suffix: 1,
          otherDetails: { $arrayElemAt: ['$otherDetails', 0] },
        },
      },
    ]);

    if (!user) throw new Error();

    req.userInfo = user;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json(error);
    }
    return res
      .status(401)
      .json({ message: 'Not authorized to access this resource' });
  }
};
