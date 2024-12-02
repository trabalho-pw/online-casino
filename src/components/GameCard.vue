<template>
  <div>
    <div class="game-card" @click="showModal = true">
      <div>
        <div class="title">{{ title }}</div>
        <p class="reduced_description">{{ reduced_description }}</p>
      </div>
      <div class="image-container">
        <img :src="imageSrc" alt="Imagem do Jogo" />
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">{{ title }}</div>
        <div class="modal-body">{{ description }}</div>
        <div class="modal-footer">
          <button @click="redirectToGame">Jogar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reduced_description: {
      type: String,
      required: true,
    },
    gameUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    redirectToGame() {
      window.location.href = this.gameUrl;
    },
  },
};
</script>

<style scoped>
.game-card {
  display: flex;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 50vw;
  height: 22vh;
  cursor: pointer;
}

.title {
  font-family: "Bebas Neue", sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #223F4A;
}

.image-container {
  width: 27.5vh;
  height: 17.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.reduced_description{
  font-family: 'Lato', sans-serif;
  font-size: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  text-align: center;
  color: #223F4A;
}

.modal-header {
  font-family: "Bebas Neue", sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #223F4A;
}

.modal-body {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: justify;
}

.modal-footer button {
  background-color: #e63948;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  width: 30%;
  font-size: 20px;
}

.modal-footer button:hover {
  background-color: #d62839;
}
</style>