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
          <!-- Votre contenu existant reste inchangé -->
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

    <ion-footer class="footer">
      <ion-toolbar>
        <div class="footer-content">
          <ion-button
            @click="ouvrirContactNous"
            fill="clear"
            class="contact-button"
          >
            <ion-icon :icon="mail" slot="start"></ion-icon>
            Nous contacter
          </ion-button>
          <div class="copyright">© 2025 - DPV</div>
        </div>
      </ion-toolbar>
    </ion-footer>

    <ion-modal
      :is-open="contactNous"
      @didDismiss="contactNous = false"
      class="custom-modal"
    >
      <ion-header>
        <ion-toolbar class="modal-toolbar">
          <ion-title class="modal-title">Contactez-nous</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="contactNous = false" class="close-button">
              <ion-icon :icon="closeCircle" class="close-icon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="modal-content">
        <div class="modal-body">
          <ion-icon :icon="mailOutline" class="modal-icon"></ion-icon>
          <p class="modal-text">
            Les données collectées sont envoyées chez le service de lutte contre
            les organismes nuisibles de la DPV
          </p>
          <div class="email-section">
            <p class="email-text">Pour toute demande, contactez-nous à :</p>
            <a href="mailto:contact@dpv-exemple.com" class="email-link">
              contact@dpv-exemple.com
            </a>
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  arrowBack,
  document,
  mail,
  people,
  sync,
  closeCircle,
  mailOutline,
} from 'ionicons/icons';
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
  IonFooter,
  IonModal,
  IonButtons,
  IonButton,
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
    IonFooter,
    IonModal,
    IonButtons,
    IonButton,
  },
  setup() {
    const router = useRouter();
    const pendingSync = ref(false);

    const contactNous = ref(false);
    const ouvrirContactNous = () => {
      contactNous.value = true;
    };
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
      ouvrirContactNous,
      contactNous,
      mail,
      mailOutline,
      closeCircle,
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
  padding-bottom: 80px;
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

/* Styles pour le footer */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #4a5568;
  color: white;
}

.footer ion-toolbar {
  --background: #4a5568;
  --color: white;
  --padding-top: 0;
  --padding-bottom: 0;
  --min-height: 56px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
}

.contact-button {
  --color: white;
  --padding-start: 0;
  margin: 0;
}

.contact-button ion-icon {
  font-size: 20px;
  margin-right: 8px;
}

.copyright {
  font-size: 14px;
  opacity: 0.8;
}

.custom-modal {
  --width: 90%;
  --max-width: 400px;
  --border-radius: 16px;
  --box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-toolbar {
  --background: #4a5568;
  --color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  padding-left: 16px;
}

.close-button {
  --color: white;
  --padding-end: 8px;
}

.close-icon {
  font-size: 1.8rem;
  color: #f8f9fa;
  transition: transform 0.2s ease;
}

.close-button:hover .close-icon {
  transform: scale(1.1);
}

.modal-content {
  --background: #f8f9fa;
  --padding-top: 20px;
  --padding-bottom: 20px;
  --padding-start: 20px;
  --padding-end: 20px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-icon {
  font-size: 3rem;
  color: #4a5568;
  margin-bottom: 20px;
}

.modal-text {
  color: #495057;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.email-section {
  background: white;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.email-text {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.email-link {
  color: #38a169;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  word-break: break-all;
}

.email-link:hover {
  color: #2d3748;
  text-decoration: underline;
}
</style>
