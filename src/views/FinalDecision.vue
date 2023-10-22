<script setup>
// import { RouterLink } from 'vue-router';
import { useCriteria } from '../stores/criteria'
import { useOptions } from '../stores/options'
import { storeToRefs } from 'pinia';
import * as math from 'mathjs';
import { computed } from 'vue';

const title = 'Your best option is...'


// const criteriaStore = useCriteria()
const optionsStore = useOptions()
const criteriaStore = useCriteria()

const optionsMatrices = optionsStore.optionsMatrices;
const {optionsList} = storeToRefs(optionsStore);
const {criteriaList} = storeToRefs(criteriaStore);
const criteriaWeights= [];

if(criteriaList.value.length < 2 || optionsList.value.length > 2) { window.location.replace("/options")}

criteriaList.value.map((criterion) => criteriaWeights.push(criterion.weight))


function normalize(matrix){
    const normalizedMatrix = []
    for(let i = 0 ; i < matrix._data.length ; i++){
        const getColumn = math.column(matrix,i) 
        const sum = math.sum(getColumn);
        const normalizeColumn = getColumn.map(item => item / sum);
        normalizedMatrix.push(math.squeeze(normalizeColumn))
    }
    
    const normal = math.transpose(math.matrix(normalizedMatrix))
    return normal
}

function addWeightToOptions(vector){
        vector.map((value, index) =>
        optionsList.value[index].weight = value
        )
        console.log(optionsList.value)
}


const optionsNormalized = [];
optionsMatrices.map((item) => {optionsNormalized.push(normalize(item.value))})


const averageVectors = optionsNormalized.map((item) => math.matrix(math.mean(item,1)));

// const optionsVector = math.matrix(math.mean(math.transpose(averageVectors),1))
// 
const finalRanking = math.multiply(math.transpose(averageVectors), criteriaWeights);

addWeightToOptions(finalRanking)

const sortedOptions = computed(() =>
  optionsList.value.slice().sort((a, b) => b.weight - a.weight)
);


</script>

<template>
    <section class=" d-flex flex-column p-5 gap-5">
        <h1 v-text="title"></h1>
        <img alt="Illustration of a trophy" src="../assets/trophy.svg" style="max-height: 350px;">
        <ol class="p-0 d-flex flex-column gap-4">
            <li v-for="option,index in sortedOptions" :key="index" class="d-flex align-items-center justify-content-center position-relative">
                <div v-if="index == 0" class="position-relative w-100">
                    <div  class="final winner">
                        <span class="number medal"> {{ index + 1 }}</span> {{ option.text }}
                    </div>
                    <p class="d-block mt-4">Other options are:</p>
                </div>
                <div v-else class="final">
                    <span class="number medal"> {{ index + 1 }}</span> {{ option.text }}
                </div>
            </li>
        </ol>        
        <a title="Restart" class="btn-light btn-final stretch-link" href="/">Make a new decision</a>
    </section>
</template>