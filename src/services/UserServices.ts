import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { UserData } from '../types';
import createHttpError from 'http-errors';
import { Roles, saltRounds } from '../constants';
import bcrypt from 'bcrypt';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({
        firstName,
        lastName,
        email,
        password,
    }: UserData): Promise<User> {
        // check for user email
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            const err = createHttpError(400, 'Email already Exists!');
            throw err;
        }

        // const userRepository = AppDataSource.getRepository(User); // ye coupled code tha isko neechy decouple k zrye krdia hahaha

        /* Hash the Password */
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //
        try {
            const newUser = this.userRepository.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            });
            const savedUser = await this.userRepository.save(newUser);
            return savedUser;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store the data in the database.',
            );
            throw error;
        }
    }
}
