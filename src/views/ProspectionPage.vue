<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goTo">
            <ion-icon
              slot="icon-only"
              :icon="arrowBack"
              color="light"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Nouvelle Prospection</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="form-header">
            <h2>Nouvelle prospection</h2>
            <p>Sélectionnez la date</p>
          </div>

          <!-- Champ Prospecteur 
          <div class="input-group">
            <label>Prospecteur</label>
            <div class="input-wrapper">
              <ion-input
                :value="prospection.ID_Prospecteur"
                readonly
              ></ion-input>
            </div>
          </div> -->

          <input type="hidden" v-model="prospection.ID_Prospecteur" />

          <div class="input-group">
            <label>Date du prospection</label>
            <div class="calendar-wrapper">
              <ion-datetime
                presentation="date"
                locale="fr-FR"
                v-model="prospection.date"
                class="improved-datetime"
              ></ion-datetime>
            </div>
          </div>

          <ion-button
            expand="block"
            class="submit-btn"
            @click="validateAndContinue"
            router-link="/producteur"
          >
            Suivant
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { arrowBack, calendar } from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  IonButton,
  toastController,
  alertController,
} from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { IProspection } from '@/Interfaces/IProspection';
import Prospection from '@/Classes/Prospection';

export default defineComponent({
  name: 'ProspectionPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonButton,
  },
  setup() {
    const route = useRoute();

    const router = useRouter();
    const prospection = reactive<IProspection>({
      ID_Prospecteur: parseInt(route.query.ID_Prospecteur as string) || 0,
      date: new Date().toISOString(),
    });

    const showToast = async (message: string, color: string = 'success') => {
      const toast = await toastController.create({
        message,
        duration: 3000,
        color,
        position: 'top',
      });
      await toast.present();
    };

    const goTo = () => {
      router.push('/accueil');
    };

    const validateAndContinue = async () => {
      try {
        const prospectionService = new Prospection();
        const result = await prospectionService.create(prospection);

        if (result) {
          console.log('Prospection créée avec ID:', result);
          const alert = await alertController.create({
            header: 'Enregistrement réussi',
            message: `Prospection créée avec ID: ${result}`,
            buttons: [
              {
                text: 'Continuer',
                handler: () => {
                  router.push({
                    path: '/producteur',
                    query: {
                      ID_Prospecteur: prospection.ID_Prospecteur,
                    },
                  });
                },
              },
            ],
          });

          await alert.present();
          await showToast('Enregistrement réussi');
        } else {
          throw new Error('Échec de la création');
        }
      } catch (error) {
        console.error('Erreur:', error);
        await showToast("Erreur lors de l'enregistrement", 'danger');
      }
    };

    return {
      calendar,
      prospection,
      validateAndContinue,
      goTo,
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

.form-container {
  width: 100%;
  max-width: 500px;
  padding: 20px;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.form-header p {
  color: #718096;
  font-size: 0.9rem;
}

.input-group {
  margin-bottom: 25px;
}

.input-group label {
  display: block;
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.input-wrapper {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0 12px;
  transition: border-color 0.3s;
}

.input-wrapper:hover {
  border-color: #cbd5e0;
}

.submit-btn {
  --background: #38a169;
  --background-activated: #2f855a;
  --background-hover: #2f855a;
  --color: white;
  --border-radius: 6px;
  height: 48px;
  font-weight: 500;
  margin-top: 20px;
}

.submit-btn ion-icon {
  margin-right: 8px;
}

/* Styles spécifiques pour le calendrier */
.calendar-wrapper {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  display: flex;
  justify-content: center;
}

.improved-datetime {
  --background: white;
  width: 100%;
  max-width: 320px;

  /* Jours */
  --day-width: 40px;
  --day-height: 40px;
  --day-border-radius: 50%;

  /* Sélection */
  --day-highlight-color-selected: #38a169;
  --day-highlight-background-selected: rgba(56, 161, 105, 0.1);
}
</style>
