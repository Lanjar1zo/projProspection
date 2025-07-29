import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app-prospection',
  webDir: 'dist',

  server: {
    url: 'http://localhost:8100',
    cleartext: true,
    hostname: 'localhost',
    //androidScheme: 'https',
  },

  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false,
      androidIsEncryption: false,
      electronIsEncryption: false,
      electronWindowsLocation: 'C:\\ProgramData\\CapacitorDatabases',
      electronMacLocation: '/Volumes/Development_Lacie/Development/Databases',
      electronLinuxLocation: 'Databases',
    },
  },
};

export default config;

/*import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter', // com.jeep.app.ionic7.angular.sqlite
  appName: 'app-prospection', // ionic7-angular-sqlite-starter
  webDir: 'dist',
  server: {
    url: 'http://localhost:8100',
    cleartext: true,
    hostname: 'localhost',
    //androidScheme: 'https',
  },
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false, // true
      iosKeychainPrefix: 'angular-sqlite-app-starter',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: 'Biometric login for capacitor sqlite',
      },
      androidIsEncryption: false, // true
      androidBiometric: {
        biometricAuth: false,
        biometricTitle: 'Biometric login for capacitor sqlite',
        biometricSubTitle: 'Log in using your biometric',
      },
      electronIsEncryption: true,
      electronWindowsLocation: 'C:\\ProgramData\\CapacitorDatabases',
      electronMacLocation: '/Volumes/Development_Lacie/Development/Databases',
      electronLinuxLocation: 'Databases',
    },
  },
};

export default config;
*/
