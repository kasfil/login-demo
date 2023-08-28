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
  </div>
</template>

<script>
import cryptoRandomString from 'crypto-random-string'

const LineAuthUrl = 'https://access.line.me/oauth2/v2.1/authorize'
const params = {
  response_type: 'code',
  client_id: import.meta.env.VITE_LINE_CLIENT_ID,
  redirect_uri: '_blank',
  scope: 'openid profile email',
  state: cryptoRandomString({ length: 32, type: 'alphanumeric' })
}

export default {
  name: 'LineAuth',
  methods: {
    line_auth() {
      const newWindow = window.open('/', '_blank', 'width=400,height=500')
      newWindow.location.href = LineAuthUrl + '?' + new URLSearchParams(params).toString()
    }
  }
}
</script>
