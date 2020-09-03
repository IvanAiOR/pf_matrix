
//funcion para cargar todo
let marca_start = 1;
let marca_working = false;
let marca_working_buscar = false;
$(function () {

        if ($('div#id-panel-marca').length) {

                console.log("marca ready !");

                //inicio funcion clickable row y cargar en panel de editar


                $('table#id_marca_tabla_completa').on("click", "tr.tabla-link", function () {
                        console.log($(this).attr('id'));
                        console.log($(this).attr('value'));
                        $('input#id_marca_id_editar').val($(this).attr('id'));
                        $('input#id_marca_nombre_editar').val($(this).attr('value'));
                        $('input#id_marca_nombre_editar').prop("disabled", false);
                });

                //fin funcion clickable row y cargar en panel de editar



                $('form#id_marca_agregar_form').submit(function (e) {
                        var key = e.charCode || e.keyCode || 0;
                        if (key == 13) {
                                e.preventDefault();
                        }
                        else {

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
                                let nombre_marca = $("#marca_agregar_nombre").val();
                                // if(estado_conf_moda){
                                $.ajax({
                                        type: "POST",
                                        data: { nombre: nombre_marca },
                                        url: "/marca/agregar",
                                        success: function (resultado) {
                                                // console.log(JSON.stringify(resultado.data))
                                                if (resultado['codigo_respuesta'] == 1) {
                                                        marca_start = 1;
                                                        marca_working = false;
                                                        marca_llenarLista();
                                                        $("#marca_agregar_nombre").focus();
                                                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                                                        marca_vaciar_campos('agregar');

                                                }
                                                else {
                                                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                                }

                                        }
                                });
                                // }
                        }

                })
                //  fin funcion para agregar manualmente

                //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

                //inicio funcion eliminar

                window.eliminar_marca = function () {
                        this.eliminar = function (id_boton) {
                                $.ajax({
                                        type: "POST",
                                        data: { id: id_boton },
                                        url: "/marca/eliminar",
                                        success: function (resultado) {

                                                if (resultado['codigo_respuesta'] == 1) {
                                                        //alert(resultado['nombre']);     
                                                        marca_start = 1;
                                                        marca_working = false;
                                                        marca_llenarLista();
                                                        $('input#id_marca_nombre_editar').val('');
                                                        $('input#id_marca_id_editar').val('');
                                                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                                                }
                                                else {
                                                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                                        marca_llenarLista();
                                                }

                                        }
                                });

                        }
                }

                //fin funcion eliminar

                //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

                //inicio funcion editar
                $('form#id-marca-editar-form').submit(function (e) {

                        e.preventDefault();
                        let id_marca = $('input#id_marca_id_editar').val();
                        let nombre_marca = $('input#id_marca_nombre_editar').val();

                        $.ajax({

                                type: "POST",
                                data: { id: id_marca, nombre: nombre_marca },
                                url: "/marca/editar",
                                success: function (resultado) {
                                        console.log(JSON.stringify(resultado['codigo_respuesta']));
                                        if (resultado['codigo_respuesta'] == 1) {
                                                $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                                                marca_llenarLista();
                                                marca_vaciar_campos('editar');

                                        }
                                        else {
                                                $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                                marca_llenarLista();
                                        }

                                }
                        });

                })





                //fin funcion editar



                //inicio funcion scroll para lista
                // PRIMERA PAGINA
                window.marca_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
                        if ($('div#id-panel-marca').length) {

                                marca_start = 1;
                                $('#id_tabla_cuerpo_marca').children().remove();
                                marca_working = true;
                                $.ajax({
                                        type: "GET",
                                        url: "marca/get-all?page=" + marca_start,
                                        success: function (r) {
                                                $('#id_tabla_cuerpo_marca').children().remove();
                                                for (var i = 0; i < r.data.length; i++) {
                                                        let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                                        registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                                        registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                                        if (permisoEliminar) {
                                                        registro=registro+ "<td scope='col'><button type='button' id='marca_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                                        }
                                                        registro=registro+ "</tr>";
                                                        $('#id_tabla_cuerpo_marca').append(registro)//referirlo al tbody que use en la lista  
                                                }
                                                marca_start++;
                                                setTimeout(function () {
                                                        marca_working = false;
                                                }, 300)
                                        },
                                        error: function (r) {
                                                console.log("Aviso de error en tabla recien cargada!");
                                        }
                                })
                        }
                }
                marca_llenarLista();


                //INFINITY SCROLL
                $('#id-tabla-marca').scroll(function () {
                        //     console.log(($(this).scrollTop()));
                        //     console.log(marca_start);
                        //     console.log('tabla scroll '+$('#id-tabla-marca').scrollTop());
                        //     console.log('tabla scroll '+$('#id-tabla-marca').height());
                        //     console.log('diferencia entre el div y la tabla:  '+($('#id_marca_tabla_completa').height()-$('#id-tabla-marca').height()));
                        if (!$('input#id_marca_buscar').val()) {

                                if ($(this).scrollTop() + 20 >= $('#id_marca_tabla_completa').height() - $('#id-tabla-marca').height()) {
                                        if (marca_working == false) {
                                                marca_working = true;
                                                $.ajax({
                                                        type: "GET",
                                                        url: "marca/get-all?page=" + marca_start,
                                                        success: function (r) {
                                                                if (r.data.length > 0) {

                                                                        for (var i = 0; i < r.data.length; i++) {
                                                                                let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                                                                registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                                                                registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                                                                if (permisoEliminar) {
                                                                                registro=registro+ "<td scope='col'><button type='button' id='marca_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                                                                }
                                                                                registro=registro+ "</tr>";
                                                                                $('#id_tabla_cuerpo_marca').append(registro)//referirlo al tbody que use en la lista  
                                                                        }
                                                                        marca_start += 1;
                                                                        setTimeout(function () {
                                                                                marca_working = false;
                                                                        }, 300)
                                                                }
                                                        },
                                                        error: function (r) {
                                                                console.log("Aviso de error haciendo scrolling en la tabla de marca!");
                                                        }
                                                });
                                        }
                                }
                        }
                })


                //fin inicio funcion scroll para lista
                //inicio funcion buscar


                $(document).on('keyup', '#id_marca_buscar', (function (e) {
                        let palabraclave = $('input#id_marca_buscar').val();

                        $('#id_tabla_cuerpo_marca').children().remove();
                        if (palabraclave) {
                                $.ajax({
                                        type: "POST",
                                        url: "marca/buscar/" + palabraclave,
                                        success: function (resultado) {
                                                $('#id_tabla_cuerpo_marca').children().remove();
                                                if (resultado.codigo_respuesta == 1) {
                                                        for (var i = 0; i < resultado.data.length; i++) {
                                                                let registro="<tr class='tabla-link' id='" + resultado.data[i].id + "' value='" + resultado.data[i].name + "' data-url='#' >";
                                                                registro=registro+ "<td scope='col'>" + resultado.data[i].id + "</td>";
                                                                registro=registro+ "<td scope='col'>" + resultado.data[i].name + "</td>";
                                                                if (permisoEliminar) {
                                                                registro=registro+ "<td scope='col'><button type='button' id='marca_eliminar_btn_id' class='btn btn-danger eliminar' title='" + resultado.data[i].id + "'  data-value='" + resultado.data[i].id + "'> <i data-value='" + resultado.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                                                }
                                                                registro=registro+ "</tr>";
                                                                $('#id_tabla_cuerpo_marca').append(registro)//referirlo al tbody que use en la lista  
                                                        }

                                                }
                                                else {
                                                        $('#id_tabla_cuerpo_marca').children().remove();
                                                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                                }


                                                marca_working = false;


                                        }
                                })
                        }
                        else {
                                $('#id_tabla_cuerpo_marca').children().remove();

                                marca_llenarLista();
                        }

                }))
                //fin funcion buscar
        }
        window.marca_vaciar_campos = function (form_submit_tipo) {
                if (form_submit_tipo == 'editar') {

                        $('input#id_marca_id_editar').val('');
                        $('input#id_marca_nombre_editar').val('');
                        $('input#id_marca_nombre_editar').prop("disabled", true);
                }

                if (form_submit_tipo == 'agregar') {

                        $("#marca_agregar_nombre").val('');
                }

        }


});


