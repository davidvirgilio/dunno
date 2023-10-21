import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'
import * as math from 'mathjs';
import { useCriteria } from '../stores/criteria';



export const useOptions = defineStore('options', () => {
  
//States  
  const criteriaStore = useCriteria()
  const criteriaLength = computed(()=> criteriaStore.criteriaLength);
  const id = ref(0);
  const newOption = ref('')
  const optionsList = ref([
    // {
    // id:1, text:'Strawberry',weight: 0},
    // {id:2, text:'Chocolate', weight: 0},
    // {id:3, text:'Vanilla', weight: 0},
  ]);

  //Computed
  const optionsLength = computed(()=>optionsList.value.length);

  const optionsMatrices = computed(()=>Array(criteriaLength.value).fill(null).map(()=>
  computed(()=>math.ones(math.matrix([optionsLength.value, optionsLength.value]))
  )));
  const optionsSliders = computed(()=>Array(criteriaLength.value).fill(null).map(()=>
  computed(()=>math.zeros(math.matrix([optionsLength.value, optionsLength.value]))
  )));
  const isInputEmpty = computed(() => newOption.value === '');


// Actions
  function addOption(){
    if (!isInputEmpty.value){
    this.optionsList.push({
        id: ++id.value,
        text: newOption.value
    })
    this.newOption = ''
    }
  }

  function removeOption(option){
    this.optionsList = this.optionsList.filter((t) => t !== option)
  }

  function updateOptionsMatrix(i,j, value, matrix){
    let n = i-1;
    let m = i+j-1;
    value = Number(value)


    const fixedValue = value < 0 ? value * 2 -1 : value * 2 + 1;
    const currentMatrix = this.optionsMatrices[matrix].value;
    const currentMatrixSliders = this.optionsSliders[matrix].value

    if(fixedValue > 0){
      
      currentMatrix.subset(math.index(m,n), Number(fixedValue));
      currentMatrix.subset(math.index(n,m), 1/Number(fixedValue));
      
      currentMatrixSliders.subset(math.index(m,n), Number(value));
      currentMatrixSliders.subset(math.index(n,m), Number(value));
    
    }else if (fixedValue != 0){
      
      currentMatrix.subset(math.index(n,m), math.abs(Number(fixedValue)));
      currentMatrix.subset(math.index(m,n), 1/math.abs(Number(fixedValue)));
      
      currentMatrixSliders.subset(math.index(m,n), Number(value));
      currentMatrixSliders.subset(math.index(n,m), Number(value));
    }


  }

  


//

  return {newOption,
         optionsList,
         optionsLength,
         isInputEmpty,
         addOption,
         removeOption,
         optionsMatrices,
         optionsSliders,
         updateOptionsMatrix,
        }
})