<script setup>
// import { defineProps } from 'vue';
import { useOptions } from '../stores/options';
import { storeToRefs } from 'pinia';




const optionsStore = useOptions()
const { optionsSliders} = storeToRefs(optionsStore)

const props = defineProps({
    i: Number,
    j: Number,
    matrix: Number,
})


</script>

<template>
    <input
    @input="$emit('updateMatrix', props.i, props.j, $event.target.value, props.matrix)"
    type="range"
    min="-3"
    v-model="optionsSliders[matrix].value._data[i][j]"
    max="3"
    class="form-range
    w-75 m-auto my-5    
    ">

</template>