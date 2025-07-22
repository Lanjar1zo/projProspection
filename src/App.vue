<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Database } from './Database/Database';
import { onMounted } from 'vue';

// Initialisation de la BD
onMounted(async () => {
  const dbService = new Database();
  await dbService.initialize().catch((err) => {
    console.error('DB Init Error:', err);
  });
  console.log('Vue onMounted');
});
</script>
