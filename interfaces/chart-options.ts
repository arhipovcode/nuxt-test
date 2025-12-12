export interface ChartOptions {
    type: string;
    title: string;
    series: Array<{
        name: string,
        data: Array<{
            x?: number;
            y?: number;
            name: string
            color?: string
        }>
    }>;
}