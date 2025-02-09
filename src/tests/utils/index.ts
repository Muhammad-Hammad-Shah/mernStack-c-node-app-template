import { DataSource } from 'typeorm';

export const truncateTables = async (connection: DataSource) => {
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.clear();
        // await repository.query(
        //     `TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE`,
        // );
    }
};
