export default [
  {
    id: '1',
    desc: 'В объекте "plotOptions.pie", нужно установить свойство borderWidth в 0',
    code: {
      plotOptions: {
        pie: {
          borderWidth: 0,
        }
      },
    },
  },
  {
    id: '2',
    desc: `В объекте "plotOptions.pie", нужно использовать свойство innerSize. <br>
        Внутренний радиус будет равен 50% от внешнего радиуса круга, <br>
        можно использовать пиксели для более точного размера.`,
    code: {
      plotOptions: {
        pie: {
          innerSize: '50%',
        }
      },
    },
  },
  {
    id: '3',
    desc: `Чтобы использовать заливку сектора svg изображением, нужно подключить модуль pattern-fill.js. <br>
        <b>Зависит от версии <i>highcharts</i>. В примере используется версия <i>12.2</i></b> <br>
        В этой версии нужно только импортировать модуль. <br><br>
        В версиях ниже нужен: <br>
        <b>import PatternFill from 'highcharts/modules/pattern-fill';</b> <br>
        Активировать модуль <b>PatternFill(Highcharts);</b> <br><br>
        Паттерны можно настроить внутри серии. Для этого нужно задать объект <br>
        <b>color.pattern: {
          path: 'M 10 10 m -1.5 0 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0',
          width: 16,
          height: 16,
          color: '#c3d8f9',
          backgroundColor: '#99C7FF',
          patternTransform: 'rotate(45 0 0)',
        }</b> 
        В примере используется круг.<br>
        Круг или квадрат нужно создавать через объект path <br>
        и задавать fill (заливку), чтобы залить весь объект <br>
        color - задает цвет svg. <br>
        width/height - задает расстояние между svg. <br>
        backgroundColor - фоновый цвет сектора. <br>
        patternTransform - поворот и смещение паттерна. `,
    code: {
      series: [
        {
          data: [
            {
              color: {
                pattern: {
                  path: 'M 10 10 m -1.5 0 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0',
                  width: 16,
                  height: 16,
                  color: '#c3d8f9',
                  backgroundColor: '#99C7FF',
                  patternTransform: 'rotate(45 0 0)',
                }
              }
            },
            {
              color: {
                pattern: {
                  path: 'M 0 7 L 14 7',
                  width: 14,
                  height: 14,
                  color: '#93b9f7',
                  strokeWidth: 2,
                  backgroundColor: '#4093FF',
                  patternTransform: 'rotate(35 0 0)',
                }
              }
            },{
              color: {
                pattern: {
                  path: 'M 0 0 L 5 5 M 4.5 -0.5 L 5.5 0.5 M -0.5 4.5 L 0.5 5.5',
                  color: '#2caffe',
                  width: 5,
                  height: 5,
                  patternTransform: 'scale(1.4 1.4)',
                }
              }
            },
          ]
        },
      ]
    },
  },
  {
    id: '4',
    desc: `В серии нужно задать угол "начало" и "конец", <br> откуда рисовать круг (startAngle, endAngle) <br>
        А также центровать половинки в объекте <b>plotOptions.pie.center</b> <br><i>['50%']</i>`,
    code: {
      plotOptions: {
        pie: {
          center: ['50%'],
        },
      },
      series: [
        {
          name: 'Левая половина',
          startAngle: 180,
          endAngle: 360,
          data: [
            {name: 'Левая 1', y: 40, color: '#5890F8'},
            {name: 'Левая 2', y: 30, color: '#ADB6CE'},
            {name: 'Левая 3', y: 55, color: '#DFF0EA'},
          ],
        },
        {
          name: 'Правая половина',
          startAngle: 0,
          endAngle: 180,
          data: [
            {name: 'Правая 1', y: 40, color: '#6f94da'},
            {name: 'Правая 2', y: 30, color: '#7c86a1'},
            {name: 'Правая 3', y: 55, color: '#9dc1b4'},
          ],
        }
      ],
    },
  },
  {
    id: '5',
    desc: ``,
    code: {
      plotOptions: {
        pie: {
          center: ['50%'],
        },
      },
      series: [
        {
          name: 'Левая половина',
          startAngle: 180,
          endAngle: 360,
          innerSize: 100,
          data: [
            {name: 'Левая 1', y: 40, color: '#5890F8'},
            {name: 'Левая 2', y: 30, color: '#ADB6CE'},
            {name: 'Левая 3', y: 55, color: '#DFF0EA'},
          ],
        },
        {
          name: 'Правая половина',
          startAngle: 0,
          endAngle: 180,
          innerSize: 70,
          data: [
            {name: 'Правая 1', y: 40, color: '#6f94da'},
            {name: 'Правая 2', y: 30, color: '#7c86a1'},
            {name: 'Правая 3', y: 55, color: '#9dc1b4'},
          ],
        }
      ],
    }
  },
];