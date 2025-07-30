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
    meta: { requiresAuth: false },
  },
  {
    path: '/liste',
    name: 'ListeProspection',
    component: ListeProspectionPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/prospection',
    name: 'Prospection',
    component: ProspectionPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/champs',
    name: 'Champs',
    component: ChampsPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/plante-attaque',
    name: 'PlanteAttaque',
    component: PlanteAttaquePage,
    meta: { requiresAuth: false },
  },
  {
    path: '/partie-plante',
    name: 'PartiePlante',
    component: PartiePlantePage,
    meta: { requiresAuth: false },
  },
  {
    path: '/symptome',
    name: 'Symptome',
    component: SymptomePage,
    meta: { requiresAuth: false },
  },
  {
    path: '/echantillon',
    name: 'Echantillon',
    component: EchantillonPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/sync',
    name: 'Sync',
    component: SyncPage,
    meta: { requiresAuth: false },
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

/*
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken');
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !isAuthenticated) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath },
    });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Accueil' });
  } else {
    next();
  }
});*/

export default router;
