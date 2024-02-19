const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    wallet_address: {type: String},
    roles: [{type: String, ref: 'Role'}],
    profile_image: {type: Number},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('User', UserSchema);