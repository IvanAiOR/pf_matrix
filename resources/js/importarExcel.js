
var objetoCargado;
$(document).on('input', '#id_archivo_importar', function (e) {
  console.log($(this).val())//muestra el nombre del archivo con ruta
  objetoCargado=$(this).val().split('\\')[($(this).val().split('\\').length) - 1]
  console.log($(this).prop('files'))//carga las propiedades del archivo en el input
  console.log($(this).val().split('\\')[($(this).val().split('\\').length) - 1])//muestra el nombre del archivo sin ruta
  // console.log($(this).val())
  
  $('#label_import').empty();
  $('#label_import').append($(this).val().split('\\')[($(this).val().split('\\').length) - 1]);
})

// const Excel= new require('exceljs');
$(document).on('submit','#importar_form',function(e){
e.preventDefault();

  let formData = new FormData(this);
  //var formData = new FormData(form);
  //let archivo = document.getElementById('id_archivo_importar');
  //let form = new FormData();
  //form.append('archivo', archivo.files[0]);
  console.log(formData);
  $.ajax({
    
    url: 'importar/extraer-info',
    data: formData,
    dataType: 'JSON',
    type: 'POST',
    contentType: false,
    cache:false,
    processData: false,
    success: function (respuesta) {
      if (respuesta.codigo_respuesta==1) {
        
        $.notify(respuesta.data + "!", { className: "success" });
      }
      else{
        $.notify(respuesta.data + "!", { className: "error" });

      }
    },
    error:function (error) {
      console.log(error.responseText);
      $.notify(error);

      }
  });
  

  
  //console.log(workbook);
  // console.log(XLSX.utils.sheet_to_json(workbook) )
});