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
        <ion-title>Plante Attaquée</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="form-header">
            <h2>Évaluation des dégâts</h2>
            <p>Évaluez l'infestation sur 5 points de la parcelle</p>
          </div>

          <ion-list class="custom-list">
            <!-- Point 1 -->
            <div class="input-group">
              <label>Point 1 (0-10)</label>
              <div class="range-wrapper">
                <ion-range
                  v-model="planteAttaque.point1"
                  :min="0"
                  :max="10"
                  :pin="true"
                  class="custom-range"
                  @ionChange="updateTauxInfestation"
                >
                  <ion-label slot="start">0</ion-label>
                  <ion-label slot="end">10</ion-label>
                </ion-range>
              </div>
            </div>

            <!-- Point 2 -->
            <div class="input-group">
              <label>Point 2 (0-10)</label>
              <div class="range-wrapper">
                <ion-range
                  v-model="planteAttaque.point2"
                  :min="0"
                  :max="10"
                  :pin="true"
                  class="custom-range"
                  @ionChange="updateTauxInfestation"
                >
                  <ion-label slot="start">0</ion-label>
                  <ion-label slot="end">10</ion-label>
                </ion-range>
              </div>
            </div>

            <!-- Point 3 -->
            <div class="input-group">
              <label>Point 3 (0-10)</label>
              <div class="range-wrapper">
                <ion-range
                  v-model="planteAttaque.point3"
                  :min="0"
                  :max="10"
                  :pin="true"
                  class="custom-range"
                  @ionChange="updateTauxInfestation"
                >
                  <ion-label slot="start">0</ion-label>
                  <ion-label slot="end">10</ion-label>
                </ion-range>
              </div>
            </div>

            <!-- Point 4 -->
            <div class="input-group">
              <label>Point 4 (0-10)</label>
              <div class="range-wrapper">
                <ion-range
                  v-model="planteAttaque.point4"
                  :min="0"
                  :max="10"
                  :pin="true"
                  class="custom-range"
                  @ionChange="updateTauxInfestation"
                >
                  <ion-label slot="start">0</ion-label>
                  <ion-label slot="end">10</ion-label>
                </ion-range>
              </div>
            </div>

            <!-- Point 5 -->
            <div class="input-group">
              <label>Point 5 (0-10)</label>
              <div class="range-wrapper">
                <ion-range
                  v-model="planteAttaque.point5"
                  :min="0"
                  :max="10"
                  :pin="true"
                  class="custom-range"
                  @ionChange="updateTauxInfestation"
                >
                  <ion-label slot="start">0</ion-label>
                  <ion-label slot="end">10</ion-label>
                </ion-range>
              </div>
            </div>

            <!-- Taux d'infestation -->
            <div class="input-group">
              <label>Taux d'Infestation</label>
              <div
                class="infestation-badge"
                :class="getInfestationClass(planteAttaque.tauxInfestation)"
              >
                {{ planteAttaque.tauxInfestation }}%
              </div>
            </div>

            <input type="" v-model="planteAttaque.ID_Champs" />
          </ion-list>

          <!-- Bouton unique -->
          <ion-button
            expand="block"
            class="submit-btn"
            @click="validateAndContinue"
            :disabled="!isFormValid"
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
  IonLabel,
  IonRange,
  IonButton,
  toastController,
  alertController,
} from '@ionic/vue';
import { IPlante_attaque } from '@/Interfaces/IPlante_attaque';
import { Plante_Attaque } from '@/Model/Plante_attaque';
import { arrowBack } from 'ionicons/icons';

export default defineComponent({
  name: 'PlanteAttaquePage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonLabel,
    IonRange,
    IonButton,
  },
  setup() {
    const route = useRoute();

    const router = useRouter();
    const planteAttaque = reactive<IPlante_attaque>({
      point1: 0,
      point2: 0,
      point3: 0,
      point4: 0,
      point5: 0,
      tauxInfestation: 0,
      ID_Champs: parseInt(route.query.ID_Champs as string) || 0,
    });

    const appInstance = getCurrentInstance();
    const planteAttaqueModel = new Plante_Attaque(appInstance);

    const updateTauxInfestation = () => {
      planteAttaque.tauxInfestation =
        (planteAttaque.point1 +
          planteAttaque.point2 +
          planteAttaque.point3 +
          planteAttaque.point4 +
          planteAttaque.point5) *
        2;
    };

    const getInfestationClass = (taux: number) => {
      if (taux < 30) return 'low';
      if (taux < 70) return 'medium';
      return 'high';
    };

    const isFormValid = computed(() => {
      return planteAttaque.ID_Champs > 0;
    });

    const showSuccessToast = async () => {
      const toast = await toastController.create({
        message: 'Évaluation enregistrée avec succès',
        duration: 3000,
        color: 'success',
        position: 'top',
      });
      await toast.present();
    };

    const showErrorToast = async (message: string) => {
      const toast = await toastController.create({
        message: message,
        duration: 3000,
        color: 'danger',
        position: 'top',
      });
      await toast.present();
    };

    const validateAndContinue = async () => {
      try {
        // Calcul du taux d'infestation
        updateTauxInfestation();

        const result = await planteAttaqueModel.create({
          point1: planteAttaque.point1,
          point2: planteAttaque.point2,
          point3: planteAttaque.point3,
          point4: planteAttaque.point4,
          point5: planteAttaque.point5,
          tauxInfestation: planteAttaque.tauxInfestation,
          ID_Champs: planteAttaque.ID_Champs,
        });

        if (result) {
          console.log('Évaluation créée avec ID:', result);

          const alert = await alertController.create({
            header: 'Évaluation enregistrée',
            message: `
                ID: ${result}
                Taux d'infestation: ${planteAttaque.tauxInfestation}%
            `,
            buttons: [
              {
                text: 'Continuer',
                handler: () => {
                  router.push({
                    path: '/partie-plante',
                    query: { ID_PlanteAttaque: result.toString() },
                  });
                },
              },
            ],
          });

          await alert.present();
          await showSuccessToast();
        } else {
          await showErrorToast("Erreur lors de l'enregistrement");
          console.error("Erreur lors de la création de l'évaluation");
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        await showErrorToast(
          "Une erreur s'est produite lors de l'enregistrement"
        );
      }
    };

    const goTo = () => {
      router.replace('/champs');
    };

    return {
      planteAttaque,
      updateTauxInfestation,
      getInfestationClass,
      isFormValid,
      goTo,
      arrowBack,
      validateAndContinue,
    };
  },
});
</script>
<style scoped>
/* Styles de base */
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

/* Groupes de champs */
.input-group {
  margin-bottom: 25px;
}

.input-group label {
  display: block;
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 10px;
}

/* Range personnalisé */
.range-wrapper {
  padding: 0 10px;
}

.custom-range {
  --bar-background: #e2e8f0;
  --bar-background-active: #38a169;
  --knob-background: #38a169;
  --pin-background: #38a169;
  --pin-color: white;
}

/* Badge d'infestation */
.infestation-badge {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 5px;
}

.infestation-badge.low {
  background-color: #f0fff4;
  color: #38a169;
}

.infestation-badge.medium {
  background-color: #feebc8;
  color: #b7791f;
}

.infestation-badge.high {
  background-color: #fed7d7;
  color: #c53030;
}

/* Champ ID */
.input-wrapper {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 12px;
}

.input-wrapper ion-input {
  --padding-top: 12px;
  --padding-bottom: 12px;
}

/* Bouton de validation */
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

.submit-btn:disabled {
  --background: #cbd5e0;
  opacity: 0.7;
}
</style>
