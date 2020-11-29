const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({renter_account: [],
    admin_account: [],
    owner_account: []}).write();

module.exports = db;