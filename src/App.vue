<script setup>
import { RouterView } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'
import { useLoadingStore } from '@/stores/loading'
import NotificationPopup from './components/NotificationPopup.vue';
import LoadingPage from './components/LoadingPage.vue';

const notificationStore = useNotificationStore()
const loadingStore = useLoadingStore()
</script>

<template>
  <div class="main">
    <LoadingPage :loading="loadingStore.isLoading" />
    <NotificationPopup
    v-if="notificationStore.showNotification"
    :type="notificationStore.notificationType"
    :message="notificationStore.notificationMessage"
    @close="notificationStore.closeNotification"
    />
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  width: 100vw;
}
</style>
