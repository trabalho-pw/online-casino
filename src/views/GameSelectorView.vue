<template>
    <div>
      <GameCard 
        title="Jogo Fantástico" 
        imageSrc="https://example.com/imagem.jpg" 
        description="Este é um jogo incrível onde você pode explorar mundos fantásticos e aventuras emocionantes." 
        gameUrl="https://example.com/jogo"
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
  