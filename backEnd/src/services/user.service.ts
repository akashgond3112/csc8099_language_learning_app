import UserModel from "../models/user.model.js"
import Logging from "../utils/Logging.js";
import token from "../utils/token.js"

export default class UserService {
    private user = UserModel;

    /* Register a new user */
    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({ name, email, password, role });
            const accessToken = token.createToken(user);
            Logging.info(`${user.name} toke generated : ${accessToken}`);
            return accessToken;
        } catch (err) {
            Logging.error(`Not able to create the use with info provided ${name}, ${email}, ${role}`)
            throw new Error('Unable to create User')
        }
    }


    /* Login Service */
    public async login(email: string, password: string): Promise<string | Error> {
        try {

            const user = await this.user.findOne({ email });

            if (!user) {
                Logging.error(`Unable to find user with that email address : ${email}`)
                throw new Error('Unable to find User')
            }

            if (await user.isValidPassword(password)) {
                const accessToken = token.createToken(user);
                Logging.info(`${user.name} toke generated : ${accessToken}`);
                return accessToken;
            } else {
                Logging.error(`Wrong credentials given with that email address : ${email}`)
                throw new Error('Wrong credentials given');
            }

        } catch (err) {
            throw new Error('Unable to create User')
        }
    }

}