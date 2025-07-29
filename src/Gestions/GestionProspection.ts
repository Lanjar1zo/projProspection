import Database from '@/Database/Database';
import { IProspection } from '@/Interfaces/IProspection';
import SQLiteService from '@/services/SQLiteService';

export class GestionProspection {
  private db: Database;

  constructor() {
    this.db = new Database(new SQLiteService());
  }

  async create(producteur: IProspection): Promise<number> {
    const query = `
            INSERT INTO Prospection
            (ID_Prospecteur, date) 
            VALUES (?, ?)
        `;
    const params = [producteur.ID_Prospecteur, producteur.date];
    return this.db.executeUpdate(query, params);
  }

  async findAll(): Promise<IProspection[]> {
    const query = 'SELECT * FROM Prospection';
    return this.db.executeQuery(query);
  }

  async findById(id: number): Promise<IProspection | null> {
    const query = 'SELECT * FROM Prospection WHERE ID_Prospection = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [id]);
    return results[0] || null;
  }

  async update(id: number, pa: Partial<IProspection>): Promise<number> {
    const fields = [];
    const params = [];

    if (pa.ID_Prospecteur) {
      fields.push('ID_Prospecteur = ?');
      params.push(pa.ID_Prospecteur);
    }
    if (pa.date) {
      fields.push('date = ?');
      params.push(pa.date);
    }

    if (fields.length === 0) {
      return 0;
    }

    params.push(id);
    const query = `UPDATE Prospection SET ${fields.join(
      ', '
    )} WHERE ID_Prospection = ?`;
    return this.db.executeUpdate(query, params);
  }

  async delete(id: number): Promise<number> {
    const query = 'DELETE FROM Prospection WHERE ID_Prospection = ?';
    return this.db.executeUpdate(query, [id]);
  }
}
