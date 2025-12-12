import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useItemChartStore } from "~/stores/item-chart";
import Highcharts from 'highcharts'

// Мокаем Highcharts чтобы не импортировать реальную библиотеку
vi.mock('highcharts', () => ({
    default: {}
}))

describe('Store item-chart', () => {
    let store: ReturnType<typeof useItemChartStore>

    // Примерные данные для тестов
    const mockChartOptions: Highcharts.Options = {
        chart: { type: 'line' },
        title: { text: 'Test Chart' },
        series: [{
            data: [1, 2, 3],
            name: 'line'
        } as Highcharts.SeriesLineOptions]
    }

    const baseItemData = {
        chartOptions: mockChartOptions,
        subtitle: 'Test Subtitle',
        codeJson: '{"test": "data"}',
        title: 'Test Chart Title',
        desc: 'Test Description',
        parentId: 'line',
        childId: '123'
    }

    beforeEach(() => {
        // Новое Pinia перед каждым тестом
        setActivePinia(createPinia())
        store = useItemChartStore()
    })

    afterEach(() => {
        // Очищаю store после каждого теста
        store.clearItem()
    })

    describe('Начальное состояние', () => {
        it('должен инициализироваться с null', () => {
            expect(store.item).toBeNull()
        })

        it('геттер getItem возвращает null', () => {
            expect(store.getItem).toBeNull()
        })
    })

    describe('Действие setItem()', () => {
        it('корректно устанавливает элемент', () => {
            store.setItem(baseItemData)

            expect(store.item).toEqual(baseItemData)
            expect(store.getItem).toEqual(baseItemData)
        })

        it('перезаписывает существующий элемент', () => {
            // Первая установка
            store.setItem(baseItemData)
            expect(store.item).toEqual(baseItemData)

            // Вторая установка (перезапись)
            const newItemData = {
                ...baseItemData,
                title: 'New Title',
                subtitle: 'New Subtitle'
            }

            store.setItem(newItemData)

            expect(store.item).toEqual(newItemData)
            expect(store.item?.title).toBe('New Title')
            expect(store.item?.subtitle).toBe('New Subtitle')
        })

        it('обрабатывает разные типы chartOptions', () => {
            const barChartOptions: Highcharts.Options = {
                chart: { type: 'bar' },
                title: { text: 'Bar Chart' }
            }

            const itemWithBarChart = {
                ...baseItemData,
                chartOptions: barChartOptions
            }

            store.setItem(itemWithBarChart)

            expect(store.item?.chartOptions).toEqual(barChartOptions)
            expect(store.item?.chartOptions.chart?.type).toBe('bar')
        })

        it('обрабатывает разные форматы childId', () => {
            const testCases = [
                { childId: '123', expected: '123' },
                { childId: 456, expected: 456 },
                { childId: 'abc123', expected: 'abc123' }
            ]

            testCases.forEach(({ childId, expected }) => {
                store.clearItem()
                const itemData = { ...baseItemData, childId }

                store.setItem(itemData)

                expect(store.item?.childId).toBe(expected)
            })
        })

        it('корректно сохраняет codeJson', () => {
            const codeJsonCases = [
                '{"simple": "json"}',
                '{"nested": {"data": [1, 2, 3]}}',
                '',
                '{"functions": {"test": "function() { return 1; }"}}'
            ]

            codeJsonCases.forEach(codeJson => {
                store.clearItem()
                const itemData = { ...baseItemData, codeJson }

                store.setItem(itemData)

                expect(store.item?.codeJson).toBe(codeJson)
            })
        })

        it('обрабатывает минимальный набор данных', () => {
            const minimalData = {
                chartOptions: {},
                subtitle: 'Minimal',
                codeJson: '',
                title: 'Minimal Title',
                desc: '',
                parentId: 'min',
                childId: '1'
            }

            store.setItem(minimalData)

            expect(store.item).toEqual(minimalData)
            expect(store.item?.desc).toBe('')
            expect(store.item?.codeJson).toBe('')
        })
    })

    describe('Действие clearItem()', () => {
        it('очищает элемент когда store не пустой', () => {
            store.setItem(baseItemData)
            expect(store.item).not.toBeNull()

            store.clearItem()

            expect(store.item).toBeNull()
            expect(store.getItem).toBeNull()
        })

        it('работает когда store уже пустой', () => {
            expect(store.item).toBeNull()

            store.clearItem() // Не должно вызывать ошибок

            expect(store.item).toBeNull()
        })

        it('позволяет установить новый элемент после очистки', () => {
            // Установка → Очистка → Новая установка
            store.setItem(baseItemData)
            store.clearItem()

            const newItemData = {
                ...baseItemData,
                title: 'After Clear'
            }

            store.setItem(newItemData)

            expect(store.item?.title).toBe('After Clear')
            expect(store.item).not.toBeNull()
        })
    })

    describe('Геттер getItem', () => {
        it('возвращает актуальные данные после setItem', () => {
            store.setItem(baseItemData)
            expect(store.getItem).toEqual(baseItemData)
        })

        it('возвращает null после clearItem', () => {
            store.setItem(baseItemData)
            store.clearItem()
            expect(store.getItem).toBeNull()
        })

        it('реактивно обновляется при изменениях', () => {
            store.setItem(baseItemData)
            const initialGetItem = store.getItem

            const newItemData = {
                ...baseItemData,
                title: 'Updated Title'
            }
            store.setItem(newItemData)

            expect(store.getItem).not.toBe(initialGetItem)
            expect(store.getItem?.title).toBe('Updated Title')
        })
    })

    describe('Типы данных', () => {
        it('корректно типизирует item как Item | null', () => {
            // TypeScript проверка
            const item = store.item
            if (item) {
                // Должны быть доступны свойства ItemChart
                expect(item.title).toBeDefined()
                expect(item.subtitle).toBeDefined()
                expect(item.chartOptions).toBeDefined()
            }
        })

        it('геттер возвращает правильный тип', () => {
            const getItem = store.getItem
            if (getItem) {
                // Должны быть доступны свойства ItemChart
                expect(getItem.parentId).toBeDefined()
                expect(getItem.childId).toBeDefined()
                expect(getItem.desc).toBeDefined()
            }
        })
    })

    describe('Интеграционные тесты', () => {
        it('последовательность setItem → getItem → clearItem → getItem', () => {
            // 1. Установка
            store.setItem(baseItemData)
            expect(store.getItem).toEqual(baseItemData)

            // 2. Получение через геттер
            const retrievedItem = store.getItem
            expect(retrievedItem).toEqual(baseItemData)

            // 3. Очистка
            store.clearItem()
            expect(store.getItem).toBeNull()

            // 4. Повторная установка
            const newItem = { ...baseItemData, title: 'New Item' }
            store.setItem(newItem)
            expect(store.getItem?.title).toBe('New Item')
        })

        it('множественные операции не ломают store', () => {
            // Множественные set/clear операции
            for (let i = 0; i < 5; i++) {
                const itemData = { ...baseItemData, title: `Item ${i}` }
                store.setItem(itemData)
                expect(store.item?.title).toBe(`Item ${i}`)

                store.clearItem()
                expect(store.item).toBeNull()
            }

            // Финальная проверка
            store.setItem(baseItemData)
            expect(store.item).toEqual(baseItemData)
        })
    })
})