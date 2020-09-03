//funcion para cargar todo
let rol_start = 1;
let rol_working = false;
let rol_working_buscar = false;
$(function () {

    if ($('div#id-panel-rol').length) {


        console.log('rol ready!')


        //inicio funcion clickable row y cargar en panel de editar


        $('table#id_rol_tabla_completa').on("click", "tr.tabla-link", function () {
            //console.log("aloh")
            console.log($(this).attr('id'));
            console.log($(this).attr('value'));
            $.ajax({
                type: "post",
                url: "rol/get-rol",
                data: {
                    id: $(this).attr('id')
                },
                success: function (response) {
                    console.log(response.data[0]);

                    $('input#rol_editar_id').val(response.data[0].id);
                    $('input#rol_editar_nombre').val(response.data[0].name);
                    $('textarea#rol_editar_descripcion').val(response.data[0].descripcion);
                    $('select#rol_editar_permiso_eliminar').val(response.data[0].elimina);
                    $('select#rol_editar_permiso_usuario').val(response.data[0].gestion_usuario);
                    $('select#rol_editar_permiso_parametros').val(response.data[0].gestion_parametros);
                }
            });
        });

        //fin funcion clickable row y cargar en panel de editar



        $('form#id_rol_agregar_form').submit(function (e) {
            e.preventDefault();

            let nombre_rol = $("input#rol_agregar_nombre").val();
            let descripcion = $("textarea#rol_agregar_descripcion").val();
            let elimina = $("select#rol_agregar_permiso_eliminar").val();
            let gestion_usuario = $("select#rol_agregar_permiso_usuario").val();
            let gestion_parametros = $("select#rol_agregar_permiso_parametros").val();
            // if(estado_conf_moda){
            data = {
                nombre: nombre_rol,
                descripcion: descripcion,
                elimina: elimina,
                gestion_usuario: gestion_usuario,
                gestion_parametros: gestion_parametros
            }
            console.log(data)
            $.ajax({
                type: "POST",
                data: data,
                url: "rol/agregar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        rol_start = 1;
                        rol_working = false;
                        rol_llenarLista();
                        $("#rol_agregar_nombre").focus();
                        $.notify(resultado['data'] + "!", {
                            className: "success",
                            elementPosition: "top center"
                        });
                        rol_vaciar_campos('agregar');

                    } else {
                        $.notify(resultado['data'] + "!", {
                            className: "error",
                            elementPosition: "top center"
                        });
                    }

                }
            });
            // }

        })
        //  fin funcion para agregar manualmente

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion eliminar

        window.eliminar_rol = function () {
            this.eliminar = function (id_boton) {
                $.ajax({
                    type: "POST",
                    data: {
                        id: id_boton
                    },
                    url: "rol/eliminar",
                    success: function (resultado) {

                        if (resultado['codigo_respuesta'] == 1) {
                            //alert(resultado['data']);     
                            rol_start = 1;
                            rol_working = false;
                            rol_llenarLista();
                            $('input#id_rol_nombre_editar').val('');
                            $('input#id_rol_id_editar').val('');
                            $.notify(resultado['data'] + "!", {
                                className: "success",
                                elementPosition: "top center"
                            });
                        } else {
                            $.notify(resultado['data'] + "!", {
                                className: "error",
                                elementPosition: "top center"
                            });
                            rol_llenarLista();
                        }

                    }
                });

            }
        }

        //fin funcion eliminar

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion editar
        $('form#id-rol-editar-form').submit(function (e) {
            e.preventDefault();
            let id_rol = $('input#rol_editar_id').val();
            let nombre_rol = $("input#rol_editar_nombre").val();
            let descripcion = $("textarea#rol_editar_descripcion").val();
            let elimina = $("select#rol_editar_permiso_eliminar").val();
            let gestion_usuario = $("select#rol_editar_permiso_usuario").val();
            let gestion_parametros = $("select#rol_editar_permiso_parametros").val();
            $.ajax({

                type: "POST",
                data: {
                    id: id_rol,
                    nombre: nombre_rol,
                    descripcion: descripcion,
                    elimina: elimina,
                    gestion_usuario: gestion_usuario,
                    gestion_parametros: gestion_parametros
                },
                url: "rol/editar",
                success: function (resultado) {
                    console.log(JSON.stringify(resultado['codigo_respuesta']));
                    if (resultado['codigo_respuesta'] == 1) {
                        $.notify(resultado['data'] + "!", {
                            className: "success",
                            elementPosition: "top center"
                        });
                        rol_llenarLista();
                        rol_vaciar_campos('editar');

                    } else {
                        $.notify(resultado['data'] + "!", {
                            className: "error",
                            elementPosition: "top center"
                        });
                        rol_llenarLista();
                    }

                }
            });

        })





        //fin funcion editar



        //inicio funcion scroll para lista
        // PRIMERA PAGINA
        window.rol_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-rol').length) {

                rol_start = 1;
                $('#id_tabla_cuerpo_rol').children().remove();
                rol_working = true;
                $.ajax({
                    type: "GET",
                    url: "rol/get-all?page=" + rol_start,
                    success: function (r) {
                        $('#id_tabla_cuerpo_rol').children().remove();
                        data = r.data
                        for (var i = 0; i < data.length; i++) {
                            registrar = " <tr class='tabla-link' id='" + data[i].id + "' value='" + data[i].name + "' data-url='#' >";
                            registrar = registrar + "<td scope='col '>" + data[i].name + "</td>";

                            //registrar = registrar + "<td scope='col '>" + data[i].descripcion + "</td>";
                            if (data[i].elimina == 1) {

                                registrar = registrar + "<td scope='col '> SI </td>";
                            }
                            else {
                                registrar = registrar + "<td scope='col '> NO </td>";

                            }
                            if (data[i].gestion_usuario == 1) {

                                registrar = registrar + "<td scope='col '> SI </td>";
                            }
                            else {
                                registrar = registrar + "<td scope='col '> NO </td>";

                            }
                            if (data[i].gestion_parametros == 1) {

                                registrar = registrar + "<td scope='col '> SI </td>";
                            }
                            else {
                                registrar = registrar + "<td scope='col '> NO </td>";

                            }
                            // registrar = registrar + "<td scope='col '>" + data[i].gestion_usuario + "</td>";
                            // registrar = registrar + "<td scope='col '>" + data[i].gestion_parametros + "</td>";
                            if (permisoEliminar) {

                                registrar = registrar + "<td scope='col '><button type='button' id='rol_eliminar_btn_id' class='btn btn-danger eliminar' title='Eliminar'   data-value='" + data[i].id + "'> <i data-value='" + data[i].id + "' class='material-icons' >delete</i></button></td>";
                            }
                            registrar = registrar + "</tr>";
                            $('#id_tabla_cuerpo_rol').append(registrar) //referirlo al tbody que use en la lista  
                        }
                        rol_start++;
                        setTimeout(function () {
                            rol_working = false;
                        }, 300)
                    },
                    error: function (r) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }
        }

        rol_llenarLista();


        //INFINITY SCROLL
        $('#id-tabla-rol').scroll(function () {
            //     console.log(($(this).scrollTop()));
            //     console.log(rol_start);
            //     console.log('tabla scroll '+$('#id-tabla-rol').scrollTop());
            //     console.log('tabla scroll '+$('#id-tabla-rol').height());
            //     console.log('diferencia entre el div y la tabla:  '+($('#id_rol_tabla_completa').height()-$('#id-tabla-rol').height()));
            if (!$('input#id_rol_buscar').val()) {

                if ($(this).scrollTop() + 20 >= $('#id_rol_tabla_completa').height() - $('#id-tabla-rol').height()) {
                    if (rol_working == false) {
                        rol_working = true;
                        $.ajax({
                            type: "GET",
                            url: "rol/get-all?page=" + rol_start,
                            success: function (r) {
                                if (r.data.length > 0) {

                                    data = r.data
                                    for (var i = 0; i < data.length; i++) {
                                        registrar = " <tr class='tabla-link' id='" + data[i].id + "' value='" + data[i].name + "' data-url='#' >";
                                        registrar = registrar + "<td scope='col '>" + data[i].name + "</td>";
                                        //registrar = registrar + "<td scope='col '>" + data[i].descripcion + "</td>";
                                        if (data[i].elimina == 1) {

                                            registrar = registrar + "<td scope='col '> SI </td>";
                                        }
                                        else {
                                            registrar = registrar + "<td scope='col '> NO </td>";

                                        }
                                        if (data[i].gestion_usuario == 1) {

                                            registrar = registrar + "<td scope='col '> SI </td>";
                                        }
                                        else {
                                            registrar = registrar + "<td scope='col '> NO </td>";

                                        }
                                        if (data[i].gestion_parametros == 1) {

                                            registrar = registrar + "<td scope='col '> SI </td>";
                                        }
                                        else {
                                            registrar = registrar + "<td scope='col '> NO </td>";

                                        }

                                        if (permisoEliminar) {

                                            registrar = registrar + "<td scope='col '><button type='button' id='rol_eliminar_btn_id' class='btn btn-danger eliminar' title='Eliminar'   data-value='" + data[i].id + "'> <i data-value='" + data[i].id + "' class='material-icons' >delete</i></button></td>";
                                        }
                                        registrar = registrar + "</tr>";
                                        $('#id_tabla_cuerpo_rol').append(registrar) //referirlo al tbody que use en la lista  
                                    }
                                    rol_start += 1;
                                    setTimeout(function () {
                                        rol_working = false;
                                    }, 300);
                                }
                            },
                            error: function (r) {
                                console.log("Aviso de error haciendo scrolling en la tabla de rol!");
                            }
                        });
                    }
                }
            }
        })


        //fin inicio funcion scroll para lista
        //inicio funcion buscar


        $(document).on('keyup', '#id_rol_buscar', (function (e) {
            let palabraclave = $('input#id_rol_buscar').val();

            $('#id_tabla_cuerpo_rol').children().remove();
            if (palabraclave) {
                $.ajax({
                    type: "POST",
                    url: "rol/buscar/" + palabraclave,
                    success: function (resultado) {
                        $('#id_tabla_cuerpo_rol').children().remove();
                        if (resultado.codigo_respuesta == 1) {
                            data = resultado.data
                            for (var i = 0; i < data.length; i++) {
                                registrar = " <tr class='tabla-link' id='" + data[i].id + "' value='" + data[i].name + "' data-url='#' >";
                                registrar = registrar + "<td scope='col '>" + data[i].name + "</td>";
                                //registrar = registrar + "<td scope='col '>" + data[i].descripcion + "</td>";
                                if (data[i].elimina == 1) {

                                    registrar = registrar + "<td scope='col '> SI </td>";
                                }
                                else {
                                    registrar = registrar + "<td scope='col '> NO </td>";

                                }
                                if (data[i].gestion_usuario == 1) {

                                    registrar = registrar + "<td scope='col '> SI </td>";
                                }
                                else {
                                    registrar = registrar + "<td scope='col '> NO </td>";

                                }
                                if (data[i].gestion_parametros == 1) {

                                    registrar = registrar + "<td scope='col '> SI </td>";
                                }
                                else {
                                    registrar = registrar + "<td scope='col '> NO </td>";

                                }

                                if (permisoEliminar) {
                                    registrar = registrar + "<td scope='col '><button type='button' id='rol_eliminar_btn_id' class='btn btn-danger eliminar' title='Eliminar'   data-value='" + data[i].id + "'> <i data-value='" + data[i].id + "' class='material-icons' >delete</i></button></td>";
                                }
                                registrar = registrar + "</tr>";
                                $('#id_tabla_cuerpo_rol').append(registrar) //referirlo al tbody que use en la lista  
                            }

                        } else {
                            $('#id_tabla_cuerpo_rol').children().remove();
                            $.notify(resultado['data'] + "!", {
                                className: "error",
                                elementPosition: "top center"
                            });
                        }

                        rol_working = false;

                    }
                })
            } else {
                $('#id_tabla_cuerpo_rol').children().remove();

                rol_llenarLista();
            }

        }))
        //fin funcion buscar
        window.rol_vaciar_campos = function (form_submit_tipo) {
            if (form_submit_tipo == 'editar') {

                $('input#id_rol_id_editar').val('');
                $('input#id_rol_nombre_editar').val('');
                $('input#id_rol_nombre_editar').prop("disabled", true);
            }

            if (form_submit_tipo == 'agregar') {

                $("#rol_agregar_nombre").val('');
            }

        }
    }
});
