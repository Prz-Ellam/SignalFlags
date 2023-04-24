import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

class UserService {
    static isUsernameTaken = async (username) => {
        const existingUsernameUser = await User.findOne({ username });
        return !!existingUsernameUser;
    }

    static isUsernameTakenExcludingUser = async (username, id) => {
        const existingUsernameUser = await User.findOne({ username, _id: { $ne: id }});
        return !!existingUsernameUser;
    }

    static isEmailTaken = async (email) => {
        const existingEmailUser = await User.findOne({ email });
        return !!existingEmailUser;
    }

    static isEmailTakenExcludingUser = async (email, id) => {
        const existingEmailUser = await User.findOne({ email, _id: { $ne: id } });
        return !!existingEmailUser;
    }

    static isAvatarTaken = async (avatar) => {
        const existingAvatarUser = await User.findOne({ avatar });
        return !!existingAvatarUser;
    }

    static create = async (avatar, email, username, password) => {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            avatar,
            email,
            username,
            password: hashedPassword
        });
        await user.save();
        return user;
    }
}

export default UserService;