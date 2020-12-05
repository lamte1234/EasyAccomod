module.exports.logout = (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }
    });
    res.clearCookie('sid');
    res.send('success');
}