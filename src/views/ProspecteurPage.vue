<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>FORMULAIRE D'INSCRIPTION</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="form-content">
      <div class="form-wrapper">
        <form @submit.prevent="handleSubmit">
          <!-- Nom -->
          <div class="input-group">
            <label>Nom</label>
            <div class="input-wrapper">
              <ion-input
                v-model="prospecteur.nomProspecteur"
                required
                type="text"
              ></ion-input>
            </div>
          </div>

          <!-- Prénom -->
          <div class="input-group">
            <label>Prénom</label>
            <div class="input-wrapper">
              <ion-input
                v-model="prospecteur.prenProspecteur"
                required
                type="text"
              ></ion-input>
            </div>
          </div>

          <!-- Fonction -->
          <div class="input-group">
            <label>Fonction</label>
            <div class="input-wrapper">
              <ion-input
                v-model="prospecteur.fonction"
                required
                type="text"
              ></ion-input>
            </div>
          </div>

          <!-- Email -->
          <div class="input-group">
            <label>Email</label>
            <div class="input-wrapper">
              <ion-input
                v-model="prospecteur.email"
                required
                type="email"
              ></ion-input>
            </div>
          </div>

          <!-- Téléphone -->
          <div class="input-group">
            <label>Téléphone</label>
            <div class="input-wrapper">
              <ion-input
                v-model="prospecteur.tel"
                required
                type="tel"
              ></ion-input>
            </div>
          </div>

          <!-- Mot de passe -->
          <div class="input-group">
            <label>Mot de passe</label>
            <div class="input-wrapper">
              <ion-input
                v-model="prospecteur.password"
                required
                type="password"
              ></ion-input>
            </div>
          </div>

          <div class="button-row">
            <ion-button fill="outline" class="cancel-btn" @click="goToLogin">
              Annuler
            </ion-button>

            <ion-button type="submit" class="validate-btn">
              Valider
            </ion-button>
          </div>
        </form>
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
  IonInput,
  IonButton,
} from '@ionic/vue';
import Prospecteur from '@/Classes/Prospecteur';

export default defineComponent({
  name: 'ProspecteurPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
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

    const handleSubmit = async () => {
      try {
        const prospecteurService = new Prospecteur();
        const result = await prospecteurService.create(prospecteur);

        if (result) {
          console.log('Prospecteur créé avec succès, ID:', result);
          router.push('/prospection');
        } else {
          console.error('Échec de la création du prospecteur');
        }
      } catch (error) {
        console.error('Erreur lors de la création du prospecteur:', error);
      }
    };

    const goToLogin = () => {
      router.replace('/login');
    };

    return {
      prospecteur,
      handleSubmit,
      goToLogin,
    };
  },
});
</script>

<style scoped>
.header-toolbar {
  --background: #4a5568;
  --color: white;
}

.form-content {
  --background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
  min-height: calc(100vh - 72px);
}

.form-wrapper {
  width: 100%;
  max-width: 600px;
  padding: 20px;
}

.input-group {
  margin-bottom: 24px;
}

.input-group label {
  display: block;
  color: #4a5568;
  font-size: 0.95rem;
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

.button-row {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
  padding: 0 16px;
}

.validate-btn {
  --background: #38a169;
  --background-activated: #2f855a;
  --background-hover: #2f855a;
  --color: white;
  --border-radius: 8px;
  flex: 1;
  max-width: 200px;
  height: 48px;
  font-weight: 500;
}

.cancel-btn {
  --color: #4a5568;
  --border-color: #cbd5e0;
  --color-activated: #2d3748;
  --border-radius: 8px;
  flex: 1;
  max-width: 200px;
  height: 48px;
  font-weight: 500;
}
</style>
