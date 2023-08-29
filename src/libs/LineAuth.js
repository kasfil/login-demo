import cryptoRandomString from 'crypto-random-string'
import axios from 'axios'

class LineAuth {
  constructor() {
    this.LINE_CHANNEL_ID = import.meta.env.VITE_LINE_CLIENT_ID
    this.LINE_CLIENT_SECRET = import.meta.env.VITE_LINE_CLIENT_SECRET
    this.LINE_CALLBACK_URL = 'https://qgc9v7-4000.csb.app'
    this.LINE_SCOPE = 'openid profile email'
    this.LINE_STATE = cryptoRandomString({ length: 32, type: 'alphanumeric' })
    this.LINE_VERIFIER = cryptoRandomString({ length: 42, type: 'alphanumeric' })
  }

  authenticate() {
    return new Promise(async (resolve) => {
      let code = await this.openPopipWindow()
      let authResponse = await this.requestToken(code.code)
      resolve(authResponse)
    })
  }

  getPopupUrl() {
    const baseurl = 'https://access.line.me/oauth2/v2.1/authorize'
    const params = {
      response_type: 'code',
      client_id: this.LINE_CHANNEL_ID,
      redirect_uri: this.LINE_CALLBACK_URL,
      scope: this.LINE_SCOPE,
      state: this.LINE_STATE
    }

    return baseurl + '?' + new URLSearchParams(params).toString()
  }

  checkState(state) {
    if (this.LINE_STATE != state) throw new Error('State unmatch')
  }

  openPopipWindow() {
    return new Promise((resolve, reject) => {
      const url = this.getPopupUrl()
      const popWindow = window.open('/', 'linepopup', 'toolbar=0,width=750,height=500')

      let loop = setInterval(() => {
        let backedUrl = null

        try {
          backedUrl = popWindow.location.href
        } catch (e) {}
        if (!backedUrl) return

        try {
          const urlobject = new URL(backedUrl)
          const params = new URLSearchParams(urlobject.search)

          let code = params.get('code')
          let state = params.get('state')

          if (!code || !state) return

          this.checkState(state)
          clearInterval(loop)
          loop = null

          popWindow.close()
          resolve({ state, code })
        } catch (e) {
          console.log(e)
          reject(e)
        }
      }, 1000)

      popWindow.addEventListener('load', function () {
        popWindow.location.href = url
      })
    })
  }

  requestToken(code) {
    const url = 'https://api.line.me/oauth2/v2.1/token'
    console.log(this.LINE_CLIENT_SECRET)
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          url,
          {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.LINE_CALLBACK_URL,
            client_id: this.LINE_CHANNEL_ID,
            client_secret: this.LINE_CLIENT_SECRET,
            code_verifier: this.LINE_VERIFIER
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        resolve(response.data)
      } catch (e) {
        reject(e)
        console.log(e)
      }
    })
  }
}

export default new LineAuth()
