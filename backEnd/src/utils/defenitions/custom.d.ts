import User from "../../resources/user/user.interface.js";

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}