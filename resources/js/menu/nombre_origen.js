
//funcion para cargar todo
let nombre_origen_start = 1;
let nombre_origen_working = false;
let nombre_origen_working_buscar = false;
$(function () {

    if ($('div#id-panel-nombre_origen').length) {


        console.log('estatus CMready!')


        //inicio funcion clickable row y cargar en panel de editar


        $('table#id_nombre_origen_tabla_completa').on("click", "tr.tabla-link", function () {
            console.log($(this).attr('id'));
            console.log($(this).attr('value'));
            $('input#id_nombre_origen_id_editar').val($(this).attr('id'));
            $('input#id_nombre_origen_nombre_editar').val($(this).attr('value'));
            $('input#id_nombre_origen_nombre_editar').prop("disabled", false);
        });

        //fin funcion clickable row y cargar en panel de editar



        $('form#id_nombre_origen_agregar_form').submit(function (e) {
            e.preventDefault();


            let nombre_nombre_origen = $("#nombre_origen_agregar_nombre").val();
            // if(estado_conf_moda){

            $.ajax({
                type: "POST",
                data: { nombre: nombre_nombre_origen },
                url: "/nombre_origen/agregar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        nombre_origen_start = 1;
                        nombre_origen_working = false;
                        nombre_origen_llenarLista();
                        $("#nombre_origen_agregar_nombre").focus();
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        nombre_origen_vaciar_campos('agregar');

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

        window.eliminar_nombre_origen = function () {
            this.eliminar = function (id_boton) {
                $.ajax({
                    type: "POST",
                    data: { id: id_boton },
                    url: "/nombre_origen/eliminar",
                    success: function (resultado) {

                        if (resultado['codigo_respuesta'] == 1) {
                            //alert(resultado['nombre']);     
                            nombre_origen_start = 1;
                            nombre_origen_working = false;
                            nombre_origen_llenarLista();
                            $('input#id_nombre_origen_nombre_editar').val('');
                            $('input#id_nombre_origen_id_editar').val('');
                            $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        }
                        else {
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                            nombre_origen_llenarLista();
                        }

                    }
                });

            }
        }

        //fin funcion eliminar

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion editar
        $('form#id-nombre_origen-editar-form').submit(function (e) {
            e.preventDefault();
            let id_nombre_origen = $('input#id_nombre_origen_id_editar').val();
            let nombre_nombre_origen = $('input#id_nombre_origen_nombre_editar').val();

            $.ajax({

                type: "POST",
                data: { id: id_nombre_origen, nombre: nombre_nombre_origen },
                url: "/nombre_origen/editar",
                success: function (resultado) {
                    console.log(JSON.stringify(resultado['codigo_respuesta']));
                    if (resultado['codigo_respuesta'] == 1) {
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        nombre_origen_llenarLista();
                        nombre_origen_vaciar_campos('editar');

                    }
                    else {
                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        nombre_origen_llenarLista();
                    }

                }
            });

        })





        //fin funcion editar



        //inicio funcion scroll para lista
        // PRIMERA PAGINA
        window.nombre_origen_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-nombre_origen').length) {

                nombre_origen_start = 1;
                $('#id_tabla_cuerpo_nombre_origen').children().remove();
                nombre_origen_working = true;
                $.ajax({
                    type: "GET",
                    url: "nombre_origen/get-all?page=" + nombre_origen_start,
                    success: function (r) {
                        $('#id_tabla_cuerpo_nombre_origen').children().remove();
                        for (var i = 0; i < r.data.length; i++) {
                            let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                            registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                            registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                            if (permisoEliminar) {
                            registro=registro+ "<td scope='col'><button type='button' id='nombre_origen_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                            }
                            registro=registro+ "</tr>";
                            $('#id_tabla_cuerpo_nombre_origen').append(registro)//referirlo al tbody que use en la lista  
                    }
                        nombre_origen_start++;
                        setTimeout(function () {
                            nombre_origen_working = false;
                        }, 300)
                    },
                    error: function (r) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }
        }
        nombre_origen_llenarLista();


        //INFINITY SCROLL
        $('#id-tabla-nombre_origen').scroll(function () {
            //     console.log(($(this).scrollTop()));
            //     console.log(nombre_origen_start);
            //     console.log('tabla scroll '+$('#id-tabla-nombre_origen').scrollTop());
            //     console.log('tabla scroll '+$('#id-tabla-nombre_origen').height());
            //     console.log('diferencia entre el div y la tabla:  '+($('#id_nombre_origen_tabla_completa').height()-$('#id-tabla-nombre_origen').height()));
            if (!$('input#id_nombre_origen_buscar').val()) {

                if ($(this).scrollTop() + 20 >= $('#id_nombre_origen_tabla_completa').height() - $('#id-tabla-nombre_origen').height()) {
                    if (nombre_origen_working == false) {
                        nombre_origen_working = true;
                        $.ajax({
                            type: "GET",
                            url: "nombre_origen/get-all?page=" + nombre_origen_start,
                            success: function (r) {
                                if (r.data.length > 0) {

                                    for (var i = 0; i < r.data.length; i++) {
                                        let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                        registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                        registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                        if (permisoEliminar) {
                                        registro=registro+ "<td scope='col'><button type='button' id='nombre_origen_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                        }
                                        registro=registro+ "</tr>";
                                        $('#id_tabla_cuerpo_nombre_origen').append(registro)//referirlo al tbody que use en la lista  
                                }
                                    nombre_origen_start += 1;
                                    setTimeout(function () {
                                        nombre_origen_working = false;
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


        $(document).on('keyup', '#id_nombre_origen_buscar', (function (e) {
            let palabraclave = $('input#id_nombre_origen_buscar').val();

            $('#id_tabla_cuerpo_nombre_origen').children().remove();
            if (palabraclave) {
                $.ajax({
                    type: "POST",
                    url: "nombre_origen/buscar/" + palabraclave,
                    success: function (resultado) {
                        $('#id_tabla_cuerpo_nombre_origen').children().remove();
                        if (resultado.codigo_respuesta == 1) {
                            for (var i = 0; i < resultado.data.length; i++) {
                                let registro="<tr class='tabla-link' id='" + resultado.data[i].id + "' value='" + resultado.data[i].name + "' data-url='#' >";
                                registro=registro+ "<td scope='col'>" + resultado.data[i].id + "</td>";
                                registro=registro+ "<td scope='col'>" + resultado.data[i].name + "</td>";
                                if (permisoEliminar) {
                                registro=registro+ "<td scope='col'><button type='button' id='nombre_origen_eliminar_btn_id' class='btn btn-danger eliminar' title='" + resultado.data[i].id + "'  data-value='" + resultado.data[i].id + "'> <i data-value='" + resultado.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                }
                                registro=registro+ "</tr>";
                                $('#id_tabla_cuerpo_nombre_origen').append(registro)//referirlo al tbody que use en la lista  
                        }

                        }
                        else {
                            $('#id_tabla_cuerpo_nombre_origen').children().remove();
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        }


                        nombre_origen_working = false;


                    }
                })
            }
            else {
                $('#id_tabla_cuerpo_nombre_origen').children().remove();

                nombre_origen_llenarLista();
            }

        }))
        //fin funcion buscar
        window.nombre_origen_vaciar_campos = function (form_submit_tipo) {
            if (form_submit_tipo == 'editar') {

                $('input#id_nombre_origen_id_editar').val('');
                $('input#id_nombre_origen_nombre_editar').val('');
                $('input#id_nombre_origen_nombre_editar').prop("disabled", true);
            }

            if (form_submit_tipo == 'agregar') {

                $("#nombre_origen_agregar_nombre").val('');
            }

        }
    }
});