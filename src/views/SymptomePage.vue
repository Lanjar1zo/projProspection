<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>Description des Symptômes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="input-group">
            <label>Partie plante numero</label>
            <div class="input-wrapper">
              <ion-input
                type="number"
                v-model.number="symptome.ID_PartiePlante"
                placeholder="Numero de la partie plante"
              ></ion-input>
            </div>
          </div>

          <div class="form-header">
            <h2>Symptômes observés</h2>
            <p>Cochez tous les symptômes constatés</p>
          </div>

          <ion-list class="custom-list">
            <!-- Cases à cocher pour chaque symptôme -->
            <ion-item v-for="symptom in symptomesList" :key="symptom.value">
              <ion-checkbox
                slot="start"
                :value="symptom.value"
                :checked="symptome.description.includes(symptom.value)"
                @ionChange="toggleSymptom(symptom.value)"
              ></ion-checkbox>
              <ion-label>{{ symptom.label }}</ion-label>
            </ion-item>
          </ion-list>

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
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
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
} from '@ionic/vue';
import Symptome from '@/Classes/Symptome';
import { ISymptome } from '@/Interfaces/ISymptome';

export default defineComponent({
  name: 'SymptomePage',
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
    const router = useRouter();
    const symptome = reactive<ISymptome>({
      description: [] as string[],
      ID_PartiePlante: 0,
    });

    const symptomesList = [
      { value: 'Egratignure', label: 'Egratignure' },
      { value: 'Coupe', label: 'Coupe' },
      { value: 'Jaunissement', label: 'Jaunissement' },
      { value: 'Flétrissement', label: 'Flétrissement' },
      { value: 'Enroulement', label: 'Enroulement' },
      { value: 'Déformation', label: 'Déformation' },
      { value: 'Perforation', label: 'Perforation' },
      { value: 'Tâche', label: 'Tâche' },
      { value: 'Présence de mines', label: 'Présence de mines' },
      { value: 'Présence de galeries', label: 'Présence de galeries' },
      { value: 'Mosaïque', label: 'Mosaïque' },
      { value: 'Lésion', label: 'Lésion' },
      { value: 'Craquelure', label: 'Craquelure' },
      { value: 'Chancre', label: 'Chancre' },
      { value: 'Nécrose', label: 'Nécrose' },
      { value: 'Déperissement', label: 'Déperissement' },
      { value: 'Dessèchement', label: 'Dessèchement' },
      { value: 'Pourriture', label: 'Pourriture' },
      { value: 'Pourriture du coeur', label: 'Pourriture du coeur' },
      { value: 'Moisissures', label: 'Moisissure' },
      { value: 'Trous', label: 'Trous' },
      { value: 'Rongé', label: 'Rongé' },
      { value: 'Autres', label: 'Autres' },
    ];

    const toggleSymptom = (symptom: string) => {
      const index = symptome.description.indexOf(symptom);
      if (index > -1) {
        symptome.description.splice(index, 1);
      } else {
        symptome.description.push(symptom);
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
        const symptomeService = new Symptome();
        const result = await symptomeService.create(symptome);

        if (result) {
          console.log('Partie plante créée avec ID:', result);
          await showToast('Enregistrement réussi');
          router.push('/echantillon');
        } else {
          throw new Error('Échec de la création');
        }
      } catch (error) {
        console.error('Erreur:', error);
        await showToast("Erreur lors de l'enregistrement", 'danger');
      }
    };

    return {
      symptome,
      symptomesList,
      toggleSymptom,
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

/* Liste et cases à cocher */
.custom-list {
  background: transparent;
  padding: 0;
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
</style>
