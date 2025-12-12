export interface ItemChart {
    title: string;
    subtitle: string;
    desc: string;
    chartOptions: Highcharts.Options;
    code?: object;
    codeJson?: string;
    isFunction?: boolean;
    parentId: string;
    childId: string | number;
}