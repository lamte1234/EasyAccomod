const fs = require('fs');

module.exports.postValidation = (req, res, next) => {
    const errors = [];

    const postString_re = /^[a-zA-Z0-9\s]+$/;
    const area_re = /^[1-9][0-9]*[,.]{0,1}[0-9]*$/;
    const money_re = /^[1-9][0-9]*$/;

    // title
    if (!req.body.title) { errors.push('Title is required.') }
    if (req.body.title && !req.body.title.match(postString_re)) {
        errors.push('Title must be text.')
    }
    // city
    if (!req.body.city) { errors.push('City is required.') }
    if (req.body.city && !req.body.city.match(postString_re)) {
        errors.push('City must be text.')
    }
    // district
    if (!req.body.district) { errors.push('District is required.') }
    if (req.body.district && !req.body.district.match(postString_re)) {
        errors.push('District must be text.')
    }
    // ward
    if (!req.body.ward) { errors.push('Ward is required.') }
    if (req.body.ward && !req.body.ward.match(postString_re)) {
        errors.push('Ward must be text.')
    }
    // street
    if (!req.body.street) { errors.push('Street is required.') }
    if (req.body.street && !req.body.street.match(postString_re)) {
        errors.push('Street must be text.')
    }
    // roomtype
    if (!req.body.room_type) { errors.push('Room type is required.') }
    if (req.body.room_type && req.body.room_type !== 'Apartment' &&
        req.body.room_type !== 'Guest House' && req.body.room_type !== 'Shared Room' &&
        req.body.room_type !== 'Premium Apartment' && req.body.room_type !== 'House') {
        errors.push('Room type must be text.')
    }
    // rented_rate
    if (!req.body.rented_rate) { errors.push('Rented rate is required.') }
    if (req.body.rented_rate && !req.body.rented_rate.match(money_re)) {
        errors.push('Rented rate must be number.')
    }
    // area
    if (!req.body.area) { errors.push('Area is required.') }
    if (req.body.area && !req.body.area.match(area_re)) {
        errors.push('Area must be number.')
    }
    //description
    //bathroom
    if (!req.body.bathroom) { errors.push('Bathroom is required.') }
    if ((req.body.bathroom && req.body.bathroom !== "true" && req.body.bathroom !== "false")) {
        errors.push('Bathroom must be boolean.')
    }
    //kitchen
    if (!req.body.kitchen) { errors.push('Bathroom is required.') }
    if ((req.body.kitchen && req.body.kitchen !== "true" && req.body.kitchen !== "false")) {
        errors.push('Kitchen must be boolean.');
        console.log(req.body.kitchen !== "true");
    }
    //aircon
    if (!req.body.air_con) { errors.push('Air conditioner is required.') }
    if ((req.body.air_con && req.body.air_con !== "true" && req.body.air_con !== "false")) {
        errors.push('Air conditioner must be boolean.')
    }
    //waterheater
    if (!req.body.water_heater) { errors.push('Water heater is required.') }
    if ((req.body.water_heater && req.body.water_heater !== "true" && req.body.water_heater !== "false")) {
        errors.push('Water heater must be boolean.')
    }
    //service rate
    //electricity
    if (!req.body.electricity) { errors.push('Electricity rate is required.') }
    if (req.body.electricity && !req.body.electricity.match(money_re)) {
        errors.push('Electricity rate must be number.')
    }
    //water
    if (!req.body.water) { errors.push('Water rate is required.') }
    if (req.body.water && !req.body.water.match(money_re)) {
        errors.push('Water rate must be number.')
    }
    // posting time
    if (!req.body.time) { errors.push('Posting time is required.') }
    if (req.body.time && !req.body.time.match(/^[1-4]$/)) {
        errors.push('Posting time must in range 1-4 weeks.');
    }
    // image
    if ((req.files && req.files.length < 3) ||
        (!req.files)) {
        errors.push('Must have at least 3 images, max 5 images');
        req.files.map(file => {
            fs.unlinkSync(file.path);
        });
    }

    if (errors.length) {
        if (req.files) {
            req.files.map(file => {
                fs.unlinkSync(file.path);
            });
        }
        const data = {
            errors: errors
        };
        res.json(data);
        return;
    }

    next();
}