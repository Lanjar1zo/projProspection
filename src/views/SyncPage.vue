<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>Synchronisation</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refreshData" :disabled="isSyncing">
            <ion-icon
              slot="icon-only"
              :icon="refreshIcon"
              color="light"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="item in syncItems"
          :key="item.id"
          class="sync-item"
          lines="none"
        >
          <ion-icon :icon="item.icon" slot="start" color="success"></ion-icon>
          <ion-label>
            <h3>{{ item.title }}</h3>
            <p>{{ item.count }} éléments à synchroniser</p>
          </ion-label>
          <ion-spinner
            v-if="item.status === 'pending' && isSyncing"
            name="crescent"
            color="primary"
          ></ion-spinner>
          <ion-icon
            v-else
            :icon="checkmarkDone"
            color="success"
            slot="end"
          ></ion-icon>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button
          @click="startSync"
          :disabled="isSyncing || totalToSync === 0"
          color="primary"
        >
          <ion-icon :icon="isSyncing ? syncOutline : cloudUpload"></ion-icon>
        </ion-fab-button>
        <ion-label style="margin-right: 10px; color: #1b1c1d; font-weight: bold"
          >Envoyer</ion-label
        >
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
  syncOutline,
  cloudUpload,
  refresh as refreshIcon,
  documentText,
  people,
  leaf,
  analytics,
  checkmarkDone,
} from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  IonButtons,
  IonButton,
  IonSpinner,
} from '@ionic/vue';

interface SyncItem {
  id: number;
  title: string;
  count: number;
  icon: string;
  status: 'success' | 'pending';
}

export default defineComponent({
  name: 'SyncPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonFab,
    IonFabButton,
    IonButtons,
    IonButton,
    IonSpinner,
  },
  setup() {
    const isSyncing = ref(false);

    // Ces valeurs doivent être remplacées par vos données réelles
    const syncItems = ref<SyncItem[]>([
      {
        id: 1,
        title: 'Producteurs',
        count: 0,
        icon: people,
        status: 'pending',
      },
      {
        id: 2,
        title: 'Prospections',
        count: 0,
        icon: documentText,
        status: 'pending',
      },
      { id: 3, title: 'Champs', count: 0, icon: leaf, status: 'pending' },
      {
        id: 4,
        title: 'Plantes Attaquées',
        count: 0,
        icon: analytics,
        status: 'pending',
      },
      {
        id: 5,
        title: 'Échantillons',
        count: 0,
        icon: checkmarkDone,
        status: 'pending',
      },
    ]);

    const totalToSync = computed(() => {
      return syncItems.value.reduce((sum, item) => sum + item.count, 0);
    });

    const refreshData = async () => {
      // À remplacer par votre logique de rafraîchissement des données
      // Exemple:
      // const data = await fetchSyncData();
      // syncItems.value = data;
    };

    const startSync = async () => {
      isSyncing.value = true;

      try {
        // À remplacer par votre logique de synchronisation réelle
        // await syncAllData();

        // Simulation de succès
        syncItems.value = syncItems.value.map((item) => ({
          ...item,
          status: 'success',
          count: 0,
        }));
      } finally {
        isSyncing.value = false;
      }
    };

    return {
      isSyncing,
      syncItems,
      totalToSync,
      startSync,
      refreshData,
      syncOutline,
      cloudUpload,
      refreshIcon,
      documentText,
      people,
      leaf,
      analytics,
      checkmarkDone,
    };
  },
});
</script>

<style scoped>
.header-toolbar {
  --background: #4a5568;
  --color: white;
}

.sync-item {
  --background: white;
  --border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

ion-content {
  --background: #f8f9fa;
}

ion-fab-button {
  --background: #2dd36f;
}
</style>
