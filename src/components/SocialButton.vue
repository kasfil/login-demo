<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  name: String,
  icon: Array,
  to: String,
  textClasses: String
})
</script>

<template>
  <RouterLink :to="{ name: to }">
    <p :class="textClasses">
      <font-awesome-icon :icon="icon" size="6x" />
    </p>
    <b class="block mt-1 is-size-5 has-text-centered has-text-dark">
      {{ name }}
    </b>
  </RouterLink>
</template>

<script></script>
