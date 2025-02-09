import { Response } from 'express';

import { RegisterUserRequest } from '../types';
import { UserService } from '../services/UserServices';

export class AuthController {
    userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(req: RegisterUserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body;
        // console.log('BODY', req.body);

        await this.userService.create({
            firstName,
            lastName,
            email,
            password,
        });

        // {id:} yhn id find krni hogi,, kis user ki id h jo abhi register hua h
        res.status(201).json();
    }
}
