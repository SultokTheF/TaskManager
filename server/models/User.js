const {Schema, model} = require("mongoose");

const User = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    firstname: {type: String, unique: true, required: true},
    lastname: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    created_at: { type: Date, default: Date.now }
});

module.exports = model('User', User);