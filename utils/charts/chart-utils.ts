/**
 * Сериализует JavaScript объект в строку с форматированием, аналогичным JSON.stringify,
 * но с поддержкой функций и улучшенным форматированием для читаемости
 *
 * @param obj - Объект для сериализации
 * @param indent - Количество пробелов для каждого уровня вложенности (по умолчанию 2)
 * @return - Строка с отформатированным JavaScript кодом, представляющим переданный объект
 */
export function jsStringify(obj: object, indent = 2) {
    const canUnquote = (key: string) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);

    /**
     * Рекурсивная функция, превращающая JS-значение в JS-код в виде строки
     * @param value — любое значение: объект, массив, функция, число, строка, boolean, null
     * @param level — текущий уровень вложенности (для отступов)
     * @returns строка с JS-кодом
     */
    function serialize(value: any, level: number): string {
        const tabIndent = ' '.repeat(level * indent);
        const nextTabIndent = ' '.repeat((level + 1) * indent);

        if (Array.isArray(value)) {
            if (!value.length) return '[]';
            return `[\n${value.map(v => nextTabIndent + serialize(v, level + 1)).join(',\n')}\n${tabIndent}]`
        }

        if (value && typeof value === 'object' && value.constructor === Object) {
            const keys = Object.keys(value);

            if (!keys.length) {
                return '{}'
            }

            return `{\n${keys.map(k => {
                const keyStr = canUnquote(k) ? k : JSON.stringify(k);
                return nextTabIndent + keyStr + ': ' + serialize(value[k], level + 1);
            }).join(',\n')}\n${tabIndent}}`;
        }

        if (typeof value === 'function') {
            return value.toString()
        }

        // Обработка специальных значений
        if (value === null || value === undefined) {
            return 'null';
        }

        if (Number.isNaN(value)) {
            return 'NaN';
        }

        if (value === Infinity) {
            return 'positive infinity';
        }

        if (value === -Infinity) {
            return 'negative infinity';
        }

        return JSON.stringify(value);
    }

    return serialize(obj, 0);
}

/**
 * Считает количество пробелов в начале строки
 *
 * @param str - строка
 * @return {number} количество пробелов
 */
export function countSpacingString(str: string) {
    const match = str.match(/^ +/); // Ищет пробелы в начале строки
    return match ? match[0].length : 0;
}

/**
 * Заменяет последний символ в строке
 * заменяет на символ &
 *
 * @param str - строка для замены
 * @param symbol - последний заменяемый символ
 * @param replaceSymbol - замененный символ
 * @return {string} - возвращает строку с измененным символом
 */
export function replaceLastSymbol(str: string, symbol: string = '@', replaceSymbol: string = '&') {
    const lastIndex = str.lastIndexOf(symbol);
    if (lastIndex === -1) return str;
    return str.slice(0, lastIndex) + replaceSymbol + str.slice(lastIndex + 1);
}

/**
 *
 * @param str
 * @return {string}
 */
export function handleFunctionString(str: string) {
    const lines = str.split('\n'); // разбиваю на массив

    // получаю строку, содержащую _isFunction_
    const functionLine = lines.find(line => line.includes('_isFunction_'));
    // получаю кол-во пробелов
    const countSpaces = countSpacingString(functionLine || '');
    let replaceStr = str
        .replace(/"_isFunction_/, '')
        .replace(/_endFunction_"/, '')
        .replace(/@\s*/g, '\n@');

    return replaceLastSymbol(replaceStr)
        .replace(/@/g, ' '.repeat(countSpaces + 2))
        .replace(/&/g, ' '.repeat(countSpaces));
}