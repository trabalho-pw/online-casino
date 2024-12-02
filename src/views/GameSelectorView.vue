<template>
  <main>
    <div class="game-cards-container">
      <UserCard
        :userName="userData?.name || 'Usuário Anônimo'"
        :userCoins="userData?.coins || 0"
        :userxp="userData?.xp || 0"
        :userImage="userData?.profileImage || 'src/assets/profile.webp'"
      />
      <GameCard
        v-for="(game, index) in games"
        :key="index"
        :title="game.title"
        :imageSrc="game.imageSrc"
        :description="game.description"
        :reduced_description="game.reduced_description"
        :gameUrl="game.gameUrl"
      />
    </div>
  </main>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import UserCard from "@/components/UserCard.vue";
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase';

const db = getFirestore()

export default {
  name: "GameCardsView",
  components: {
    GameCard,
    UserCard,
  },
  data() {
    return {
      userData: null, 
      games: [
        {
          title: "Caça-níquel",
          imageSrc: "src/assets/caca-niquel-svg.png",
          description: "Explore a emoção do cassino com nosso jogo de Caça-níquel! Gire e descubra combinações vencedoras de símbolos para ganhar prêmios incríveis. Aposte e sinta a adrenalina enquanto busca o grande prêmio!",
          reduced_description: "Explore a emoção do cassino com nosso jogo de Caça-níquel!",
          gameUrl: "#",
        },
        {
          title: "Blackjack",
          imageSrc: "src/assets/blackjack-svg.png",
          description: "Entre na ação do Blackjack! Desafie a sorte e sua habilidade para alcançar a melhor mão possível, com o objetivo de somar 21 pontos, sem ultrapassar. Com regras simples e grandes prêmios, o Blackjack oferece uma experiência emocionante e cheia de adrenalina.",
          reduced_description: "Entre na ação do Blackjack, desafie a sorte para alcançar a melhor mão possível!",
          gameUrl: "#",
        },
        {
          title: "Campo Minado",
          imageSrc: "src/assets/campo-minado-svg.webp",
          description: "Teste sua sorte no emocionante jogo de Diamantes e Bombas! Similar ao clássico Campo Minado, seu objetivo é encontrar os diamantes espalhados pelo campo e acumular prêmios em dinheiro, a cada acerto mais diamantes e recompensas surgem, mas o risco de explosão está sempre presente.",
          reduced_description: "Teste sua sorte no emocionante jogo de Diamantes e Bombas!",
          gameUrl: "/mines",
        },
      ],
    };
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const userDocRef = doc(db, 'users', uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            this.userData = userDocSnap.data(); 
          } else {
            console.error('Usuário não encontrado no Firestore');
          }
        } catch (error) {
          console.error('Erro ao buscar os dados do usuário:', error);
        }
      } else {
        console.log('Nenhum usuário está logado');
      }
    });
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
  