<script>
import GenericButton from './GenericButton.vue'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  name: 'DailyGiftModal',
  components: {
    GenericButton,
  },
  props: {
    uid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: {},
    }
  },
  emits: ['close'],
  methods: {
    async fetchUserData() {
      console.log(this.uid)
      try {
        const userDoc = doc(db, 'users', this.uid)
        const userSnapshot = await getDoc(userDoc)

        if (userSnapshot.exists()) {
          this.user = userSnapshot.data()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async claimDailyGift() {
      try {
        const userDoc = doc(db, 'users', this.uid)
        const now = new Date()

        await updateDoc(userDoc, {
          coins: this.user.coins + 200,
          lastDailyGift: now.toISOString(),
        })
      } catch (error) {
        console.log(error)
      }
    },
    closeModal() {
      this.claimDailyGift()
      this.$emit('close')
    },
  },
  async mounted() {
    await this.fetchUserData()
  },
}
</script>

<template>
  <div class="modal-container" @click.self="closeModal">
    <div class="modal">
      <button class="close-button" @click="closeModal">&times;</button>
      <h1>Presente Diário</h1>
      <div class="reward">
        <img src="../assets/gift.svg" alt="imagem de presente" />
        <p>
          Bem-vindo de Volta! Você recebeu <span class="coins">200</span> moedas! Volte amanhã para
          mais recompensas.
        </p>
      </div>
      <div class="modal-button">
        <GenericButton text="resgatar" @click="closeModal" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  height: 100dvh;
  width: 100vw;
  background: #223f4a5d;
  backdrop-filter: blur(3px);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
}

.modal {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px 4px #00000040;
  min-height: 20em;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  max-width: 40em;
  position: relative;
  font-size: 1.1rem;
  gap: 1em;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  color: #223f4a;
}

.modal h1 {
  font-family: 'Bebas Neue', sans-serif;
  position: absolute;
  top: 0.5em;
  font-size: 2.25rem;
  color: #223f4a;
}

.reward {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.reward p {
  width: 80%;
  text-align: center;
}

.coins {
  color: #deb45f;
  font-weight: 800;
}

.modal .reward img {
  width: 4em;
}

.modal-button {
  width: 60%;
  position: absolute;
  bottom: 1.5em;
}

@media screen and (min-width: 800px) {
  .reward {
    flex-direction: row;
  }
  .reward p {
    width: 60%;
    text-align: justify;
  }
}
</style>
