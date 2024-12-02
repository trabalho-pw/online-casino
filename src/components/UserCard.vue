<template>
    <div class="user-card">
      <img class="user-image" :src="userImage" alt="User Avatar" />
      <div class="user-info">
        <h2 class="user-name">{{ userName }}</h2>
        <p class="user-coins">{{ userCoins }} Moedas</p>
        <div class="level-section">
          <p class="level-label">Nível</p>
          <div class="level-bar-container">
            <div
              class="level-bar"
              :style="{ width: levelProgress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserCard",
    props: {
      userName: {
        type: String,
        required: true,
      },
      userCoins: {
        type: Number,
        required: true,
      },
      userImage: {
        type: String,
        default: "", 
      },
      levelProgress: {
        type: Number,
        default: 0, 
      },
    },
  };
  </script>
  
  <style scoped>
  .user-card {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    width: 50vw;
    height: 25vh;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .user-image {
    width: 22.5vh;
    height: 22.5vh;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .user-info {
    flex: 1;
  }
  
  .user-name {
    font-family: "Bebas Neue", sans-serif;
    font-size: 36px;
    font-weight: bold;
    margin: 0;
    color: #223F4A;
  }
  
  .user-coins {
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    color: #DEB45F;
  }
  
  .level-section {
    margin-top: 10px;
  }
  
  .level-label {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    margin-bottom: 4px;
    color: #223F4A;
  }
  
  .level-bar-container {
    height: 8px;
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .level-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease;
  }
  </style>  