import Database from '@/Database/Database';
import { IChamps } from '@/Interfaces/IChamps';
import SQLiteService from '@/services/SQLiteService';

export class GestionChamps {
  private db: Database;
  private isInitialized = false;

  constructor() {
    this.db = new Database(new SQLiteService());
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await this.db.initializeDatabase();
      this.isInitialized = true;
    }
  }

  // Créer un nouveau prospecteur
  async create(champs: IChamps): Promise<number> {
    await this.ensureInitialized();
    
    const query = `
            INSERT INTO Champs
            (culture, variete, supTotal, supInfecte, dateSemi, irrigation, engrai, stadeCroissance, santeGle, nomRavageur, localisation, ID_Producteur) 
            VALUES (?, ?, ?, ?, ? , ? , ? , ? , ? , ? , ? , ?)
        `;
    const params = [
      champs.culture,
      champs.variete,
      champs.supTotal,
      champs.supInfecte,
      champs.dateSemi,
      champs.irrigation,
      champs.engrai,
      champs.stadeCroissance,
      champs.santeGle,
      champs.nomRavageur,
      champs.localisation,
      champs.ID_Producteur,
    ];

    return this.db.executeUpdate(query, params);
  }

  async findAll(): Promise<IChamps[]> {
    const query = 'SELECT * FROM Champs';
    return this.db.executeQuery(query);
  }

  async findById(id: number): Promise<IChamps | null> {
    const query = 'SELECT * FROM Champs WHERE ID_Champs = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [id]);
    return results[0] || null;
  }

  async update(id: number, champs: Partial<IChamps>): Promise<number> {
    const fields = [];
    const params = [];

    if (champs.culture) {
      fields.push('culture = ?');
      params.push(champs.culture);
    }
    if (champs.variete) {
      fields.push('variete = ?');
      params.push(champs.variete);
    }
    if (champs.supTotal) {
      fields.push('supTotal = ?');
      params.push(champs.supTotal);
    }
    if (champs.supInfecte) {
      fields.push('supInfecte = ?');
      params.push(champs.supInfecte);
    }
    if (champs.dateSemi) {
      fields.push('dateSemi = ?');
      params.push(champs.dateSemi);
    }
    if (champs.irrigation) {
      fields.push('irrigation = ?');
      params.push(champs.irrigation);
    }
    if (champs.engrai) {
      fields.push('engrai = ?');
      params.push(champs.engrai);
    }
    if (champs.stadeCroissance) {
      fields.push('stadeCroissance = ?');
      params.push(champs.stadeCroissance);
    }
    if (champs.santeGle) {
      fields.push('santeGle = ?');
      params.push(champs.santeGle);
    }
    if (champs.nomRavageur) {
      fields.push('nomRavageur = ?');
      params.push(champs.nomRavageur);
    }
    if (champs.localisation) {
      fields.push('localisation = ?');
      params.push(champs.localisation);
    }
    if (champs.ID_Producteur) {
      fields.push('ID_Producteur = ?');
      params.push(champs.ID_Producteur);
    }

    if (fields.length === 0) {
      return 0;
    }

    params.push(id);
    const query = `UPDATE Champs SET ${fields.join(', ')} WHERE ID_Champs = ?`;
    return this.db.executeUpdate(query, params);
  }

  async delete(id: number): Promise<number> {
    const query = 'DELETE FROM Champs WHERE ID_Champs = ?';
    return this.db.executeUpdate(query, [id]);
  }

  // Rechercher par une localisation
  async searchByLocalite(localisation: string): Promise<IChamps[]> {
    const query = 'SELECT * FROM Champs WHERE localisation LIKE ?';
    return this.db.executeQuery(query, [`%${localisation.toLowerCase()}%`]);
  }
}
