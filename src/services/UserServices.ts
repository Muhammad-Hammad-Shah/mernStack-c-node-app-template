import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { UserData } from '../types';
import createHttpError from 'http-errors';
import { Roles } from '../constants';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({
        firstName,
        lastName,
        email,
        password,
    }: UserData): Promise<User> {
        // const userRepository = AppDataSource.getRepository(User); // ye coupled code tha isko neechy decouple k zrye krdia hahaha
        try {
            const newUser = this.userRepository.create({
                firstName,
                lastName,
                email,
                password,
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
