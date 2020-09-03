if ($('div#panel_catalogo_id').length) {
    window.cargarCatalogo = async function () {
        $.ajax({
            type: "post",
            url: "/catalogo/catalogo",
            success: function (response) {
                var registro=""
                let tabla = document.getElementById("catalogo_tabla_body_id");
                //tabla.innerHTML = null;
    
                response.data.forEach(element => {
                    //console.log(element);
                    registro += ` 
                    <tr>
                        <td>
                            ${element.categoria}
                        </td>
                        <td>
                            ${element.marca}
                        </td>
                        <td>
                            ${element.description}
                        </td>
                        <td>
                            ${element.part_number}
                        </td>
                        <td>
                            ${element.id_cm}
                        </td>
                    </tr>`
                });
                //console.log(registro)
                tabla.innerHTML = registro;
                
            }
        });
    }
    $(document).on('click', '#catalogo_btn_id', function () {
        // var table2excel = new Table2Excel();
    
        // let fechayhora = new Date;
        // let nombre_archivo_excel = 'Catalogo-' + (fechayhora.toLocaleString().split('/').join('-'));
    
        // table2excel.export(document.querySelectorAll("table"), nombre_archivo_excel);
        window.location.href = '/catalogo/descargar';
    
    })
    cargarCatalogo();
}