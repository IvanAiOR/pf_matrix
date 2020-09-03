
//funcion para cargar todo
let usuario_start = 1;
let usuario_working = false;
let usuario_working_buscar = false;
$(function () {

    if ($('div#id-panel-usuario').length) {

        console.log("usuario ready !");

        //inicio funcion clickable row y cargar en panel de editar


        $('table#id_usuario_tabla_completa').on("click", "tr.tabla-link", function () {
            console.log($(this).attr('id'));
            console.log($(this).attr('value'));
            $.ajax({
                type: "post",
                url: "usuario/get-user",
                data: { id: $(this).attr('id') },
                success: function (response) {
                    console.log(response.data[0]);

                    $('input#usuario_editar_id').val(response.data[0].id);
                    $('input#usuario_editar_nombre').val(response.data[0].name);
                    $('input#usuario_editar_correo').val(response.data[0].email);
                    $('input#usuario_editar_rol').val(response.data[0].rol_id);
                }
            });
        });

        //fin funcion clickable row y cargar en panel de editar



        $('form#id_usuario_agregar_form').submit(function (e) {



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
            nombre_usuario = $("input#usuario_agregar_nombre").val();
            email = $("input#usuario_agregar_correo").val();
            clave = $("input#usuario_agregar_clave").val();
            rol_id = $("select#usuario_agregar_rol").val();
            console.log($("input#usuario_agregar_nombre").val());
            var data = {
                nombre: nombre_usuario, clave: clave, email: email, rol_id: rol_id
            }

            // if(estado_conf_moda){
            $.ajax({
                type: "POST",
                data: data,
                url: "/usuario/agregar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        usuario_start = 1;
                        usuario_working = false;
                        usuario_llenarLista();
                        $("#usuario_agregar_nombre").focus();
                        $.notify(resultado['data'] + "!", { className: "success", elementPosition: "top center" });
                        usuario_vaciar_campos('agregar');

                    }
                    else {
                        $.notify(resultado['data'] + "!", { className: "error", elementPosition: "top center" });
                    }

                }
            });
            // }


        })
        //  fin funcion para agregar manualmente

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion eliminar

        window.eliminar_usuario = function () {
            this.eliminar = function (id_boton) {
                $.ajax({
                    type: "POST",
                    data: { id: id_boton },
                    url: "/usuario/eliminar",
                    success: function (resultado) {

                        if (resultado['codigo_respuesta'] == 1) {
                            //alert(resultado['nombre']);     
                            usuario_start = 1;
                            usuario_working = false;
                            usuario_llenarLista();
                            $('input#id_usuario_nombre_editar').val('');
                            $('input#id_usuario_email_editar').val('');
                            $('input#id_usuario_clave_editar').val('');
                            $('select#id_usuario_rol_editar').val(-1);
                            $.notify(resultado['data'] + "!", { className: "success", elementPosition: "top center" });
                        }
                        else {
                            $.notify(resultado['data'] + "!", { className: "error", elementPosition: "top center" });
                            usuario_llenarLista();
                        }

                    }
                });

            }
        }

        //fin funcion eliminar

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion editar
        $('form#id_usuario_editar_form').submit(function (e) {

            e.preventDefault();
            id = $("input#usuario_editar_id").val();
            nombre_usuario = $("input#usuario_editar_nombre").val();
            email = $("input#usuario_editar_correo").val();
            clave = $("input#usuario_editar_clave").val();
            rol_id = $("select#usuario_editar_rol").val();
            //console.log($("input#usuario_editar_nombre").val());
            var data = {
                id: id, nombre: nombre_usuario, clave: clave, email: email, rol_id: rol_id
            }
            $.ajax({

                type: "POST",
                data: data,
                url: "/usuario/editar",
                success: function (resultado) {
                    //console.log(JSON.stringify(resultado['codigo_respuesta']));
                    if (resultado['codigo_respuesta'] == 1) {
                        $.notify(resultado['data'] + "!", { className: "success", elementPosition: "top center" });
                        usuario_llenarLista();
                        usuario_vaciar_campos('editar');

                    }
                    else {
                        $.notify(resultado['data'] + "!", { className: "error", elementPosition: "top center" });
                        usuario_llenarLista();
                    }

                }
            });

        })





        //fin funcion editar



        //inicio funcion scroll para lista
        // PRIMERA PAGINA
        window.usuario_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-usuario').length) {

                usuario_start = 1;
                $('#id_tabla_cuerpo_usuario').children().remove();
                usuario_working = true;
                $.ajax({
                    type: "GET",
                    url: "usuario/get-all?page=" + usuario_start,
                    success: function (r) {


                        cargar_tabla(r.data);

                    },
                    error: function (r) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }
        }
        usuario_llenarLista();


        //INFINITY SCROLL
        $('#id-tabla-usuario').scroll(function () {
            //     console.log(($(this).scrollTop()));
            //     console.log(usuario_start);
            //     console.log('tabla scroll '+$('#id-tabla-usuario').scrollTop());
            //     console.log('tabla scroll '+$('#id-tabla-usuario').height());
            //     console.log('diferencia entre el div y la tabla:  '+($('#id_usuario_tabla_completa').height()-$('#id-tabla-usuario').height()));
            if (!$('input#id_usuario_buscar').val()) {

                if ($(this).scrollTop() + 20 >= $('#id_usuario_tabla_completa').height() - $('#id-tabla-usuario').height()) {
                    if (usuario_working == false) {
                        usuario_working = true;
                        $.ajax({
                            type: "GET",
                            url: "usuario/get-all?page=" + usuario_start,
                            success: function (r) {
                                if (r.data.length > 0) {

                                    cargar_tabla(r.data);
                                    usuario_start += 1;
                                    setTimeout(function () {
                                        usuario_working = false;
                                    }, 300)
                                }
                            },
                            error: function (r) {
                                console.log("Aviso de error haciendo scrolling en la tabla de usuario!");
                            }
                        });
                    }
                }
            }
        })


        //fin inicio funcion scroll para lista
        //inicio funcion buscar


        $(document).on('keyup', '#id_usuario_buscar', (function (e) {
            let palabraclave = $('input#id_usuario_buscar').val();

            $('#id_tabla_cuerpo_usuario').children().remove();
            if (palabraclave) {
                $.ajax({
                    type: "POST",
                    url: "usuario/buscar/" + palabraclave,
                    success: function (resultado) {

                        if (resultado.codigo_respuesta == 1) {
                            cargar_tabla(resultado.data);

                        }
                        else {
                            $('#id_tabla_cuerpo_usuario').children().remove();
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        }


                        usuario_working = false;


                    }
                })
            }
            else {
                $('#id_tabla_cuerpo_usuario').children().remove();

                usuario_llenarLista();
            }

        }))
        //fin funcion buscar
        window.usuario_vaciar_campos = function (form_submit_tipo) {
            if (form_submit_tipo == 'editar') {

                $('input#id_usuario_id_editar').val('');
                $('input#id_usuario_nombre_editar').val('');
                $('input#id_usuario_nombre_editar').prop("disabled", true);
            }

            if (form_submit_tipo == 'agregar') {

                $("#usuario_agregar_nombre").val('');
            }

        }

        window.cargar_tabla = function (data) {
            $('#id_tabla_cuerpo_usuario').children().remove();
            for (var i = 0; i < data.length; i++) {
                let registro
                //console.log(palabraclave);
                registro = "<tr class='tabla-link' id='" + data[i].id + "' value='" + data[i].name + "' data-url='#' >";
                //registro= registro+ "<td scope='col'>" + data[i].id + "</td>";
                registro = registro + "<td scope='col'>" + data[i].name + "</td>";
                registro = registro + "<td scope='col'>" + data[i].email + "</td>";
                registro = registro + "<td scope='col'>" + data[i].rol + "</td>";
                if (permisoEliminar) {

                    registro = registro + "<td scope='col'><button type='button' id='usuario_eliminar_btn_id' class='btn btn-danger eliminar' title='" + data[i].id + "'  data-value='" + data[i].id + "'> <i data-value='" + data[i].id + "' class='material-icons' >delete</i></button></td>";
                }
                registro = registro + "</tr>";
                $('#id_tabla_cuerpo_usuario').append(registro)//referirlo al tbody que use en la lista  
            }
        }

        window.usuario_llenar_select = function (id_select, nombre_tabla) {
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
        usuario_llenar_select(['usuario_agregar_rol', 'usuario_editar_rol'], "rol");

    }


});


