<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goToHome">
            <ion-icon
              slot="icon-only"
              :icon="arrowBack"
              color="light"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Synchronisation</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refreshData" :disabled="isSyncing">
            <ion-icon
              slot="icon-only"
              :icon="refreshIcon"
              color="light"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="item in syncItems"
          :key="item.id"
          class="sync-item"
          lines="none"
        >
          <ion-icon :icon="item.icon" slot="start" color="success"></ion-icon>
          <ion-label>
            <h3>{{ item.title }}</h3>
            <p>{{ item.count }} éléments à synchroniser</p>
          </ion-label>
          <ion-spinner
            v-if="item.status === 'pending' && isSyncing"
            name="crescent"
            color="success"
          ></ion-spinner>
          <ion-icon
            v-else-if="item.status === 'success'"
            :icon="checkmarkDone"
            color="success"
            slot="end"
          ></ion-icon>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button
          @click="startSync"
          :disabled="isSyncing || totalToSync === 0"
          color="success"
        >
          <ion-icon
            :icon="isSyncing ? syncOutline : cloudUpload"
            color="light"
          ></ion-icon>
        </ion-fab-button>
        <ion-label style="margin-right: 10px; color: #1b1c1d; font-weight: bold"
          >Envoyer</ion-label
        >
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  getCurrentInstance,
} from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { Network } from '@capacitor/network';

import {
  syncOutline,
  cloudUpload,
  refresh as refreshIcon,
  documentText,
  people,
  leaf,
  analytics,
  checkmarkDone,
} from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  IonButtons,
  IonButton,
  IonSpinner,
  toastController,
} from '@ionic/vue';
import {
  PROSPECTEUR,
  PROSPECTION,
  PRODUCTEUR,
  CHAMPS,
  PLANTE_ATTAQUE,
  PARTIE_PLANTE,
  SYMPTOME,
  ECHANTILLON,
} from '@/Apollo/requetes';
import { useRouter } from 'vue-router';
import { arrowBack } from 'ionicons/icons';

// Importez vos classes Model
import { Prospecteur } from '@/Model/Prospecteur';
import { Producteur } from '@/Model/Producteur';
import { Prospection } from '@/Model/Prospection';
import { Champs } from '@/Model/Champs';
import { Plante_Attaque } from '@/Model/Plante_attaque';
import { Partie_Plante } from '@/Model/Partie_plante';
import { Symptome } from '@/Model/Symptome';
import { Echantillon } from '@/Model/Echantillon';

interface SyncItem {
  id: number;
  title: string;
  count: number;
  icon: string;
  status: 'success' | 'pending' | 'error';
}

