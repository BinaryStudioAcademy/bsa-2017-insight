const mongoose = require('mongoose');
const Conversation = require('./conversationSchema');
const crypto = require('crypto');
const Schema = mongoose.Schema;

let adminSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    isSuperUser: Boolean,
    email: {type: String, required: true, unique: true},
    hashedPassword: {type: String, required: true},
    salt: {type: String, required: true},
    login: String, 
    adminName: String,
    adminSurname: String,
    avatar: String, 
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }]
});
  
adminSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
}

adminSchema.virtual("password")
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
})
    .get(function() { return this._plainPassword})

adminSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
}
module.exports = mongoose.model("Admin" , adminSchema); 