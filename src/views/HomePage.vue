<script setup>
import { RouterLink } from 'vue-router';

const h1 = "The easiest way to make the right decisions.";
const welcome = "We understand that decision-making isn't always as straightforward as we'd like it to be. Allow us to assist you through the process and reap the rewards of well-informed choices.";


</script>
<template>
    <article class="d-flex flex-column p-5 gap-5" >
        <h1 v-text="h1"></h1>
        <p v-text="welcome"></p>
        <img alt="An illustration of a man in a blue t-shirt shrugging, holding a triangle in one hand and a circle in the other, symbolizing his indecision." src="../assets/home-illustration.svg" height="300">
        <RouterLink class="btn-light m-auto" to="/options">Start making decisions</RouterLink> 
    </article>
</template>
