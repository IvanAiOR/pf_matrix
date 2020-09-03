<?php

namespace App\Exports;

use App\Producto;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;

class CatalogoExport implements FromCollection,WithHeadings,WithEvents
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $consulta = DB::table('producto');
            $consulta->leftjoin('categoria','producto.categoria_id','=','categoria.id');
            $consulta->leftjoin('marca','producto.marca_id','=','marca.id');
            $consulta->leftjoin('estatus_cm','producto.estatus_cm_id','=','estatus_cm.id');
            $consulta->select('categoria.name as categoria','marca.name as marca','description','part_number','id_CM as id_cm');
            $consulta->where('estatus_cm.name','not like','%deshabilitado%');
            $consulta->orderby('categoria.name');
        return $consulta->get();
    }
    public function headings(): array
    {
        return [
            'Categoría',
            'Marca',
            'Descripción',
            'Part-Number',
            'ID Convenio',
        ];
    }

    public function registerEvents(): array
    {

        $arregloDeEstilos=[
            'font'=>[
                'bold'=>true,
                'color'=> ['argb'=>'FFFFFF']
            ]
        ];
        
        return [
            // BeforeExport::class  => function(BeforeExport $event) {
            //     $event->writer->setCreator('Sumatec_LTDA');
            // },
            AfterSheet::class=>function(AfterSheet $event) use ($arregloDeEstilos) {

                $event->sheet->getStyle('A1:E1')->applyFromArray($arregloDeEstilos);
                $event->sheet->getStyle('A1:E1')->getFill()
                ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                ->getStartColor()->setARGB('000088CC');
            },
            
        ];
    }
    

}
