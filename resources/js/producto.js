
//funcion para cargar todo
let producto_start = 1;
let producto_working = false;
let producto_working_buscar = false;
let filtroActivo = false;
$(function () {


    if ($('div#id-panel-producto').length) {//verifica si esta cargado el panel de producto para hacer solicitudes de esos registros, así evita sobrecargarse
        //inicio formato de dolar 
        //agregar
        var producto_agregar_precio_sumatec = new Cleave('#producto_agregar_precio_sumatec', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_agregar_costo = new Cleave('#producto_agregar_costo', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_agregar_transporte = new Cleave('#producto_agregar_transporte', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_agregar_precio_competencia = new Cleave('#producto_agregar_precio_competencia', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_agregar_tope_oferta = new Cleave('#producto_agregar_tope_oferta', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_agregar_oferta = new Cleave('#producto_agregar_oferta', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_filtro_precio_min = new Cleave('#producto_filtro_precio_min', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_filtro_precio_max = new Cleave('#producto_filtro_precio_max', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });

        producto_agregar_precio_sumatec.setRawValue(0);
        producto_agregar_costo.setRawValue(0);
        producto_agregar_transporte.setRawValue(0);
        producto_agregar_precio_competencia.setRawValue(0);
        producto_agregar_tope_oferta.setRawValue(0);
        producto_agregar_oferta.setRawValue(0);
        //editar
        var producto_editar_precio_sumatec = new Cleave('#producto_editar_precio_sumatec', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_editar_costo = new Cleave('#producto_editar_costo', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_editar_transporte = new Cleave('#producto_editar_transporte', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_editar_precio_competencia = new Cleave('#producto_editar_precio_competencia', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_editar_tope_oferta = new Cleave('#producto_editar_tope_oferta', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        var producto_editar_oferta = new Cleave('#producto_editar_oferta', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: '$',
            rawValueTrimPrefix: true

        });
        //fin formato de dolar


        $('#producto_panel_editar').hide();
        console.log("producto ready !");
        //inicio funcion clickable row y cargar en panel de editar
        $(function () {
            $('table.table').on("click", "tr.table-tr", function () {
                $(window).scrollTop(0);
                let id_cm = $(this).attr('id');
                $.ajax({
                    type: "POST",
                    url: 'producto/buscar-uno/' + id_cm,
                    success: function (resultado) {
                        if (resultado.codigo_respuesta = 1) {
                            let d = resultado.nombre[0];
                            console.log(d);
                            if (d.fecha_inicio_oferta == null) {
                                d.fecha_inicio_oferta = " - - "
                            }
                            if (d.fecha_fin_oferta == null) {
                                d.fecha_fin_oferta = " - - "
                            }
                            $('#producto_panel_agregar').hide();
                            $('#producto_panel_editar').show();


                            //console.log(JSON.stringify(resultado))
                            //rellenar campos
                            $(document).ajaxStop(function () {

                                if ($('div#id-panel-producto').length) {

                                    console.log("llega al stop");
                                    if (d == null) {
                                        //producto_vaciar_campos('editar')
                                    }
                                    else {


                                        //carga los valores de las listas seleccionables de editar
                                        producto_editar_precio_sumatec.setRawValue(d.precio_sumatec);
                                        producto_editar_costo.setRawValue(d.costo);
                                        producto_editar_transporte.setRawValue(d.transporte);
                                        producto_editar_precio_competencia.setRawValue(d.precio_competencia);
                                        producto_editar_tope_oferta.setRawValue(d.tope_oferta);
                                        producto_editar_oferta.setRawValue(d.oferta);
                                        $("#producto_editar_id_unico").val(d.id);
                                        $("#producto_editar_id_cm").val(d.id_CM);
                                        $("#producto_editar_descripcion").val(d.description);
                                        $("#producto_editar_pn").val(d.part_number);
                                        $("#producto_editar_categoria").val(d.categoria_id);
                                        $("#producto_editar_marca").val(d.marca_id);
                                        $("#producto_editar_prioridad").val(d.prioridad_id);
                                        $("#producto_editar_responsable").val(d.responsable_id);
                                        //console.log($("#producto_editar_responsable").val() + d.responsable_id)
                                        $("#producto_editar_origen").val(d.origen_id);
                                        $("#producto_editar_nombre_origen").val(d.nombre_origen_id);
                                        $("#producto_editar_trato_precio").val(d.trato_precio_id);
                                        $("#producto_editar_estatus_cm").val(d.estatus_cm_id);
                                        $("#producto_editar_comentario_habilitado").val(d.comentario_id);
                                        $("#producto_editar_nota_adicional").val(d.nota_adicional);
                                        fecha_inicio = d.fecha_inicio_oferta.split("-");
                                        fecha_fin = d.fecha_fin_oferta.split("-");
                                        $("#producto_editar_fecha_inicio").val(fecha_inicio[2] + "-" + fecha_inicio[1] + "-" + fecha_inicio[0]);
                                        $("#producto_editar_fecha_fin").val(fecha_fin[2] + "-" + fecha_fin[1] + "-" + fecha_fin[0]);
                                        $("#producto_editar_margen_precio").val(d.margen_precio);
                                        $("#producto_editar_margen_oferta").val(d.margen_oferta);
                                        $("#producto_editar_margen_tope_oferta").val(d.margen_tope_oferta);


                                    }
                                    d = null;//esto permite vaciar el editar una vez modificado 

                                }

                            });

                        }
                        else {
                            $.notify(resultado['nombre'] + "!", { className: "error" });
                        }

                    },
                    error: function () {
                        console.log("se pudrió todo");
                    }
                })
            });
        });

        $(document).on('click', '#producto_editar_btn_volver_agregar', function () {
            $('#producto_panel_editar').hide();
            $('#producto_panel_agregar').show();    


        });


        //fin funcion clickable row y cargar en panel de editar



        $(document).on('input', '#producto_agregar_precio_sumatec, #producto_agregar_costo, #producto_agregar_oferta, #producto_agregar_transporte ', (function (e) {
            //console.log(producto_agregar_precio_sumatec.getRawValue());
            resultado1 = producto_agregar_precio_sumatec.getRawValue() - 1;
            //console.log(((((producto_agregar_costo.getRawValue() / producto_agregar_precio_sumatec.getRawValue()) - 1) * -1) * 100).toFixed(3));
            if (producto_agregar_oferta.getRawValue() == '') {
                $("#producto_agregar_margen_oferta").val('');
            }

            //porcentaje Margen precio
            $("#producto_agregar_margen_precio").val(((((producto_agregar_costo.getRawValue() / (producto_agregar_precio_sumatec.getRawValue() - producto_agregar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            //tope oferta
            producto_agregar_tope_oferta.setRawValue(producto_agregar_precio_sumatec.getRawValue() * 0.95);
            //porcentaje margent tope oferta
            $("#producto_agregar_margen_tope_oferta").val(((((producto_agregar_costo.getRawValue() / (producto_agregar_tope_oferta.getRawValue() - producto_agregar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            //porcentaje margen oferta real
            if (producto_agregar_oferta.getRawValue() >= 1) {

                $("#producto_agregar_margen_oferta").val(((((producto_agregar_costo.getRawValue() / (producto_agregar_oferta.getRawValue() - producto_agregar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            }

            // if ($("#producto_agregar_margen_precio").val() <= 5) {
            //     console.log($("#producto_agregar_margen_precio").val(), $("#producto_agregar_margen_oferta").val());

            //     $('#producto_agregar_margen_precio').addClass("bg-danger")
            //     $('#producto_agregar_margen_precio').addClass("text-white")

            // } else {
            //     $('#producto_agregar_margen_precio').removeClass("bg-danger")
            //     $('#producto_agregar_margen_precio').removeClass("text-white")
            // }
            if ($("#producto_agregar_margen_oferta").val() && $("#producto_agregar_margen_oferta").val() <= 5) {
                $('#producto_agregar_margen_oferta').addClass("bg-danger");
                $('#producto_agregar_margen_oferta').addClass("text-white");


            } else {
                $('#producto_agregar_margen_oferta').removeClass("bg-danger");
                $('#producto_agregar_margen_oferta').removeClass("text-white");

            }
            // console.log($("#producto_agregar_margen_oferta").val());
            // console.log(producto_agregar_costo.getRawValue() / (producto_agregar_precio_sumatec.getRawValue() - 1) * -1);
            // console.log(producto_agregar_costo.getRawValue() / (producto_agregar_precio_sumatec.getRawValue() - 1) * -1);

        }));

        //inicio formato fecha

        // let otra = new datepicker('#producto_agregar_fecha_inicio', { alwaysShow: true })
        //const picker = datepicker('.datepicker');

        //fin formato fecha

        //inicio funcion agregar producto

        window.agregarProducto = function (e) {

            e.preventDefault();


            let id_cm = $("#producto_agregar_id_cm").val();
            let description = $("#producto_agregar_descripcion").val();
            let part_number = $("#producto_agregar_pn").val();
            let id_categoria = $("#producto_agregar_categoria").val();
            let id_marca = $("#producto_agregar_marca").val();
            let id_prioridad = $("#producto_agregar_prioridad").val();
            let id_responsable = $("#producto_agregar_responsable").children("option:selected").val();
            let producto_precio = producto_agregar_precio_sumatec.getRawValue();
            let producto_costo = producto_agregar_costo.getRawValue();
            let producto_transporte = producto_agregar_transporte.getRawValue();
            let precio_competencia = producto_agregar_precio_competencia.getRawValue();
            let id_origen = $("#producto_agregar_origen").val();
            let id_nombre_origen = $("#producto_agregar_nombre_origen").val();
            let trato_precio = $("#producto_agregar_trato_precio").val();
            let id_estatus_cm = $("#producto_agregar_estatus_cm").val();
            let id_comentario = $("#producto_agregar_comentario_habilitado").val();
            let nota_adicional = $("#producto_agregar_nota_adicional").val();
            let fecha_inicio = $("#producto_agregar_fecha_inicio").val();
            let fecha_fin = $("#producto_agregar_fecha_fin").val();
            let margen_precio = $("#producto_agregar_margen_precio").val();
            let margen_oferta_real = $("#producto_agregar_margen_oferta").val();
            let tope_oferta = producto_agregar_tope_oferta.getRawValue();
            let oferta_real = producto_agregar_oferta.getRawValue(0);
            let margen_tope_oferta = $("#producto_agregar_margen_tope_oferta").val();

            if (!margen_precio) { margen_precio = 0; }
            if (!margen_oferta_real) { margen_oferta_real = 0; }
            if (!margen_tope_oferta) { margen_tope_oferta = 0; }

            if (!producto_precio) { producto_precio = 0; }
            if (!producto_costo) { producto_costo = 0; }
            if (!producto_transporte) { producto_transporte = 0; }
            if (!precio_competencia) { precio_competencia = 0; }
            if (!tope_oferta) { tope_oferta = 0; }
            if (!oferta_real) { oferta_real = 0; }





            $.ajax({
                type: "POST",
                data: {
                    id_cm: id_cm,
                    description: description,
                    part_number: part_number,
                    id_marca: id_marca,
                    id_categoria: id_categoria,
                    id_prioridad: id_prioridad,
                    id_usuario: id_responsable,
                    producto_precio: producto_precio,
                    producto_costo: producto_costo,
                    producto_transporte: producto_transporte,
                    precio_competencia: precio_competencia,
                    id_origen: id_origen,
                    id_nombre_origen: id_nombre_origen,
                    trato_precio: trato_precio,
                    id_estatus_cm: id_estatus_cm,
                    id_comentario: id_comentario,
                    nota_adicional: nota_adicional,
                    fecha_inicio: fecha_inicio,
                    fecha_fin: fecha_fin,
                    margen_precio: margen_precio,
                    margen_oferta_real: margen_oferta_real,
                    tope_oferta: tope_oferta,
                    oferta_real: oferta_real,
                    margen_tope_oferta: margen_tope_oferta


                },

                url: "/producto/agregar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        producto_start = 1;
                        producto_working = false;
                        producto_llenarLista();
                        $.notify(resultado['nombre'] + "!", { className: "success" });
                        producto_vaciar_campos('agregar')
                    }
                    else {
                        $.notify(resultado['nombre'] + "!", { className: "error" });
                    }

                }
            });
            // }


        }

        //  fin funcion para agregar 



        // inicio funcion calculos dinamicos al editar
        $(document).on('input', '#producto_editar_precio_sumatec, #producto_editar_costo, #producto_editar_oferta, #producto_editar_transporte ', (function (e) {
            console.log(e.keycode)
            console.log(producto_editar_costo.getRawValue());
            console.log(producto_editar_oferta.getRawValue());
            if (producto_editar_oferta.getRawValue() == '') {
                $("#producto_editar_margen_oferta").val('');
                $('')
            }

            resultado1 = producto_editar_precio_sumatec.getRawValue() - 1;
            //porcentaje Margen precio
            $("#producto_editar_margen_precio").val(((((producto_editar_costo.getRawValue() / (producto_editar_precio_sumatec.getRawValue() - producto_editar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            //tope oferta
            producto_editar_tope_oferta.setRawValue(producto_editar_precio_sumatec.getRawValue() * 0.95);
            //porcentaje margent tope oferta
            $("#producto_editar_margen_tope_oferta").val(((((producto_editar_costo.getRawValue() / (producto_editar_tope_oferta.getRawValue() - producto_editar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            //porcentaje margen oferta real
            if (producto_editar_oferta.getRawValue() >= 1) {

                $("#producto_editar_margen_oferta").val(((((producto_editar_costo.getRawValue() / (producto_editar_oferta.getRawValue() - producto_editar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            }

            // if ($("#producto_editar_margen_precio").val() <= 5) {
            //     console.log($("#producto_editar_margen_precio").val(), $("#producto_editar_margen_oferta").val());

            //     $('#producto_editar_margen_precio').addClass("bg-danger")
            //     $('#producto_editar_margen_precio').addClass("text-white")

            // } else {
            //     $('#producto_editar_margen_precio').removeClass("bg-danger")
            //     $('#producto_editar_margen_precio').removeClass("text-white")
            // }
            if ($("#producto_editar_margen_oferta").val() && $("#producto_editar_margen_oferta").val() <= 5) {
                $('#producto_editar_margen_oferta').addClass("bg-danger")
                $('#producto_editar_margen_oferta').addClass("text-white")


            } else {
                $('#producto_editar_margen_oferta').removeClass("bg-danger")
                $('#producto_editar_margen_oferta').removeClass("text-white")

            }
        }));

        // fin funcion calculos dinamicos al editar

        //inicio funcion editar producto
        window.editarProducto = function (e) {

            e.preventDefault();

            console.log("llega a editar");

            let id = $("#producto_editar_id_unico").val();
            let id_cm = $("#producto_editar_id_cm").val();
            let description = $("#producto_editar_descripcion").val();
            let part_number = $("#producto_editar_pn").val();
            let id_categoria = $("#producto_editar_categoria").val();
            let id_marca = $("#producto_editar_marca").val();
            let id_prioridad = $("#producto_editar_prioridad").val();
            let id_responsable = $("#producto_editar_responsable").children("option:selected").val();
            let producto_precio = producto_editar_precio_sumatec.getRawValue();
            let producto_costo = producto_editar_costo.getRawValue();
            let producto_transporte = producto_editar_transporte.getRawValue();
            let precio_competencia = producto_editar_precio_competencia.getRawValue();
            let id_origen = $("#producto_editar_origen").val();
            let id_nombre_origen = $("#producto_editar_nombre_origen").val();
            let trato_precio = $("#producto_editar_trato_precio").val();
            let id_estatus_cm = $("#producto_editar_estatus_cm").val();
            let id_comentario = $("#producto_editar_comentario_habilitado").val();
            let nota_adicional = $("#producto_editar_nota_adicional").val();
            let fecha_inicio = $("#producto_editar_fecha_inicio").val();
            let fecha_fin = $("#producto_editar_fecha_fin").val();
            let margen_precio = $("#producto_editar_margen_precio").val();
            let margen_oferta_real = $("#producto_editar_margen_oferta").val();
            let tope_oferta = producto_editar_tope_oferta.getRawValue();
            let oferta_real = producto_editar_oferta.getRawValue();
            let margen_tope_oferta = $("#producto_editar_margen_tope_oferta").val();

            if (!margen_precio) { margen_precio = 0; }
            if (!margen_oferta_real) { margen_oferta_real = 0; }
            if (!margen_tope_oferta) { margen_tope_oferta = 0; }

            if (!producto_precio) { producto_precio = 0; }
            if (!producto_costo) { producto_costo = 0; }
            if (!producto_transporte) { producto_transporte = 0; }
            if (!precio_competencia) { precio_competencia = 0; }
            if (!tope_oferta) { tope_oferta = 0; }
            if (!oferta_real) { oferta_real = 0; }



            $.ajax({
                type: "POST",
                data: {
                    id_unico: id,
                    id_cm: id_cm,
                    description: description,
                    part_number: part_number,
                    id_marca: id_marca,
                    id_categoria: id_categoria,
                    id_prioridad: id_prioridad,
                    id_usuario: id_responsable,
                    producto_precio: producto_precio,
                    producto_costo: producto_costo,
                    producto_transporte: producto_transporte,
                    precio_competencia: precio_competencia,
                    id_origen: id_origen,
                    id_nombre_origen: id_nombre_origen,
                    trato_precio: trato_precio,
                    id_estatus_cm: id_estatus_cm,
                    id_comentario: id_comentario,
                    nota_adicional: nota_adicional,
                    fecha_inicio: fecha_inicio,
                    fecha_fin: fecha_fin,
                    margen_precio: margen_precio,
                    margen_oferta_real: margen_oferta_real,
                    tope_oferta: tope_oferta,
                    oferta_real: oferta_real,
                    margen_tope_oferta: margen_tope_oferta


                },

                url: "/producto/editar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        producto_start = 1;
                        producto_working = false;
                        producto_llenarLista();
                        $.notify(resultado['nombre'] + "!", { className: "success" });
                        producto_vaciar_campos('editar');
                        $("#producto_editar_nota_adicional").val("");
                        respuesta_editar = true;
                    }
                    else {
                        respuesta_editar = false;
                        $.notify(resultado['nombre'] + "!", { className: "error" });
                    }

                },
                error: function (r) {
                    respuesta_editar = false;
                    $.notify("Ocurrio un error", { className: "error" });

                }
            });
            // }


        };
        //  fin funcion para editar 


        //en laravel se debe usar la forma window.nombre_funcion = function(event){} para declarar funciones

        //inicio funcion eliminar

        window.eliminar_producto = function () {
            this.eliminar = function (id_boton) {
                $.ajax({
                    type: "POST",
                    data: { id: id_boton },
                    url: "/producto/eliminar",
                    success: function (resultado) {

                        if (resultado['codigo_respuesta'] == 1) {
                            //alert(resultado['nombre']);     
                            producto_start = 1;
                            producto_working = false;
                            producto_llenarLista();
                            $('input#id_producto_nombre_editar').val('');
                            $('input#id_producto_id_editar').val('');
                            $.notify(resultado['nombre'] + "!", { className: "success" });
                            setTimeout(producto_vaciar_campos('editar'), 300);

                        }
                        else {
                            $.notify(resultado['nombre'] + "!", { className: "error" });
                            producto_llenarLista();
                        }

                    }
                });

            }
        }
        //fin funcion eliminar

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 


        //inicio funcion scroll para lista
        // PRIMERA PAGINA
        window.producto_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-producto').length) {
                //console.log('lista')
                producto_start = 1;
                $('#id_tabla_cuerpo_producto').children().remove();
                producto_working = true;
                $.ajax({
                    type: "GET",
                    url: "producto/get-all?page=" + producto_start,
                    success: function (resultado) {
                        cargarTabla(resultado.data);
                        producto_start++;
                        setTimeout(function () {
                            producto_working = false;
                        }, 300)
                    },
                    error: function (resultado) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }
        }
        producto_llenarLista();


        //INFINITY SCROLL
        $('#id-tabla-producto').scroll(function () {
            $('#id_producto_tabla_completa').ready(function () { //no se por que, pero al momento de esperar que el scroll este listo(ready), muestra recien el valor de "hight()""
            })
            // console.log(($(this).scrollTop()));
            //     console.log(producto_start);
            //     console.log('scroll actual '+$('#id-tabla-producto').scrollTop());
            //     console.log('tabla scroll height '+$('#id-tabla-producto').height());
            //     console.log('tabla scroll outerHeight '+$('#id_producto_tabla_completa').outerHeight());
            //     //altura=document.getElementById('#id_producto_tabla_completa').style.height
            console.log('tabla scroll style ' + altura);
            //     console.log('tabla scroll  '+ (altura - $('#id-tabla-producto').height()));


            //     console.log('diferencia entre el div y la tabla:  '+($('#id_producto_tabla_completa').height()-$('#id-tabla-producto').height()));
            if (!$('input#id_producto_buscar').val()) {
                console.log("top scroll: " + ($(this).scrollTop()))
                console.log("Tamaño tabla: " + JSON.stringify($('#id_producto_tabla_completa').height()))
                var altura = $('#id_producto_tabla_completa').height();

                try {
                    if ((!filtroActivo) && ($('input#id_producto_buscar').val() == '') && ($(this).scrollTop() >= altura - $('#id-tabla-producto').height())) {
                        id_producto = '';
                        if (producto_working == false) {
                            producto_working = true;
                            console.log("funciona el scroll")
                            $.ajax({
                                type: "GET",
                                url: "producto/get-all?page=" + producto_start,
                                success: function (resultado) {
                                    if (resultado.data.length > 0) {

                                        cargarTabla(resultado.data, true);

                                        producto_start += 1;
                                        setTimeout(function () {
                                            producto_working = false;
                                        }, 300)
                                    }
                                },
                                error: function (resultado) {
                                    console.log("Aviso de error haciendo scrolling en la tabla de producto!");
                                }
                            });
                        }
                    }
                } catch (error) {

                }
            }
        })


        //fin inicio funcion scroll para lista
        //inicio funcion buscar


        $(document).on('input', '#id_producto_buscar', (function (e) {
            let palabraclave = $('input#id_producto_buscar').val();
            console.log(palabraclave);
            console.log(producto_working_buscar);
            console.log(filtroActivo);

            if (palabraclave && !producto_working_buscar && !filtroActivo) {

                $('#id_tabla_cuerpo_producto').children().remove();
                console.log(producto_working_buscar);
                $.ajax({
                    type: "POST",
                    url: "producto/buscar/" + palabraclave,
                    success: function (resultado) {
                        producto_working_buscar = true
                        if (resultado.codigo_respuesta == 1) {
                            cargarTabla(resultado.data);
                        }
                        else {
                            $.notify(resultado.data + "!", { className: "error" });
                        }
                        producto_working = false;
                        producto_working_buscar = false;
                    },
                    complete: function (resultado) {
                        producto_working = false;
                        producto_working_buscar = false;
                    }
                })
            }
            else {
                $('#id_tabla_cuerpo_producto').children().remove();
                producto_llenarLista();
            }

        }))
        //fin funcion buscar


        //inicio funcion cargar marca
        //param1 = lista de ids de los select
        window.producto_llenar_select = function (id_select, nombre_tabla) {
            //console.log("carga select")
            id_select.forEach(element => {

                $('#' + element).children().remove();
            });
            $.ajax({
                type: "GET",
                url: nombre_tabla + "/get-all-sin-filtro",
                success: function (resultado) {
                    resultado.forEach(element => {
                        id_select.forEach(element2 => {

                            if (nombre_tabla == 'users') {
                                if (element.id == $("#producto_agregar_usuario").val()) {

                                    // console.log(nombre_tabla + "id al cargar el editar: ");
                                    $("#" + element2).append("<option selected value=" + element.id + ">" + element.name + "</option>");

                                } else {

                                    $("#" + element2).append("<option value=" + element.id + ">" + element.name + "</option>");

                                }


                            }
                            else {
                                $("#" + element2).append("<option value=" + element.id + ">" + element.name + "</option>");

                            }
                        });

                    });
                }
            });
        }


        producto_llenar_select(["producto_editar_marca", "producto_agregar_marca", "producto_filtro_marca"], "marca");
        producto_llenar_select(["producto_editar_categoria", "producto_agregar_categoria", "producto_filtro_categoria"], "categoria");
        producto_llenar_select(["producto_editar_prioridad", "producto_agregar_prioridad", "producto_filtro_prioridad"], "prioridad");
        producto_llenar_select(["producto_editar_origen", "producto_agregar_origen", "producto_filtro_origen"], "origen");
        producto_llenar_select(["producto_editar_estatus_cm", "producto_agregar_estatus_cm", "producto_filtro_estatus_cm"], "estatus_cm");
        producto_llenar_select(["producto_editar_comentario_habilitado", "producto_agregar_comentario_habilitado", "producto_filtro_comentario_habilitado"], "comentario");
        producto_llenar_select(["producto_editar_responsable", "producto_agregar_responsable", "producto_filtro_responsable"], "users");
        producto_llenar_select(["producto_editar_nombre_origen", "producto_agregar_nombre_origen", "producto_filtro_nombre_origen"], "nombre_origen");
        producto_llenar_select(["producto_editar_trato_precio", "producto_agregar_trato_precio", "producto_filtro_trato_precio"], "trato_precio");

        // producto_llenar_select("producto_editar_marca", "marca");
        // producto_llenar_select("producto_editar_categoria", "categoria");
        // producto_llenar_select("producto_editar_prioridad", "prioridad");
        // producto_llenar_select("producto_editar_origen", "origen");
        // producto_llenar_select("producto_editar_estatus_cm", "estatus_cm");
        // producto_llenar_select("producto_editar_comentario_habilitado", "comentario");
        // producto_llenar_select("producto_editar_responsable", "users");
        // producto_llenar_select("producto_editar_nombre_origen", "nombre_origen");
        // producto_llenar_select("producto_editar_trato_precio", "trato_precio");

        // producto_llenar_select("producto_agregar_marca", "marca");
        // producto_llenar_select("producto_agregar_categoria", "categoria");
        // producto_llenar_select("producto_agregar_prioridad", "prioridad");
        // producto_llenar_select("producto_agregar_origen", "origen");
        // producto_llenar_select("producto_agregar_estatus_cm", "estatus_cm");
        // producto_llenar_select("producto_agregar_comentario_habilitado", "comentario");
        // producto_llenar_select("producto_agregar_responsable", "users");
        // producto_llenar_select("producto_agregar_nombre_origen", "nombre_origen");
        // producto_llenar_select("producto_agregar_trato_precio", "trato_precio");

        // producto_llenar_select("producto_filtro_marca", "marca");
        // producto_llenar_select("producto_filtro_categoria", "categoria");
        // producto_llenar_select("producto_filtro_prioridad", "prioridad");
        // producto_llenar_select("producto_filtro_origen", "origen");
        // producto_llenar_select("producto_filtro_estatus_cm", "estatus_cm");
        // producto_llenar_select("producto_filtro_comentario_habilitado", "comentario");
        // producto_llenar_select("producto_filtro_responsable", "users");
        // producto_llenar_select("producto_filtro_nombre_origen", "nombre_origen");
        // producto_llenar_select("producto_filtro_trato_precio", "trato_precio");


        window.producto_vaciar_campos = function (form_submit_tipo) {

            $("#producto_" + form_submit_tipo + "_categoria").val(-1);
            $("#producto_" + form_submit_tipo + "_marca").val(-1);
            $("#producto_" + form_submit_tipo + "_prioridad").val(-1);
            $("#producto_" + form_submit_tipo + "_responsable").val(-1);
            $("#producto_" + form_submit_tipo + "_origen").val(-1);
            $("#producto_" + form_submit_tipo + "_nombre_origen").val(-1);
            $("#producto_" + form_submit_tipo + "_trato_precio").val(-1);
            $("#producto_" + form_submit_tipo + "_estatus_cm").val(-1);
            $("#producto_" + form_submit_tipo + "_comentario_habilitado").val(-1);
            if (form_submit_tipo == 'editar' || form_submit_tipo == 'agregar') {

                if (form_submit_tipo == 'editar') {
                    producto_editar_precio_sumatec.setRawValue(0);
                    producto_editar_costo.setRawValue(0);
                    producto_editar_transporte.setRawValue(0);
                    producto_editar_precio_competencia.setRawValue(0);
                    producto_editar_tope_oferta.setRawValue(0);
                    producto_editar_oferta.setRawValue(0);

                }

                if (form_submit_tipo == 'agregar') {
                    producto_agregar_precio_sumatec.setRawValue(0);
                    producto_agregar_costo.setRawValue(0);
                    producto_agregar_transporte.setRawValue(0);
                    producto_agregar_precio_competencia.setRawValue(0);
                    producto_agregar_tope_oferta.setRawValue(0);
                    producto_agregar_oferta.setRawValue(0);
                }

                $("#producto_" + form_submit_tipo + "_id_unico").val('');
                $("#producto_" + form_submit_tipo + "_id_cm").val('');
                $("#producto_" + form_submit_tipo + "_descripcion").val('');
                $("#producto_" + form_submit_tipo + "_pn").val('');
                $("#producto_" + form_submit_tipo + "_nota_adicional").val('');
                $("#producto_" + form_submit_tipo + "_margen_precio").val(0);
                $("#producto_" + form_submit_tipo + "_margen_oferta").val(0);
                $("#producto_" + form_submit_tipo + "_margen_tope_oferta").val(0);
            }




        }

    }

    //fin funcion cargar marca 

    //inicio funcion filtrar
    window.filtrarLista = function (e) {
        e.preventDefault();
        $("#producto_filtro_filtrar").prop("disabled", true);
        $("#producto_filtro_limpiar").prop("disabled", true);
        let id_categoria = $("#producto_filtro_categoria").val();
        let id_marca = $("#producto_filtro_marca").val();
        let id_prioridad = $("#producto_filtro_prioridad").val();
        let id_responsable = $("#producto_filtro_responsable").val();
        let id_origen = $("#producto_filtro_origen").val();
        let id_nombre_origen = $("#producto_filtro_nombre_origen").val();
        let trato_precio = $("#producto_filtro_trato_precio").val();
        let id_estatus_cm = $("#producto_filtro_estatus_cm").val();
        let id_comentario = $("#producto_filtro_comentario_habilitado").val();
        let precio_min = producto_filtro_precio_min.getRawValue();
        let precio_max = producto_filtro_precio_max.getRawValue();
        let tipo_oferta = $('[name="ofertas"]:checked').val();
        let margen_oferta_minimo = $('#producto_filtro_margen_oferta_minimo').val();
        let fecha_inicio = $('#id_filtro_fecha_inicio').val();
        let fecha_final = $('#id_filtro_fecha_final').val();
        let fecha_rango_busqueda_desde = $('#id_filtro_fecha_rango_busqueda_desde').val();
        let fecha_rango_busqueda_hasta = $('#id_filtro_fecha_rango_busqueda_hasta').val();

        fecha_inicio = fecha_inicio.split("-").reverse().join("-");
        fecha_final = fecha_final.split("-").reverse().join("-");
        fecha_rango_busqueda_desde = fecha_rango_busqueda_desde.split("-").reverse().join("-");
        fecha_rango_busqueda_hasta = fecha_rango_busqueda_hasta.split("-").reverse().join("-");
        //console.log(tipo_oferta);

        $.ajax({
            type: "POST",
            data: {
                id_marca: id_marca,
                id_categoria: id_categoria,
                id_prioridad: id_prioridad,
                id_usuario: id_responsable,
                id_origen: id_origen,
                id_nombre_origen: id_nombre_origen,
                trato_precio: trato_precio,
                id_estatus_cm: id_estatus_cm,
                id_comentario: id_comentario,
                precio_min: precio_min,
                precio_max: precio_max,
                tipo_oferta: tipo_oferta,
                filtro_fecha_inicio: fecha_inicio,
                filtro_fecha_fin: fecha_final,
                fecha_rango_busqueda_desde: fecha_rango_busqueda_desde,
                fecha_rango_busqueda_hasta: fecha_rango_busqueda_hasta,
                margen_oferta_minimo:margen_oferta_minimo
            },

            url: "/producto/filtro-avanzado",
            success: function (resultado) {
                filtroActivo = true;
                // console.log(JSON.stringify(resultado.data))
                if (resultado['codigo_respuesta'] == 1) {
                    cargarTabla(resultado.nombre);
                }
                else {
                    $.notify(resultado['nombre'] + "!", { className: "error" });
                }

            },
            complete: function (resultado) {
                $("#producto_filtro_filtrar").prop("disabled", false);
                $("#producto_filtro_limpiar").prop("disabled", false);
            }

        });
    }

    $(document).on('click', '#producto_filtro_limpiar', function (e) {
        //console.log('limpia?');
        //carga la lista con valores sin filtro
        $("#producto_filtro_filtrar").prop("disabled", true);
        $("#producto_filtro_limpiar").prop("disabled", true);
        filtroActivo = false;
        producto_llenarLista();
        $('[name="ofertas"]:checked').prop('checked', false);
        //vacia los campos del filtro avanzado
        $('input#id_filtro_fecha_inicio').val("");
        $('input#id_filtro_fecha_final').val("");
        $('input#id_filtro_fecha_rango_busqueda_desde').val("");
        $('input#id_filtro_fecha_rango_busqueda_hasta').val("");
        $('input#producto_filtro_margen_oferta_minimo').val("");
        $('input#producto_filtro_precio_min').val("");
        $('input#producto_filtro_precio_max').val("");

        
        
        producto_vaciar_campos('filtro');
    })
    //vacía los campos del filtro avanzado
    $(document).ajaxStop(function (e) {
        if ($('div#id-panel-producto').length) {
            $('input#id_filtro_fecha_inicio').val("");
            $('input#id_filtro_fecha_final').val("");
            $('input#id_filtro_fecha_rango_busqueda_desde').val("");
            $('input#id_filtro_fecha_rango_busqueda_hasta').val("");
            if (!filtroActivo) {



                producto_vaciar_campos('filtro');
            }
        }
    })

    //cargar la tabla de filtro con datos por sin filtro
    window.cargarTabla = function (data, esBuscar = null) {
        if (!esBuscar) {

            $('#id_tabla_cuerpo_producto').children().remove();
        }
        $("button").prop("disabled", true);
        $("button").prop("disabled", true);
        for (let i = 0; i < data.length; i++) {
            //console.log(data[i].origen)  ;
            if (data[i].fecha_inicio_oferta == null) {
                data[i].fecha_inicio_oferta = " - - "
            }
            if (data[i].fecha_fin_oferta == null) {
                data[i].fecha_fin_oferta = " - - "
            }
            let fecha_inicio = data[i].fecha_inicio_oferta.split("-");
            let fecha_fin = data[i].fecha_fin_oferta.split("-");
            //console.log(JSON.stringify(data[i].fecha_inicio_oferta) )
            let registro = "<tr class='table-tr' data-url='#'  id='" + data[i].id_CM + "' value='" + data[i].description + "' >";

            registro = registro + "<td scope='col'>" + data[i].id_CM + "</td>";
            registro = registro + "<td scope='col'>" + data[i].description + "</td>";
            registro = registro + "<td scope='col'>" + data[i].part_number + "</td>";
            registro = registro + "<td scope='col'>" + data[i].categoria + "</td>";
            registro = registro + "<td scope='col'>" + data[i].marca + "</td>";
            registro = registro + "<td scope='col'>" + data[i].prioridad + "</td>";
            registro = registro + "<td scope='col'>" + data[i].origen + "-" + data[i].nombre_origen + "</td>";
            registro = registro + "<td scope='col'>" + data[i].estatus_cm + "</td>";
            registro = registro + "<td scope='col'>" + data[i].comentario + "</td>";
            registro = registro + "<td scope='col'>" + data[i].responsable + "</td>";
            registro = registro + "<td scope='col'>" + data[i].trato_precio + "</td>";
            registro = registro + "<td scope='col'>" + data[i].precio_sumatec + "</td>";
            registro = registro + "<td scope='col'>" + data[i].costo + "</td>";
            registro = registro + "<td scope='col'>" + data[i].transporte + "</td>";
            registro = registro + "<td scope='col'>" + data[i].precio_competencia + "</td>";
            registro = registro + "<td scope='col'>" + data[i].margen_precio + "</td>";
            registro = registro + "<td scope='col'>" + data[i].margen_oferta + "</td>";
            registro = registro + "<td scope='col'>" + data[i].tope_oferta + "</td>";
            registro = registro + "<td scope='col'>" + data[i].margen_tope_oferta + "</td>";
            registro = registro + "<td scope='col'>" + data[i].oferta + "</td>";
            registro = registro + "<td scope='col'>" + data[i].nota_adicional + "</td>";
            registro = registro + "<td scope='col'>" + fecha_inicio[2] + "-" + fecha_inicio[1] + "-" + fecha_inicio[0] + "</td>";
            registro = registro + "<td scope='col'>" + fecha_fin[2] + "-" + fecha_fin[1] + "-" + fecha_fin[0] + "</td>";
            //"<td scope='col'>"+data[i].fecha_inicio_oferta+"</td>"+
            if (permisoEliminar) {

                registro = registro + "<td scope='col'><button type='button' id='producto_eliminar_btn_id' class='btn btn-danger eliminar' title='Eliminar'  data-value='" + data[i].id + "'> <i data-value='" + data[i].id + "' class='material-icons' >delete</i></button></td>";
            }

            registro = registro + "</tr>";//referirlo al tbody que use en la lista
            $('#id_tabla_cuerpo_producto').append(registro)
        }
        $("button").prop("disabled", false);
        $("button").prop("disabled", false);
        // var tabla = $('#id_producto_tabla_completa');
        $('span#id_cantidad_registros').text('Se encontró ' + ($('#id_producto_tabla_completa').find('tr').length - 1) + " filas en tu búsqueda.");
    }
    var table2excel = new Table2Excel();
    window.llamarExcel =function (){
        let fechayhora=new Date;
        let nombre_archivo_excel = 'Reporte-de-producto-y-oferta-'+(fechayhora.toLocaleString().split('/').join('-'));
        
        table2excel.export(document.querySelectorAll("table"),nombre_archivo_excel);
    }
    
    //fin funcion filtrar}

    window.eliminar_lista_de_estatus_cm=function () 
    {
        this.eliminar = function(){

            $.ajax({
                type: "POST",
                url: "/producto/eliminar_masivo",
                success: function (resultado) {
                    if (resultado.codigo_respuesta==1) {
                        window.producto_llenarLista();
                        $.notify(resultado['nombre'] + "!", { className: "success" });

                        
                    }else{
                        window.producto_llenarLista();//es necesario escribir el window debido a que toma las funciones como si estubiesen dentro de un objeto
                        $.notify(resultado['nombre'] + "!", { className: "error" });


                    }
                }
            });
            //esta funcion permite obtener los valores de la tabla producto
            // var rows = $("tbody tr",$("#id_producto_tabla_completa")).map(function() { 
            //     return [$("td:eq(7) ",this).map(function() { //"td:eq(columna de la tabla)"
            //       return this.innerHTML;     
            //     }).get()];
            //   }).get();
            //   alert(rows);
        }
    }

    

});








