<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>Liste des Producteurs</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Barre de recherche -->
      <ion-searchbar
        v-model="searchTerm"
        placeholder="Rechercher un producteur..."
        animated
        @ionChange="filterProducteurs"
      ></ion-searchbar>

      <!-- Liste des producteurs -->
      <ion-list>
        <ion-item
          v-for="producteur in filteredProducteurs"
          :key="producteur.ID_Producteur"
          @click="showDetails(producteur)"
          button
          detail
        >
          <ion-label>
            <h2>{{ producteur.nomProd }}</h2>
            <p>CIN: {{ producteur.cin }}</p>
            <p>{{ producteur.fokotany }}, {{ producteur.commune }}</p>
          </ion-label>
          <ion-badge v-if="producteur.partenaire" color="success"
            >Partenaire</ion-badge
          >
        </ion-item>
      </ion-list>

      <!-- Message si liste vide -->
      <div v-if="filteredProducteurs.length === 0" class="empty-state">
        <ion-icon :icon="alertCircleOutline" size="large"></ion-icon>
        <p>Aucun producteur trouvé</p>
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
  IonLabel,
  IonBadge,
  IonSearchbar,
  IonIcon,
} from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import Producteur from '@/Classes/Producteur';
import IProducteur from '@/Interfaces/IProducteur';

export default defineComponent({
  name: 'ProducteursList',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonSearchbar,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    const producteurs = ref<IProducteur[]>([]);
    const filteredProducteurs = ref<IProducteur[]>([]);
    const searchTerm = ref('');

    // Charger les producteurs
    onMounted(async () => {
      const producteurService = new Producteur();
      producteurs.value = await producteurService.select();
      filteredProducteurs.value = producteurs.value;
    });

    // Filtrer la liste
    const filterProducteurs = () => {
      if (!searchTerm.value) {
        filteredProducteurs.value = producteurs.value;
        return;
      }

      const term = searchTerm.value.toLowerCase();
      filteredProducteurs.value = producteurs.value.filter(
        (p: IProducteur) =>
          p.nomProd.toLowerCase().includes(term) ||
          p.cin.toString().includes(term) ||
          p.fokotany.toLowerCase().includes(term) ||
          p.commune.toLowerCase().includes(term)
      );
    };

    // Afficher les détails
    const showDetails = (producteur: IProducteur) => {
      router.push(`/producteurs/${producteur.ID_Producteur}`);
    };

    return {
      alertCircleOutline,
      producteurs,
      filteredProducteurs,
      searchTerm,
      filterProducteurs,
      showDetails,
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
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 8px;
  border-radius: 8px;
}

ion-item h2 {
  font-weight: 600;
}

ion-badge {
  margin-left: 8px;
}
</style>