export default defineComponent({
  name: 'SyncPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonFab,
    IonFabButton,
    IonButtons,
    IonButton,
    IonSpinner,
  },
  setup() {
    const router = useRouter();
    const isSyncing = ref(false);
    const connectionStatus = ref(false);

    const appInstance = getCurrentInstance();

    // Initialisez vos modèles
    const prospecteurModel = new Prospecteur(appInstance);
    const producteurModel = new Producteur(appInstance);
    const prospectionModel = new Prospection(appInstance);
    const champsModel = new Champs(appInstance);
    const planteAttaqueModel = new Plante_Attaque(appInstance);
    const partiePlanteModel = new Partie_Plante(appInstance);
    const symptomeModel = new Symptome(appInstance);
    const echantillonModel = new Echantillon(appInstance);

    const goToHome = () => {
      router.push('/accueil');
    };

    // Initialisation des mutations GraphQL
    const { mutate: createProspection } = useMutation(PROSPECTION);
    const { mutate: createProducteur } = useMutation(PRODUCTEUR);
    const { mutate: createChamps } = useMutation(CHAMPS);
    const { mutate: createPlanteAttaque } = useMutation(PLANTE_ATTAQUE);
    const { mutate: createPartiePlante } = useMutation(PARTIE_PLANTE);
    const { mutate: createSymptome } = useMutation(SYMPTOME);
    const { mutate: createEchantillon } = useMutation(ECHANTILLON);

    const syncItems = ref<SyncItem[]>([
      {
        id: 1,
        title: 'Producteurs',
        count: 0,
        icon: people,
        status: 'pending',
      },
      {
        id: 2,
        title: 'Prospections',
        count: 0,
        icon: documentText,
        status: 'pending',
      },
      {
        id: 3,
        title: 'Champs',
        count: 0,
        icon: leaf,
        status: 'pending',
      },
      {
        id: 4,
        title: 'Plantes Attaquées',
        count: 0,
        icon: analytics,
        status: 'pending',
      },
      {
        id: 5,
        title: 'Parties Plantes',
        count: 0,
        icon: analytics,
        status: 'pending',
      },
      {
        id: 6,
        title: 'Symptômes',
        count: 0,
        icon: analytics,
        status: 'pending',
      },
      {
        id: 7,
        title: 'Échantillons',
        count: 0,
        icon: checkmarkDone,
        status: 'pending',
      },
    ]);

    const totalToSync = computed(() =>
      syncItems.value.reduce((sum, item) => sum + item.count, 0)
    );

    // Vérifier la connexion internet
    const checkConnection = async () => {
      try {
        const status = await Network.getStatus();
        connectionStatus.value = status.connected;
        return status.connected;
      } catch (error) {
        console.error('Connection check error:', error);
        return false;
      }
    };

    // Afficher un toast
    const showToast = async (message: string, color = 'success') => {
      const toast = await toastController.create({
        message,
        duration: 2000,
        color,
        position: 'top',
      });
      await toast.present();
    };

    // Récupérer les données non synchronisées avec Model
    const getUnsyncedData = async (model: any) => {
      try {
        const allData = await model.get();
        return allData ? allData.filter((item: any) => item.is_Sync === 0) : [];
      } catch (error) {
        console.error('Error getting unsynced data:', error);
        throw error;
      }
    };

    // Marquer une donnée comme synchronisée
    const markAsSynced = async (model: any, id: number) => {
      try {
        const idColumn = `ID_${model.table}`;
        const query = `UPDATE ${model.table} SET is_Sync = 1 WHERE ${idColumn} = ?`;
        await model.db.run(query, [id]);
      } catch (error) {
        console.error('Error marking as synced:', error);
        throw error;
      }
    };

    // Synchronisation des producteurs
    const syncProducteurs = async () => {
      try {
        const unsyncedData = await getUnsyncedData(producteurModel);
        syncItems.value[0].count = unsyncedData.length;

        for (const item of unsyncedData) {
          await createProducteur({
            ID_Producteur: item.ID_Producteur,
            nomProd: item.nomProd,
            cin: item.cin,
            partenaire: item.partenaire,
            region: item.region,
            district: item.district,
            commune: item.commune,
            fokotany: item.fokotany,
            ID_Prospecteur: item.ID_Prospecteur,
          });
          await markAsSynced(producteurModel, item.ID_Producteur);
          syncItems.value[0].count--;
        }
        syncItems.value[0].status = 'success';
      } catch (error) {
        console.error('Error syncing Producteurs:', error);
        syncItems.value[0].status = 'error';
        throw error;
      }
    };

    // Synchronisation des prospections
    const syncProspections = async () => {
      try {
        const unsyncedData = await getUnsyncedData(prospectionModel);
        syncItems.value[2].count = unsyncedData.length;

        for (const item of unsyncedData) {
          await createProspection({
            ID_Prospection: item.ID_Prospection,
            ID_Prospecteur: item.ID_Prospecteur,
            date: item.date,
          });
          await markAsSynced(prospectionModel, item.ID_Prospection);
          syncItems.value[2].count--;
        }
        syncItems.value[2].status = 'success';
      } catch (error) {
        console.error('Error syncing Prospections:', error);
        syncItems.value[2].status = 'error';
        throw error;
      }
    };

    // Synchronisation des champs
    const syncChamps = async () => {
      try {
        const unsyncedData = await getUnsyncedData(champsModel);
        syncItems.value[3].count = unsyncedData.length;

        for (const item of unsyncedData) {
          await createChamps({
            ID_Champs: item.ID_Champs,
            culture: item.culture,
            variete: item.variete,
            supTotal: item.supTotal,
            supInfecte: item.supInfecte,
            dateSemi: item.dateSemi,
            irrigation: item.irrigation,
            engrai: item.engrai,
            stadeCroissance: item.stadeCroissance,
            santeGle: item.santeGle,
            nomRavageur: item.nomRavageur,
            localisation: item.localisation,
            ID_Producteur: item.ID_Producteur,
          });
          await markAsSynced(champsModel, item.ID_Champs);
          syncItems.value[3].count--;
        }
        syncItems.value[3].status = 'success';
      } catch (error) {
        console.error('Error syncing Champs:', error);
        syncItems.value[3].status = 'error';
        throw error;
      }
    };

    // Synchronisation des plantes attaquées
    const syncPlanteAttaque = async () => {
      try {
        const unsyncedData = await getUnsyncedData(planteAttaqueModel);
        syncItems.value[4].count = unsyncedData.length;

        for (const item of unsyncedData) {
          await createPlanteAttaque({
            ID_PlanteAttaque: item.ID_PlanteAttaque,
            point1: item.point1,
            point2: item.point2,
            point3: item.point3,
            point4: item.point4,
            point5: item.point5,
            tauxInfestation: item.tauxInfestation,
            ID_Champs: item.ID_Champs,
          });
          await markAsSynced(planteAttaqueModel, item.ID_PlanteAttaque);
          syncItems.value[4].count--;
        }
        syncItems.value[4].status = 'success';
      } catch (error) {
        console.error('Error syncing Plante_Attaque:', error);
        syncItems.value[4].status = 'error';
        throw error;
      }
    };

    // Synchronisation des parties plantes
    const syncPartiePlante = async () => {
      try {
        const unsyncedData = await getUnsyncedData(partiePlanteModel);
        syncItems.value[5].count = unsyncedData.length;

        for (const item of unsyncedData) {
          await createPartiePlante({
            ID_PartiePlante: item.ID_PartiePlante,
            partiePlante: item.partiePlante,
            ID_PlanteAttaque: item.ID_PlanteAttaque,
          });
          await markAsSynced(partiePlanteModel, item.ID_PartiePlante);
          syncItems.value[5].count--;
        }
        syncItems.value[5].status = 'success';
      } catch (error) {
        console.error('Error syncing Partie_Plante:', error);
        syncItems.value[5].status = 'error';
        throw error;
      }
    };

    // Synchronisation des symptômes
    const syncSymptome = async () => {
      try {
        const unsyncedData = await getUnsyncedData(symptomeModel);
        syncItems.value[6].count = unsyncedData.length;

        for (const item of unsyncedData) {
          await createSymptome({
            ID_Symptome: item.ID_Symptome,
            description: item.description,
            ID_PartiePlante: item.ID_PartiePlante,
          });
          await markAsSynced(symptomeModel, item.ID_Symptome);
          syncItems.value[6].count--;
        }
        syncItems.value[6].status = 'success';
      } catch (error) {
        console.error('Error syncing Symptome:', error);
        syncItems.value[6].status = 'error';
        throw error;
      }
    };

    // Synchronisation des échantillons
    const syncEchantillon = async () => {
      try {
        const unsyncedData = await getUnsyncedData(echantillonModel);
        syncItems.value[7].count = unsyncedData.length;

        for (const item of unsyncedData) {
          await createEchantillon({
            ID_Echantillon: item.ID_Echantillon,
            nature: item.nature,
            poids: item.poids,
            nbrEchantillon: item.nbrEchantillon,
            analyseAFaire: item.analyseAFaire,
            ID_Prospection: item.ID_Prospection,
          });
          await markAsSynced(echantillonModel, item.ID_Echantillon);
          syncItems.value[7].count--;
        }
        syncItems.value[7].status = 'success';
      } catch (error) {
        console.error('Error syncing Echantillon:', error);
        syncItems.value[7].status = 'error';
        throw error;
      }
    };

    // Synchronisation complète
    const syncAllData = async () => {
      isSyncing.value = true;
      const isConnected = await checkConnection();

      if (!isConnected) {
        showToast('Pas de connexion internet disponible', 'danger');
        isSyncing.value = false;
        return;
      }

      try {
        // Réinitialisation des statuts
        syncItems.value.forEach((item) => (item.status = 'pending'));

        // Synchronise dans l'ordre des dépendances
        //await syncProspections();
        await syncProducteurs();
        await syncChamps();
        await syncPlanteAttaque();
        await syncPartiePlante();
        await syncSymptome();
        await syncEchantillon();

        showToast('Synchronisation terminée avec succès');
      } catch (error) {
        console.error('Global sync error:', error);
        showToast('Erreur lors de la synchronisation', 'danger');
      } finally {
        isSyncing.value = false;
        refreshData();
      }
    };

    //Suppression des données du local
    /*
    const syncAllData = async () => {
      isSyncing.value = true;
      const isConnected = await checkConnection();

      if (!isConnected) {
        showToast('Pas de connexion internet disponible', 'danger');
        isSyncing.value = false;
        return;
      }

      try {
        // ⚠️ SUPPRIMEZ DANS L'ORDRE INVERSE DES DÉPENDANCES
        console.log('🧹 Nettoyage des données locales...');

        // 1. D'abord les tables qui ont des dépendances (les plus "enfants")
        await echantillonModel.truncate();
        console.log('✅ Échantillons supprimés');

        await symptomeModel.truncate();
        console.log('✅ Symptômes supprimés');

        await partiePlanteModel.truncate();
        console.log('✅ Parties plantes supprimées');

        await planteAttaqueModel.truncate();
        console.log('✅ Plantes attaquées supprimées');

        await champsModel.truncate();
        console.log('✅ Champs supprimés');

        await prospectionModel.truncate();
        console.log('✅ Prospections supprimées');

        await producteurModel.truncate();
        console.log('✅ Producteurs supprimés');

        await prospecteurModel.truncate();
        console.log('✅ Prospecteurs supprimés');

        showToast('Données locales nettoyées avec succès');
      } catch (error) {
        console.error('Global sync error:', error);
        showToast('Erreur lors du nettoyage', 'danger');
      } finally {
        isSyncing.value = false;
        refreshData();
      }
    };
*/
    // Rafraîchit les comptes de données à synchroniser
    const refreshData = async () => {
      try {
        const models = [
          producteurModel,
          prospectionModel,
          champsModel,
          planteAttaqueModel,
          partiePlanteModel,
          symptomeModel,
          echantillonModel,
        ];

        for (let i = 0; i < models.length; i++) {
          const data = await getUnsyncedData(models[i]);
          syncItems.value[i].count = data.length;
          syncItems.value[i].status = data.length > 0 ? 'pending' : 'success';
        }
      } catch (error) {
        console.error('Refresh error:', error);
      }
    };

    // Montage du composant
    onMounted(() => {
      refreshData();

      // Écoute les changements de connexion
      Network.addListener('networkStatusChange', (status) => {
        connectionStatus.value = status.connected;
        if (status.connected && totalToSync.value > 0) {
          syncAllData();
        }
      });
    });

    return {
      isSyncing,
      syncItems,
      totalToSync,
      startSync: syncAllData,
      refreshData,
      syncOutline,
      cloudUpload,
      refreshIcon,
      documentText,
      people,
      leaf,
      analytics,
      checkmarkDone,
      goToHome,
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

.sync-item {
  --background: white;
  --border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

ion-content {
  --background: #f8f9fa;
}

ion-fab-button {
  --background: #38a169;
}

ion-icon {
  font-size: 24px;
}
</style>
