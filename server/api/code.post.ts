import { join } from 'path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { type, id } = body;

    if (!type || !id) {
        throw createError({
            statusCode: 400,
            message: 'type и id обязательны',
        });
    }

    const safeType = type.replace(/[^a-zA-Z0-9-_]/g, '');
    const safeId = id.replace(/[^a-zA-Z0-9-_]/g, '');

    // путь к файлу
    const filePath = join(process.cwd(), 'examples-code/highcharts', `${safeType}.js`);

    const moduleData = await import(filePath);
    const list = moduleData.default || moduleData;

    if (!Array.isArray(list)) {
        throw createError({
            statusCode: 500,
            message: 'Файл не содержит массив данных',
        });
    }

    const chartItem = deepMapFunctionsToStrings(list.find((item) => item.id === safeId));

    if (!chartItem) {
        throw createError({
            statusCode: 404,
            message: `Объект с id "${safeId}" не найден в "${safeType}.js"`,
        });
    }

    return { ...chartItem, title: safeType + (safeType === 'all' ? ' charts' : ' chart') };
});

const deepMapFunctionsToStrings = (obj: any): any => {
    if (typeof obj === 'function') {
        return normalizeFunctionString(obj.toString());
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepMapFunctionsToStrings(item));
    }

    if (obj !== null && typeof obj === 'object') {
        const result: Record<string, any> = {};

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = deepMapFunctionsToStrings(obj[key]);
            }
        }

        return result;
    }

    return obj;
}

/**
 *
 * @param fnStr
 * @return строка с заменой переносов на символ @
 */
function normalizeFunctionString(fnStr: string) {
    return '_isFunction_' + fnStr
        .replace(/\n/g, '@') + '_endFunction_'
}