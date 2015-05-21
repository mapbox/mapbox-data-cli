module.exports = function at(str) {
    if (!process.env.MapboxAccessToken) throw new Error('MapboxAccessToken env variable required');
    return str + '?access_token=' + process.env.MapboxAccessToken;
};
