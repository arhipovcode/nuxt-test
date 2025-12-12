import { describe, it, expect, vi, beforeEach } from 'vitest'

const setItemMock = vi.fn()
const jsStringifyMock = vi.fn(() => 'stringified');
const handleFunctionStringMock = vi.fn((val) => val);

vi.mock('~/stores/item-chart', () => ({
    useItemChartStore: () => ({
        setItem: setItemMock
    })
}))

vi.mock('~/utils/charts/chart-utils', () => ({
    jsStringify: (...args: any[]) => jsStringifyMock(...args),
    handleFunctionString: (...args: any[]) => handleFunctionStringMock(...args),
}))

vi.mock('~/config/navigate/menu', () => ({
    default: [
        {
            id: 'pie_chart',
            title: 'Pie',
            list: [{ id: '1', title: 'First' }],
        }
    ]
}))

vi.mock('~/examples-code/highcharts/pie.js', () => ({
    default: [
        {
            id: '1',
            desc: 'Desc',
            code: { foo: 'bar' }
        }
    ]
}))

vi.mock('~/config/chart-options/pie.js', () => ({
    default: { chart: { type: 'pie' } }
}))

import { useCharts } from "~/composables/use-charts";
import { jsStringify } from "~/utils/charts/chart-utils";

describe('useCharts', () => {
    let charts: ReturnType<typeof useCharts>

    beforeEach(() => {
        vi.clearAllMocks()
        charts = useCharts()
    })

    describe('базовые тесты', () => {
        it('создает композабл', () => {
            expect(charts.menu).toBeDefined()
            expect(charts.fetchItemChart).toBeInstanceOf(Function)
        })
    })

    describe('menu', () => {
        it('возвращает данные из статичного файла', () => {
            expect(charts.menu.value).toEqual([
                {
                    id: 'pie_chart',
                    title: 'Pie',
                    list: [{ id: '1', title: 'First' }],
                }
            ])
        })
    })

    describe('fetchItemChart - валидация', () => {
        it('не делает запросы при пустом ID', async () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

            await charts.fetchItemChart('', '123', 'Test')

            expect(consoleSpy).toHaveBeenCalledWith('Неверный формат ID')
            expect(setItemMock).not.toHaveBeenCalled()

            consoleSpy.mockRestore()
        })
    })

    describe('fetchItemChart - загрузка из файлов', () => {
        it('читает данные из статичных файлов и устанавливает store', async () => {
            await charts.fetchItemChart('pie', '1', 'Sub')

            expect(jsStringifyMock).toHaveBeenCalledWith({ foo: 'bar' })
            expect(setItemMock).toHaveBeenCalledWith(expect.objectContaining({
                title: 'pie chart',
                subtitle: 'Sub',
                desc: 'Desc',
                chartOptions: { chart: { type: 'pie' } },
                parentId: 'pie',
                childId: 'pie1',
                codeJson: 'stringified',
            }))
        })
    })
})