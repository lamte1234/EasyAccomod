module.exports.logout = (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('userType')
    res.send('success');
}