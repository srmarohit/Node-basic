const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');// if not working the you can use bcryptjs module.
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("Enter Proper Email...");
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0)
                throw new Error("Enter Proper age..!");
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens: [{
      token : {
        type: String,
        required: true
        }
    }]
});

// this method is used to hide private data of user.
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// this method is called from User's Instance
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, 'anewsecretkey');
    user.tokens = user.tokens.concat({token : token});
    await user.save();
    return token;
}

userSchema.statics.logIn = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user)
        throw new Error("Entered Email is not registered in our database..");

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
        throw new Error("Entered password is invalid...");

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;