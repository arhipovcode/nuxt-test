import { join } from 'path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { type } = body;

    if (!type) {
        throw createError({
            statusCode: 400,
            message: 'type обязателен',
        });
    }

    const safeType = type.replace(/[^a-zA-Z0-9-_]/g, '');
    const nameFile = safeType === 'all' ? 'bar' : safeType;

    const filePath = join(process.cwd(), 'config/chart-options', `${nameFile}.js`);

    const moduleData = await import(filePath);
    const dataFile = moduleData.default || moduleData;

    if (!dataFile) {
        throw createError({
            statusCode: 500,
            message: 'Файл не содержит данных',
        });
    }

    return dataFile;
});