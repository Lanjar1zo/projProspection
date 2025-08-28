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
        <ion-title>Partie Plante Attaquée</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="form-header">
            <h2>Parties affectées</h2>
            <p>Sélectionnez les parties de la plante attaquées</p>
          </div>

          <ion-list class="custom-list">
            <!-- Cases à cocher pour chaque partie -->
            <ion-item v-for="partie in partiesPlante" :key="partie.value">
              <ion-checkbox
                slot="start"
                :value="partie.value"
                :checked="partiePlante.partiePlante.includes(partie.value)"
                @ionChange="togglePartiePlante(partie.value)"
              ></ion-checkbox>
              <ion-label>{{ partie.label }}</ion-label>
            </ion-item>
          </ion-list>

          <input type="hidden" v-model="partiePlante.ID_PlanteAttaque" />

          <!-- Bouton unique -->
          <ion-button
            expand="block"
            class="submit-btn"
            @click="validateAndContinue"
          >
            Valider et continuer
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonButton,
  toastController,
  alertController,
} from '@ionic/vue';
import { Partie_Plante } from '@/Model/Partie_plante';
import { IPartie_plante } from '@/Interfaces/IPartie_plante';
import { arrowBack } from 'ionicons/icons';

export default defineComponent({
  name: 'PartiePlantePage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const partiePlante = reactive<IPartie_plante>({
      partiePlante: [],
      ID_PlanteAttaque: parseInt(route.query.ID_PlanteAttaque as string) || 0,
    });

    const appInstance = getCurrentInstance();
    const partiePlanteModel = new Partie_Plante(appInstance);

    const partiesPlante = [
      { value: 'Racines', label: 'Racines' },
      { value: 'Collet', label: 'Collet' },
      { value: 'Tiges/Troncs', label: 'Tiges/Troncs' },
      { value: 'Feuilles', label: 'Feuilles' },
      { value: 'Fleurs/Inflorescence', label: 'Fleurs/Inflorescence' },
      { value: 'Fruits/Graines', label: 'Fruits/Graines' },
      { value: 'Plantes entières', label: 'Plantes entières' },
    ];

    const isFormValid = computed(() => {
      return (
        partiePlante.partiePlante.length > 0 &&
        partiePlante.ID_PlanteAttaque > 0
      );
    });

    const togglePartiePlante = (partie: string) => {
      const index = partiePlante.partiePlante.indexOf(partie);
      if (index > -1) {
        partiePlante.partiePlante.splice(index, 1);
      } else {
        partiePlante.partiePlante.push(partie);
      }
    };

    const showToast = async (message: string, color: string = 'success') => {
      const toast = await toastController.create({
        message,
        duration: 3000,
        color,
        position: 'top',
      });
      await toast.present();
    };

    const validateAndContinue = async () => {
      try {
        const result = await partiePlanteModel.create({
          partiePlante: partiePlante.partiePlante,
          ID_PlanteAttaque: partiePlante.ID_PlanteAttaque,
        });

        if (result) {
          console.log('Partie plante créée avec ID:', result);

          const alert = await alertController.create({
            header: 'Enregistrement réussi',
            message: `ID de la partie plante: ${result}`,
            buttons: [
              {
                text: 'Continuer',
                handler: () => {
                  router.push({
                    path: '/symptome',
                    query: { ID_PartiePlante: result.toString() },
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

    const goTo = () => {
      router.replace('/plante-attaque');
    };

    return {
      goTo,
      arrowBack,
      partiePlante,
      partiesPlante,
      isFormValid,
      togglePartiePlante,
      validateAndContinue,
    };
  },
});
</script>

<style scoped>
/* Styles inchangés */
.header-toolbar {
  --background: #4a5568;
  --color: white;
}

.auth-content {
  --background: #f8fafc;
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
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 25px;
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

.custom-list {
  background: transparent;
  padding: 0;
}

.input-group {
  margin-bottom: 25px;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --border-color: #e2e8f0;
}

ion-checkbox {
  --size: 20px;
  --checkbox-background-checked: #38a169;
  --border-color-checked: #38a169;
  margin-right: 15px;
}

.submit-btn {
  --background: #38a169;
  --background-activated: #2f855a;
  --background-hover: #2f855a;
  --color: white;
  --border-radius: 8px;
  height: 50px;
  font-weight: 500;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(56, 161, 105, 0.3);
}
</style>
