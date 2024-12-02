<template>
  <main>
    <div class="game-cards-container">
      <UserCard
        :userName="'João Gamer'"
        :userCoins="1500"
        :levelProgress="70"
        :userImage="'src/assets/profile.svg'"
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
          description: "Descrição do Jogo 1",
          gameUrl: "#",
        },
        {
          title: "Blackjack",
          imageSrc: "src/assets/blackjack-svg.png",
          description: "Jogo de cartas de casino onde o objetivo é ter mais pontos do que o adversário, sem ultrapassar os 21",
          gameUrl: "./blackjack",
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
  