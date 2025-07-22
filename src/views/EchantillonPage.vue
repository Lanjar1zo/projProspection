<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>Prélèvement d'Échantillons</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="form-header">
            <h2>Informations sur les échantillons</h2>
            <p>Renseignez les détails des prélèvements (optionnel)</p>
          </div>

          <ion-list class="custom-list">
            <!-- Nature -->
            <div class="input-group">
              <label>Nature</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="echantillon.nature"
                  placeholder="Nature de l'échantillon"
                ></ion-input>
              </div>
            </div>

            <!-- Poids -->
            <div class="input-group">
              <label>Poids (g)</label>
              <div class="input-wrapper">
                <ion-input
                  type="number"
                  v-model.number="echantillon.poids"
                  placeholder="Poids en grammes"
                ></ion-input>
              </div>
            </div>

            <!-- Nombre d'échantillons -->
            <div class="input-group">
              <label>Nombre d'échantillons</label>
              <div class="input-wrapper">
                <ion-input
                  type="number"
                  v-model.number="echantillon.nbrEchantillon"
                  placeholder="Quantité d'échantillons"
                ></ion-input>
              </div>
            </div>

            <!-- Analyses à faire - Liste déroulante -->
            <div class="input-group">
              <label>Analyses à faire</label>
              <div class="input-wrapper">
                <ion-select
                  v-model="echantillon.analyseAFaire"
                  interface="action-sheet"
                  placeholder="Sélectionner les analyses"
                >
                  <ion-select-option value="Champignons"
                    >Champignons</ion-select-option
                  >
                  <ion-select-option value="Bactéries"
                    >Bactéries</ion-select-option
                  >
                  <ion-select-option value="Virus">Virus</ion-select-option>
                  <ion-select-option value="Nématodes"
                    >Nématodes</ion-select-option
                  >
                  <ion-select-option value="Insectes"
                    >Insectes</ion-select-option
                  >
                </ion-select>
              </div>
            </div>

            <div class="input-group">
              <label>Prospection numero</label>
              <div class="input-wrapper">
                <ion-input
                  type="number"
                  v-model.number="echantillon.ID_Prospection"
                  placeholder="Numero du prospection"
                ></ion-input>
              </div>
            </div>
          </ion-list>

          <!-- Boutons d'action -->
          <div class="form-actions">
            <ion-button
              expand="block"
              fill="outline"
              class="secondary-btn"
              @click="skipEchantillon"
            >
              Passer (sans échantillon)
            </ion-button>

            <ion-button
              expand="block"
              class="submit-btn"
              @click="validateAndContinue"
            >
              Valider et continuer
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  toastController,
} from '@ionic/vue';
import { IEchantillon } from '@/Interfaces/IEchantillon';
import Echantillon from '@/Classes/Echantillon';

export default defineComponent({
  name: 'EchantillonPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
  },
  setup() {
    const router = useRouter();
    const echantillonService = new Echantillon();
    const echantillon = reactive<IEchantillon>({
      nature: '',
      poids: 0,
      nbrEchantillon: 0,
      analyseAFaire: '',
      ID_Prospection: 0,
    });

    const showSuccessToast = async () => {
      const toast = await toastController.create({
        message: 'Échantillon enregistré avec succès',
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
        // Validation des valeurs numériques
        if (echantillon.poids < 0 || echantillon.nbrEchantillon < 0) {
          await showErrorToast('Les valeurs numériques doivent être positives');
          return;
        }

        const id = await echantillonService.create(echantillon);
        console.log('Échantillon créé avec ID:', id);

        await showSuccessToast();
        router.push('/accueil');
      } catch (error) {
        console.error('Erreur:', error);
        await showErrorToast("Erreur lors de l'enregistrement");
      }
    };

    const skipEchantillon = () => {
      console.log('Aucun échantillon prélevé');
      showSuccessToast();
      router.push('/accueil');
    };

    return {
      echantillon,
      validateAndContinue,
      skipEchantillon,
    };
  },
});
</script>

<style scoped>
/* Styles identiques à la version précédente */
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

.input-wrapper {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 12px;
}

.input-wrapper ion-input,
.input-wrapper ion-select {
  --padding-top: 12px;
  --padding-bottom: 12px;
  width: 100%;
}

.form-actions {
  margin-top: 30px;
}

.submit-btn {
  --background: #38a169;
  --background-activated: #2f855a;
  --background-hover: #2f855a;
  --color: white;
  --border-radius: 8px;
  height: 50px;
  font-weight: 500;
  margin-top: 15px;
}

.secondary-btn {
  --border-color: #4a5568;
  --color: #4a5568;
  --border-radius: 8px;
  height: 50px;
  font-weight: 500;
}
</style>
