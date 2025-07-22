<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>Formulaire Champs</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="form-header">
            <h2>Informations du champ</h2>
            <p>Renseignez les détails de la parcelle</p>
          </div>

          <ion-list class="custom-list">
            <!-- Culture -->
            <div class="input-group">
              <label>Culture</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="champs.culture"
                  placeholder="Type de culture"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Variété -->
            <div class="input-group">
              <label>Variété</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="champs.variete"
                  placeholder="Variété cultivée"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Superficie -->
            <div class="input-group">
              <label>Superficie Totale (ha)</label>
              <div class="input-wrapper">
                <ion-input
                  type="number"
                  v-model="champs.supTotal"
                  placeholder="Surface totale"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Superficie Infectée -->
            <div class="input-group">
              <label>Superficie Infectée (ha)</label>
              <div class="input-wrapper">
                <ion-input
                  type="number"
                  v-model="champs.supInfecte"
                  placeholder="Surface infectée"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Date de Semis -->
            <div class="input-group">
              <label>Date de Semis</label>
              <div class="calendar-wrapper">
                <ion-datetime
                  v-model="champs.dateSemi"
                  presentation="date"
                  locale="fr-FR"
                  class="improved-datetime"
                ></ion-datetime>
              </div>
            </div>

            <!-- Irrigation -->
            <div class="input-group">
              <label>Irrigation</label>
              <div class="input-wrapper">
                <ion-select
                  v-model="champs.irrigation"
                  interface="action-sheet"
                >
                  <ion-select-option value="OUI">OUI</ion-select-option>
                  <ion-select-option value="NON">NON</ion-select-option>
                </ion-select>
              </div>
            </div>

            <!-- Engrais -->
            <div class="input-group">
              <label>Engrais</label>
              <div class="input-wrapper">
                <ion-select v-model="champs.engrai" interface="action-sheet">
                  <ion-select-option value="ORGANIQUE"
                    >Organique</ion-select-option
                  >
                  <ion-select-option value="CHIMIQUE"
                    >Chimique</ion-select-option
                  >
                  <ion-select-option value="NON">Non</ion-select-option>
                </ion-select>
              </div>
            </div>

            <div class="input-group">
              <label>Stade de croissance</label>
              <ion-select
                v-model="champs.stadeCroissance"
                interface="action-sheet"
              >
                <ion-select-option value="SEMIS">Semis</ion-select-option>
                <ion-select-option value="GERMINATION"
                  >Germination</ion-select-option
                >
                <ion-select-option value="TRANSPLANTATION"
                  >Transplantation</ion-select-option
                >
                <ion-select-option value="VEGETATION"
                  >Végétation</ion-select-option
                >
                <ion-select-option value="FLORAISON"
                  >Floraison</ion-select-option
                >
                <ion-select-option value="NOUAISON">Nouaison</ion-select-option>
                <ion-select-option value="MONTASON"
                  >Montaison</ion-select-option
                >
                <ion-select-option value="FRUCTIFICATION"
                  >Fructification</ion-select-option
                >
                <ion-select-option value="MATURATION"
                  >Maturation</ion-select-option
                >
                <ion-select-option value="RECOLTE">Récolte</ion-select-option>
                <ion-select-option value="STOCKAGE">Stockage</ion-select-option>
              </ion-select>
            </div>

            <div class="input-group">
              <label>Santé générale</label>
              <ion-select v-model="champs.santeGle" interface="action-sheet">
                <ion-select-option value="BONNE">Bonne</ion-select-option>
                <ion-select-option value="LEGEREMENT_ATTAQUEE"
                  >Légèrement attaquée</ion-select-option
                >
                <ion-select-option value="MOYENNE">Moyenne</ion-select-option>
                <ion-select-option value="MAUVAISE">Mauvaise</ion-select-option>
                <ion-select-option value="COMPLETEMENT_DETRUITE"
                  >Complètement détruite</ion-select-option
                >
              </ion-select>
            </div>

            <div class="input-group">
              <label>Nom de la maladie/ravageur</label>
              <ion-input v-model="champs.nomRavageur"></ion-input>
            </div>

            <!-- Localisation GPS -->
            <div class="input-group">
              <label>Localisation</label>
              <div class="gps-wrapper">
                <ion-button
                  expand="block"
                  fill="outline"
                  @click="getCurrentLocation"
                  class="gps-button"
                >
                  <ion-icon slot="start" :icon="location"></ion-icon>
                  Obtenir la position
                </ion-button>
                <div v-if="locationLoading" class="gps-loading">
                  <ion-spinner name="crescent"></ion-spinner>
                  <span>Localisation en cours...</span>
                </div>
                <div v-if="champs.localisation" class="gps-coordinates">
                  {{ champs.localisation }}
                </div>
              </div>
            </div>
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
import { defineComponent, reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { location } from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput,
  IonButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonSpinner,
  toastController,
} from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import Champs from '@/Classes/Champs';
import { IChamps } from '@/Interfaces/IChamps';

