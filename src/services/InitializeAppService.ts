import { ISQLiteService } from './SQLiteService';
import { IDatabase } from '@/Database/Database';

export interface IInitializeAppService {
  initializeApp(): Promise<boolean>;
}

class InitializeAppService implements IInitializeAppService {
  appInit = false;
  sqliteServ!: ISQLiteService;
  database!: IDatabase;
  platform!: string;

  constructor(sqliteService: ISQLiteService, database: IDatabase) {
    this.sqliteServ = sqliteService;
    this.database = database;
    this.platform = this.sqliteServ.getPlatform();
  }

  async initializeApp(): Promise<boolean> {
    if (!this.appInit) {
      try {
        if (this.platform === 'web') {
          console.log('plateforme web');
          await this.sqliteServ.initWebStore();
        }

        // Initialize the myuserdb database
        await this.database.initializeDatabase();

        this.appInit = true;
      } catch (error: any) {
        const msg = error.message ? error.message : error;
        throw new Error(`initializeAppError.initializeApp: ${msg}`);
      }
    }
    return this.appInit;
  }
}

export default InitializeAppService;
