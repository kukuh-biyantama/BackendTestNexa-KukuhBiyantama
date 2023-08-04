const getTesting = (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to the Express Server!',
    });
};

module.exports = {
    getTesting,
};