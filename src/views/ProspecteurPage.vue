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
        <ion-title>Formulaire Prospecteur</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="form-header">
            <h2>Informations du prospecteur</h2>
            <p>Renseignez les détails du prospecteur</p>
          </div>

          <ion-list class="custom-list">
            <!-- Nom -->
            <div class="input-group">
              <label>Nom</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="prospecteur.nomProspecteur"
                  placeholder="Entrez le nom"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Prénom -->
            <div class="input-group">
              <label>Prénom</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="prospecteur.prenProspecteur"
                  placeholder="Entrez le prénom"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Fonction -->
            <div class="input-group">
              <label>Fonction</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="prospecteur.fonction"
                  placeholder="Fonction du prospecteur"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Email -->
            <div class="input-group">
              <label>Email</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="prospecteur.email"
                  type="email"
                  placeholder="Adresse email"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Téléphone -->
            <div class="input-group">
              <label>Téléphone</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="prospecteur.tel"
                  type="tel"
                  placeholder="Numéro de téléphone"
                  required
                ></ion-input>
              </div>
            </div>

            <!-- Mot de passe -->
            <div class="input-group">
              <label>Mot de passe</label>
              <div class="input-wrapper">
                <ion-input
                  v-model="prospecteur.password"
                  type="password"
                  placeholder="............"
                  required
                ></ion-input>
              </div>
            </div>
          </ion-list>

          <!-- Bouton de validation -->
          <ion-button
            expand="block"
            class="submit-btn"
            @click="validateAndContinue"
          >
            Valider
          </ion-button>
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
  IonButton,
  toastController,
  alertController,
} from '@ionic/vue';
import Prospecteur from '@/Classes/Prospecteur';
import { arrowBack } from 'ionicons/icons';

export default defineComponent({
  name: 'ProspecteurPage',
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
    const router = useRouter();
    const prospecteur = reactive({
      nomProspecteur: '',
      prenProspecteur: '',
      fonction: '',
      email: '',
      tel: '',
      password: '',
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
          !prospecteur.nomProspecteur ||
          !prospecteur.prenProspecteur ||
          !prospecteur.fonction ||
          !prospecteur.email ||
          !prospecteur.tel ||
          !prospecteur.password
        ) {
          console.error('Veuillez remplir tous les champs obligatoires');
          return;
        }

        const prospecteurService = new Prospecteur();
        const result = await prospecteurService.create(prospecteur);

        if (result) {
          const alert = await alertController.create({
            header: 'Enregistrement réussi',
            message: `ID du prospecteur: ${result}`,
            buttons: [
              {
                text: 'Continuer',
                handler: () => {
                  router.push({
                    path: '/prospection',
                    query: { ID_Prospecteur: result.toString() },
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

    const goToLogin = () => {
      router.replace('/login');
    };

    return {
      prospecteur,
      validateAndContinue,
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
