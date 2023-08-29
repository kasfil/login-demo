<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="container is-max-desktop mt-4">
    <div class="columns">
      <div class="column has-text-centered mt-6 is-size-4 mx-auto">
        <button class="button is-success" @click="line_auth">
          <span class="icon is-small">
            <font-awesome-icon :icon="['fab', 'line']" />
          </span>
          <span>Login with Line</span>
        </button>
        <p class="is-size-6 has-text-grey-light">
          We also requesting your e-mail because we want to communicate with you and let you know
          about latest news.
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column has-text-centered is-size-4 mx-auto">
        <div class="box has-text-centered has-text-grey-light" id="bearer-box">
          <p class="subtitle is-size-6">
            {{ bearer }}
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column has-text-centered is-size-4 mx-auto">
        <div class="box has-text-centered has-text-grey-light" id="bearer-box">
          <p class="subtitle is-size-6">
            {{ id_token }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineAuth from '@/libs/LineAuth.js'
export default {
  name: 'LineAuth',
  data() {
    return {
      bearer: 'Please signin first',
      id_token: 'Please signin first'
    }
  },
  methods: {
    line_auth() {
      ;(async () => {
        let response = await LineAuth.authenticate()
        this.bearer = response.access_token
        this.id_token = response.id_token
      }).call()
    }
  }
}
</script>

<style scoped>
#bearer-box {
  word-wrap: anywhere;
}
</style>
