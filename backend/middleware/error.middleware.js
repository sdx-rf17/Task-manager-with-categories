
module.exports = ((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        error: err.message || "Internal server error"
    });
});
