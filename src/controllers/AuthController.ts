import { NextFunction, Response } from 'express';

import { RegisterUserRequest } from '../types';
import { UserService } from '../services/UserServices';
import { Logger } from 'winston';
import { validationResult } from 'express-validator';

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
        // check for email
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const { firstName, lastName, email, password } = req.body;
        // console.log('BODY', req.body);

        // check for email
        // if (!email) {
        //     return res.status(400).json({});
        // }

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
            // res.status(201).json({
            //     id: user.id,            // isko kabi b upar na rkna warna response a result pehle hi chala jayega
            // });

            const accessToken = 'test-access-token'; // Replace with real JWT logic
            const refreshToken = 'test-refresh-token'; // Replace with real JWT logic

            //       first one is name (like name of column etc) ; second one is value
            res.cookie('accessToken', accessToken, {
                domain: 'localhost',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60, // 1h
                httpOnly: true, // very important or it can be hacked.
                // secure: false,
            });
            //       first one is name (like name of column etc) ; second one is value
            res.cookie('refreshToken', refreshToken, {
                domain: 'localhost',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1Y
                httpOnly: true, // very important or it can be hacked.
                // secure: false,
            });
            console.log('Response Heade rs:', res.getHeaders());
            return res
                .status(201)
                .json({ id: user.id, message: 'User registered' });
        } catch (err) {
            next(err);
            return;
        }

        // {id:} yhn id find krni hogi,, kis user ki id h jo abhi register hua h
    }
}
