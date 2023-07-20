import { Router, Request, Response, NextFunction } from "express"
import Controller from "../utils/interfaces/controller.interface.js"
import HttpException from "../utils/exceptions/http.exception.js"
import validationMiddleware from "../middleware/validation.middleware.js"
import validate from "../validation/user.validation.js"
import UserService from "../services/user.service.js"
import authenticatedMiddleware from "../middleware/authenticated.middleware.js"

class UserController implements Controller {
    public path = "/users";
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.intialiseRoutes();
    }

    private intialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login

        );
        this.router.get(
            `${this.path}/info`,
            authenticatedMiddleware,
            this.getUser
        )
    }


    /* Taking care of User Registration */
    private register = async (req: Request, res: Response, next: NextFunction):
        Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;

            const token = await this.UserService.register(
                name, email, password, "user"
            )

            res.status(201).json({ token })
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    /* Taking care of User Login */
    private login = async (req: Request, res: Response, next: NextFunction):
        Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.UserService.login(email, password);

            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }

    }

    /* Taking care of User Login */
    private getUser = async (req: Request, res: Response, next: NextFunction):
        Promise<Response | void> => {

        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).send({ data: req.user });

    }
}