$.ajaxSetup({

	headers: {

		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

	}

});
//loader page
window.permisoEliminar = false;
window.permisoGU = false;//gestion usuario
$.ajax({
	type: "get",
	url: "usuario/consulta-rol-permiso",
	success: function (response) {
		if (response.codigo_respuesta == 1) {
			permisoEliminar = response.data.permisoEliminar
			permisoGU = response.data.permisoGU
		}
	}
});
$(function () {
	setInterval(() => { //verifica si hay ajax corriendo
		let ajaxactivos = $.active;
		//console.log($.active)
		if (ajaxactivos == 0) {
			$(".loader-wrapper").fadeOut("slow"); //si no hay ajax corriendo, desaparece el loader
		}
	}, 100);

});
//devuelve el año para el copyright

$(function () {
	let fecha = new Date();
	console.log(fecha.getFullYear())
	$("#copyright_anio").append(fecha.getFullYear());
});
//inicio Enter no hace nada
$(document).keypress(
	function (event) {
		if (event.which == '13') {
			event.preventDefault();
			console.log("Enter no hace nada beibe")
		}
	});
//fin Enter no hace nada

// $(document).ajaxStop(function () {
// 	$(".loader-wrapper").fadeOut("slow");//espera a que los ajax terminen y desaparece el loader
// });
//loader page


$("tr").click(function () {
	$(this).addClass("seleccionado").siblings().removeClass("seleccionado");
});

//modal para confirmar cambios
let funcionEliminar = null;
let eliminarVariableValor = null;

$(document).ready(function () {
	var modalConfirm = function (callback) {



		$("#modal-btn-si").on("click", function () {
			callback(true);
			$("#mi-modal").modal('hide');
		});

		$("#modal-btn-no").on("click", function () {
			callback(false);
			$("#mi-modal").modal('hide');
		});
	};

	$(document).on("click", ".eliminar", function () {
		console.log($(this).attr('id'));
		boton_delimitado = $(this).attr('id').split("_") //separa los id de el id de los botones, dejando en la primera posicion de una lista el parametro(categoria,comentario,marc...) Ej marca_eliminar [0]=marca [1]=eliminar
		eliminarVariableValor = $(this).data("value");
		console.log("valor eliminar: " + eliminarVariableValor)
		mostrarmodal = true;
		switch (boton_delimitado[0]) {
			case 'categoria':
				funcionEliminar = new eliminar_categoria();
				break;
			case 'comentario':
				funcionEliminar = new eliminar_comentario();

				break;
			case 'estatus':
				funcionEliminar = new eliminar_estatus_cm();

				break;
			case 'marca':
				funcionEliminar = new eliminar_marca();

				break;
			case 'nombre':
				funcionEliminar = new eliminar_nombre_origen();

				break;
			case 'origen':
				funcionEliminar = new eliminar_origen();

				break;
			case 'prioridad':
				funcionEliminar = new eliminar_prioridad();

				break;
			case 'trato':
				funcionEliminar = new eliminar_trato_precio();

				break;
			case 'producto':
				funcionEliminar = new eliminar_producto();

				break;
			case 'usuario':
				funcionEliminar = new eliminar_usuario();

				break;
			case 'rol':
				funcionEliminar = new eliminar_rol();

			case 'eliminarMasivoProducto':
				funcionEliminar = new eliminar_lista_de_estatus_cm();

				break;

			default:
				funcionEliminar = null;
				eliminarVariableValor = null;
				mostrarmodal = false;
				break;
		}
		if (mostrarmodal) {

			$("#mi-modal").modal('show');
		}
	});

	modalConfirm(function (confirm) {
		if (confirm) {
			if (funcionEliminar != null) {

				funcionEliminar.eliminar(eliminarVariableValor)
			}

			//Acciones si el usuario confirma
		} else {
			//Acciones si el usuario no confirma
			//lo dejo por si lo llegase a usar
		}
		funcionEliminar = null;
		eliminarVariableValor = null;
	});



	$(document).on('click', 'th', function () {
		var table = $(this).parents('table').eq(0);
		var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
		this.asc = !this.asc;
		if (!this.asc) {
			rows = rows.reverse();
		}
		table.children('tbody').empty().html(rows);
	});

	function comparer(index) {
		return function (a, b) {
			var valA = getCellValue(a, index),
				valB = getCellValue(b, index);
			return $.isNumeric(valA) && $.isNumeric(valB) ?
				valA - valB : valA.localeCompare(valB);
		};
	}

	function getCellValue(row, index) {
		return $(row).children('td').eq(index).text();
	}

	async function dolarObservado() {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1; //January is 0!

		let yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		today = dd + '-' + mm + '-' + yyyy;
		console.log(today);
		//span_dolar_observado = document.getElementById('Dolar_Observado');
		let dolar_observado = await (await fetch(`https://mindicador.cl/api/dolar/${today}`)).json();
		console.log(dolar_observado.serie[0].valor);
		let span_dolar_observado = document.getElementById('Dolar_Observado');
		span_dolar_observado.innerHTML=`Dolar Observado: ${dolar_observado.serie[0].valor} - Fecha: ${today} ` ;
			
	}
	dolarObservado(); 
})