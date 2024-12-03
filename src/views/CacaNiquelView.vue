<template>
  <div class="game-background">
    <GenericContainer title="CAÇA-NÍQUEL">
      <div>
        <div class="game-header">
          <div class="user-info">
            <p class="balance-text">Saldo Atual: {{ balance }} Moedas</p>
            <p class="result-text" v-if="resultMessage" :class="{'win-text': isWinning, 'lose-text': !isWinning}">{{ resultMessage }}</p>
          </div>
        </div>
        
        <div class="game-content">
          <div class="bet-options">
            <label for="bet" class="bet-label">Escolha sua aposta:</label>
            <select id="bet" v-model="currentBet" class="bet-select">
              <option v-for="amount in bets" :key="amount" :value="amount">
                {{ amount }} Moedas
              </option>
            </select>
          </div>

          <div class="slot-machine">
            <div
              class="reel"
              v-for="(column, columnIndex) in reels"
              :key="columnIndex"
            >
              <div
                class="symbol"
                v-for="(symbol, rowIndex) in column"
                :key="rowIndex"
              >
                <img v-if="symbol === '7'" src="../assets/numero7.webp" alt="7" class="symbol-image" />
                <img v-else-if="symbol === 'C'" src="../assets/letrac.webp" alt="C" class="symbol-image" />
                <img v-else-if="symbol === 'E'" src="../assets/letrae.webp" alt="E" class="symbol-image" />
                <img v-else-if="symbol === 'U'" src="../assets/letrau.webp" alt="U" class="symbol-image" />
                <img v-else-if="symbol === 'B'" src="../assets/letrab.webp" alt="B" class="symbol-image" />
                <span v-else class="symbol-text">{{ symbol }}</span>
              </div>
            </div>
          </div>
          
          <GenericButton :is-valid="!isDisabled" :text="isSpinning ? 'Girando...' : 'Girar'" @click="spinSlotMachine"/>
          
          <p v-if="currentBet > balance" class="error-message">
            Saldo insuficiente para apostar {{ currentBet }} moedas.
          </p>
          
          <GenericButton v-if="isGameOver" @click="goToHome" text="sair do jogo" />
        </div>
      </div>
    </GenericContainer>
  </div>
  <Rodape/>
</template>


<script>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import GenericContainer from '@/components/GenericContainer.vue';
import router from "@/router";
import Rodape from '../components/Rodape.vue'; // Importa o Footer
import { useLoadingStore } from '@/stores/loading'


import GenericButton from "@/components/GenericButton.vue";

