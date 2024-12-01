<template>
  <div class="game-cards-container">
    <GameCard
      v-for="(game, index) in games"
      :key="index"
      :title="game.title"
      :imageSrc="game.imageSrc"
      :description="game.description"
      :gameUrl="game.gameUrl"
    />
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";

export default {
  name: "GameCardsView",
  components: {
    GameCard,
  },
  data() {
    return {
      games: [
        {
          title: "Jogo 1",
          imageSrc: "",
          description: "Descrição do Jogo 1",
          gameUrl: "#",
        },
        {
          title: "Jogo 2",
          imageSrc: "",
          description: "Descrição do Jogo 2",
          gameUrl: "#",
        },
        {
          title: "Jogo 3",
          imageSrc: "",
          description: "Descrição do Jogo 3",
          gameUrl: "#",
        },
      ],
    };
  },
};
</script>

<style scoped>
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
  