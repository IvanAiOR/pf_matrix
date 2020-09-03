let producto_deleted_start = 1;
let producto_deleted_working = false;
let producto_deleted_working_buscar = false;
let filtroActivo = false;

$(function () {
    if ($('div#id-panel-producto-deleted').length) {


        $(document).on('input', '#producto_editar_precio_sumatec, #producto_editar_costo, #producto_editar_oferta, #producto_editar_transporte ', (function (e) {
            console.log(e.keycode)
            console.log(producto_editar_costo.getRawValue());
            console.log(producto_editar_oferta.getRawValue());
            if (producto_editar_oferta.getRawValue() == '') {
                $("#producto_editar_margen_oferta").val('');
                $('')
            }

            resultado1 = producto_editar_precio_sumatec.getRawValue() - 1;
            //porcentaje Margen precio
            $("#producto_editar_margen_precio").val(((((producto_editar_costo.getRawValue() / (producto_editar_precio_sumatec.getRawValue() - producto_editar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            //tope oferta
            producto_editar_tope_oferta.setRawValue(producto_editar_precio_sumatec.getRawValue() * 0.95);
            //porcentaje margent tope oferta
            $("#producto_editar_margen_tope_oferta").val(((((producto_editar_costo.getRawValue() / (producto_editar_tope_oferta.getRawValue() - producto_editar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            //porcentaje margen oferta real
            if (producto_editar_oferta.getRawValue() >= 1) {

                $("#producto_editar_margen_oferta").val(((((producto_editar_costo.getRawValue() / (producto_editar_oferta.getRawValue() - producto_editar_transporte.getRawValue())) - 1) * -1) * 100).toFixed(3));
            }

            // if ($("#producto_editar_margen_precio").val() <= 5) {
            //     console.log($("#producto_editar_margen_precio").val(), $("#producto_editar_margen_oferta").val());

            //     $('#producto_editar_margen_precio').addClass("bg-danger")
            //     $('#producto_editar_margen_precio').addClass("text-white")

            // } else {
            //     $('#producto_editar_margen_precio').removeClass("bg-danger")
            //     $('#producto_editar_margen_precio').removeClass("text-white")
            // }
            if ($("#producto_editar_margen_oferta").val() && $("#producto_editar_margen_oferta").val() <= 5) {
                $('#producto_editar_margen_oferta').addClass("bg-danger")
                $('#producto_editar_margen_oferta').addClass("text-white")


            } else {
                $('#producto_editar_margen_oferta').removeClass("bg-danger")
                $('#producto_editar_margen_oferta').removeClass("text-white")

            }
        }));


        window.producto_deleted_llenarLista = function () { //la cree como funcion para poder usarla cada vez que pueda sin sobreescribir codigo
            if ($('div#id-panel-producto-deleted').length) {
                console.log("llega");
                //console.log('lista')
                
                producto_deleted_start = 1;
                $('#id_tabla_cuerpo_producto').children().remove();
                producto_deleted_working = true;
                $.ajax({
                    type: "GET",
                    url: "producto_deleted/get-all?page=" + producto_deleted_start,
                    success: function (resultado) {
                        //console.log(JSON.stringify(resultado.data));
                        
                        cargarTabla(resultado.data);
                        producto_deleted_start++;
                        setTimeout(function () {
                            producto_deleted_working = false;
                        }, 300)
                    },
                    error: function (resultado) {
                        console.log("Aviso de error en tabla recien cargada!");
                    }
                })
            }
        }
        producto_deleted_llenarLista();

        window.cargarTabla = function (data, esBuscar = null) {
            if (!esBuscar) {
    
                $('#id_tabla_cuerpo_producto').children().remove();
            }
            $("button").prop("disabled", true);
            $("button").prop("disabled", true);
            for (let i = 0; i < data.length; i++) {
                //console.log(data[i].origen)  ;
                if (data[i].fecha_inicio_oferta == null) {
                    data[i].fecha_inicio_oferta = " - - "
                }
                if (data[i].fecha_fin_oferta == null) {
                    data[i].fecha_fin_oferta = " - - "
                }
                let fecha_inicio = data[i].fecha_inicio_oferta.split("-");
                let fecha_fin = data[i].fecha_fin_oferta.split("-");
                //console.log(JSON.stringify(data[i].fecha_inicio_oferta) )
                let registro = "<tr class='table-tr' data-url='#'  id='" + data[i].id_CM + "' value='" + data[i].description + "' >";
    
                registro = registro + "<td scope='col'>" + data[i].id_cm + "</td>";
                registro = registro + "<td scope='col'>" + data[i].description + "</td>";
                registro = registro + "<td scope='col'>" + data[i].part_number + "</td>";
                registro = registro + "<td scope='col'>" + data[i].categoria + "</td>";
                registro = registro + "<td scope='col'>" + data[i].marca + "</td>";
                registro = registro + "<td scope='col'>" + data[i].prioridad + "</td>";
                registro = registro + "<td scope='col'>" + data[i].origen + "-" + data[i].nombre_origen + "</td>";
                registro = registro + "<td scope='col'>" + data[i].estatus_cm + "</td>";
                registro = registro + "<td scope='col'>" + data[i].comentario + "</td>";
                registro = registro + "<td scope='col'>" + data[i].responsable + "</td>";
                registro = registro + "<td scope='col'>" + data[i].trato_precio + "</td>";
                registro = registro + "<td scope='col'>" + data[i].precio_sumatec + "</td>";
                registro = registro + "<td scope='col'>" + data[i].costo + "</td>";
                registro = registro + "<td scope='col'>" + data[i].transporte + "</td>";
                registro = registro + "<td scope='col'>" + data[i].precio_competencia + "</td>";
                registro = registro + "<td scope='col'>" + data[i].margen_precio + "</td>";
                registro = registro + "<td scope='col'>" + data[i].margen_oferta + "</td>";
                registro = registro + "<td scope='col'>" + data[i].tope_oferta + "</td>";
                registro = registro + "<td scope='col'>" + data[i].margen_tope_oferta + "</td>";
                registro = registro + "<td scope='col'>" + data[i].oferta + "</td>";
                registro = registro + "<td scope='col'>" + data[i].nota_adicional + "</td>";
                registro = registro + "<td scope='col'>" + fecha_inicio[2] + "-" + fecha_inicio[1] + "-" + fecha_inicio[0] + "</td>";
                registro = registro + "<td scope='col'>" + fecha_fin[2] + "-" + fecha_fin[1] + "-" + fecha_fin[0] + "</td>";
                registro = registro + "<td scope='col'><button type='button'onclick='restaurarProducto("+data[i].id+")' id='producto_eliminar_btn_id' class='btn btn-info text-white' title='Recuperar'  data-value='" + data[i].id + "'> <i data-value='" + data[i].id + "' class='material-icons' >restore_page</i></button></td>";
                //"<td scope='col'>"+data[i].fecha_inicio_oferta+"</td>"+
                // if (permisoEliminar) {
    
                    // registro = registro + "<td scope='col'><button type='button' id='producto_eliminar_btn_id' class='btn btn-danger eliminar' title='Eliminar'  data-value='" + data[i].id + "'> <i data-value='" + data[i].id + "' class='material-icons' >delete</i></button></td>";
                // }
    
                registro = registro + "</tr>";//referirlo al tbody que use en la lista
                $('#id_tabla_cuerpo_producto').append(registro)
            }
            $("button").prop("disabled", false);
            $("button").prop("disabled", false);
            // var tabla = $('#id_producto_tabla_completa');
            $('span#id_cantidad_registros').text('Se encontró ' + ($('#id_producto_tabla_completa').find('tr').length - 1) + " filas en tu búsqueda.");
        }
        
        
        //INFINITY SCROLL
        var altura=0;
        $('#id-tabla-producto-deleted').scroll(function () {
            $('#id_producto_deleetd_tabla_completa').ready(function () { //no se por que, pero al momento de esperar que el scroll este listo(ready), muestra recien el valor de "hight()""
            })
            // console.log(($(this).scrollTop()));
            //     console.log(producto_start);
            //     console.log('scroll actual '+$('#id-tabla-producto').scrollTop());
            //     console.log('tabla scroll height '+$('#id-tabla-producto').height());
            //     console.log('tabla scroll outerHeight '+$('#id_producto_tabla_completa').outerHeight());
            //     //altura=document.getElementById('#id_producto_tabla_completa').style.height
            console.log('tabla scroll style ' + altura);
            //     console.log('tabla scroll  '+ (altura - $('#id-tabla-producto').height()));


            //     console.log('diferencia entre el div y la tabla:  '+($('#id_producto_tabla_completa').height()-$('#id-tabla-producto').height()));
            if (!$('input#id_producto_deleted_buscar').val()) {
                console.log("top scroll: " + ($(this).scrollTop()))
                console.log("Tamaño tabla: " + JSON.stringify($('#id_producto_deleted_tabla_completa').height()))
                altura = JSON.stringify($('#id_producto_deleted_tabla_completa').height());

                try {
                    if ((!filtroActivo) && ($('input#id_producto_deleted_buscar').val() == '') && ($(this).scrollTop() >= altura - $('#id-tabla-producto-deleted').height())) {
                        id_producto = '';
                        if (producto_working == false) {
                            producto_working = true;
                            console.log("funciona el scroll")
                            $.ajax({
                                type: "GET",
                                url: "producto_deleted/get-all?page=" + producto_start,
                                success: function (resultado) {
                                    if (resultado.data.length > 0) {

                                        cargarTabla(resultado.data, true);

                                        producto_start += 1;
                                        setTimeout(function () {
                                            producto_working = false;
                                        }, 300)
                                    }
                                },
                                error: function (resultado) {
                                    console.log("Aviso de error haciendo scrolling en la tabla de producto!");
                                }
                            });
                        }
                    }
                } catch (error) {

                }
            }
        })


        //fin inicio funcion scroll para lista

        //inicio funcion buscar


        window.restaurarProducto=function(idProducto){
            $.ajax({
                type: "POST",
                url: "producto_deleted/restaurar",
                data: {id:idProducto},
                success: function (resultado) {
                    if (resultado.codigo_respuesta==1) {
                        $.notify(resultado.nombre + "!", { className: "success" });
                        
                        window.producto_deleted_llenarLista();
                    }
                    else{
                        $.notify(resultado.nombre + "!", { className: "error" });

                    }
                }
            });
        }

        $(document).on('input', '#id_producto_deleted_buscar', (function (e) {
            let palabraclave = $('input#id_producto_deleted_buscar').val();
            console.log(palabraclave);
            console.log(producto_deleted_working_buscar);
            console.log(filtroActivo);

            if (palabraclave && !producto_deleted_working_buscar && !filtroActivo) {

                $('#id_tabla_cuerpo_producto_deleted').children().remove();
                console.log(producto_deleted_working_buscar);
                $.ajax({
                    type: "POST",
                    url: "producto_deleted/buscar/" + palabraclave,
                    success: function (resultado) {
                        producto_deleted_working_buscar = true
                        if (resultado.codigo_respuesta == 1) {
                            cargarTabla(resultado.data);
                        }
                        else {
                            $.notify(resultado.data + "!", { className: "error" });
                        }
                        producto_working = false;
                        producto_deleted_working_buscar = false;
                    },
                    complete: function (resultado) {
                        producto_working = false;
                        producto_deleted_working_buscar = false;
                    }
                })
            }
            else {
                $('#id_tabla_cuerpo_producto_deleted').children().remove();
                producto_deleted_llenarLista();
            }

        }))
        //fin funcion buscar
    }
})