export default {
  components: {
    GenericContainer,
    GenericButton,
    Rodape,
  },
  data() {
    return {
      loadinStore: useLoadingStore(),
      userId: this.$route.params.userID,
      balance: 0,
      resultMessage: '',
      reels: Array(3).fill().map(() => ['7', 'C', 'E']),
      isSpinning: false,
      bets: [25, 50, 100, 200, 500],
      currentBet: 25,
      isWinning: false,
      isGameOver: false,
    };
  },
  async created() {
    await this.fetchUserData();
  },
  computed: {
    isDisabled() {
      return this.isSpinning || this.currentBet > this.balance
    }
  },
  methods: {
    async fetchUserData() {
      this.loadinStore.setLoading(true)

      const db = getFirestore();
      const userDoc = doc(db, "users", this.userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        this.balance = userData.coins || 0;
      } else {
        console.error("Usuário não encontrado no Firestore");
      }

      this.loadinStore.setLoading(false)
    },
    async updateUserData() {
      const db = getFirestore();
      const userDoc = doc(db, "users", this.userId);

      try {
        await updateDoc(userDoc, { coins: this.balance });
      } catch (error) {
        console.error("Erro ao atualizar o saldo do usuário:", error);
      }
    },
    spinSlotMachine() {
      if (this.currentBet > this.balance) {
        this.resultMessage = "Saldo insuficiente!";
        return;
      }

      this.balance -= this.currentBet;
      this.isSpinning = true;

      const symbols = ['7', 'C', 'E', 'U', 'B'];
      const spinDurations = [2000, 2200, 2400];
      const interval = 100;

      let columnsStopped = 0;

      const spinColumn = (columnIndex, spinDuration) => {
        let elapsedTime = 0;
        const spinInterval = setInterval(() => {
          this.reels[columnIndex] = Array(3)
            .fill(null)
            .map(() => symbols[Math.floor(Math.random() * symbols.length)]);

          elapsedTime += interval;

          if (elapsedTime >= spinDuration) {
            clearInterval(spinInterval);
            columnsStopped += 1;
            if (columnsStopped === 3) {
              this.finishSpin();
            }
          }
        }, interval);
      };

      this.reels.forEach((_, columnIndex) => {
        spinColumn(columnIndex, spinDurations[columnIndex]);
      });
    },
    async finishSpin() {
      const middleRowSymbols = this.reels.map(column => column[1]);
      const counts = middleRowSymbols.reduce((acc, symbol) => {
        acc[symbol] = (acc[symbol] || 0) + 1;
        return acc;
      }, {});

      const isJackpot = counts['7'] === 3;
      const isThreeEqual = Object.values(counts).includes(3) && !isJackpot;
      const isTwoSevens = counts['7'] === 2 && Object.values(counts).includes(1);
      const isTwoEqualOneDifferent = Object.values(counts).includes(2) && !isTwoSevens;

      let winnings = 0;

      if (isJackpot) {
        winnings = this.currentBet * 6;
        this.resultMessage = `Jackpot! Você ganhou ${winnings} moedas!`;
        this.isWinning = true;
      } else if (isThreeEqual) {
        winnings = this.currentBet * 4;
        this.resultMessage = `Parabéns! Você ganhou ${winnings} moedas!`;
        this.isWinning = true;
      } else if (isTwoSevens) {
        winnings = this.currentBet * 2;
        this.resultMessage = `Boa! Você ganhou ${winnings} moedas!`;
        this.isWinning = true;
      } else if (isTwoEqualOneDifferent) {
        winnings = 0;
        this.resultMessage = `Você perdeu ${this.currentBet} moedas.`;
        this.isWinning = false;
      } else {
        winnings = 0;
        this.resultMessage = `Ah, não! Você perdeu ${this.currentBet} moedas.`;
        this.isWinning = false;
      }

      this.balance += winnings;
      this.isSpinning = false;

      await this.updateUserData();
      this.isGameOver = true;
    },
    goToHome() {
      router.push('/'+this.userId)
    },
  },
};

</script>


<style scoped>
.game-background {
  background: url('../assets/background-layered-peaks.svg');
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  font-family: 'Lato', sans-serif;
  justify-content: center;
}

.game-header {
  padding: 20px;
}

.game-content {
  padding-inline: 3em;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.user-info {
  margin-bottom: 20px;
}

.game-over-message {
  width: 100%;
}

.balance-text {
  font-size: 20px; /* Aumenta o tamanho do texto */
}

.result-text {
  margin: 15px 0; /* Ajusta a margem para colocar a mensagem no meio */
  font-size: 24px; /* Aumenta o tamanho da fonte */
  font-weight: bold; /* Deixa o texto em negrito */
}

.win-text {
  color: limegreen; /* Cor verde forte para ganhos */
}

.lose-text {
  color: crimson; /* Cor vermelha forte para perdas */
}

.bet-options {
  margin: 20px 0;
  display: flex;
  gap: 1em;
  justify-content: center;
}

.bet-label {
  font-size: 20px; /* Aumenta o tamanho do texto */
}

.bet-select {
  width: 200px; /* Aumenta a largura da caixa de seleção */
  height: 40px; /* Aumenta a altura da caixa de seleção */
  background-color: black; /* Define a cor de fundo preta */
  color: white; /* Define a cor do texto como branca */
  border: 2px solid gold; /* Adiciona uma borda dourada para destaque */
  border-radius: 5px; /* Adiciona bordas arredondadas */
  font-size: 16px; /* Define o tamanho da fonte */
}

.slot-machine {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  height: 150px;
  overflow: hidden;
  border: 2px solid gold;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
}

.reel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%; /* Altura para cobrir todas as fileiras */
  margin: 0 10px;
}

.symbol {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px; /* Altura de cada símbolo */
  font-size: 72px;
}

.symbol-image {
  width: 80px;
  height: 80px;
}

.symbol-text {
  font-size: 72px;
  color: #8a2be2;
}

.spin-button {
  padding: 20px 40px; /* Aumenta o tamanho do botão */
  font-size: 20px; /* Aumenta o tamanho do texto no botão */
  background-color: gold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.spin-button:hover {
  background-color: darkgoldenrod;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
