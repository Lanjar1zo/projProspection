import {
  SQLiteConnection,
  CapacitorSQLite,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

export class Database {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  // Établit la connexion à la base de données
  private async connect(): Promise<void> {
    if (!this.db) {
      this.db = await this.sqlite.createConnection(
        'prospection',
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();
    }
  }

  // Ferme la connexion
  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null as any;
    }
  }

  // Exécute une requête SELECT
  async executeQuery(query: string, params: any[] = []): Promise<any[]> {
    try {
      await this.connect();
      const result = await this.db.query(query, params);
      return result.values || [];
    } catch (error) {
      console.error('Erreur executeQuery:', query, error);
      throw error;
    } finally {
      await this.close();
    }
  }

  // Exécute INSERT/UPDATE/DELETE
  async executeUpdate(query: string, params: any[] = []): Promise<number> {
    try {
      await this.connect();
      const result = await this.db.run(query, params);
      return result.changes?.changes || 0;
    } catch (error) {
      console.error('Erreur executeUpdate:', query, error);
      throw error;
    } finally {
      await this.close();
    }
  }

  async initWebStore(): Promise<void> {
    try {
      await this.sqlite.initWebStore();
    } catch (error: any) {
      const msg = error.message ? error.message : error;
      throw new Error(`sqliteService.initWebStore: ${msg}`);
    }
    return;
  }

  // Initialisation de la base de données et création des tables
  async initialize(): Promise<void> {
    try {
      await this.initWebStore()
        .then(async () => {
          console.log('initWebStore success');
          await this.connect();

          await this.db.execute(`
                  CREATE TABLE IF NOT EXISTS Login (
                      email TEXT PRIMARY KEY,
                      password TEXT NOT NULL,
                  );
  
                  CREATE TABLE IF NOT EXISTS Prospecteur (
                      ID_Prospecteur INTEGER PRIMARY KEY AUTOINCREMENT,
                      nomProspecteur TEXT NOT NULL,
                      prenProspecteur TEXT NOT NULL,
                      fonction TEXT NOT NULL,
                      email TEXT UNIQUE NOT NULL,
                      tel TEXT NOT NULL,
                      password TEXT NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_Sync BOOLEAN DEFAULT 0
                  );
  
                  CREATE TABLE IF NOT EXISTS Prospection (
                      ID_Prospection INTEGER PRIMARY KEY AUTOINCREMENT,
                      ID_Prospecteur INTEGER NOT NULL,
                      date DATETIME NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_Sync BOOLEAN DEFAULT 0,
                      FOREIGN KEY (ID_Prospecteur) REFERENCES Prospecteur(ID_Prospecteur)
                  );
  
                  CREATE TABLE IF NOT EXISTS Producteur (
                      ID_Producteur INTEGER PRIMARY KEY AUTOINCREMENT,
                      nomProd TEXT NOT NULL,
                      cin INTEGER UNIQUE NOT NULL,
                      partenaire TEXT,
                      region TEXT NOT NULL,
                      district TEXT NOT NULL,
                      commune TEXT NOT NULL,
                      fokotany TEXT NOT NULL,
                      ID_Prospecteur INTEGER NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_Sync BOOLEAN DEFAULT 0,
                      FOREIGN KEY (ID_Prospecteur) REFERENCES Prospecteur(ID_Prospecteur)
                  );
  
                  CREATE TABLE IF NOT EXISTS Champs (
                      ID_Champs INTEGER PRIMARY KEY AUTOINCREMENT,
                      culture TEXT NOT NULL,
                      variete TEXT NOT NULL,
                      supTotal REAL NOT NULL,
                      supInfecte REAL NOT NULL,
                      dateSemi DATETIME NOT NULL,
                      irrigation TEXT NOT NULL,
                      engrai TEXT NOT NULL,
                      stadeCroissance TEXT NOT NULL,
                      santeGle TEXT NOT NULL,
                      nomRavageur TEXT NOT NULL,
                      localisation TEXT NOT NULL,
                      ID_Producteur INTEGER NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_Sync BOOLEAN DEFAULT 0,
                      FOREIGN KEY (ID_Producteur) REFERENCES Producteur(ID_Producteur)
                  );
  
                  CREATE TABLE IF NOT EXISTS Plante_Attaque (
                      ID_PlanteAttaque INTEGER PRIMARY KEY AUTOINCREMENT,
                      point1 INTEGER NOT NULL,
                      point2 INTEGER NOT NULL,
                      point3 INTEGER NOT NULL,
                      point4 INTEGER NOT NULL,
                      point5 INTEGER NOT NULL,
                      tauxInfestation REAL NOT NULL,
                      ID_Champs INTEGER NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_Sync BOOLEAN DEFAULT 0,
                      FOREIGN KEY (ID_Champs) REFERENCES Champs(ID_Champs)
                  );
  
                  CREATE TABLE IF NOT EXISTS Partie_Plante (
                      ID_PartiePlante INTEGER PRIMARY KEY AUTOINCREMENT,
                      partiePlante TEXT NOT NULL,
                      ID_PlanteAttaque INTEGER NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_Sync BOOLEAN DEFAULT 0,
                      FOREIGN KEY (ID_PlanteAttaque) REFERENCES Plante_Attaque(ID_PlanteAttaque)
                  );
  
                  CREATE TABLE IF NOT EXISTS Symptome (
                      ID_Symptome INTEGER PRIMARY KEY AUTOINCREMENT,
                      description TEXT NOT NULL,
                      ID_PartiePlante INTEGER NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_Sync BOOLEAN DEFAULT 0,
                      FOREIGN KEY (ID_PartiePlante) REFERENCES Partie_Plante(ID_PartiePlante)
                  );
  
                  CREATE TABLE IF NOT EXISTS Echantillon (
                      ID_Echantillon INTEGER PRIMARY KEY AUTOINCREMENT,
                      nature TEXT NOT NULL,
                      poids REAL NOT NULL,
                      nbrEchantillon INTEGER NOT NULL,
                      analyseAFaire TEXT NOT NULL,
                      ID_Prospection INTEGER NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_Sync BOOLEAN DEFAULT 0,
                      FOREIGN KEY (ID_Prospection) REFERENCES Prospection(ID_Prospection)
                  );
              `);

          console.log('Base de données initialisée avec succès');
        })
        .catch((err: any) => {
          console.error(err);
        });
    } catch (error) {
      console.error('Erreur initialisation DB:', error);
      throw error;
    } finally {
      await this.close();
    }
  }
}
