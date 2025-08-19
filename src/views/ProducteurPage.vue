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
        <ion-title>Formulaire Producteur</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="form-header">
            <h2>Informations du producteur</h2>
            <p>Renseignez les détails du producteur</p>
          </div>

          <ion-list class="custom-list">
            <!-- Nom -->
            <div class="input-group">
              <label>Nom</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="producteur.nomProd"
                  placeholder="Entrez le nom complet"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- CIN -->
            <div class="input-group">
              <label>CIN</label>
              <div class="input-wrapper">
                <ion-input
                  type="number"
                  v-model="producteur.cin"
                  placeholder="Numéro CIN"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Partenaire -->
            <div class="input-group">
              <label>Partenaire</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="producteur.partenaire"
                  placeholder="Nom du partenaire"
                ></ion-input>
              </div>
            </div>

            <!-- Région -->
            <div class="input-group">
              <label>Région</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="producteur.region"
                  placeholder="Nom de la région"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- District -->
            <div class="input-group">
              <label>District</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="producteur.district"
                  placeholder="Nom du district"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Commune -->
            <div class="input-group">
              <label>Commune</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="producteur.commune"
                  placeholder="Nom de la commune"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Fokontany -->
            <div class="input-group">
              <label>Fokontany</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="producteur.fokotany"
                  placeholder="Nom du fokontany"
                  required
                ></ion-input>
              </div>
            </div>
          </ion-list>

          <!-- Bouton unique de validation et redirection -->
          <ion-button
            expand="block"
            class="submit-btn"
            @click="validateAndContinue"
            router-link="/champs"
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
import { useRoute, useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput,
  IonButton,
  toastController,
  alertController,
} from '@ionic/vue';
import Producteur from '@/Classes/Producteur';
import { arrowBack } from 'ionicons/icons';

interface IProducteur {
  nomProd: string;
  cin: number;
  partenaire: string;
  region: string;
  district: string;
  commune: string;
  fokotany: string;
  ID_Prospecteur: number;
}

export default defineComponent({
  name: 'ProducteurPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonInput,
    IonButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const producteur = reactive<IProducteur>({
      nomProd: '',
      cin: 0,
      partenaire: '',
      region: '',
      district: '',
      commune: '',
      fokotany: '',
      ID_Prospecteur: parseInt(route.query.ID_Prospecteur as string) || 0,
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

    const validateAndContinue = async () => {
      try {
        if (
          !producteur.nomProd ||
          !producteur.cin ||
          !producteur.fokotany ||
          !producteur.commune ||
          !producteur.district ||
          !producteur.region
        ) {
          await showToast('Veuillez remplir tous les champs obligatoires');
        } else if (producteur.cin.toString().length != 12) {
          await showToast('Le CIN doit contenir 12 chiffres.');
        } else {
          const producteurService = new Producteur();
          const result = await producteurService.create(producteur);

          if (result) {
            console.log('Partie plante créée avec ID:', result);

            const alert = await alertController.create({
              header: 'Enregistrement réussi',
              message: `ID du producteur: ${result}`,
              buttons: [
                {
                  text: 'Continuer',
                  handler: () => {
                    router.push({
                      path: '/champs',
                      query: { ID_Producteur: result.toString() },
                    });
                  },
                },
              ],
            });

            await alert.present();
            await showToast('Enregistrement réussi');
          } else {
            throw new Error('Echec de la création.');
          }
        }
      } catch (error) {
        console.error('Erreur:', error);
        await showToast("Erreur lors de l'enregistrement", 'danger');
      }
      router.push('/champs');
    };

    const goTo = () => {
      router.replace('/prospection');
    };

    return {
      producteur,
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

.custom-list {
  background: transparent;
  padding: 0;
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

.input-wrapper ion-input {
  --padding-top: 12px;
  --padding-bottom: 12px;
  --color: #1a202c;
}

.submit-btn {
  --background: #38a169;
  --background-activated: #2f855a;
  --background-hover: #2f855a;
  --color: white;
  --border-radius: 6px;
  height: 48px;
  font-weight: 500;
  margin-top: 30px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>
