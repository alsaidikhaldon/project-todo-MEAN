const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: { type: Date, default: Date.now }
});


UserSchema.pre('save',function(next){
   

    //test if password not need to new hash
    if(!this.isModified('password')){
       return next();
    }
    //generat salt value
    bcrypt.genSalt(10, (err, salt) =>{
        if (err){
            return next(err);
        }

        bcrypt.hash(this.password, salt, (err, hash) =>{
            if (err){
                return next(err);
            }
            this.password = hash;
            next();
        });

});

 
});

   //use this salt value to hash password

UserSchema.methods.isPasswordMatch = function(Rpassword, hashed, callback) {
    bcrypt.compare(Rpassword, hashed, (err, isMatch) => {
        if (err){
            next(err);
        }
        callback(null, isMatch);
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;

