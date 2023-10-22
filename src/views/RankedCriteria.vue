<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useCriteria } from '../stores/criteria'
import { storeToRefs } from 'pinia';
import * as math from 'mathjs';


const title = 'Rank your criteria'
const message = 'Based on your selections, the level of importance of your criteria is:'

const store = useCriteria()
const {matrix, criteriaList} = storeToRefs(store)



if(criteriaList.value.length < 2) { window.location.replace("/options")}

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
    
    
    
    function addWeightToCriteria(avVector){
        avVector.map((value, index) =>
        criteriaList.value[index].weight = value
        )
        console.log(criteriaList.value)
    }
    
const normal = normalize(matrix.value)
const avVector = math.matrix(math.mean(normal,1));
addWeightToCriteria(avVector)

const sortedCriteriaList = computed(() =>
  criteriaList.value.slice().sort((a, b) => b.weight - a.weight)
);



</script>

<template>
    <section  class=" d-flex flex-column p-5 gap-5">
        <h1 v-text="title"></h1>
        <p v-text="message"></p>
        <ol class="d-flex bg-white container-sm flex-column gap-4 w-100 justify-content-center bg-white p-5 rounded">
            <li v-for="criteria,index  in sortedCriteriaList" :key="criteria.text" class="d-flex gap-5 align-items-center justify-content-center"> 
                <span class="number">{{ index + 1 }}</span><span class="bg-purple-inv text-center rounded-4 p-3 w-75">{{ criteria.text }}</span>
            </li>
        </ol>
        <div class="d-flex gap-5">
            <RouterLink class="btn-light m-auto" to="/criteria-comparison">Rank again</RouterLink>
            <RouterLink class="btn-light m-auto" to="/options-comparison">Next</RouterLink>
        </div>
    </section>
</template>
