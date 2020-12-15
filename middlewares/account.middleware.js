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