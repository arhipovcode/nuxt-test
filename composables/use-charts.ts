import { ref } from 'vue';
import type { ChartList as ChartListType } from '~/interfaces/chart-list'
import { useItemChartStore } from "~/stores/item-chart";
import { jsStringify, handleFunctionString } from "~/utils/charts/chart-utils";
import menuData from '~/config/navigate/menu';

type ChartFileType = 'pie' | 'column' | 'bar' | 'scatter' | 'all';

const chartFiles: Record<ChartFileType, () => Promise<any>> = {
    pie: () => import('~/examples-code/highcharts/pie.js'),
    column: () => import('~/examples-code/highcharts/column.js'),
    bar: () => import('~/examples-code/highcharts/bar.js'),
    scatter: () => import('~/examples-code/highcharts/scatter.js'),
    all: () => import('~/examples-code/highcharts/all.js'),
};

const chartOptionFiles: Record<ChartFileType, () => Promise<any>> = {
    pie: () => import('~/config/chart-options/pie.js'),
    column: () => import('~/config/chart-options/column.js'),
    bar: () => import('~/config/chart-options/bar.js'),
    scatter: () => import('~/config/chart-options/scatter.js'),
    all: () => import('~/config/chart-options/bar.js'),
};

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

const normalizeFunctionString = (fnStr: string) => {
    return '_isFunction_' + fnStr.replace(/\n/g, '@') + '_endFunction_';
}

export const useCharts = () => {
    const itemChart = useItemChartStore();
    const menu = ref<ChartListType[]>([...menuData].sort((a, b) => a.title.localeCompare(b.title)));

    const fetchItemChart = async (id: string, childId: string | number, subtitle: string) => {
        const str = `${id}_${childId}`.split(/_/);
        const typeChart = str[0] as ChartFileType | undefined;
        const elId = str.at(-1);

        if (!typeChart || !elId || !chartFiles[typeChart]) {
            console.error('Неверный формат ID')
            return
        }

        try {
            const dataModule = await chartFiles[typeChart]();
            const chartList = (dataModule.default || dataModule) as Array<any>;

            if (!Array.isArray(chartList)) {
                console.error('Файл не содержит массив данных');
                return;
            }

            const chartItem = deepMapFunctionsToStrings(chartList.find((item) => item.id === elId));

            if (!chartItem) {
                console.error(`Объект с id "${elId}" не найден в "${typeChart}.js"`);
                return;
            }

            const optionsModule = await chartOptionFiles[typeChart]();
            const chartOptions = (optionsModule.default || optionsModule) as Highcharts.Options;

            const copyData = {
                subtitle,
                title: `${typeChart}${typeChart === 'all' ? ' charts' : ' chart'}`,
                desc: chartItem.desc,
                chartOptions,
                codeJson: '',
                parentId: id,
                childId: id + childId,
            };

            if (chartItem?.code) {
                copyData.codeJson = jsStringify(chartItem.code);

                if (copyData.codeJson.includes('_isFunction_')) {
                    copyData.codeJson = handleFunctionString(copyData.codeJson);
                }
            }

            itemChart.setItem({...copyData, subtitle});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Ошибка при чтении данных из файлов:', error.message);
            } else {
                console.error('Неизвестная ошибка:', error);
            }
        }
    }

    return { menu, fetchItemChart }
}