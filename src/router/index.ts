import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import AccueilPage from '@/views/AccueilPage.vue';
import ProspecteurPage from '@/views/ProspecteurPage.vue';
import ProducteurPage from '@/views/ProducteurPage.vue';
import ProspectionPage from '@/views/ProspectionPage.vue';
import ChampsPage from '@/views/ChampsPage.vue';
import PlanteAttaquePage from '@/views/Plante_attaquePage.vue';
import PartiePlantePage from '@/views/Partie_plantePage.vue';
import SymptomePage from '@/views/SymptomePage.vue';
import EchantillonPage from '@/views/EchantillonPage.vue';
import SyncPage from '@/views/SyncPage.vue';
import ListeProspectionPage from '@/views/ListeProspectionPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      requiresAuth: false,
      transition: 'fade-in',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: {
      requiresAuth: true,
      transition: 'slide-right',
    },
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: AccueilPage,
    meta: {
      requiresAuth: false,
      transition: 'slide-left',
    },
  },
  {
    path: '/prospecteur',
    name: 'Prospecteur',
    component: ProspecteurPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/producteur',
    name: 'Producteur',
    component: ProducteurPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/liste',
    name: 'ListeProspection',
    component: ListeProspectionPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/prospection',
    name: 'Prospection',
    component: ProspectionPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/champs',
    name: 'Champs',
    component: ChampsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/plante-attaque',
    name: 'PlanteAttaque',
    component: PlanteAttaquePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/partie-plante',
    name: 'PartiePlante',
    component: PartiePlantePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/symptome',
    name: 'Symptome',
    component: SymptomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/echantillon',
    name: 'Echantillon',
    component: EchantillonPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/sync',
    name: 'Sync',
    component: SyncPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
