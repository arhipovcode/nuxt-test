export default {
    chart: {
        type: 'scatter',
        zooming: {
            type: 'xy',
            mouseWheel: {
                enabled: true,
            },
        },
    },
    title: {
        text: 'График тип scatter',
    },
    series: [
        {
            name: '2024',
            data: [
                {name: 'Серия 2024', y: 40, color: '#5890F8'},
                {name: 'Серия 2024', y: 30, color: '#5890F8'},
                {name: 'Серия 2024', y: 25, color: '#5890F8'},
                {name: 'Серия 2024', y: 50, color: '#5890F8'},
                {name: 'Серия 2024', y: 33, color: '#5890F8'},
                {name: 'Серия 2024', y: 51, color: '#5890F8'},
                {name: 'Серия 2024', y: 23, color: '#5890F8'},
            ],
            marker: {
                radius: 4.5,
                symbol: 'circle',
            }
        },
        {
            name: '2025',
            data: [
                {name: 'Серия 2025', y: 30, color: '#ADB6CE'},
                {name: 'Серия 2025', y: 25, color: '#ADB6CE'},
                {name: 'Серия 2025', y: 35, color: '#ADB6CE'},
                {name: 'Серия 2025', y: 23, color: '#ADB6CE'},
                {name: 'Серия 2025', y: 44, color: '#ADB6CE'},
                {name: 'Серия 2025', y: 55, color: '#ADB6CE'},
                {name: 'Серия 2025', y: 31, color: '#ADB6CE'},
            ],
            marker: {
                radius: 4.5,
                symbol: 'square',
            }
        }
    ],
};