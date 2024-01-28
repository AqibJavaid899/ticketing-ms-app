import mongoose from "mongoose";

import { Password } from "../services/password";

// defining the necessary attributes for the user type
interface UserAttrs {
    email: string;
    password: string;
}

// defining interface that represent props that a User Model has
interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttrs): UserDocument;
}

// defining interface that represent props that a User Document has
interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword);
    }

    done();
})

// adding the build() function to the statics group of the mongoose user model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);


export { User };