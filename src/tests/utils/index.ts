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

// format check krne k liye, of tokens.

export const isJwt = (token: string | null): boolean => {
    if (token === null) {
        return false;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        return false;
    }

    try {
        parts.forEach((part) => {
            Buffer.from(part, 'base64').toString('utf-8');
        });

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
