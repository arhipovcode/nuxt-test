export default [
    {
        id: '1',
        desc: `В объекте chart.events - метод load добавить код ниже.`,
        code: {
            chart: {
                events: {
                    load: function () {
                        const chart = this;
                        if (chart.customResetButton) return;

                        chart.customResetButton = chart.renderer.button(
                            '', // текст кнопки
                            chart.plotLeft + chart.plotWidth, // x - положение
                            chart.plotTop, // y - положение
                            function () {
                                chart.zoomOut();
                            },
                            {
                                stroke: 'none',
                                r: 6,
                                zIndex: 5,
                            },
                        ).add();

                        chart.customResetButton.element.classList.add('chart-reset-btn-arrow');

                        // SVG-иконка
                        let svgIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjQxMDMgMy40MTA4MkwxMi44MTIgMi4zMjg1OEwxMS44NTcyIDEuMDkxOEw4Ljc5MDk1IDMuNDU5MDdDOC40NDk0MiAzLjcyMjc1IDguMzg2MzEgNC4yMTMzNyA4LjY0OTk5IDQuNTU0OUwxMS4wMTczIDcuNjIxMTFMMTIuMjU0IDYuNjY2MjRMMTAuODk3NiA0LjkwOTM1QzEzLjgzNzUgNS4zNDMzOCAxNi4wOTM4IDcuODc2OTMgMTYuMDkzOCAxMC45Mzc1QzE2LjA5MzggMTQuMzAyOSAxMy4zNjU1IDE3LjAzMTIgMTAgMTcuMDMxMkM2LjYzNDUxIDE3LjAzMTIgMy45MDYyNSAxNC4zMDI5IDMuOTA2MjUgMTAuOTM3NUgyLjM0Mzc1QzIuMzQzNzUgMTUuMTY1OSA1Ljc3MTU3IDE4LjU5MzcgMTAgMTguNTkzN0MxNC4yMjg0IDE4LjU5MzcgMTcuNjU2MiAxNS4xNjU5IDE3LjY1NjIgMTAuOTM3NUMxNy42NTYyIDcuMTkwOCAxNC45NjUgNC4wNzI3MSAxMS40MTAzIDMuNDEwODJaIiBmaWxsPSIjMDAzMDk5Ii8+Cjwvc3ZnPgo=';
                        chart.renderer.image(svgIcon, 10, 10, 20, 20).add(chart.customResetButton);

                        // положение кнопки по X
                        // 40 - задано в стилях
                        chart.customResetButton.attr({
                            x: chart.plotLeft + chart.plotWidth - 40,
                        })
                    },
                }
            },
        }
    },
];