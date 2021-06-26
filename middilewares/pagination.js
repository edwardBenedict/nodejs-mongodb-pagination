module.exports.paginatedResults = function (model) {
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
