<script setup>
import { useCriteria } from '../stores/criteria';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useOptions } from '../stores/options';


const title = "Specify the criteria you want to consider when making your decision."

const store = useCriteria();
const optionsStore = useOptions()

const { optionsList} = storeToRefs(optionsStore)
const {newCriterion, criteriaList} = storeToRefs(store);
const { addCriterion, removeCriterion } = store;

const isActive = () => { return criteriaList.value.length > 1 }


if(optionsList.value.length < 2) { window.location.replace("/options")}
</script>

<template>
    <section class=" d-flex flex-column p-5 gap-5" >
        <h1 v-text="title"></h1>
        <form @submit.prevent="addCriterion" class="w-100">
            <label for="criterion" class="pb-4 ">Criterion:</label><br>
            <div class="d-flex gap-4 flex-wrap flex-sm-nowrap justify-content-end">
                <input id="criterion" class="form-control-xl" v-model="newCriterion" type="text" maxlength="20"  placeholder="Type a criterion">
                <button type="submit" class="btn-light" >Enter</button>
            </div>
        </form>
        <p v-if="criteriaList.length == 0">
            Now, let's gather the criteria that will help us make the best decision.
            Please enter the criteria that are important for evaluating these options.
            Criteria are the factors or attributes you'll use to assess and compare your choices.
        </p>
        <div v-else>
            <p class="pb-4">Your criteria are:</p>
            <ul class="d-flex flex-column gap-4 w-100 justify-content-center bg-white p-5 rounded">
                <li v-for="criterion in criteriaList" :key="criterion.id"
                class="bg-purple-inv btn-light px-0 position-relative">

                    {{ criterion.text }}

                    <button type="button" aria-label="Close" @click="removeCriterion(criterion)"
                    class="btn-close btn-close-white position-absolute end-0"></button>
                </li>
            </ul>
        </div>
        <div class="d-flex gap-5 justify-content-center">
            <RouterLink class="btn-light m-auto" to="/options">Back</RouterLink>
            <RouterLink class="btn-light m-auto" to="/criteria-comparison" :class="{disabled: !isActive()}">Next</RouterLink>
        </div>
    </section>

</template>