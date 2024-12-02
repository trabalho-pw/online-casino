<template>
  <div class="controles-de-jogo">
    <button v-if="!jogoIniciado && !jogoFinalizado" @click="iniciarJogo">Iniciar Novo Jogo</button>
    <button v-if="jogoIniciado && !jogoFinalizado" @click="comprarCarta">Comprar Carta</button>
    <button v-if="jogoIniciado && !jogoFinalizado" @click="parar">Parar</button>
  </div>
</template>

<script>
export default {
  props: {
    jogoIniciado: Boolean,
    jogoFinalizado: Boolean
  },
  methods: {
    iniciarJogo() {
      this.$emit('iniciar-jogo');
    },
    comprarCarta() {
      this.$emit('comprar-carta');
    },
    parar() {
      this.$emit('parar');
    }
  }
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e64a19;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
