<template>
  <main>
    <div class="game-cards-container">
      <UserCard
        :userName="'João Gamer'"
        :userCoins="1500"
        :levelProgress="70"
        :userImage="'src/assets/profile.webp'"
      />
      <GameCard
        v-for="(game, index) in games"
        :key="index"
        :title="game.title"
        :imageSrc="game.imageSrc"
        :description="game.description"
        :gameUrl="game.gameUrl"
      />
    </div>
  </main>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import UserCard from "@/components/UserCard.vue";

export default {
  name: "GameCardsView",
  components: {
    GameCard,
    UserCard,
  },
  data() {
    return {
      games: [
        {
          title: "Caça-níquel",
          imageSrc: "src/assets/caca-niquel-svg.png",
          description: "Um caça-níquel online é um jogo de cassino digital que simula o funcionamento das tradicionais máquinas de slot. Nele, os jogadores giram os cilindros virtuais que exibem uma variedade de símbolos, e o objetivo é alinhar esses símbolos em combinações específicas para ganhar prêmios. Os jogos geralmente oferecem gráficos atraentes, sons envolventes e bônus especiais, como rodadas grátis ou multiplicadores, para aumentar as chances de vitória. Esses jogos são acessíveis pela internet, podendo ser jogados em sites de cassino ou aplicativos de jogos, com apostas variáveis e temáticas diversificadas, que vão desde aventuras até filmes e séries.",
          gameUrl: "#",
        },
        {
          title: "Blackjack",
          imageSrc: "src/assets/blackjack-svg.png",
          description: "Descrição do Jogo 2",
          gameUrl: "#",
        },
        {
          title: "Campo Minado",
          imageSrc: "src/assets/campo-minado-svg.webp",
          description: "Descrição do Jogo 3",
          gameUrl: "#",
        },
      ],
    };
  },
};
</script>

<style scoped>
main {
  background: url('../assets/background-layered-peaks.svg');
  height: 100dvh;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
}

.game-cards-container {
  display: flex;
  flex-direction: column;
  align-items: center;  
  gap: 10px; 
  padding: 10px;
  width: 100%;  
}

.game-card:first-child {
  margin-top: 0; 
}
</style>
  