import { BehaviorSubject } from 'rxjs';
import { ISQLiteService } from '@/services/SQLiteService';
import { getCurrentInstance } from 'vue';
import Config from '@/config';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { InitStatements } from '@/Migrations/init.statements';

export interface IDatabase {
  initializeDatabase(): Promise<void>;
  getDatabaseName(): string;
  executeQuery(query: string, params?: any[]): Promise<any[] | undefined>;
  executeUpdate(query: string, params: any[]): Promise<number>;
  getDatabaseVersion(): number;
}

class Database implements IDatabase {
  migrationBase = InitStatements;
  loadToVersion = InitStatements[InitStatements.length - 1].toVersion;
  db!: SQLiteDBConnection;
  sqliteServ!: ISQLiteService;
  isInitCompleted = new BehaviorSubject(false);
  database: string = Config.database_name;
  appInstance = getCurrentInstance();
  platform!: string;

  constructor(sqliteService: ISQLiteService) {
    this.sqliteServ = sqliteService;
    this.platform =
      this.appInstance?.appContext.config.globalProperties.$platform;
  }

  getDatabaseName(): string {
    return this.database;
  }

  getDatabaseVersion(): number {
    return this.loadToVersion;
  }

  async initializeDatabase(): Promise<void> {
    // create upgrade statements
    try {
      await this.sqliteServ
        .addUpgradeStatement({
          database: this.database,
          upgrade: this.migrationBase,
        })
        .then(() => {
          console.log('addUpgradeStatement success');
        });
      this.db = await this.sqliteServ.openDatabase(
        this.database,
        this.loadToVersion,
        false
      );
      const isData = await this.db.query('select * from sqlite_sequence');
      if (isData.values!.length === 0) {
        // create database initial users if any
      }

      this.isInitCompleted.next(true);
    } catch (error: any) {
      const msg = error.message ? error.message : error;
      throw new Error(`storageService.initializeDatabase: ${msg}`);
    }
  }

  // Exécute une requête SELECT
  async executeQuery(
    query: string,
    params?: any[]
  ): Promise<any[] | undefined> {
    try {
      if (!(await this.db.isDBOpen()).result) {
        await this.db.open();
      }
      const result = await this.db.query(query, params);
      await this.db.close();
      return result.values;
    } catch (error) {
      console.error('Erreur executeQuery:', query);
      throw new Error(`Database.executeQuery: ${error}`);
    }
  }

  // Exécute INSERT/UPDATE/DELETE
  async executeUpdate(query: string, params: any[] = []): Promise<number> {
    console.log(this.db);
    if (!(await this.db.isDBOpen()).result) {
      await this.db.open();
    }
    const result = await this.db.run(query, params);
    await this.db.close();
    if (
      result.changes !== undefined &&
      result.changes.lastId !== undefined &&
      result.changes.lastId > 0
    ) {
      return result.changes.lastId;
    } else {
      throw new Error(`Database.executeUpdate: lastId not returned`);
    }
  }
}
export default Database;
