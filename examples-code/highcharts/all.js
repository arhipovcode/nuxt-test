export default [
    {
        id: '1',
        desc: 'В корневом уровне настроек, добавить объект "credits" с параметром "enabled: false"',
        code: {
            credits: {
                enabled: false,
            }
        },
    },
    {
        id: '2',
        desc: `В объекте "tooltip" добавить функцию "formatter", <br>
               Также можно добавить любые данные. <br>
               Опции: <br>
                - <b>useHTML</b> – включает добавление HTML <br>
                - <b>followPointer</b> – tooltip следует за курсором мыши <br>
                - <b>outside</b> – выходит за пределы графика (контейнер имеет overflow: hidden) <br>
                - <b>shadow</b> – отключает тень`,
        code: {
            tooltip: {
                useHTML: true,
                followPointer: true,
                outside: true,
                shadow: false,
                backgroundColor: 'transparent',
                padding: 0,
                formatter: function () {
                    return `<span class='my-class-tooltip'>Имя серии: ${this.name} - значение: ${this.y}</span>`;
                },
            }
        },
    },
    {
        id: '3',
        desc: 'В корне, добавить объект "legend" с параметрами "enabled: false"',
        code: {
            legend: {
                enabled: false,
            }
        },
    },
];