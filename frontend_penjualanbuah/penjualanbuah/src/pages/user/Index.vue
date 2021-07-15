<template>
    <q-page padding>
        <div class="q-mb-xl">
            <q-carousel
                animated
                v-model="slide"
                navigation
                infinite
                autoplay
                arrows
                swipeable
                transition-prev="slide-right"
                transition-next="slide-left"
                >
                <q-carousel-slide :name="1" img-src="https://cdn.pixabay.com/photo/2016/10/07/13/36/tangerines-1721590_960_720.jpg" />
                <q-carousel-slide :name="2" img-src="https://cdn.pixabay.com/photo/2016/07/09/12/16/apples-1506119_960_720.jpg" />
                <q-carousel-slide :name="3" img-src="https://cdn.pixabay.com/photo/2017/06/12/14/53/watermelon-2395804__340.jpg" />
                <q-carousel-slide :name="4" img-src="https://cdn.pixabay.com/photo/2017/08/18/19/48/grapes-2656259_960_720.jpg" />
            </q-carousel>
        </div>
        <div class="row q-col-gutter-md bg-blue-grey-8">
            <div class="col-md-3 col-xs-12" v-for="(buah, i) in data" :key="i">
                <q-card>
                    <q-img
                    :src="`http://localhost:5000/${buah.image}`"
                    :ratio="16/9"
                    />

                        <q-card-section>
                            <q-btn
                            fab
                            color="green-5"
                            icon="add_shopping_cart"
                            class="absolute"
                            unelevated
                            style="top: 0; right: 12px; transform: translateY(-50%);"
                            />

                            <div class="row no-wrap items-center">
                              <div class="col text-h6 ellipsis">
                                {{ buah.namaBuah }}
                              </div>
                            </div>

                        </q-card-section>

                        <q-card-section class="q-pt-none">
                          <div class="text-subtitle1">
                            Harga: Rp. {{buah.harga}},-
                            </div>
                            <q-rating v-model="buah.rating" readonly color="orange-5" :max="5" size="32px" />
                            <div @click="buah.expanded = !buah.expanded" class="text-caption text-grey cursor-pointer">
                              Tampilkan Deskripsi ....
                            </div>
                            <q-slide-transition>
                            <div v-show="buah.expanded">
                              <div class="text-grey text-caption">
                                {{ buah.deskripsi}}
                              </div>
                            </div>
                          </q-slide-transition>
                        </q-card-section>

                        <q-card-actions>
                            <q-btn unelevated @click="openDetail(buah) " class="full-width" color="green-10">
                            <div class="text-white">
                            Pesan Sekarang
                            </div>
                            </q-btn>
                        </q-card-actions>
                        </q-card>
                </div>
            </div>
          <q-dialog v-model="dialog" v-if="dialog" position="left">
            <q-card style="width: 500px">
              <q-card-section>
                  <div class="text-h6">Detail Pemesanan</div>
              </q-card-section>
              <q-card-section style="max-height: 50vh;" class="scroll">
                   <div class="text-bold text-h6">{{ activeData.namaBuah }}</div> Dengan Harga Rp.{{ activeData.harga}},-
                    <q-form class="q-mt-md">
                <q-form>
                <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Jumlah Pesanan: "/>
                Total Harga Yang harus Di Bayar Rp.{{ total }},-
                  <q-file color="pink" class="q-mt-md" v-model="image" label="Masukan Bukti Pembayaran">
                  <template v-slot:prepend>
                      <q-icon name="attach_file" />
                      </template>
                    </q-file>
                </q-form>
                </q-form>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Batal" v-close-popup/>
                <q-btn color="black" @click="prosesTransaksi" label="Proses"  />
              </q-card-actions>
            </q-card>
          </q-dialog>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      stars: 4,
      image: null,
      dialog: false,
      data: [],
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.geData()
  },
  methods: {
    geData () {
      this.$axios.get('buah/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(buah => {
              return Object.assign(buah, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idBuah: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
