
//funcion para cargar todo
let estatus_cm_start = 1;
let estatus_cm_working = false;
let estatus_cm_working_buscar = false;
$(function () {

        if ($('div#id-panel-estatus_cm').length) {


                console.log('estatus CMready!')


                //inicio funcion clickable row y cargar en panel de editar


                $('table#id_estatus_cm_tabla_completa').on("click", "tr.tabla-link", function () {
                        console.log($(this).attr('id'));
                        console.log($(this).attr('value'));
                        $('input#id_estatus_cm_id_editar').val($(this).attr('id'));
                        $('input#id_estatus_cm_nombre_editar').val($(this).attr('value'));
                        $('input#id_estatus_cm_nombre_editar').prop("disabled", false);
                });

                //fin funcion clickable row y cargar en panel de editar



                $('form#id_estatus_cm_agregar_form').submit(function (e) {
                        e.preventDefault();


                        let nombre_estatus_cm = $("#estatus_cm_agregar_nombre").val();
                        // if(estado_conf_moda){

                        $.ajax({
                                type: "POST",
                                data: { nombre: nombre_estatus_cm },
                                url: "/estatus_cm/agregar",
                                success: function (resultado) {
                                        // console.log(JSON.stringify(resultado.data))
                                        if (resultado['codigo_respuesta'] == 1) {
                                                estatus_cm_start = 1;
                                                estatus_cm_working = false;
                                                estatus_cm_llenarLista();
                                                $("#estatus_cm_agregar_nombre").focus();
                                                $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                                                estatus_cm_vaciar_campos('agregar')

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

                window.eliminar_estatus_cm = function () {
                        this.eliminar = function (id_boton) {
                                $.ajax({
                                        type: "POST",
                                        data: { id: id_boton },
                                        url: "/estatus_cm/eliminar",
                                        success: function (resultado) {

                                                if (resultado['codigo_respuesta'] == 1) {
                                                        //alert(resultado['nombre']);     
                                                        estatus_cm_start = 1;
                                                        estatus_cm_working = false;
                                                        estatus_cm_llenarLista();
                                                        $('input#id_estatus_cm_nombre_editar').val('');
                                                        $('input#id_estatus_cm_id_editar').val('');
                                                        $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                                                }
                                                else {
                                                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                                        estatus_cm_llenarLista();
                                                }

                                        }
                                });

                        }
                }

//fin funcion eliminar

//en laravel se debe usar la forma window.nombre_funcion = function(event){} 

//inicio funcion editar
$('form#id-estatus_cm-editar-form').submit(function (e) {
        e.preventDefault();
        let id_estatus_cm = $('input#id_estatus_cm_id_editar').val();
        let nombre_estatus_cm = $('input#id_estatus_cm_nombre_editar').val();

        $.ajax({

                type: "POST",
                data: { id: id_estatus_cm, nombre: nombre_estatus_cm },
                url: "/estatus_cm/editar",
                success: function (resultado) {
                        console.log(JSON.stringify(resultado['codigo_respuesta']));
                        if (resultado['codigo_respuesta'] == 1) {
                                $.notify(resultado['nombre'] + "!", { className: "success", elementPosition: "top center" });
                                estatus_cm_llenarLista();
                                estatus_cm_vaciar_campos('editar')

                        }
                        else {
                                $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                estatus_cm_llenarLista();
                        }

                }
        });

})





//fin funcion editar



//inicio funcion scroll para lista
// PRIMERA PAGINA
window.estatus_cm_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
        if ($('div#id-panel-estatus_cm').length) {

                estatus_cm_start = 1;
                $('#id_tabla_cuerpo_estatus_cm').children().remove();
                estatus_cm_working = true;
                $.ajax({
                        type: "GET",
                        url: "estatus_cm/get-all?page=" + estatus_cm_start,
                        success: function (r) {
                                $('#id_tabla_cuerpo_estatus_cm').children().remove();
                                for (var i = 0; i < r.data.length; i++) {
                                        let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                        registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                        registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                        if (permisoEliminar) {
                                        registro=registro+ "<td scope='col'><button type='button' id='estatus_cm_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                        }
                                        registro=registro+ "</tr>";
                                        $('#id_tabla_cuerpo_estatus_cm').append(registro)//referirlo al tbody que use en la lista  
                                }
                                estatus_cm_start++;
                                setTimeout(function () {
                                        estatus_cm_working = false;
                                }, 300)
                        },
                        error: function (r) {
                                console.log("Aviso de error en tabla recien cargada!");
                        }
                })
        }
}
estatus_cm_llenarLista();


//INFINITY SCROLL
$('#id-tabla-estatus_cm').scroll(function () {
        //     console.log(($(this).scrollTop()));
        //     console.log(estatus_cm_start);
        //     console.log('tabla scroll '+$('#id-tabla-estatus_cm').scrollTop());
        //     console.log('tabla scroll '+$('#id-tabla-estatus_cm').height());
        //     console.log('diferencia entre el div y la tabla:  '+($('#id_estatus_cm_tabla_completa').height()-$('#id-tabla-estatus_cm').height()));
        if (!$('input#id_estatus_cm_buscar').val()) {

                if ($(this).scrollTop() + 20 >= $('#id_estatus_cm_tabla_completa').height() - $('#id-tabla-estatus_cm').height()) {
                        if (estatus_cm_working == false) {
                                estatus_cm_working = true;
                                $.ajax({
                                        type: "GET",
                                        url: "estatus_cm/get-all?page=" + estatus_cm_start,
                                        success: function (r) {
                                                if (r.data.length > 0) {

                                                        for (var i = 0; i < r.data.length; i++) {
                                                                let registro="<tr class='tabla-link' id='" + r.data[i].id + "' value='" + r.data[i].name + "' data-url='#' >";
                                                                registro=registro+ "<td scope='col'>" + r.data[i].id + "</td>";
                                                                registro=registro+ "<td scope='col'>" + r.data[i].name + "</td>";
                                                                if (permisoEliminar) {
                                                                registro=registro+ "<td scope='col'><button type='button' id='estatus_cm_eliminar_btn_id' class='btn btn-danger eliminar' title='" + r.data[i].id + "'  data-value='" + r.data[i].id + "'> <i data-value='" + r.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                                                }
                                                                registro=registro+ "</tr>";
                                                                $('#id_tabla_cuerpo_estatus_cm').append(registro)//referirlo al tbody que use en la lista  
                                                        }
                                                        estatus_cm_start += 1;
                                                        setTimeout(function () {
                                                                estatus_cm_working = false;
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


$(document).on('keyup', '#id_estatus_cm_buscar', (function (e) {
        let palabraclave = $('input#id_estatus_cm_buscar').val();

        $('#id_tabla_cuerpo_estatus_cm').children().remove();
        if (palabraclave) {
                $.ajax({
                        type: "POST",
                        url: "estatus_cm/buscar/" + palabraclave,
                        success: function (resultado) {
                                $('#id_tabla_cuerpo_estatus_cm').children().remove();
                                if (resultado.codigo_respuesta == 1) {
                                        for (var i = 0; i < resultado.data.length; i++) {
                                                let registro="<tr class='tabla-link' id='" + resultado.data[i].id + "' value='" + resultado.data[i].name + "' data-url='#' >";
                                                registro=registro+ "<td scope='col'>" + resultado.data[i].id + "</td>";
                                                registro=registro+ "<td scope='col'>" + resultado.data[i].name + "</td>";
                                                if (permisoEliminar) {
                                                registro=registro+ "<td scope='col'><button type='button' id='estatus_cm_eliminar_btn_id' class='btn btn-danger eliminar' title='" + resultado.data[i].id + "'  data-value='" + resultado.data[i].id + "'> <i data-value='" + resultado.data[i].id + "' class='material-icons' >delete</i></button></td>";
                                                }
                                                registro=registro+ "</tr>";
                                                $('#id_tabla_cuerpo_estatus_cm').append(registro)//referirlo al tbody que use en la lista  
                                        }

                                }
                                else {
                                        $('#id_tabla_cuerpo_estatus_cm').children().remove();
                                        $.notify(resultado['nombre'] + "!", { className: "error", elementPosition: "top center" });
                                }


                                estatus_cm_working = false;


                        }
                })
        }
        else {
                $('#id_tabla_cuerpo_estatus_cm').children().remove();

                estatus_cm_llenarLista();
        }

}))
//fin funcion buscar
window.estatus_cm_vaciar_campos = function (form_submit_tipo) {
        if (form_submit_tipo == 'editar') {
                $('input#id_estatus_cm_id_editar').val('');
                $('input#id_estatus_cm_nombre_editar').val('');
                $('input#id_estatus_cm_nombre_editar').prop("disabled", true);
        }

        if (form_submit_tipo == 'agregar') {

                $("#estatus_cm_agregar_nombre").val('');
        }

}
        }       
});