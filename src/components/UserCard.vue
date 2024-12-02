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
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    width: 300px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .user-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .user-info {
    flex: 1;
  }
  
  .user-name {
    font-size: 18px;
    margin: 0;
    color: #333;
  }
  
  .user-coins {
    font-size: 14px;
    color: #666;
  }
  
  .level-section {
    margin-top: 10px;
  }
  
  .level-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
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