export default defineComponent({
  name: 'ChampsPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonInput,
    IonButton,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonSpinner,
  },
  setup() {
    const router = useRouter();
    const champs = reactive<IChamps>({
      ID_Champs: 0,
      culture: '',
      variete: '',
      supTotal: 0,
      supInfecte: 0,
      dateSemi: new Date().toISOString(),
      irrigation: 'NON',
      engrai: 'NON',
      stadeCroissance: '',
      santeGle: '',
      nomRavageur: '',
      localisation: '',
      ID_Producteur: 0,
    });

    const locationLoading = ref(false);

    const showSuccessToast = async () => {
      const toast = await toastController.create({
        message: 'Champ enregistré avec succès',
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

    const getCurrentLocation = async () => {
      locationLoading.value = true;
      try {
        const position = await Geolocation.getCurrentPosition();
        champs.localisation = `${position.coords.latitude}, ${position.coords.longitude}`;
      } catch (error) {
        console.error('Erreur de géolocalisation:', error);
        await showErrorToast('Erreur lors de la géolocalisation');
        champs.localisation = 'Erreur de localisation';
      } finally {
        locationLoading.value = false;
      }
    };

    const isFormValid = computed(() => {
      return (
        champs.culture &&
        champs.variete &&
        champs.supTotal > 0 &&
        champs.localisation
      );
    });

    const validateAndContinue = async () => {
      try {
        // Validation des champs obligatoires
        if (
          !champs.culture ||
          !champs.variete ||
          !champs.supTotal ||
          !champs.supInfecte ||
          !champs.irrigation ||
          !champs.engrai ||
          !champs.nomRavageur ||
          !champs.santeGle ||
          !champs.stadeCroissance ||
          !champs.localisation ||
          !champs.dateSemi
        ) {
          await showErrorToast('Veuillez remplir tous les champs obligatoires');
          return;
        }

        const champsService = new Champs();
        const result = await champsService.create(champs);

        if (result) {
          console.log('Champ créé avec succès, ID:', result);
          await showSuccessToast();
          router.push('/plante-attaque');
        } else {
          await showErrorToast('Échec de la création du champ');
          console.error('Échec de la création du champ');
        }
      } catch (error) {
        await showErrorToast('Erreur lors de la création du champ');
        console.error('Erreur lors de la création du champ:', error);
      }
    };

    return {
      location,
      champs,
      locationLoading,
      getCurrentLocation,
      isFormValid,
      validateAndContinue,
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
  margin-bottom: 20px;
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

.input-wrapper ion-input,
.input-wrapper ion-select {
  --padding-top: 12px;
  --padding-bottom: 12px;
  --color: #1a202c;
}

/* Styles calendrier */
.calendar-wrapper {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.improved-datetime {
  --background: white;
  width: 100%;
}

/* Styles GPS */
.gps-wrapper {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px;
}

.gps-button {
  --border-color: #4a5568;
  --color: #4a5568;
}

.gps-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  color: #4a5568;
  font-size: 0.9rem;
}

.gps-coordinates {
  margin-top: 10px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 4px;
  font-family: monospace;
  text-align: center;
}

/* Bouton validation */
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

.submit-btn:disabled {
  --background: #cbd5e0;
  opacity: 0.7;
}
</style>
