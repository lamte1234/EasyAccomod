module.exports.logout = (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('userType')
    res.status(200).send('success');
}