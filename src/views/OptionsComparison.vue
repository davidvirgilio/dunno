<script setup>
import { RouterLink } from 'vue-router';
import { useOptions } from '../stores/options';
import { useCriteria } from '../stores/criteria';
import { storeToRefs } from 'pinia';
import RangeComponent from '../components/RangeComponent.vue';


const title='Option Comparison:'
const message = 'Considering the shown criteria, which option is better for you?';

const criteriaStore = useCriteria()
const optionsStore = useOptions()
const { criteriaList} = storeToRefs(criteriaStore)
const { optionsList, optionsSliders} = storeToRefs(optionsStore)
const optionsLength = optionsStore.optionsLength;

const { updateOptionsMatrix } = optionsStore
let count = 0;


//------------------------------------------------------------
// The number of OPTIONS determines the SIZE of the matrix
// while the number of CRITERIA will dictate the quantity of MATRICES.
//------------------------------------------------------------


console.log(optionsSliders.value[0].value._data[0][1])

</script>

<template>

    <div class=" d-flex flex-column p-5 gap-5 align-items-center">

        <h1 v-text="title"></h1>
        <p v-text="message"></p>
        
        <article class="section-options d-flex flex-column align-content-center w-100" v-for="i in optionsLength" :key="i">
            <section class="section-criteria" v-for="j in optionsLength" :key="j">
                <div v-if="j <= optionsLength-i" class="d-flex flex-column justify-content-between w-100  mb-5" :count="count++">
                    <h3>Battle {{ count }}</h3>
                    <div class="d-flex justify-content-between align-items-center py-5">
                        <div class="circle" style="min-width: fit-content;">
                            {{ optionsList[i-1].text }}
                        </div>
                        <span class="h1 huge">vs</span>
                        <div class="circle" style="min-width: fit-content;">
                            {{ optionsList[i+j-1].text }}
                        </div>
                    </div>
                    <div v-for="item,index in criteriaList" :key="index" class="d-flex flex-column justify-content-center">
                        <div class="pills bg-purple h2 py-4 px-5 rounded-pill m-auto shadow my-5">
                            {{ item.text }}<br>
                        </div>
                        <RangeComponent @updateMatrix="updateOptionsMatrix" :i="i" :j="j" :matrix="index"/>
                    </div>
                </div>
            </section>
        </article>


        <div class="d-flex gap-5">
            <RouterLink class="btn-light" to="/criteria">Back</RouterLink>
            <RouterLink class="btn-light" to="/decision">Next</RouterLink>

        </div>
       
    </div>
</template>