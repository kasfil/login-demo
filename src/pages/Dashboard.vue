<script setup>
import { ref } from 'vue'
import SocialButton from '../components/SocialButton.vue'

const supported = ref([
  {
    name: 'Line',
    to: 'LineAuth',
    icon: ['fab', 'line'],
    textClasses: 'has-text-success'
  },
  {
    name: 'Google',
    to: 'GoogleAuth',
    icon: ['fab', 'google'],
    textClasses: 'has-text-success'
  }
])
</script>

<template>
  <div class="container is-max-desktop mt-3">
    <div class="columns">
      <div class="column">
        <b class="has-text-dark is-size-4">Select app to authenticate</b>
      </div>
    </div>
    <div class="columns">
      <div class="column is-3 has-text-centered" v-for="item in supported">
        <SocialButton v-bind="item" />
      </div>
    </div>
  </div>
</template>
