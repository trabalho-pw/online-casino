<template>
    <div class="placar">
      <p>Dealer: {{ dealerPontuacao }}</p>
      <p>Você: {{ jogadorPontuacao }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      dealerPontuacao: Number,
      jogadorPontuacao: Number
    }
  };
  </script>
  
  <style scoped>
  .placar {
    margin: 20px;
    font-size: 22px;
    color: white;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  }
  </style>
  