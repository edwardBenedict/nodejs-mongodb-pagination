module.exports.localPaginatedResults = function (model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {
      status: 200,
    };

    if (endIndex < model.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result.results = model.slice(startIndex, endIndex);

    res.paginatedResults = result;
    next();
  };
};

module.exports.MongoDBpaginatedResults = function (model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {
      status: 200,
    };

    if (endIndex < model.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      result.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = result;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    res.paginatedResults = result;
    next();
  };
};
