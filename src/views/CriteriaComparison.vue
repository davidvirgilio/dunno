<script setup>
import { RouterLink } from 'vue-router';
import { useCriteria } from '../stores/criteria';
import { storeToRefs } from 'pinia';

const title = "Criteria Comparison"
const message = "Determine what holds greater importance for you."

let count = 0;
const store = useCriteria()
const { criteriaList, criterionSlider} = storeToRefs(store)
const criteriaLength = store.criteriaLength;
const { updateMatrix} = store

if(criteriaList.value.length < 2) { window.location.replace("/options")}

</script>

<template>
    <section class=" d-flex flex-column p-5 gap-5">

        <h1 v-text="title"></h1>
        <p v-text="message"></p>

        <div v-for="i in criteriaLength" :key="i" class="w-100">
            <div v-for="j in criteriaLength" :key="j">
                <div v-if="j<=criteriaLength-i" class="d-flex flex-column justify-content-between w-100">
                    <h3>Battle {{ ++count }}</h3>
                    <div class="d-flex justify-content-between align-items-center py-5">
                        <div class="circle">
                            {{ criteriaList[i-1].text }}
                        </div>
                        <span class="h1 huge d-none d-sm-block">vs</span>
                        <div class="circle">
                            {{ criteriaList[i+j-1].text}}
                        </div>
                    </div>
                    <input
                        @input="updateMatrix(i,j,$event.target.value, matrix)"
                        type="range"
                        min="-3"
                        v-model="criterionSlider._data[i][j]"
                        max="3"
                        class="form-range w-75 m-auto py-5" list="values">
                </div>
            </div>
        </div>
    
        
        <div class="d-flex gap-4">
            <RouterLink class="btn-light m-auto" to="/criteria">Back</RouterLink>
            <RouterLink class="btn-light m-auto" to="/ranked-criteria">Next</RouterLink>
        </div>
    </section>
</template>