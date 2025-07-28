<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goToLogin">
            <ion-icon
              slot="icon-only"
              :icon="arrowBack"
              color="light"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Accueil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <ion-grid class="compact-grid">
          <ion-row class="compact-row">
            <ion-col size="12" size-md="6" class="compact-col">
              <ion-card @click="goTo('Prospection')" class="square-card">
                <ion-card-header>
                  <ion-card-title>Nouvelle Prospection</ion-card-title>
                  <ion-card-subtitle
                    >Commencer une nouvelle visite</ion-card-subtitle
                  >
                </ion-card-header>
                <ion-card-content>
                  <ion-icon :icon="document" size="large"></ion-icon>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6" class="compact-col">
              <ion-card @click="goTo('ListeProducteur')" class="square-card">
                <ion-card-header>
                  <ion-card-title>Gestion Producteurs</ion-card-title>
                  <ion-card-subtitle>Liste des producteurs</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  <ion-icon :icon="people" size="large"></ion-icon>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>

          <ion-row class="compact-row">
            <ion-col size="12" class="compact-col">
              <ion-card @click="goTo('Sync')" class="sync-card">
                <ion-item lines="none">
                  <ion-icon :icon="sync" slot="start"></ion-icon>
                  <ion-label>Synchroniser les données</ion-label>
                </ion-item>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { arrowBack, document, people, sync } from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/vue';

export default defineComponent({
  name: 'AccueilPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
  },
  setup() {
    const router = useRouter();
    const pendingSync = ref(false);

    const goTo = (routeName: string) => {
      router.push({ name: routeName });
    };

    const goToLogin = () => {
      router.replace('/alogin');
    };

    return {
      document,
      people,
      sync,
      pendingSync,
      goTo,
      goToLogin,
      arrowBack,
    };
  },
});
</script>

<style scoped>
.header-toolbar {
  --background: #4a5568;
  --color: white;
}

.auth-content {
  --background: #ffffff;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 20px;
}

.compact-grid {
  width: 100%;
  max-width: 600px;
}

.compact-row {
  justify-content: center;
}

.compact-col {
  display: flex;
  justify-content: center;
}

.square-card {
  cursor: pointer;
  transition: transform 0.2s;
  --background: #2d3748;
  color: white;
  width: 250px;
  height: 250px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
}

.square-card:hover {
  transform: translateY(-5px);
}

.square-card ion-card-header {
  padding-bottom: 0;
  text-align: center;
}

.square-card ion-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
}

.square-card ion-card-subtitle {
  color: #e2e8f0;
  font-size: 0.9rem;
}

.square-card ion-card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0;
}

.square-card ion-icon {
  color: #38a169;
  font-size: 2.5rem;
}

.sync-card {
  --background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 250px;
  margin: 10px auto;
}

.sync-card ion-item {
  --background: transparent;
}

.sync-card ion-icon {
  color: #4a5568;
}

.sync-card ion-label {
  color: #2d3748;
  font-weight: 500;
}
</style>
