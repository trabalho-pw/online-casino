<template>
    <div class="game-card">
      <div class="title">{{ title }}</div>
      <div class="image-container">
        <img :src="imageSrc" alt="Imagem do Jogo" />
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
    },
  };
  </script>
  
  <style scoped>
  .game-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ddd; 
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    width: 300px; 
  }
  
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  
  .image-container {
    width: 50px;
    height: 50px;
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
  </style>
  