import {defineStore} from "pinia";
import type {ItemChart as Item} from "~/interfaces/item-chart";
import Highcharts from "highcharts";

export const useItemChartStore = defineStore('itemChart', {
    state: (): { item: Item | null } => ({
        item: null,
    }),
    actions: {
        setItem(data: {
            chartOptions: Highcharts.Options;
            subtitle: string;
            codeJson: string;
            title: string;
            desc: string;
            parentId: string;
            childId: string | number;
        }) {
            this.item = data;
        },
        clearItem() {
            this.item = null
        },
    },
    getters: {
        getItem(): Item | null {
            return this.item;
        }
    }
})