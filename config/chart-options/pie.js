export default {
    chart: {
        type: 'pie',
    },
    title: {
        text: 'График тип pie',
    },
    plotOptions: {
        pie: {
            dataLabels: {
                style: {
                    color: '#333333',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            }
        },
    },
    series: [
        {
            data: [
                {name: 'Сектор за 2023', y: 40, color: '#5890F8'},
                {name: 'Сектор за 2024', y: 30, color: '#ADB6CE'},
                {name: 'Сектор за 2025', y: 55, color: '#DFF0EA'},
            ]
        },
    ],
};