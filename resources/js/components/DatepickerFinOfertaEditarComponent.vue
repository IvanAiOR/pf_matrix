<template>
    <div>
        <datepicker 
            id="producto_editar_fecha_fin" 
            v-model="state.date"  
            :language="languages.es" 
            :monday-first="true" 
            format="dd-MM-yyyy"  
            :bootstrap-styling="true" 
            name="producto_agregar_fecha_fin"
            input-class="form-control"
            
            >
            
        </datepicker>
        
    </div>
</template>

<script>

import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";

let fecha=new Date();
let fecha_sig= new Date();
fecha_sig.setDate(fecha.getDate()+4);
const state = {
  date: fecha_sig
};

export default {
  name: "app",
  components: {
    Datepicker
  },
  data() {
    return {
      
      disabledDates: {},
      disabledFn: {
        customPredictor(date) {
          if (date.getDate() % 3 === 0) {
            return true;
          }
        }
      },
      highlightedFn: {
        customPredictor(date) {
          if (date.getDate() % 4 === 0) {
            return true;
          }
        }
      },
      highlighted: {},
      eventMsg: null,
      state: state,
      languages: lang,
      vModelExample: null,
      changedMonthLog: [],

    };
  },
};
</script>
   
