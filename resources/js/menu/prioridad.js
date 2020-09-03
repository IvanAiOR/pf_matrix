
//funcion para cargar todo
let prioridad_start = 1;
let prioridad_working = false;
let prioridad_working_buscar = false;
$(function () {
    if ($('div#id-panel-prioridad').length) {

        console.log("catalogo ready !");

        //inicio funcion clickable row y cargar en panel de editar


        $('table#id_prioridad_tabla_completa').on("click", "tr.tabla-link", function () {
            console.log($(this).attr('id'));
            console.log($(this).attr('value'));
            $('input#id_prioridad_id_editar').val($(this).attr('id'));
            $('input#id_prioridad_nombre_editar').val($(this).attr('value'));
            $('input#id_prioridad_nombre_editar').prop("disabled", false);
        });

        //fin funcion clickable row y cargar en panel de editar



        $('form#id_prioridad_agregar_form').submit(function (e) {
            e.preventDefault();

            // $.notify({
            //         title: 'Seguro que desea Agregar?',
            //         button: 'Continuar'
            //       }, { 
            //         style: 'foo',
            //         autoHide: true,
            //         clickToHide: false,
            //         showDuration: 4000,
            //       });
            let nombre_prioridad = $("#prioridad_agregar_nombre").val();
            // if(estado_conf_moda){

            $.ajax({
                type: "POST",
                data: { nombre: nombre_prioridad },
                url: "/prioridad/agregar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        prioridad_start = 1;
                        prioridad_working = false;
                        prioridad_llenarLista();
                        $("#prioridad_agregar_nombre").focus();
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        prioridad_vaciar_campos('agregar')

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

        window.eliminar_prioridad = function () {
            this.eliminar = function (id_boton) {
                $.ajax({
                    type: "POST",
                    data: { id: id_boton },
                    url: "/prioridad/eliminar",
                    success: function (resultado) {

                        if (resultado['codigo_respuesta'] == 1) {
                            //alert(resultado['nombre']);     
                            prioridad_start = 1;
                            prioridad_working = false;
                            prioridad_llenarLista();
                            $('input#id_prioridad_nombre_editar').val('');
                            $('input#id_prioridad_id_editar').val('');
                            $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        }
                        else {
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                            prioridad_llenarLista();
                        }

                    }
                });

            }
        }

        //fin funcion eliminar

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion editar
        $('form#id-prioridad-editar-form').submit(function (e) {
            e.preventDefault();
            let id_prioridad = $('input#id_prioridad_id_editar').val();
            let nombre_prioridad = $('input#id_prioridad_nombre_editar').val();

            $.ajax({

                type: "POST",
                data: { id: id_prioridad, nombre: nombre_prioridad },
                url: "/prioridad/editar",
                success: function (resultado) {
                    console.log(JSON.stringify(resultado['codigo_respuesta']));
                    if (resultado['codigo_respuesta'] == 1) {
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        prioridad_llenarLista();
                        prioridad_vaciar_campos('editar');

                    }
                    else {
                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        prioridad_llenarLista();
                    }

                }
            });

        })





        //fin funcion editar



        //inicio funcion scroll para lista
        // PRIMERA PAGINA
        window.prioridad_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-prioridad').length) {

                prioridad_start = 1;
                $('#id_tabla_cuerpo_prioridad').children().remove();
                prioridad_working = true;
                $.ajax({
                    type: "GET",
                    url: "prioridad/get-all?page=" + prioridad_start,
                    success: function (r) {
                        $('#id_tabla_cuerpo_prioridad').children().remove();
                        for (var i = 0; i < r.data.length; i++) {
                            let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                            registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                            registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                            if (permisoEliminar) {
                            registro=registro+ "<td scope='col'><button type='button' id='prioridad_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                            }
                            registro=registro+ "</tr>";
                            $('#id_tabla_cuerpo_prioridad').append(registro)//referirlo al tbody que use en la lista  
                    }
                        prioridad_start++;
                        setTimeout(function () {
                            prioridad_working = false;
                        }, 300)
                    },
                    error: function (r) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }

        }
        prioridad_llenarLista();


        //INFINITY SCROLL
        $('#id-tabla-prioridad').scroll(function () {
            //     console.log(($(this).scrollTop()));
            //     console.log(prioridad_start);
            //     console.log('tabla scroll '+$('#id-tabla-prioridad').scrollTop());
            //     console.log('tabla scroll '+$('#id-tabla-prioridad').height());
            //     console.log('diferencia entre el div y la tabla:  '+($('#id_prioridad_tabla_completa').height()-$('#id-tabla-prioridad').height()));
            if (!$('input#id_prioridad_buscar').val()) {

                if ($(this).scrollTop() + 20 >= $('#id_prioridad_tabla_completa').height() - $('#id-tabla-prioridad').height()) {
                    if (prioridad_working == false) {
                        prioridad_working = true;
                        $.ajax({
                            type: "GET",
                            url: "prioridad/get-all?page=" + prioridad_start,
                            success: function (r) {
                                if (r.data.length > 0) {

                                    for (var i = 0; i < r.data.length; i++) {
                                        let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                        registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                        registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                        if (permisoEliminar) {
                                        registro=registro+ "<td scope='col'><button type='button' id='prioridad_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                        }
                                        registro=registro+ "</tr>";
                                        $('#id_tabla_cuerpo_prioridad').append(registro)//referirlo al tbody que use en la lista  
                                }
                                    prioridad_start += 1;
                                    setTimeout(function () {
                                        prioridad_working = false;
                                    }, 300)
                                }
                            },
                            error: function (r) {
                                console.log("Aviso de error haciendo scrolling en la tabla de prioridad!");
                            }
                        });
                    }
                }
            }
        })


        //fin inicio funcion scroll para lista
        //inicio funcion buscar


        $(document).on('keyup', '#id_prioridad_buscar', (function (e) {
            let palabraclave = $('input#id_prioridad_buscar').val();
            if (palabraclave) {

                $('#id_tabla_cuerpo_prioridad').children().remove();
                console.log(palabraclave);
                $.ajax({
                    type: "POST",
                    url: "prioridad/buscar/" + palabraclave,
                    success: function (resultado) {
                        if (resultado.codigo_respuesta == 1) {
                            $('#id_tabla_cuerpo_prioridad').children().remove();
                            for (var i = 0; i < resultado.data.length; i++) {
                                let registro="<tr class='tabla-link' id='" + resultado.data[i].id + "' value='" + resultado.data[i].name + "' data-url='#' >";
                                registro=registro+ "<td scope='col'>" + resultado.data[i].id + "</td>";
                                registro=registro+ "<td scope='col'>" + resultado.data[i].name + "</td>";
                                if (permisoEliminar) {
                                registro=registro+ "<td scope='col'><button type='button' id='prioridad_eliminar_btn_id' class='btn btn-danger eliminar' title='" + resultado.data[i].id + "'  data-value='" + resultado.data[i].id + "'> <i data-value='" + resultado.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                }
                                registro=registro+ "</tr>";
                                $('#id_tabla_cuerpo_prioridad').append(registro)//referirlo al tbody que use en la lista  
                        }

                        }
                        else {
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        }

                        prioridad_start++;
                        setTimeout(function () {
                            prioridad_working = false;
                            prioridad_working_buscar = false;
                        }, 400)

                    }
                })
            }
            else {
                $('#id_tabla_cuerpo_prioridad').children().remove();
                prioridad_llenarLista();
            }
        }))
        //fin funcion buscar

        window.prioridad_vaciar_campos = function (form_submit_tipo) {
            if (form_submit_tipo == 'editar') {

                $('input#id_prioridad_id_editar').val('');
                $('input#id_prioridad_nombre_editar').val('');
                $('input#id_prioridad_nombre_editar').prop("disabled", true);
            }

            if (form_submit_tipo == 'agregar') {

                $("#prioridad_agregar_nombre").val('');
            }

        }
    }
});

