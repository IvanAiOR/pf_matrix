
//funcion para cargar todo
let comentario_start = 1;
let comentario_working = false;
let comentario_working_buscar = false;
$(function () {

    if ($('div#id-panel-comentario').length) {


        console.log('comentario ready!')


        //inicio funcion clickable row y cargar en panel de editar


        $('table#id_comentario_tabla_completa').on("click", "tr.tabla-link", function () {
            console.log($(this).attr('id'));
            console.log($(this).attr('value'));
            $('input#id_comentario_id_editar').val($(this).attr('id'));
            $('input#id_comentario_nombre_editar').val($(this).attr('value'));
            $('input#id_comentario_nombre_editar').prop("disabled", false);
        });

        //fin funcion clickable row y cargar en panel de editar



        $('form#id_comentario_agregar_form').submit(function (e) {
            e.preventDefault();


            let nombre_comentario = $("#comentario_agregar_nombre").val();
            // if(estado_conf_moda){

            $.ajax({
                type: "POST",
                data: { nombre: nombre_comentario },
                url: "/comentario/agregar",
                success: function (resultado) {
                    // console.log(JSON.stringify(resultado.data))
                    if (resultado['codigo_respuesta'] == 1) {
                        comentario_start = 1;
                        comentario_working = false;
                        comentario_llenarLista();
                        $("#comentario_agregar_nombre").focus();
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        comentario_vaciar_campos('agregar')

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

        window.eliminar_comentario = function () {
            this.eliminar = function (id_boton) {

                $.ajax({
                    type: "POST",
                    data: { id: id_boton },
                    url: "/comentario/eliminar",
                    success: function (resultado) {

                        if (resultado['codigo_respuesta'] == 1) {
                            //alert(resultado['nombre']);     
                            comentario_start = 1;
                            comentario_working = false;
                            comentario_llenarLista();
                            $('input#id_comentario_nombre_editar').val('');
                            $('input#id_comentario_id_editar').val('');
                            $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        }
                        else {
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                            comentario_llenarLista();
                        }

                    }
                });

            }
        }

        //fin funcion eliminar

        //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

        //inicio funcion editar
        $('form#id-comentario-editar-form').submit(function (e) {
            e.preventDefault();
            let id_comentario = $('input#id_comentario_id_editar').val();
            let nombre_comentario = $('input#id_comentario_nombre_editar').val();

            $.ajax({

                type: "POST",
                data: { id: id_comentario, nombre: nombre_comentario },
                url: "/comentario/editar",
                success: function (resultado) {
                    console.log(JSON.stringify(resultado['codigo_respuesta']));
                    if (resultado['codigo_respuesta'] == 1) {
                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                        comentario_llenarLista();
                        comentario_vaciar_campos('editar')

                    }
                    else {
                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        comentario_llenarLista();
                    }

                }
            });

        })





        //fin funcion editar



        //inicio funcion scroll para lista
        // PRIMERA PAGINA
        window.comentario_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-comentario').length) {

                comentario_start = 1;
                //$('#id_tabla_cuerpo_comentario').children().remove();
                comentario_working = true;
                $.ajax({
                    type: "GET",
                    url: "comentario/get-all?page=" + comentario_start,
                    success: function (r) {
                        $('#id_tabla_cuerpo_comentario').children().remove();
                        for (var i = 0; i < r.data.length; i++) {
                            let registro = "<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                            registro = registro + "<td scope='col'>" + r.data[i].id + "</td>";
                            registro = registro + "<td scope='col'>" + r.data[i].name + "</td>";
                            if (permisoEliminar) {
                                registro = registro + "<td scope='col'><button type='button' id='comentario_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                            }
                            registro = registro + "</tr>";
                            console.log(registro)
                            $('#id_tabla_cuerpo_comentario').append(registro)//referirlo al tbody que use en la lista  
                        }
                        comentario_start++;
                        setTimeout(function () {
                            comentario_working = false;
                        }, 300)
                    },
                    error: function (r) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }
        }
        comentario_llenarLista();


        //INFINITY SCROLL
        $('#id-tabla-comentario').scroll(function () {
            //     console.log(($(this).scrollTop()));
            //     console.log(comentario_start);
            //     console.log('tabla scroll '+$('#id-tabla-comentario').scrollTop());
            //     console.log('tabla scroll '+$('#id-tabla-comentario').height());
            //     console.log('diferencia entre el div y la tabla:  '+($('#id_comentario_tabla_completa').height()-$('#id-tabla-comentario').height()));
            if (!$('input#id_comentario_buscar').val()) {

                if ($(this).scrollTop() + 20 >= $('#id_comentario_tabla_completa').height() - $('#id-tabla-comentario').height()) {
                    if (comentario_working == false) {
                        comentario_working = true;
                        $.ajax({
                            type: "GET",
                            url: "comentario/get-all?page=" + comentario_start,
                            success: function (r) {
                                if (r.data.length > 0) {

                                    for (var i = 0; i < r.data.length; i++) {
                                        let registro = "<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                        registro = registro + "<td scope='col'>" + r.data[i].id + "</td>";
                                        registro = registro + "<td scope='col'>" + r.data[i].name + "</td>";
                                        if (permisoEliminar) {
                                            registro = registro + "<td scope='col'><button type='button' id='comentario_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                        }
                                        registro = registro + "</tr>";
                                        $('#id_tabla_cuerpo_comentario').append(registro)//referirlo al tbody que use en la lista  
                                    }
                                    comentario_start += 1;
                                    setTimeout(function () {
                                        comentario_working = false;
                                    }, 300)
                                }
                            },
                            error: function (r) {
                                console.log("Aviso de error haciendo scrolling en la tabla de comentario!");
                            }
                        });
                    }
                }
            }
        })


        //fin inicio funcion scroll para lista
        //inicio funcion buscar


        $(document).on('keyup', '#id_comentario_buscar', (function (e) {
            let palabraclave = $('input#id_comentario_buscar').val();

            $('#id_tabla_cuerpo_comentario').children().remove();
            if (palabraclave) {
                $.ajax({
                    type: "POST",
                    url: "comentario/buscar/" + palabraclave,
                    success: function (resultado) {
                        $('#id_tabla_cuerpo_comentario').children().remove();
                        if (resultado.codigo_respuesta == 1) {
                            for (var i = 0; i < resultado.data.length; i++) {
                                let registro = "<tr class='tabla-link' id='" + resultado.data[i].id + "' value='" + resultado.data[i].name + "' data-url='#' >";
                                registro = registro + "<td scope='col'>" + resultado.data[i].id + "</td>";
                                registro = registro + "<td scope='col'>" + resultado.data[i].name + "</td>";
                                if (permisoEliminar) {
                                    registro = registro + "<td scope='col'><button type='button' id='comentario_eliminar_btn_id' class='btn btn-danger eliminar' title='" + resultado.data[i].id + "'  data-value='" + resultado.data[i].id + "'> <i data-value='" + resultado.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                }
                                registro = registro + "</tr>";
                                $('#id_tabla_cuerpo_comentario').append(registro)//referirlo al tbody que use en la lista  
                            }

                        }
                        else {
                            $('#id_tabla_cuerpo_comentario').children().remove();
                            $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                        }


                        comentario_working = false;


                    }
                })
            }
            else {
                $('#id_tabla_cuerpo_comentario').children().remove();

                comentario_llenarLista();
            }

        }))
        //fin funcion buscar
        window.comentario_vaciar_campos = function (form_submit_tipo) {
            if (form_submit_tipo == 'editar') {

                $('input#id_comentario_id_editar').val('');
                $('input#id_comentario_nombre_editar').val('');
                $('input#id_comentario_nombre_editar').prop("disabled", true);
            }

            if (form_submit_tipo == 'agregar') {

                $("#comentario_" + form_submit_tipo + "_nombre").val('');
            }

        }
    }
});