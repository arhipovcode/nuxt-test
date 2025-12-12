const s=[{id:"1",desc:'В корневом уровне настроек, добавить объект "plotOptions.column", => borderRadius указать нужное скругление.',code:{plotOptions:{column:{borderRadius:{radius:16,scope:"point",where:"all"}}}}},{id:"2",desc:`В объекте "chart.events" – использовать метод "load" <br>
                см. код ниже.`,code:{chart:{events:{load:function(){const e=this;e.series.forEach(r=>{r.points.forEach(o=>{const t=o.shapeArgs.height+20;e.renderer.rect(o.shapeArgs.x+e.plotLeft,e.plotHeight+e.plotTop-t,o.shapeArgs.width,t,4).attr({fill:"#DFF0EA",zIndex:1}).on("mouseover",()=>o.onMouseOver()).add()})})}}}}},{id:"3",desc:`В объекте plotOptions.column.dataLabels <br>
                включить отображение enabled: true <br>
                format: {y} – отображаемого значения <br>
                format: {y:.1f} – с одним знаком после запятой <br>
                <b>formatter</b> - функция для кастомного форматирования <br>
                <i>Важно:</i> если yAxis имеет max, то столбцы достигшие максимального значения, <br>
                у них будет лейбл смещен во внутрь столбца, <br>
                настраивается через обязательные свойства <b>overflow: 'allow',
                crop: false,</b><br>
                а также <b>spacingTop</b> или <b>marginTop</b><br>
                у графика.`,code:{plotOptions:{column:{dataLabels:{enabled:!0,allowOverlap:!0,format:"{y}",y:-10,style:{fontSize:"16px",lineHeight:"24px",fontWeight:400,color:"#13151A"}}}}}},{id:"4",desc:"",code:{}}];export{s as default};
