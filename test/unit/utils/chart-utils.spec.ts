import { describe, it, expect } from 'vitest'
import {
    jsStringify,
    countSpacingString,
    replaceLastSymbol,
    handleFunctionString
} from '@/utils/charts/chart-utils'

describe('Функция jsStringify', () => {
    it('корректно сериализует простой объект с примитивами', () => {
        const obj = {
            number: 42,
            string: "тест",
            boolean: true,
            null: null
        }

        const result = jsStringify(obj)

        expect(result).toContain('number: 42')
        expect(result).toContain('string: "тест"')
        expect(result).toContain('boolean: true')
        expect(result).toContain('null: null')
        expect(result).toMatch(/{\s*number: 42,\s*string: "тест",\s*boolean: true,\s*null: null\s*}/)
    })

    it('корректно сериализует вложенные объекты', () => {
        const obj = {
            level1: {
                level2: {
                    value: "вложенное значение"
                }
            }
        }

        const result = jsStringify(obj)

        expect(result).toContain('level1: {')
        expect(result).toContain('level2: {')
        expect(result).toContain('value: "вложенное значение"')
    })

    it('корректно сериализует массивы', () => {
        const obj = {
            simpleArray: [1, 2, 3],
            mixedArray: [1, "текст", { key: "value" }]
        }

        const result = jsStringify(obj)

        expect(result).toContain('simpleArray: [')
        expect(result).toContain('1,')
        expect(result).toContain('2,')
        expect(result).toContain('3')
        expect(result).toContain('mixedArray: [')
        expect(result).toContain('"текст"')
    })

    it('корректно сериализует функции', () => {
        const testFunction = function testFn() { return "результат" }
        const obj = {
            method: testFunction
        }

        const result = jsStringify(obj)

        expect(result).toContain('method: function testFn()')
        expect(result).toContain('return "результат"')
    })

    it('обрабатывает ключи объектов - без кавычек для валидных идентификаторов', () => {
        const obj = {
            validKey: "значение",
            "invalid-key": "значение",
            "123invalid": "значение"
        }

        const result = jsStringify(obj)

        expect(result).toContain('validKey: "значение"')      // без кавычек
        expect(result).toContain('"invalid-key": "значение"') // с кавычками
        expect(result).toContain('"123invalid": "значение"')  // с кавычками
    })

    it('корректно обрабатывает пустые объекты и массивы', () => {
        const obj = {
            emptyObject: {},
            emptyArray: []
        }

        const result = jsStringify(obj)

        expect(result).toContain('emptyObject: {}')
        expect(result).toContain('emptyArray: []')
    })

    it('использует кастомные отступы когда они указаны', () => {
        const obj = { a: { b: 1 } }

        const resultWith4Spaces = jsStringify(obj, 4)

        const lines = resultWith4Spaces.split('\n')

        // отступы в конкретных строках
        expect(lines[1]).toMatch(/^ {4}a: \{/)
        expect(lines[2]).toMatch(/^ {8}b: 1/)
        expect(lines[3]).toMatch(/^ {4}}/)
    })

    it('корректно сериализует специальные значения', () => {
        const obj = {
            undefined: undefined,
            nan: NaN,
            num: 0,
            count: -1,
            infinity: Infinity,
            negative: -Infinity
        }

        const result = jsStringify(obj)

        // JSON.stringify преобразует undefined в null, NaN и Infinity в null
        expect(result).toContain('undefined: null')
        expect(result).toContain('nan: NaN')
        expect(result).toContain('num: 0')
        expect(result).toContain('count: -1')
        expect(result).toContain('infinity: positive infinity')
        expect(result).toContain('negative: negative infinity')
    })

    it('сохраняет порядок ключей объекта', () => {
        const obj = {
            z: 1,
            a: 2,
            m: 3
        }

        const result = jsStringify(obj)

        // Порядок должен сохраниться как в исходном объекте
        const lines = result.split('\n').filter(line => line.trim())
        expect(lines[1]).toContain('z: 1')
        expect(lines[2]).toContain('a: 2')
        expect(lines[3]).toContain('m: 3')
    })

    it('корректно обрабатывает сложную вложенную структуру', () => {
        const obj = {
            array: [
                { item: 1 },
                { item: 2 }
            ],
            nested: {
                object: {
                    with: {
                        deep: "value"
                    }
                }
            }
        }

        const result = jsStringify(obj)

        expect(result).toContain('array: [')
        expect(result).toContain('item: 1')
        expect(result).toContain('item: 2')
        expect(result).toContain('nested: {')
        expect(result).toContain('object: {')
        expect(result).toContain('with: {')
        expect(result).toContain('deep: "value"')
    })
})

describe('Функция countSpacingString', () => {
    it('считает пробелы в начале строки', () => {
        expect(countSpacingString('    test')).toBe(4)
        expect(countSpacingString('')).toBe(0)
        expect(countSpacingString('test')).toBe(0)
        expect(countSpacingString('  test  ')).toBe(2)
    })
})

describe('Функция replaceLastSymbol', () => {
    it('заменяет последний @ на &', () => {
        expect(replaceLastSymbol('a@b@c@')).toBe('a@b@c&')
        expect(replaceLastSymbol('abc')).toBe('abc')
        expect(replaceLastSymbol('@')).toBe('&')
        expect(replaceLastSymbol('@@@@')).toBe('@@@&')
        expect(replaceLastSymbol('@@@@#', '@', '!!')).toBe('@@@!!#')
    })
})

describe('Функция handleFunctionString', () => {
    it('удаляет маркер _isFunction_ и форматирует отступы с @', () => {
        const input = '  function _isFunction_test() {\n@console.log("hi");\n@return true;\n}'
        const output = handleFunctionString(input)

        expect(output).toBe('  function _isFunction_test() {\n\n    console.log("hi");\n\n  return true;\n}')
    })
})