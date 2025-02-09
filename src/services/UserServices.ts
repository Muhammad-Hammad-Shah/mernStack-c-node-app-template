import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { UserData } from '../types';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        // const userRepository = AppDataSource.getRepository(User); // ye coupled code tha isko neechy decouple k zrye krdia hahaha
        await this.userRepository.save({
            firstName,
            lastName,
            email,
            password,
        });
    }
}
