<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>LOGIN</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-wrapper">
        <div class="form-container">
          <div class="logo-container">
            <img src="@/Images/logo-Minae.jpg" alt="Logo MINAE" class="logo" />
          </div>

          <div class="form-header">
            <h2>Accès professionnel</h2>
            <p>Entrez vos identifiants pour continuer</p>
          </div>

          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <label>Email</label>
              <div class="input-wrapper">
                <ion-input
                  type="email"
                  placeholder="votreEmail@gmail.com"
                  v-model="login.email"
                  required
                ></ion-input>
              </div>
            </div>

            <div class="input-group">
              <label>Mot de passe</label>
              <div class="input-wrapper">
                <ion-input
                  type="password"
                  placeholder="........"
                  v-model="login.password"
                  required
                ></ion-input>
              </div>
            </div>

            <ion-button type="submit" expand="block" class="submit-btn">
              Connexion
            </ion-button>
          </form>

          <div class="form-footer">
            <p>
              Nouveau prospecteur ?
              <a @click="goToRegister">S'inscrire</a>
            </p>
          </div>
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
  IonInput,
  IonButton,
  toastController,
} from '@ionic/vue';
import { LOGIN } from '@/Apollo/requetes';
import { useQuery } from '@vue/apollo-composable';
import { getCurrentInstance } from 'vue';
import { Prospecteur } from '@/Model/Prospecteur';
import { Login } from '@/Model/Login';

export default defineComponent({
  name: 'LoginPage',
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
    const login = reactive({
      email: '',
      password: '',
    });
    const appInstance = getCurrentInstance();
    const prospecteurModel = new Prospecteur(appInstance);
    const loginModel = new Login(appInstance);

    const { refetch: fetchProspecteur } = useQuery(
      LOGIN,
      () => ({
        email: login.email,
      }),
      {
        enabled: false,
        fetchPolicy: 'network-only',
      }
    );

    const showToast = async (message: string, color = 'danger') => {
      const toast = await toastController.create({
        message,
        duration: 3000,
        color,
        position: 'top',
      });
      await toast.present();
    };

    const handleLogin = async () => {
      try {
        console.log(
          'Tentative de connexion:',
          `${login.email} et ${login.password}`
        );

        // Validation des champs
        if (!login.email || !login.password) {
          await showToast('Email et mot de passe requis');
          return;
        }

        const allProspecteur = await prospecteurModel.get();
        console.log(allProspecteur);

        const logins = await loginModel.get();
        console.log(logins);

        // 1. Essai de connexion locale
        const localLogin = await loginModel.findBy('email', login.email);
        if (localLogin) {
          if (localLogin?.password == login.password) {
            const prospecteur = await prospecteurModel.findBy(
              'email',
              login.email
            );
            if (prospecteur) {
              console.log('Connexion locale réussie');
              return router.push({
                path: '/accueil',
                query: {
                  ID_Prospecteur: prospecteur.ID_Prospecteur?.toString(),
                },
              });
            } else {
              login.email = '';
              login.password = '';
              console.log('error');
            }
          }
        } else {
          console.log('Aucun utilisateur local trouvé:');
          login.email = '';
          login.password = '';
          router.push('/prospecteur');
        }
      } catch (err) {
        console.error('Erreur inattendue:', err);
        await showToast('Erreur de connexion');
      }
    };

    const goToRegister = () => {
      router.push('/prospecteur');
    };

    return {
      login,
      handleLogin,
      goToRegister,
    };
  },
});
</script>

<style scoped>
.header-toolbar {
  --background: #4a5568;
  --color: white;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin: 10px 0 20px;
}

.logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
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
  max-width: 400px;
  padding: 30px;
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
  margin-top: 10px;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  color: #718096;
  font-size: 0.9rem;
}

.form-footer a {
  color: #38a169;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>
