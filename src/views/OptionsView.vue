<script setup>
import { useOptions } from '../stores/options';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';


const title = "Enter the options you wish to choose from"

const store = useOptions();
const {newOption, optionsList} = storeToRefs(store);
const { addOption, removeOption } = store;

const isActive = () => { return optionsList.value.length > 1 }

</script>

<template>
    <section class=" d-flex flex-column p-5 gap-5" >
        <h1 v-text="title"></h1>
        <form @submit.prevent="addOption" class="w-100">
            <label for="option" class="pb-4 ">Option:</label>
            <div class="d-flex gap-4 flex-wrap flex-sm-nowrap justify-content-end">
                <input id="option" class="form-control-xl" v-model="newOption" type="text"  placeholder="Type an option">
                <button type="submit" class="btn-light" >Enter</button>
            </div>
        </form>
        <p v-if="optionsList.length == 0">
            Hello! To kickstart the decision-making process,
            please enter an item that you're considering as
            a potential option for the decision you're about to make.
        </p>
        <div v-else>
            <p class="pb-4">Your options are:</p>
            <ul class="d-flex  flex-column gap-4 w-100 justify-content-center bg-white p-5 rounded">

                <li v-for="option in optionsList" :key="option.id"
                class="bg-blue btn-light px-0 position-relative">

                    {{ option.text }}

                    <button type="button" aria-label="Close" @click="removeOption(option)"
                    class="btn-close btn-close-white position-absolute end-0"></button>
                </li>
            </ul>
        </div>
        <div class="d-flex gap-5 justify-content-center">
            <RouterLink class="btn-light" to="/">Back</RouterLink>
            <RouterLink class="btn-light" :class="{disabled: !isActive()}" to="/criteria">Next</RouterLink>
        </div>
    </section>

</template>