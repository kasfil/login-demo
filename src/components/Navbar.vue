<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container is-widescreen">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" :to="{ name: 'Dashboard' }">
          <h2 class="title is-4 has-text-centered has-text-white">
            Third-party Authentication Demo
          </h2>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
