
//funcion para cargar todo
let categoria_start = 1;
let categoria_working = false;
let categoria_working_buscar = false;
$(function () {
        if ($('div#id-panel-categoria').length) {

                console.log("categoria ready !");

                //inicio funcion clickable row y cargar en panel de editar


                $('table#id_categoria_tabla_completa').on("click", "tr.tabla-link", function () {
                        // console.log($(this).attr('id'));
                        // console.log($(this).attr('value'));
                        $('input#id_categoria_id_editar').val($(this).attr('id'));
                        $('input#id_categoria_nombre_editar').val($(this).attr('value'));
                        $('input#id_categoria_nombre_editar').prop("disabled", false);
                });

                //fin funcion clickable row y cargar en panel de editar



                $('form#id_categoria_agregar_form').submit(function (e) {
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
                        let nombre_categoria = $("#categoria_agregar_nombre").val();
                        // if(estado_conf_moda){

                        $.ajax({
                                type: "POST",
                                data: { nombre: nombre_categoria },
                                url: "/categoria/agregar",
                                success: function (resultado) {
                                        // console.log(JSON.stringify(resultado.data))
                                        if (resultado['codigo_respuesta'] == 1) {
                                                categoria_start = 1;
                                                categoria_working = false;
                                                categoria_llenarLista();
                                                $("#categoria_agregar_nombre").focus();
                                                categoria_vaciar_campos('agregar');
                                                $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });

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
                window.eliminar_categoria = function(){
                        this.eliminar = function (id_boton) {
                                
                                $.ajax({
                                        type: "POST",
                                        data: { id: id_boton },
                                        url: "/categoria/eliminar",
                                        success: function (resultado) {
        
                                                if (resultado['codigo_respuesta'] == 1) {
                                                        //alert(resultado['nombre']);     
                                                        categoria_start = 1;
                                                        categoria_working = false;
                                                        categoria_llenarLista();
                                                        $('input#id_categoria_nombre_editar').val('');
                                                        $('input#id_categoria_id_editar').val('');
                                                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                                                }
                                                else {
                                                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                                        categoria_llenarLista();
                                                }
        
                                        }
                                });
        
                        }
                }

                //fin funcion eliminar

                //en laravel se debe usar la forma window.nombre_funcion = function(event){} 

                //inicio funcion editar
                $('form#id-categoria-editar-form').submit(function (e) {
                        e.preventDefault();
                        let id_categoria = $('input#id_categoria_id_editar').val();
                        let nombre_categoria = $('input#id_categoria_nombre_editar').val();

                        $.ajax({

                                type: "POST",
                                data: { id: id_categoria, nombre: nombre_categoria },
                                url: "/categoria/editar",
                                success: function (resultado) {
                                        console.log(JSON.stringify(resultado['codigo_respuesta']));
                                        if (resultado['codigo_respuesta'] == 1) {
                                                $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                                                categoria_llenarLista();
                                                categoria_vaciar_campos('editar');

                                        }
                                        else {
                                                $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                                categoria_llenarLista();
                                        }

                                }
                        });

                })





                //fin funcion editar



                //inicio funcion scroll para lista
                // PRIMERA PAGINA
                window.categoria_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
                        if ($('div#id-panel-categoria').length) {

                                categoria_start = 1;
                                $('#id_tabla_cuerpo_categoria').children().remove();
                                categoria_working = true;
                                $.ajax({
                                        type: "GET",
                                        url: "categoria/get-all?page=" + categoria_start,
                                        success: function (r) {
                                                $('#id_tabla_cuerpo_categoria').children().remove();
                                                for (var i = 0; i < r.data.length; i++) {
                                                        let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                                        registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                                        registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                                        if (permisoEliminar) {
                                                        registro=registro+ "<td scope='col'><button type='button' id='categoria_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                                        }
                                                        registro=registro+ "</tr>";
                                                        $('#id_tabla_cuerpo_categoria').append(registro)//referirlo al tbody que use en la lista  
                                                }
                                                categoria_start++;
                                                setTimeout(function () {
                                                        categoria_working = false;
                                                }, 300)
                                        },
                                        error: function (r) {
                                                console.log("Aviso de error en tabla recien cargada!");
                                        }
                                })
                        }

                }
                categoria_llenarLista();


                //INFINITY SCROLL
                $('#id-tabla-categoria').scroll(function () {
                        //     console.log(($(this).scrollTop()));
                        //     console.log(categoria_start);
                        //     console.log('tabla scroll '+$('#id-tabla-categoria').scrollTop());
                        //     console.log('tabla scroll '+$('#id-tabla-categoria').height());
                        //     console.log('diferencia entre el div y la tabla:  '+($('#id_categoria_tabla_completa').height()-$('#id-tabla-categoria').height()));
                        if (!$('input#id_categoria_buscar').val()) {

                                if ($(this).scrollTop() + 20 >= $('#id_categoria_tabla_completa').height() - $('#id-tabla-categoria').height()) {
                                        if (categoria_working == false) {
                                                categoria_working = true;
                                                $.ajax({
                                                        type: "GET",
                                                        url: "categoria/get-all?page=" + categoria_start,
                                                        success: function (r) {
                                                                if (r.data.length > 0) {

                                                                        for (var i = 0; i < r.data.length; i++) {
                                                                                let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                                                                registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                                                                registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                                                                if (permisoEliminar) {
                                                                                registro=registro+ "<td scope='col'><button type='button' id='categoria_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                                                                }
                                                                                registro=registro+ "</tr>";
                                                                                $('#id_tabla_cuerpo_categoria').append(registro)//referirlo al tbody que use en la lista  
                                                                        }
                                                                        categoria_start += 1;
                                                                        setTimeout(function () {
                                                                                categoria_working = false;
                                                                        }, 300)
                                                                }
                                                        },
                                                        error: function (r) {
                                                                console.log("Aviso de error haciendo scrolling en la tabla de categoria!");
                                                        }
                                                });
                                        }
                                }
                        }
                })


                //fin inicio funcion scroll para lista
                //inicio funcion buscar


                $(document).on('keyup', '#id_categoria_buscar', (function (e) {
                        let palabraclave = $('input#id_categoria_buscar').val();
                        if (palabraclave) {

                                $('#id_tabla_cuerpo_categoria').children().remove();
                                console.log(palabraclave);
                                $.ajax({
                                        type: "POST",
                                        url: "categoria/buscar/" + palabraclave,
                                        success: function (resultado) {
                                                if (resultado.codigo_respuesta == 1) {
                                                        $('#id_tabla_cuerpo_categoria').children().remove();
                                                        for (var i = 0; i < resultado.data.length; i++) {
                                                                let registro="<tr class='tabla-link' id='" + resultado.data[i].id + "' value='" + resultado.data[i].name + "' data-url='#' >";
                                                                registro=registro+ "<td scope='col'>" + resultado.data[i].id + "</td>";
                                                                registro=registro+ "<td scope='col'>" + resultado.data[i].name + "</td>";
                                                                if (permisoEliminar) {
                                                                registro=registro+ "<td scope='col'><button type='button' id='categoria_eliminar_btn_id' class='btn btn-danger eliminar' title='" + resultado.data[i].id + "'  data-value='" + resultado.data[i].id + "'> <i data-value='" + resultado.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                                                }
                                                                registro=registro+ "</tr>";
                                                                $('#id_tabla_cuerpo_categoria').append(registro)//referirlo al tbody que use en la lista  
                                                        }

                                                }
                                                else {
                                                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                                }

                                                categoria_start++;
                                                setTimeout(function () {
                                                        categoria_working = false;
                                                        categoria_working_buscar = false;
                                                }, 400)

                                        }
                                })
                        }
                        else {
                                $('#id_tabla_cuerpo_categoria').children().remove();
                                categoria_llenarLista();
                        }
                }))

                //fin funcion buscar
                window.categoria_vaciar_campos = function (form_submit_tipo) {

                        if (form_submit_tipo == 'editar') {

                                $('input#id_categoria_id_editar').val('');
                                $('input#id_categoria_nombre_editar').val('');
                                $('input#id_categoria_nombre_editar').prop("disabled", true);
                        }

                        if (form_submit_tipo == 'agregar') {

                                $("#categoria_" + form_submit_tipo + "_nombre").val('');
                        }

                }
        }
});

