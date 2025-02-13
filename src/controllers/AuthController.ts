import { NextFunction, Response } from 'express';

import { RegisterUserRequest } from '../types';
import { UserService } from '../services/UserServices';
import { Logger } from 'winston';

export class AuthController {
    // userService: UserService;
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {
        this.userService = userService;
    }

    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { firstName, lastName, email, password } = req.body;
        // console.log('BODY', req.body);
        this.logger.debug('New req to register a User', {
            firstName,
            lastName,
            email,
            password: '********',
        });
        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info('User has been registered', {
                id: user.id,
            });
            res.status(201).json({
                id: user.id,
            });
        } catch (err) {
            next(err);
            return;
        }

        // {id:} yhn id find krni hogi,, kis user ki id h jo abhi register hua h
    }
}
