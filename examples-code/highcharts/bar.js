export default [
    {
        id: '1',
        desc: `В корневом уровне настроек, добавить объект "plotOptions.series",
            => stacking=normal. <br>
            <b>"Normal"</b> – Серии складываются по оси Y (или X для bar) сверху друг друга. <br>
            <b>"Percent"</b> – Серии отображаются как процент от суммы. Т. Е. Все серии в сумме занимают 100%`,
        code: {
            plotOptions: {
                series: {
                    stacking: 'normal',
                }
            },
        },
    },
    {
        id: '2',
        desc: `В корневом уровне настроек, добавить объект "plotOptions.bar.borderRadius", <br>
               указать нужное скругление (число или процент).`,
        code: {
            plotOptions: {
                bar: {
                    borderRadius: '50%',
                },
            },
        },
    },
    {
        id: '3',
        desc: `В корневом уровне настроек, добавить объект "plotOptions.bar.borderRadius[Object]", <br>
               <i>в старых версиях может не работать</i> <br>
               radius: 16 – скругление,<br>
               scope: 'point' – для каждого столбца, 'stack' – для всего стека,<br>
               where: 'all' – где именно.`,
        code: {
            plotOptions: {
                bar: {
                    borderRadius: {
                        radius: '50%',
                        scope: 'point',
                        where: 'all',
                    },
                },
            },
        },
    },
    {
        id: '4',
        desc: `В объекте "chart" добавить объект "events", <br>
            с методом "render". <br>
            <b>r</b> – отвечает за скругление <br>
            <i>Важно: </i>если график имеет <b>stacking</b>, то скругляться все бары в линии.`,
        code: {
            chart: {
                events: {
                    render: function () {
                        this.series.forEach((series) => {
                            series.points.forEach((point) => {
                                const g = point.graphic;
                                if (!g) return;

                                const { x, y, width, height } = point.shapeArgs;
                                const r = 16;

                                const path = [
                                    'M', x + r + 0.5, y + 0.5,
                                    'L', x + width - r - 0.5, y + 0.5,
                                    'A', r, r, 0, 0, 1, x + width - 0.5, y + r + 0.5,  // верхний правый закругление
                                    'L', x + width - 0.5, y + height - r - 0.5,
                                    'A', r, r, 0, 0, 1, x + width - r - 0.5, y + height - 0.5, // верхний левый закругление
                                    'L', x + r + 0.5, y + height - 0.5,
                                    'A', r, r, 0, 0, 1, x + 0.5, y + height - r - 0.5,    // нижний левый закругление
                                    'L', x + 0.5, y + r + 0.5,
                                    'A', r, r, 0, 0, 1, x + r + 0.5, y + 0.5,             // нижний правый закругление
                                    'Z'
                                ].join(' ');

                                g.attr({ d: path });
                            })
                        });
                    }
                }
            },
        },
    },
    {
        id: '5',
        desc: `В объекте "chart" добавить объект "events", <br>
            с методом "render". <br>
            <b>r</b> – отвечает за скругление.`,
        code: {
            chart: {
                events: {
                    render: function () {
                        this.series.forEach((series, index) => {
                            series.points.forEach((point) => {
                                const g = point.graphic;
                                if (!g) return;

                                const { x, y, width, height } = point.shapeArgs;
                                const r = 16;
                                let path = [];
                                if (index === 0) {
                                    path = [
                                        'M', x + r + 0.5, y + 0.5,
                                        'L', x + width - r - 0.5, y + 0.5,
                                        'A', r, r, 0, 0, 1, x + width - 0.5, y + r + 0.5,  // верхний правый закругление
                                        'L', x + width - 0.5, y + height - r - 0.5,
                                        'A', 0, 0, 0, 0, 1, x + width - 0 - 0.5, y + height - 0.5, // верхний левый закругление
                                        'L', x + r + 0.5, y + height - 0.5,
                                        'A', 0, 0, 0, 0, 1, x + 0.5, y + height - 0 - 0.5,    // нижний левый закругление
                                        'L', x + 0.5, y + r + 0.5,
                                        'A', r, r, 0, 0, 1, x + r + 0.5, y + 0.5,             // нижний правый закругление
                                        'Z'
                                    ].join(' ');
                                }
                                if (index === this.series.length - 1) {
                                    path = [
                                        'M', x + r + 0.5, y + 0.5,
                                        'L', x + width - r - 0.5, y + 0.5,
                                        'A', 0, 0, 0, 0, 1, x + width - 0.5, y + 0 + 0.5,  // верхний правый закругление
                                        'L', x + width - 0.5, y + height - r - 0.5,
                                        'A', r, r, 0, 0, 1, x + width - r - 0.5, y + height - 0.5, // верхний левый закругление
                                        'L', x + r + 0.5, y + height - 0.5,
                                        'A', r, r, 0, 0, 1, x + 0.5, y + height - r - 0.5,    // нижний левый закругление
                                        'L', x + 0.5, y + r + 0.5,
                                        'A', 0, 0, 0, 0, 1, x + 0 + 0.5, y + 0.5,             // нижний правый закругление
                                        'Z'
                                    ].join(' ');
                                }
                                g.attr({ d: path });
                            })
                        });
                    }
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                }
            },
        },
    },
    {
        id: '6',
        desc: `В объекте yAxis добавить endOnTick=false вместе с параметром maxPadding`,
        code: {
            yAxis: {
                endOnTick: false,
                maxPadding: 0,
            },
        },
    },
    {
        id: '7',
        desc: ``,
        code: {

        },
    },
];