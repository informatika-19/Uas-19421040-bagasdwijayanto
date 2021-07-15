<template>
    <q-layout class="bg">
        <q-page-container>
            <q-page padding class="row items-center justify-center">
                <div class="row full-width">
                    <div class="col-md-7 offset-md-2 col-xs-11 q-pa-md">
                        <q-card flat class="text-deep-green-9">
                            <div class="row items-center">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-10 offset-1">
                                            <q-img src="~assets/undraw_secure_login_pdn4.png">

                                            </q-img>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <q-card-section>
                                        <div class="text-h3">Penjualan Buah</div>
                                        <div>Login Akun Anda</div>
                                    </q-card-section>
                                    <q-form
                                    @submit="login"
                                    >
                                        <q-card-section>
                                            <q-input v-model="username" label="Username"/>
                                            <q-input type="password" v-model="password" label="Password"/>
                                        </q-card-section>
                                        <q-card-section>
                                            <q-btn class="full-width" type="submit" unelevated color="green" label="Login"/>
                                            <q-btn class="full-width q-mt-md"
                                            :to="{ name:'registerPage' }"
                                            flat unelevated color="black"
                                            label="Registrasi"/>
                                        </q-card-section>
                                    </q-form>
                                </div>
                            </div>
                        </q-card>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<style lang="scss" scoped>
.background {
    background-color: white;
}
.bg {
   background-image: url("https://cdn.pixabay.com/photo/2017/01/31/09/30/raspberries-2023404_960_720.jpg") ;
    background-size: cover;
}
</style>
<script>
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$axios.post('user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$q.localStorage.set('dataUser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dataUser' })
          } else {
            this.$router.push({ name: 'homeUser' })
          }
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
