import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        set: function (value) {
            return value.toLowerCase()
        },
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        set: function (value) {
            return value.toLowerCase()
        },
        required: true,
        unique: true,
    },
    mobNo: {
        type: String,
        trim: true,
    },
    mobile_verification_otp: {
        type: String,
    },

    mobile_verification_otp_expires: {
        type: Number
    },
    isVerifiedMobile: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    email_verification_token: {
        type: String,
    },

    email_verification_token_expires: {
        type: Number
    },
    isVerifiedEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
});



const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;