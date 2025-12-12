const b=[{id:"1",desc:`В корневом уровне настроек, добавить объект "plotOptions.series",
            => stacking=normal. <br>
            <b>"Normal"</b> – Серии складываются по оси Y (или X для bar) сверху друг друга. <br>
            <b>"Percent"</b> – Серии отображаются как процент от суммы. Т. Е. Все серии в сумме занимают 100%`,code:{plotOptions:{series:{stacking:"normal"}}}},{id:"2",desc:`В корневом уровне настроек, добавить объект "plotOptions.bar.borderRadius", <br>
               указать нужное скругление (число или процент).`,code:{plotOptions:{bar:{borderRadius:"50%"}}}},{id:"3",desc:`В корневом уровне настроек, добавить объект "plotOptions.bar.borderRadius[Object]", <br>
               <i>в старых версиях может не работать</i> <br>
               radius: 16 – скругление,<br>
               scope: 'point' – для каждого столбца, 'stack' – для всего стека,<br>
               where: 'all' – где именно.`,code:{plotOptions:{bar:{borderRadius:{radius:"50%",scope:"point",where:"all"}}}}},{id:"4",desc:`В объекте "chart" добавить объект "events", <br>
            с методом "render". <br>
            <b>r</b> – отвечает за скругление <br>
            <i>Важно: </i>если график имеет <b>stacking</b>, то скругляться все бары в линии.`,code:{chart:{events:{render:function(){this.series.forEach(c=>{c.points.forEach(n=>{const a=n.graphic;if(!a)return;const{x:o,y:r,width:t,height:i}=n.shapeArgs,e=16,s=["M",o+e+.5,r+.5,"L",o+t-e-.5,r+.5,"A",e,e,0,0,1,o+t-.5,r+e+.5,"L",o+t-.5,r+i-e-.5,"A",e,e,0,0,1,o+t-e-.5,r+i-.5,"L",o+e+.5,r+i-.5,"A",e,e,0,0,1,o+.5,r+i-e-.5,"L",o+.5,r+e+.5,"A",e,e,0,0,1,o+e+.5,r+.5,"Z"].join(" ");a.attr({d:s})})})}}}}},{id:"5",desc:`В объекте "chart" добавить объект "events", <br>
            с методом "render". <br>
            <b>r</b> – отвечает за скругление.`,code:{chart:{events:{render:function(){this.series.forEach((c,n)=>{c.points.forEach(a=>{const o=a.graphic;if(!o)return;const{x:r,y:t,width:i,height:e}=a.shapeArgs,s=16;let d=[];n===0&&(d=["M",r+s+.5,t+.5,"L",r+i-s-.5,t+.5,"A",s,s,0,0,1,r+i-.5,t+s+.5,"L",r+i-.5,t+e-s-.5,"A",0,0,0,0,1,r+i-0-.5,t+e-.5,"L",r+s+.5,t+e-.5,"A",0,0,0,0,1,r+.5,t+e-0-.5,"L",r+.5,t+s+.5,"A",s,s,0,0,1,r+s+.5,t+.5,"Z"].join(" ")),n===this.series.length-1&&(d=["M",r+s+.5,t+.5,"L",r+i-s-.5,t+.5,"A",0,0,0,0,1,r+i-.5,t+0+.5,"L",r+i-.5,t+e-s-.5,"A",s,s,0,0,1,r+i-s-.5,t+e-.5,"L",r+s+.5,t+e-.5,"A",s,s,0,0,1,r+.5,t+e-s-.5,"L",r+.5,t+s+.5,"A",0,0,0,0,1,r+0+.5,t+.5,"Z"].join(" ")),o.attr({d})})})}}},plotOptions:{series:{stacking:"normal"}}}},{id:"6",desc:"В объекте yAxis добавить endOnTick=false вместе с параметром maxPadding",code:{yAxis:{endOnTick:!1,maxPadding:0}}},{id:"7",desc:"",code:{}}];export{b as default};
