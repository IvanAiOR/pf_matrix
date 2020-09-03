
//funcion para cargar todo
let trato_precio_start = 1;
let trato_precio_working = false;
let trato_precio_working_buscar = false;
$(function () {

    if ($('div#id-panel-trato_precio').length) {


        console.log('estatus CMready!')


        //inicio funcion clickable row y cargar en panel de editar


        $('table#id_trato_precio_tabla_completa').on("click", "tr.tabla-link", function () {
            console.log($(this).attr('id'));
            console.log($(this).attr('value'));
            $('input#id_trato_precio_id_editar').val($(this).attr('id'));
            $('input#id_trato_precio_nombre_editar').val($(this).attr('value'));
            $('input#id_trato_precio_nombre_editar').prop("disabled", false);
        });

        //fin funcion clickable row y cargar en panel de editar



        $('form#id_trato_precio_agregar_form').submit(function (e) {
            e.preventDefault();


            let nombre_trato_precio = $("#trato_precio_agregar_nombre").val();
            // if(estado_conf_moda){

            $.ajax({
                type: "POST",
                data: { nombre: nombre_trato_precio },
                url: "/trato_precio/agregar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        trato_precio_start = 1;
                        trato_precio_working = false;
                        trato_precio_llenarLista();
                        $("#trato_precio_agregar_nombre").focus();
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        trato_precio_vaciar_campos('agregar');

                    }
                    else {
                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                    }

                }
            });
            // }

        })
        //  fin funcion para agregar manualmente

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion eliminar

        window.eliminar_trato_precio = function () {
            this.eliminar = function (id_boton) {
                $.ajax({
                    type: "POST",
                    data: { id: id_boton },
                    url: "/trato_precio/eliminar",
                    success: function (resultado) {

                        if (resultado['codigo_respuesta'] == 1) {
                            //alert(resultado['nombre']);     
                            trato_precio_start = 1;
                            trato_precio_working = false;
                            trato_precio_llenarLista();
                            $('input#id_trato_precio_nombre_editar').val('');
                            $('input#id_trato_precio_id_editar').val('');
                            $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        }
                        else {
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                            trato_precio_llenarLista();
                        }

                    }
                });

            }
        }

        //fin funcion eliminar

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion editar
        $('form#id-trato_precio-editar-form').submit(function (e) {
            e.preventDefault();
            let id_trato_precio = $('input#id_trato_precio_id_editar').val();
            let nombre_trato_precio = $('input#id_trato_precio_nombre_editar').val();

            $.ajax({

                type: "POST",
                data: { id: id_trato_precio, nombre: nombre_trato_precio },
                url: "/trato_precio/editar",
                success: function (resultado) {
                    console.log(JSON.stringify(resultado['codigo_respuesta']));
                    if (resultado['codigo_respuesta'] == 1) {
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        trato_precio_llenarLista();
                        trato_precio_vaciar_campos('editar');

                    }
                    else {
                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        trato_precio_llenarLista();
                    }

                }
            });

        })





        //fin funcion editar



        //inicio funcion scroll para lista
        // PRIMERA PAGINA
        window.trato_precio_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-trato_precio').length) {

                trato_precio_start = 1;
                $('#id_tabla_cuerpo_trato_precio').children().remove();
                trato_precio_working = true;
                $.ajax({
                    type: "GET",
                    url: "trato_precio/get-all?page=" + trato_precio_start,
                    success: function (r) {
                        $('#id_tabla_cuerpo_trato_precio').children().remove();
                        for (var i = 0; i < r.data.length; i++) {
                            let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                            registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                            registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                            if (permisoEliminar) {
                            registro=registro+ "<td scope='col'><button type='button' id='trato_precio_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                            }
                            registro=registro+ "</tr>";
                            $('#id_tabla_cuerpo_trato_precio').append(registro)//referirlo al tbody que use en la lista  
                    }
                        trato_precio_start++;
                        setTimeout(function () {
                            trato_precio_working = false;
                        }, 300)
                    },
                    error: function (r) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }
        }
        trato_precio_llenarLista();


        //INFINITY SCROLL
        $('#id-tabla-trato_precio').scroll(function () {
            //     console.log(($(this).scrollTop()));
            //     console.log(trato_precio_start);
            //     console.log('tabla scroll '+$('#id-tabla-trato_precio').scrollTop());
            //     console.log('tabla scroll '+$('#id-tabla-trato_precio').height());
            //     console.log('diferencia entre el div y la tabla:  '+($('#id_trato_precio_tabla_completa').height()-$('#id-tabla-trato_precio').height()));
            if (!$('input#id_trato_precio_buscar').val()) {

                if ($(this).scrollTop() + 20 >= $('#id_trato_precio_tabla_completa').height() - $('#id-tabla-trato_precio').height()) {
                    if (trato_precio_working == false) {
                        trato_precio_working = true;
                        $.ajax({
                            type: "GET",
                            url: "trato_precio/get-all?page=" + trato_precio_start,
                            success: function (r) {
                                if (r.data.length > 0) {

                                    for (var i = 0; i < r.data.length; i++) {
                                        let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                        registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                        registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                        if (permisoEliminar) {
                                        registro=registro+ "<td scope='col'><button type='button' id='trato_precio_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                        }
                                        registro=registro+ "</tr>";
                                        $('#id_tabla_cuerpo_trato_precio').append(registro)//referirlo al tbody que use en la lista  
                                }
                                    trato_precio_start += 1;
                                    setTimeout(function () {
                                        trato_precio_working = false;
                                    }, 300)
                                }
                            },
                            error: function (r) {
                                console.log("Aviso de error haciendo scrolling en la tabla de estatus CM!");
                            }
                        });
                    }
                }
            }
        })


        //fin inicio funcion scroll para lista
        //inicio funcion buscar


        $(document).on('keyup', '#id_trato_precio_buscar', (function (e) {
            let palabraclave = $('input#id_trato_precio_buscar').val();

            $('#id_tabla_cuerpo_trato_precio').children().remove();
            if (palabraclave) {
                $.ajax({
                    type: "POST",
                    url: "trato_precio/buscar/" + palabraclave,
                    success: function (resultado) {
                        $('#id_tabla_cuerpo_trato_precio').children().remove();
                        if (resultado.codigo_respuesta == 1) {
                            for (var i = 0; i < resultado.data.length; i++) {
                                let registro="<tr class='tabla-link' id='" + resultado.data[i].id + "' value='" + resultado.data[i].name + "' data-url='#' >";
                                registro=registro+ "<td scope='col'>" + resultado.data[i].id + "</td>";
                                registro=registro+ "<td scope='col'>" + resultado.data[i].name + "</td>";
                                if (permisoEliminar) {
                                registro=registro+ "<td scope='col'><button type='button' id='trato_precio_eliminar_btn_id' class='btn btn-danger eliminar' title='" + resultado.data[i].id + "'  data-value='" + resultado.data[i].id + "'> <i data-value='" + resultado.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                }
                                registro=registro+ "</tr>";
                                $('#id_tabla_cuerpo_trato_precio').append(registro)//referirlo al tbody que use en la lista  
                        }

                        }
                        else {
                            $('#id_tabla_cuerpo_trato_precio').children().remove();
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        }


                        trato_precio_working = false;


                    }
                })
            }
            else {
                $('#id_tabla_cuerpo_trato_precio').children().remove();

                trato_precio_llenarLista();
            }

        }))
        //fin funcion buscar
        window.trato_precio_vaciar_campos = function (form_submit_tipo) {
            if (form_submit_tipo == 'editar') {

                $('input#id_trato_precio_id_editar').val('');
                $('input#id_trato_precio_nombre_editar').val('');
                $('input#id_trato_precio_nombre_editar').prop("disabled", true);
            }

            if (form_submit_tipo == 'agregar') {

                $("#trato_precio_agregar_nombre").val('');
            }

        }
    }
});