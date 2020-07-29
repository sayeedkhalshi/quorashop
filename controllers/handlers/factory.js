const catchAsync = require('./../../utils/catchAsync');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find();
    res.status(200).json({
      status: 'Success',
      results: data.length,
      data: {
        data,
      },
    });
  });
