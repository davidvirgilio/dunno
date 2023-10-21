import { defineStore } from 'pinia'
import * as math from 'mathjs';
import { ref } from 'vue'
import { computed } from 'vue'


export const useCriteria = defineStore('criteriaStore', () => {

//States  
const id = ref(0);
const newCriterion = ref('')
const criteriaList = ref([
  // {id:1, text:'Taste', weight: 0},
  // {id:2, text:'Color', weight: 0},
  // {id:3, text:'Texture', weight: 0},
]);

//Computed
const criteriaLength = computed(()=> criteriaList.value.length);
const matrix = computed(()=> math.ones(math.matrix([criteriaLength.value, criteriaLength.value])));
const criterionSlider = computed(()=> math.zeros(math.matrix([criteriaLength.value, criteriaLength.value])));
const isInputEmpty = computed(() => newCriterion.value === '');


// Actions
  function addCriterion(){
    if (!isInputEmpty.value){

    this.criteriaList.push({
        id: ++id.value,
        text: newCriterion.value,
    })
    this.newCriterion = ''
  }
  }


  function removeCriterion(criterion){
    this.criteriaList = this.criteriaList.filter((t) => t !== criterion)
  }

  function updateMatrix(i,j, value){
    let n = i-1;
    let m = i+j-1;
    value = Number(value)
    const fixedValue = value < 0 ? value * 2 -1 : value *2 +1;

    if(fixedValue > 0){
        this.matrix.subset(math.index(m,n), Number(fixedValue));
        this.matrix.subset(math.index(n,m), 1/Number(fixedValue));

        this.criterionSlider.subset(math.index(m,n), Number(fixedValue));
        this.criterionSlider.subset(math.index(n,m), Number(fixedValue));

      }else if (fixedValue != 0){
        this.matrix.subset(math.index(n,m), math.abs(Number(fixedValue)));
        this.matrix.subset(math.index(m,n), 1/math.abs(Number(fixedValue)));

        this.criterionSlider.subset(math.index(n,m), Number(fixedValue));
        this.criterionSlider.subset(math.index(m,n), Number(fixedValue));
    }


}


  return {
    newCriterion,
    criteriaList,
    criteriaLength,
    matrix,
    addCriterion,
    removeCriterion,
    updateMatrix,
    criterionSlider,
    }
})