import Highcharts from 'highcharts';
import 'highcharts/modules/pattern-fill.js';
import 'highcharts/modules/mouse-wheel-zoom.js'
// console.log('!!!!', Highcharts.patterns);
export default defineNuxtPlugin(() => {
    return {
        provide: {
            highcharts: Highcharts
        }
    }
})