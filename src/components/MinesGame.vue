<template>
    <div class="cash">
        <p>Saldo: R${{ cash }}</p>
    </div>
    <div class="game-board">
        <div 
            v-for="(square, index) in board" 
            :key="index" 
            class="square" 
            :class="{ clicked: square.clicked, mine: isGameOver && square.mine }"
            @click="isBetPlaced && handleClick(index)"
        >
            <i v-if="square.clicked" :class="square.icon"></i>
        </div>
    </div>
    <div class="bet-input">
        <input 
            type="number" 
            v-model.number="bet" 
            placeholder="Insira sua aposta" 
        />
        <button :disabled="!isBetValid || isGameInProgress" @click="placeBet">Começar o Jogo</button>
    </div>
    <div v-if="isBetPlaced" class="status">
        <p>MULTIPLICADOR: {{ mult }}X</p>
        <button :disabled="!isBetValid" @click="gameWin">RETIRAR: R${{ win }}</button>
    </div>
    <div v-if="isGameEnd" class="game-end">
        <h2 :class="{ 'win-message': isGameWin, 'lose-message': !isGameWin }">
            {{ isGameWin ? "Parabéns! Você venceu!" : "Que pena! Você perdeu" }}</h2>
        <button @click="goToHome">Voltar ao início</button>
    </div>
</template>

<script>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLoadingStore } from '@/stores/loading'

export default {
name: "MinesGame",
data() {
    return {
        loadinStore: useLoadingStore(),
        board: [],
        mines: [],
        isGameWin: false,
        isGameOver: false,
        isGameEnd: false,
        isGameInProgress: false,
        mult: 1.0,
        totalSquares: 25,
        bet: null,
        isBetPlaced: false,
        win: 0,
        cash: 0,
        userData: null,
        userID: null,
    };
},
computed: {
    isBetValid() {
        return this.bet != null && this.bet <= this.cash && this.bet > 0;
    },
},
methods: {
    async fetchUserData() {
        this.loadinStore.setLoading(true)
        
        const db = getFirestore();
        const userDoc = doc(db, "users", this.userID);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
            this.userData = userSnapshot.data();
            this.cash = this.userData.coins;
        } else {
            alert("Usuário não encontrado!");
        }

        this.loadinStore.setLoading(false)
    },
    async updateUserData() {
        const db = getFirestore();
        const userDoc = doc(db, "users", this.userID);
        await updateDoc(userDoc, {
            coins: this.cash,
            xp: this.userData.xp + (this.isGameWin ? 10 : 0),
            lastDailyGift: this.userData.lastDailyGift,
        });
    },
    startGame() {
        this.isGameWin = false;
        this.isGameOver = false;
        this.isGameEnd = false;
        this.board = [];
        this.mines = [];
        this.mult = 1.0;
        this.win = this.bet;

        for (let i = 0; i < this.totalSquares; i++) {
            this.board.push({ clicked: false, mine: false, icon: "" });
        }

        this.placeMines();
    },
    placeMines() {
        let mineCount = 5;
        while (this.mines.length < mineCount) {
            const randomIndex = Math.floor(Math.random() * this.totalSquares);
            if (!this.mines.includes(randomIndex)) {
                this.mines.push(randomIndex);
            }
        }

        this.mines.forEach(index => {
            this.board[index].mine = true;
        });
    },
    placeBet() {
        this.cash -= this.bet;
        this.isBetPlaced = true;
        this.isGameInProgress = true;
        this.startGame();
    },
    handleClick(index) {
        if (this.isGameWin || this.isGameOver || this.board[index].clicked) return;

        const square = this.board[index];
        square.clicked = true;

        if (square.mine) {
            this.gameOver();
        } else {
            this.mult += 0.5;
            square.icon = "fa fa-gem";
            this.win = this.bet * this.mult;
            if (this.mult >= 3.5) {
                this.gameWin();
            }
        }
    },
    gameOver() {
        this.isGameOver = true;
        this.isGameEnd = true;
        this.isGameInProgress = false;
        this.bet = null;

        this.mines.forEach(index => {
            const mineSquare = this.board[index];
            mineSquare.icon = "fa fa-bomb";
            mineSquare.clicked = true;
        });

        this.updateUserData();
    },
    gameWin() {
        this.cash += this.win;
        this.isGameWin = true;
        this.isGameEnd = true;
        this.isGameInProgress = false;
        this.bet = null;

        this.updateUserData();
    },
    goToHome() {
        this.$router.push('/'+this.userID);
    },
},
async mounted() {
    this.userID = this.$route.params.userID;
    await this.fetchUserData();
    this.startGame();
},
};
</script>


<style scoped>
.cash {
font-family: "Bebas Neue";
font-size: 1.5rem;
gap: 10px;
display: flex;
justify-content: center;
margin-bottom: 19px;
}

.status{
font-family: "Bebas Neue";
font-size: 1.5rem;
gap: 10px;
display: flex;
justify-content: center;
width: 100%;

}
p{
border: 1px solid #ccc;
width: 40%;
border-radius: 10px;
box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
font-size: 1.5rem;
padding: 7px;

}
.bet-input {
margin-top: 15px;
margin-bottom: 15px;
display: flex;
justify-content: center;
gap: 10px;
width: 100%;
}

input {
padding: 10px;
font-size: 1.5rem;
border: 1px solid #ccc;
border-radius: 10px;
height: 100%;
width: 40%;
font-family: "Bebas Neue", sans-serif;
box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

.game-board {
display: grid;
grid-template-columns: repeat(5, 50px);
grid-template-rows: repeat(5, 50px);
gap: 10px;
justify-content: center;
}

.square {
width: 50px;
height: 50px;
background-color: #e0e0e0;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
font-size: 18px;
cursor: pointer;
transition: transform 0.6s ease, background-color 0.3s ease;
transform: rotateY(0);

}
.square:hover {
background-color: #ccc;
}

.square.clicked {
background-color: #a5d6a7;
transform: rotateY(180deg);
}

.square.mine {
background-color: #ec4c4c;
}

.status {
margin-top: 20px;
display: flex;
justify-content: center;
}

button {
padding: 10px;
width: 40%;
color: white;
background-color: #e63948;
font-size: 1.5rem;
font-weight: 500;
font-family: "Bebas Neue", sans-serif;
border: none;
border-radius: 10px;
transition: 0.2s ease;
box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
cursor: pointer;

}

button:hover {
scale: 1.03;
cursor: pointer;
}

button:active{
scale: 1;
}

button:disabled{
background: #989898;
transition: none;
scale: 1;
cursor: default;
}

.game-end {
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
font-family:  "Bebas Neue", sans-serif;
font-size: 1.1rem;
}
.win-message {
color: green;
font-weight: bold;
}

.lose-message {
color: red;
font-weight: bold;
}

</style>