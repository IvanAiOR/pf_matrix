$(function () {
    if ($('div#id_panel_home').length) {
        var listaDonas = []







        //esta funcion toma un contexto y lo carga para las necesidades del caso. 
        //El contexto es un canvas por lo general
        var cargarCTX = function (ctx) {

            Chart.pluginService.register({
                beforeDraw: function (chart) {
                    if (chart.config.options.elements.center) {
                        //Get ctx from string
                        var ctx = chart.chart.ctx;

                        //Get options from the center object in options
                        var centerConfig = chart.config.options.elements.center;
                        var fontStyle = centerConfig.fontStyle || 'Arial';
                        var txt = centerConfig.text;
                        var color = centerConfig.color || '#000';
                        var sidePadding = centerConfig.sidePadding || 20;
                        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                        //Start with a base font of 30px
                        ctx.font = "30px " + fontStyle;

                        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                        var stringWidth = ctx.measureText(txt).width;
                        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                        // Find out how much the font can grow in width.
                        var widthRatio = elementWidth / stringWidth;
                        var newFontSize = Math.floor(30 * widthRatio);
                        var elementHeight = (chart.innerRadius * 2);

                        // Pick a new font size so it will not be larger than the height of label.
                        var fontSizeToUse = Math.min(newFontSize, elementHeight);

                        //Set font settings to draw it correctly.
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                        ctx.font = fontSizeToUse + "px " + fontStyle;
                        ctx.fillStyle = color;

                        //Draw text in center
                        ctx.fillText(txt, centerX, centerY);
                    }
                }
            });
        }
        //a continuacion creé un "objeto" Dona, que necesita un contexto para crear un grafico de dona
        class Dona {
            constructor(ctx) {
                this.listaItemsLabel = []
                this.totalDona = 0;
                this.myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: [],
                        datasets: [{
                            label: 'N° de Ofertas',
                            data: [],
                            backgroundColor: [],
                            borderColor: [],
                            borderWidth: 0,
                            //tachado: [false, false, false, false, false,]
                        }]
                    },
                    options: {
                        cutoutPercentage: 80,
                        elements: {
                            center: {
                                text: '',
                                color: '#000000', // Default is #000000
                                fontStyle: 'Arial', // Default is Arial
                                sidePadding: 70, // Defualt is 20 (as a percentage)
                                //defaultFontSize: 10, 
                            }
                        },
                        legend: {
                            position: 'right',
                            tachado: false

                        }
                    }
                })
                this.actualizarTotalOnClick(this);
            }
            randomNum(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            actualizarTotalOnClick(dona) {
                defaultOnClick = dona.myChart.options.legend.onClick;//esta funcion rescata la animacion por defecto del label
                //console.log("tachado: ",tachado)
                dona.myChart.options.legend.onClick = function (e, i) {
                    defaultOnClick.call(this, e, i)
                    var encontrado = false; //valida si se encuentra un item en la lista
                    if (dona.listaItemsLabel.length == 0) {
                        dona.listaItemsLabel.push({ index: i.index, tachado: false });
                        // console.log("agregado como vacío")
                    }
                    else {
                        encontrado = false;//se le entrega el valor de que no ha sido encontrado para posteriormente identificarlo
                        dona.listaItemsLabel.forEach(element => {
                            if (element.index == i.index) {
                                // console.log("element:",element.index,"item:",i.index,"\n");

                                encontrado = true;//avisa si se encuentra en la lista
                            }

                        });

                        if (encontrado == false) {//pregunta si se encontró en la lista, si no se encontró, se agrega

                            dona.listaItemsLabel.push({ index: i.index, tachado: false });
                            // console.log("agregado desde la lista con registros")
                        }
                    }
                    dona.listaItemsLabel.forEach(element => {
                        if (element.index == i.index) {
                            // console.log("tachado:", element.tachado ? false : true)
                            if (element.tachado == true) {
                                // //console.log("llega a la funcion: ", i)
                                cantidad = (i.text.split(" ")[0]) * 1;
                                dona.actualizarTotal((cantidad))
                                element.tachado = false;
                                // //console.log("tachado: ", i.tachado)
                                return;
                            }
                            else {

                                // //console.log("tachado: ",tachado)
                                cantidad = (i.text.split(" ")[0]) * -1;
                                dona.actualizarTotal((cantidad))
                                element.tachado = true;
                                // //console.log("tachado: ", i.tachado)
                                return;
                            }
                        }
                    });
                    // console.log(dona.listaItemsLabel)

                }
            }


            actualizarTotal(total) {
                if (typeof total === 'string'){
                    var totalInterno = parseFloat(total).toFixed(1)
                    
                }
                else{
                    var totalInterno = total;
                }
                
                this.totalDona += totalInterno;
                this.myChart.options.elements.center.text = (this.totalDona);
                this.myChart.update();
                
            }

            addData(label, data, color) {
                if (label.length > 25) {
                    label = label.substring(0, 25)
                }
                if (!color) {
                    color= randomNum(1, 255)+","+randomNum(1, 255)+","+randomNum(1, 255);
                }
                this.myChart.data.labels.push(label);
                this.myChart.data.datasets.forEach((dataset) => {
                    dataset.borderColor.push('rgb(' + color + ')');
                    dataset.backgroundColor.push('rgb(' + color + ')');
                    dataset.data.push(data);


                });
                this.myChart.update();
            }
            removeData() {
                this.myChart.data.labels.pop();
                this.myChart.data.datasets.forEach((dataset) => {
                    dataset.data.pop();
                });
                this.myChart.update();
            }
        }
        function solicitarBackEndInfo_Reporte_Oferta(url, dona) {
            $.ajax({
                type: "post",
                url: url,
                success: function (response) {
                    if (response.codigo_respuesta == 1) {

                        let suma_ofertas = 0;
                        response.nombre.forEach(element => {
                            suma_ofertas = suma_ofertas + element.ofertas_activas;
                            dona.addData(element.ofertas_activas + " - " + element.responsable, element.ofertas_activas, element.fav_color);
                            //addData(myChart, element.ofertas_activas + " - " + element.responsable, element.ofertas_activas, element.fav_color);
                        });
                        dona.actualizarTotal(suma_ofertas);
                        //actualizarTotal(myChart, suma_ofertas)
                        listaDonas.push(dona);
                    }
                    else {
                        $.notify(response['nombre'] + "!", { className: "error" });
                    }
                }
            });
        }

        //inicio grafico ofertas totales
        var ctx_ofertas_registradas = document.getElementById('id_chart_ofertas_registradas').getContext('2d');
        cargarCTX(ctx_ofertas_registradas);
        var dona_ofertas_registradas = new Dona(ctx_ofertas_registradas);
        solicitarBackEndInfo_Reporte_Oferta("home/ofertas-registradas", dona_ofertas_registradas);
        //fin grafico ofertas totales

        //inicio grafico ofertas del día
        var ctx_oferta_activa = document.getElementById('id_chart_ofertas_activas').getContext('2d');
        cargarCTX(ctx_oferta_activa);
        var dona_oferta_activa = new Dona(ctx_oferta_activa);
        solicitarBackEndInfo_Reporte_Oferta("home/ofertas-activas", dona_oferta_activa);
        //fin grafico ofertas del día

        //inicio grafico ofertas finaliza en x dias
        for (let i = 0; i < 6; i++) {

            var ctx_ofertas_termina_en_x_dia = document.getElementById('id_chart_ofertas_termina_en_' + i + '_dia').getContext('2d');
            cargarCTX(ctx_ofertas_termina_en_x_dia);
            var dona_oferta_termina_en_x_dias = new Dona(ctx_ofertas_termina_en_x_dia);
            solicitarBackEndInfo_Reporte_Oferta("home/ofertas-activas-finaliza-en/" + i, dona_oferta_termina_en_x_dias);
        }

        var ctx_ofertas_termina_en_mas_de_6_dia = document.getElementById('id_chart_ofertas_termina_en_mas_de_6_dia').getContext('2d');//dice en mas de 6 días pero contabiliza igual el sexto día
        cargarCTX(ctx_ofertas_termina_en_mas_de_6_dia);
        var dona_oferta_termina_en_mas_de_6_dia = new Dona(ctx_ofertas_termina_en_mas_de_6_dia);
        solicitarBackEndInfo_Reporte_Oferta("home/ofertas-activas-finaliza-en/6", dona_oferta_termina_en_mas_de_6_dia);//7 dias como parametro, hace referencia en que termina en mas de 6 días sin importar cuantos sean 
        //fin grafico ofertas finaliza en x dias

        //inicio funcion random entre un minimo y maximo
        function randomNum(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        //fin funcion random entre un minimo y maximo

        //inicio funcion solicitar datos de producto para reporte
        function solicitarBackEndInfo_Reporte_General(url, data = null, dona) {
            $.ajax({
                type: "post",
                data: data ? data : null,
                url: url,
                success: function (response) {
                    if (response.codigo_respuesta == 1) {

                        let suma_registros = 0;
                        response.nombre.forEach(element => {
                            let randomColor = randomNum(1, 255) + "," + randomNum(1, 255) + "," + randomNum(1, 255);
                            //console.log(randomColor);
                            suma_registros = suma_registros + element.cantidad;
                            //console.log("estado: ",element.cantidad,element.name);
                            dona.addData(element.cantidad + " - " + element.name, element.cantidad, randomColor);
                            //addData(myChart, element.ofertas_activas + " - " + element.responsable, element.ofertas_activas, element.fav_color);
                        });
                        dona.actualizarTotal(suma_registros);
                        //actualizarTotal(myChart, suma_ofertas)
                        listaDonas.push(dona);
                    }
                    else {
                        $.notify(response['nombre'] + "!", { className: "error" });
                    }
                }
            });
        }
        //fin funcion solicitar datos de producto para reporte


        var ctx_reporte_grafico_productos_estado = document.getElementById('id_reporte_grafico_productos_estado').getContext('2d');
        cargarCTX(ctx_reporte_grafico_productos_estado);
        var dona_reporte_grafico_producto_estado = new Dona(ctx_reporte_grafico_productos_estado);
        dona_reporte_grafico_producto_estado.myChart.options.elements.center.sidePadding = 30;
        solicitarBackEndInfo_Reporte_General("home/reporte-producto-estatus", null, dona_reporte_grafico_producto_estado);
        $.ajax({
            type: "POST",
            url: "home/reporte-producto-eliminados",
            success: function (response) {
                if (response.codigo_respuesta == 1) {
                    r = response.nombre[0];//[0] por que la lista solo devuelve 1 objeto dentro de una lista, entonces aspí se obtiene el objeto
                    let randomColor = randomNum(1, 255) + "," + randomNum(1, 255) + "," + randomNum(1, 255);


                    dona_reporte_grafico_producto_estado.addData(r.cantidad + " - " + r.name, r.cantidad, randomColor);
                    dona_reporte_grafico_producto_estado.actualizarTotal(r.cantidad)
                    listaDonas.push(dona_reporte_grafico_producto_estado);
                } else {
                    $.notify(response['nombre'] + "!", { className: "error" });

                }
            }
        });

        var ctx_reporte_grafico_producto_adherido_mes = document.getElementById('id_reporte_grafico_producto_adherido_mes');
        cargarCTX(ctx_reporte_grafico_producto_adherido_mes);
        var dona_reporte_grafico_producto_adherido_mes = new Dona(ctx_reporte_grafico_producto_adherido_mes);
        solicitarBackEndInfo_Reporte_General("home/reporte-producto-adherido-mes", null, dona_reporte_grafico_producto_adherido_mes);

        var ctx_reporte_grafico_producto_adherido_anio = document.getElementById('id_reporte_grafico_producto_adherido_anio');
        cargarCTX(ctx_reporte_grafico_producto_adherido_anio);
        var dona_reporte_grafico_producto_adherido_anio = new Dona(ctx_reporte_grafico_producto_adherido_anio);
        solicitarBackEndInfo_Reporte_General("home/reporte-producto-adherido-anio", null, dona_reporte_grafico_producto_adherido_anio);
        //falta hacer el reporte de productos eliminados

        var ctx_reporte_grafico_productos_categoria = document.getElementById('id_reporte_grafico_productos_categoria');
        cargarCTX(ctx_reporte_grafico_productos_categoria);
        var dona_reporte_grafico_productos_categoria = new Dona(ctx_reporte_grafico_productos_categoria);
        $.ajax({
            type: "POST",
            url: "home/reporte-producto-categoria",
            success: function (response) {
                let suma_ofertas = 0;
                if (response.codigo_respuesta == 1) {
                    r = response.nombre[0];//[0] por que la lista solo devuelve 1 objeto dentro de una lista, entonces aspí se obtiene el objeto
                    suma_ofertas = r.CANTIDAD_HARDWARD + r.CANTIDAD_LICENCIAS;
                    let randomColor = randomNum(1, 255) + "," + randomNum(1, 255) + "," + randomNum(1, 255);
                    dona_reporte_grafico_productos_categoria.addData(r.CANTIDAD_HARDWARD + " - " + "HARDWARE", r.CANTIDAD_HARDWARD, randomColor);
                    randomColor = randomNum(1, 255) + "," + randomNum(1, 255) + "," + randomNum(1, 255);
                    dona_reporte_grafico_productos_categoria.addData(r.CANTIDAD_LICENCIAS + " - " + "LICENCIA", r.CANTIDAD_LICENCIAS, randomColor);
                    dona_reporte_grafico_productos_categoria.actualizarTotal(suma_ofertas);
                    listaDonas.push(dona_reporte_grafico_productos_categoria);
                } else {
                    $.notify(response['nombre'] + "!", { className: "error" });

                }
            }
        });
        // $(function () {

        //     console.log("hola", listaDonas);
        // })


        class Barra {
            constructor(ctx) {
                this.ctx = ctx;
                this.myBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: [],
                        datasets: [{
                            label: '',
                            data: [],
                            backgroundColor: [],
                            borderColor: [],
                            //borderWidth: 0,
                            //tachado: [false, false, false, false, false,]
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        title: {
                            display: true,
                            text: 'Porcentaje de productos Habilitado'
                        }
                    } 
                })
            }
            

            addData(label, data, color) {
                if (label.length > 25) {
                    label = label.substring(0, 25)
                }
                if (!color) {
                   color= randomNum(1, 255)+","+randomNum(1, 255)+","+randomNum(1, 255);
                }
                this.myBarChart.data.labels.push(label);
                this.myBarChart.data.datasets.forEach((dataset) => {
                    dataset.borderColor.push('rgb(' + color + ')');
                    dataset.backgroundColor.push('rgb(' + color + ')');
                    dataset.data.push(data);
                    


                });
                this.myBarChart.update();
            }
             randomNum(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            removeData() {
                this.myBarChart.data.labels.pop();
                this.myBarChart.data.datasets.forEach((dataset) => {
                    dataset.data.pop();
                });
                this.myBarChart.update();
            }
        }
        function productoPorCantidad(url,dona) {
            $.ajax({
                type: "POST",
                //contentType: "application/json; charset=utf-8",
                //dataType: "dataType",
                url: url,
               //data: "data",
                success: function (response) {
                    if (response.codigo_respuesta==1) {
                        let cantidad = 0
                        response.data.forEach(element => {
                            console.log(cantidad)
                            cantidad+=(element.cantidad);
                            dona.addData(`${parseFloat(element.cantidad).toFixed(1)} - ${element.nombre} `,parseFloat(element.cantidad).toFixed(1)  ,null);
                        });
                        dona.actualizarTotal(cantidad)
                       
                    }
                }
            });
        }

        var ctx_reporte_grafico_producto_habilitado = document.getElementById('id_chart_productos_habilitados');
        var dona_reporte_grafico_producto_habilitado = new Dona(ctx_reporte_grafico_producto_habilitado);
        productoPorCantidad("home/reporte-producto-habilitado",dona_reporte_grafico_producto_habilitado);



        var ctx_reporte_productos_ofertados = document.getElementById('id_chart_productos_ofertados');
        var dona_reporte_productos_ofertados = new Dona(ctx_reporte_productos_ofertados);
        productoPorCantidad("home/reporte-producto-ofertado",dona_reporte_productos_ofertados);




        
    }
})