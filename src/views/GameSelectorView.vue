<template>
    <div>
      <GameCard
        title="Título Jogo 1"
        imageSrc="caminho-para-imagem-1.jpg"
      />
      <GameCard
        title="Título Jogo 2"
        imageSrc="caminho-para-imagem-2.jpg"
      />
    </div>
  </template>
  
  <script>
  import GameCard from "../components/GameCard.vue";
  
  export default {
    name: "GameSelectorView",
    components: {
      GameCard,
    },
  };
  </script>
  