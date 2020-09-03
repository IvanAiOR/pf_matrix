
//funcion para cargar todo
let origen_start = 1;
let origen_working = false;
let origen_working_buscar = false;
$(function () {

    if ($('div#id-panel-origen').length) {


        console.log('origen ready!')


        //inicio funcion clickable row y cargar en panel de editar


        $('table#id_origen_tabla_completa').on("click", "tr.tabla-link", function () {
            console.log($(this).attr('id'));
            console.log($(this).attr('value'));
            $('input#id_origen_id_editar').val($(this).attr('id'));
            $('input#id_origen_nombre_editar').val($(this).attr('value'));
            $('input#id_origen_nombre_editar').prop("disabled", false);
        });

        //fin funcion clickable row y cargar en panel de editar



        $('form#id_origen_agregar_form').submit(function (e) {
            e.preventDefault();


            let nombre_origen = $("#origen_agregar_nombre").val();
            // if(estado_conf_moda){

            $.ajax({
                type: "POST",
                data: { nombre: nombre_origen },
                url: "origen/agregar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        origen_start = 1;
                        origen_working = false;
                        origen_llenarLista();
                        $("#origen_agregar_nombre").focus();
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        origen_vaciar_campos('agregar');

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

        window.eliminar_origen = function () {
            this.eliminar = function (id_boton) {
                $.ajax({
                    type: "POST",
                    data: { id: id_boton },
                    url: "origen/eliminar",
                    success: function (resultado) {

                        if (resultado['codigo_respuesta'] == 1) {
                            //alert(resultado['nombre']);     
                            origen_start = 1;
                            origen_working = false;
                            origen_llenarLista();
                            $('input#id_origen_nombre_editar').val('');
                            $('input#id_origen_id_editar').val('');
                            $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        }
                        else {
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                            origen_llenarLista();
                        }

                    }
                });

            }
        }

        //fin funcion eliminar

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion editar
        $('form#id-origen-editar-form').submit(function (e) {
            e.preventDefault();
            let id_origen = $('input#id_origen_id_editar').val();
            let nombre_origen = $('input#id_origen_nombre_editar').val();

            $.ajax({

                type: "POST",
                data: { id: id_origen, nombre: nombre_origen },
                url: "origen/editar",
                success: function (resultado) {
                    console.log(JSON.stringify(resultado['codigo_respuesta']));
                    if (resultado['codigo_respuesta'] == 1) {
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        origen_llenarLista();
                        origen_vaciar_campos('editar');

                    }
                    else {
                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        origen_llenarLista();
                    }

                }
            });

        })





        //fin funcion editar



        //inicio funcion scroll para lista
        // PRIMERA PAGINA
        window.origen_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-origen').length) {

                origen_start = 1;
                $('#id_tabla_cuerpo_origen').children().remove();
                origen_working = true;
                $.ajax({
                    type: "GET",
                    url: "origen/get-all?page=" + origen_start,
                    success: function (r) {
                        $('#id_tabla_cuerpo_origen').children().remove();
                        for (var i = 0; i < r.data.length; i++) {
                            let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                            registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                            registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                            if (permisoEliminar) {
                            registro=registro+ "<td scope='col'><button type='button' id='origen_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                            }
                            registro=registro+ "</tr>";
                            $('#id_tabla_cuerpo_origen').append(registro)//referirlo al tbody que use en la lista  
                    }
                        origen_start++;
                        setTimeout(function () {
                            origen_working = false;
                        }, 300)
                    },
                    error: function (r) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }
        }
        origen_llenarLista();


        //INFINITY SCROLL
        $('#id-tabla-origen').scroll(function () {
            //     console.log(($(this).scrollTop()));
            //     console.log(origen_start);
            //     console.log('tabla scroll '+$('#id-tabla-origen').scrollTop());
            //     console.log('tabla scroll '+$('#id-tabla-origen').height());
            //     console.log('diferencia entre el div y la tabla:  '+($('#id_origen_tabla_completa').height()-$('#id-tabla-origen').height()));
            if (!$('input#id_origen_buscar').val()) {

                if ($(this).scrollTop() + 20 >= $('#id_origen_tabla_completa').height() - $('#id-tabla-origen').height()) {
                    if (origen_working == false) {
                        origen_working = true;
                        $.ajax({
                            type: "GET",
                            url: "origen/get-all?page=" + origen_start,
                            success: function (r) {
                                if (r.data.length > 0) {

                                    for (var i = 0; i < r.data.length; i++) {
                                        let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                        registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                        registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                        if (permisoEliminar) {
                                        registro=registro+ "<td scope='col'><button type='button' id='origen_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                        }
                                        registro=registro+ "</tr>";
                                        $('#id_tabla_cuerpo_origen').append(registro)//referirlo al tbody que use en la lista  
                                }
                                    origen_start += 1;
                                    setTimeout(function () {
                                        origen_working = false;
                                    }, 300)
                                }
                            },
                            error: function (r) {
                                console.log("Aviso de error haciendo scrolling en la tabla de origen!");
                            }
                        });
                    }
                }
            }
        })


        //fin inicio funcion scroll para lista
        //inicio funcion buscar


        $(document).on('keyup', '#id_origen_buscar', (function (e) {
            let palabraclave = $('input#id_origen_buscar').val();

            $('#id_tabla_cuerpo_origen').children().remove();
            if (palabraclave) {
                $.ajax({
                    type: "POST",
                    url: "origen/buscar/" + palabraclave,
                    success: function (resultado) {
                        $('#id_tabla_cuerpo_origen').children().remove();
                        if (resultado.codigo_respuesta == 1) {
                            for (var i = 0; i < resultado.data.length; i++) {
                                let registro="<tr class='tabla-link' id='" + resultado.data[i].id + "' value='" + resultado.data[i].name + "' data-url='#' >";
                                registro=registro+ "<td scope='col'>" + resultado.data[i].id + "</td>";
                                registro=registro+ "<td scope='col'>" + resultado.data[i].name + "</td>";
                                if (permisoEliminar) {
                                registro=registro+ "<td scope='col'><button type='button' id='origen_eliminar_btn_id' class='btn btn-danger eliminar' title='" + resultado.data[i].id + "'  data-value='" + resultado.data[i].id + "'> <i data-value='" + resultado.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                }
                                registro=registro+ "</tr>";
                                $('#id_tabla_cuerpo_origen').append(registro)//referirlo al tbody que use en la lista  
                        }

                        }
                        else {
                            $('#id_tabla_cuerpo_origen').children().remove();
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        }


                        origen_working = false;


                    }
                })
            }
            else {
                $('#id_tabla_cuerpo_origen').children().remove();

                origen_llenarLista();
            }

        }))
        //fin funcion buscar
        window.origen_vaciar_campos = function (form_submit_tipo) {
            if (form_submit_tipo == 'editar') {

                $('input#id_origen_id_editar').val('');
                $('input#id_origen_nombre_editar').val('');
                $('input#id_origen_nombre_editar').prop("disabled", true);
            }

            if (form_submit_tipo == 'agregar') {

                $("#origen_agregar_nombre").val('');
            }

        }
    }
});