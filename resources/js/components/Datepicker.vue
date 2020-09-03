<template>
    <div>
        <datepicker 
            :id="id"
            :value="state.date"
            :language="languages.es" 
            :monday-first="true" 
            format="dd-MM-yyyy"  
            :bootstrap-styling="true" 
            input-class="form-control"
            >
            
        </datepicker>
        
    </div>
</template>

<script>

import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";

let fecha=new Date();

var state = {
  date: fecha
};

export default {
  name: "app",
  components: {
    Datepicker
  },
  props:['id'],
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
   
