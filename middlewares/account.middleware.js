const Renter = require("../models/renter.model");
const Owner = require("../models/owner.model");
const Admin = require("../models/admin.model");
const md5 = require("md5");

module.exports.ownerChangeAccount = (req, res, next) => {
    let errors = [];
    
    const phone_re = /^[0-9]{10}$/;
    const id_num_re = /^[a-zA-Z0-9]{16}$/;
    const name_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    const address_re = /^[a-zA-Z0-9\s]+$/;

    if (!req.body.name) {
        errors.push('Name is required');
    }

    if(req.body.name && !req.body.name.match(name_re)){
        errors.push('Name must be non-special text.')
    }

    if (!req.body.id_card_number) {
        errors.push('Identificaton number is required');
    }

    if(req.body.id_card_number && !req.body.id_card_number.match(id_num_re)){
        errors.push('Identification number must have 16 normal characters')
    }

    if (!req.body.phone) {
        errors.push('Phone is required');
    }

    if(req.body.phone && !req.body.phone.match(phone_re)){
        errors.push('Phone must have 10 digits');
    }

    if (!req.body.address) {
        errors.push('Address is required');
    }

    if(req.body.address && !req.body.address.match(address_re)) {
        errors.push('Invalid address');
    }

    if (errors.length) {
        const data = {
            errors: errors
        };
        res.json(data);
        return;
    }

    next();
}

module.exports.usersChangePassword = async (req, res, next) => {
    const id = req.signedCookies.userId;
    const user_type = req.signedCookies.userType;
    const current_password = md5(req.body.current_password + process.env.PASSWORD_EXTRA_SECRET);
    const password_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{6,13}$/;
    let model;

    if(user_type === "renter") {
        model = Renter;
    }
    else if( user_type === "owner") {
        model = Owner;
    }
    else if(user_type === "admin") {
        model = Admin;
    }

    let errors = [];

    const user = await model.findById(id);


    if(!req.body.current_password || !req.body.new_password || !req.body.cf_pass) {
        errors.push('Password is required')
    }

    if(req.body.current_password && current_password !== user.password){
        errors.push("Wrong password") 
    }

    if((req.body.current_password && !req.body.current_password.match(password_re)) ||
        (req.body.new_password && !req.body.new_password.match(password_re)) ||
        (req.body.cf_pass && !req.body.cf_pass.match(password_re))){
        errors.push('Password must have 6-13 non-special characters')
    }

    if (req.body.new_password !== req.body.cf_pass) {
        errors.push('Password must match');
    }

    if (errors.length) {
        const data = {
            errors: errors
        };
        res.json(data);
        return;
    }

    next();
}