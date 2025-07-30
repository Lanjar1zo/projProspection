<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon
              slot="icon-only"
              :icon="arrowBack"
              color="light"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Liste des Prospections</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Barre de recherche simple -->
      <ion-searchbar
        v-model="searchQuery"
        placeholder="Rechercher par date (JJ/MM/AAAA)..."
        :debounce="500"
        @ionInput="filterProspections"
      ></ion-searchbar>

      <!-- Liste des prospections -->
      <ion-list>
        <ion-item-sliding
          v-for="prospection in filteredProspections"
          :key="prospection.ID_Prospection"
        >
          <ion-item>
            <ion-label>
              <h2>Prospection #{{ prospection.ID_Prospection }}</h2>
              <p>{{ formatDate(prospection.date) }}</p>
              <p>
                Prospecteur:
                {{ getProspecteurName(prospection.ID_Prospecteur) }}
              </p>
            </ion-label>
            <ion-badge slot="end" color="medium">
              {{ countEchantillons(prospection.ID_Prospection) }} échant.
            </ion-badge>
          </ion-item>

          <ion-item-options side="end">
            <ion-item-option color="primary" @click="viewDetails(prospection)">
              <ion-icon slot="icon-only" :icon="eye"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <!-- Message si liste vide -->
      <div v-if="filteredProspections.length === 0" class="empty-state">
        <ion-icon :icon="alertCircleOutline" size="large"></ion-icon>
        <p>Aucune prospection trouvée</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonBadge,
  IonSearchbar,
  IonIcon,
} from '@ionic/vue';
import { arrowBack, alertCircleOutline, eye } from 'ionicons/icons';
import Prospection from '@/Classes/Prospection';
import Prospecteur from '@/Classes/Prospecteur';
import Echantillon from '@/Classes/Echantillon';

// Fonction utilitaire pour formater les nombres sur 2 chiffres
function padNumber(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

export default defineComponent({
  name: 'ListeProspectionPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonBadge,
    IonSearchbar,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    const prospections = ref<any[]>([]);
    const filteredProspections = ref<any[]>([]);
    const prospecteurs = ref<any[]>([]);
    const echantillons = ref<any[]>([]);
    const searchQuery = ref<string>('');

    // Charger les données initiales
    onMounted(async () => {
      const prospectionService = new Prospection();
      const prospecteurService = new Prospecteur();
      const echantillonService = new Echantillon();

      prospections.value = await prospectionService.select();
      prospecteurs.value = await prospecteurService.select();
      echantillons.value = await echantillonService.select();

      filteredProspections.value = prospections.value;
    });

    // Filtrer par recherche textuelle
    const filterProspections = () => {
      if (!searchQuery.value) {
        filteredProspections.value = prospections.value;
        return;
      }

      const query = searchQuery.value.toLowerCase();
      filteredProspections.value = prospections.value.filter((p: any) => {
        const dateFormatted = formatDate(p.date).toLowerCase();
        return dateFormatted.includes(query);
      });
    };

    // Formater la date
    const formatDate = (dateString: string | Date) => {
      const date = new Date(dateString);
      const day = padNumber(date.getDate());
      const month = padNumber(date.getMonth() + 1);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Nom du prospecteur
    const getProspecteurName = (id: number) => {
      const prospecteur = prospecteurs.value.find(
        (p) => p.ID_Prospecteur === id
      );
      return prospecteur
        ? `${prospecteur.nomProspecteur} ${prospecteur.prenProspecteur}`
        : 'Inconnu';
    };

    // Compter les échantillons
    const countEchantillons = (prospectionId: number) => {
      return echantillons.value.filter(
        (e) => e.ID_Prospection === prospectionId
      ).length;
    };

    // Voir les détails
    const viewDetails = (prospection: any) => {
      console.log('Détails:', prospection);
      // router.push(`/prospection/${prospection.ID_Prospection}`);
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      arrowBack,
      alertCircleOutline,
      eye,
      searchQuery,
      prospections,
      filteredProspections,
      filterProspections,
      formatDate,
      getProspecteurName,
      countEchantillons,
      viewDetails,
      goBack,
    };
  },
});
</script>

<style scoped>
.header-toolbar {
  --background: #4a5568;
  --color: white;
}

.empty-state {
  text-align: center;
  margin-top: 40px;
  color: #666;
}

.empty-state ion-icon {
  color: #aaa;
  font-size: 48px;
  margin-bottom: 16px;
}

ion-item {
  --padding-start: 10px;
  --inner-padding-end: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  --border-radius: 8px;
}

ion-item h2 {
  font-weight: 600;
  margin-bottom: 5px;
}

ion-item p {
  color: #666;
  margin: 3px 0;
}

ion-badge {
  margin-left: 8px;
}
</style>
