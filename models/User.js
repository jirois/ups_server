import { Schema, model } from 'mongoose'
import { isEmail } from 'validator'
import { genSalt, hash, compare } from 'bcryptjs'

const UserSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'Please provide email'],
        validate: {
            validator: isEmail,
            message: 'Please provide valid email'
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum : ['admin', 'user'],
        default: 'user'
    },
    verificationToken : String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    verified: Date,
    passwordToken: {
        type: String
    },
    passwordTokenExpirationDate: {
        type: Date
    }
})

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return
    const salt = await genSalt(10)
    this.password = await hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(canditatePassword) {
    const isMatch = await compare(canditatePassword, this.password)
    return isMatch
}

export default model('User', UserSchema)