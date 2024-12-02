<template>
    <div>
        <div class="bet-input">
            <input 
                type="number" 
                v-model.number="bet" 
                placeholder="Insira sua aposta" 
            />
            <button @click="placeBet">Apostar</button>
        </div>

        <div>
            <div class="game-board">
                <div 
                    v-for="(square, index) in board" 
                    :key="index" 
                    class="square" 
                    :class="{ clicked: square.clicked, mine: isGameOver && square.mine }"
                    @click=" isBetPlaced && handleClick(index)"
                >
                    <i v-if="square.clicked" :class="square.icon"></i>
                </div>
            </div>
            <div class="status">
                <button @click="startGame">Começar Novo Jogo</button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: "MinesGame",
    data() {
        return {
            board: [],         
            mines: [],         
            isGameOver: false, 
            prize: 0,          
            totalSquares: 25,  
            bet: null,         
            isBetPlaced: false, 
        };
    },
    methods: {
        
        startGame() {
            this.isGameOver = false;
            this.board = [];
            this.mines = [];
            this.prize = 0;
            
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
            if (this.bet > 0) {
                this.isBetPlaced = true;
                this.startGame();
            } else {
                alert("Por favor, insira um valor de aposta válido.");
            }
        },
        handleClick(index) {
            if (this.isGameOver || this.board[index].clicked) return;

            const square = this.board[index];
            square.clicked = true;

            if (square.mine) {
                this.gameOver();
            } else {
                this.prize += 10;
                square.icon = "fa fa-gem"; 
                if (this.prize >= 50) {
                    this.isGameOver = true;
                }
            }
        },
        gameOver() {
            this.isGameOver = true;

            this.mines.forEach(index => {
                const mineSquare = this.board[index];
                mineSquare.icon = "fa fa-bomb"; 
                mineSquare.clicked = true;
            });
        }
    },
    mounted() {
        this.startGame();
    }
};

</script>

<style scoped>
.bet-input {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
}

input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
    padding: 10px 20px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    
}

button:hover {
    background-color: #1976D2;
}

</style>