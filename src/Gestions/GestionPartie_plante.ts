import Database from '@/Database/Database';
import { IPartie_plante } from '@/Interfaces/IPartie_plante';
import SQLiteService from '@/services/SQLiteService';

export class GestionPartie_plante {
  private db: Database;

  constructor() {
    this.db = new Database(new SQLiteService());
  }

  async create(champs: IPartie_plante): Promise<number> {
    const query = `
            INSERT INTO Partie_Plante
            (partiePlante, ID_PlanteAttaque) 
            VALUES (?, ?)
        `;
    const params = [champs.partiePlante, champs.ID_PlanteAttaque];
    return this.db.executeUpdate(query, params);
  }

  async findAll(): Promise<IPartie_plante[]> {
    const query = 'SELECT * FROM Partie_Plante';
    return this.db.executeQuery(query);
  }

  async findById(id: number): Promise<IPartie_plante | null> {
    const query =
      'SELECT * FROM Partie_Plante WHERE ID_PartiePlante = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [id]);
    return results[0] || null;
  }

  async update(id: number, champs: Partial<IPartie_plante>): Promise<number> {
    const fields = [];
    const params = [];

    if (champs.partiePlante) {
      fields.push('partiePlante = ?');
      params.push(champs.partiePlante);
    }
    if (champs.ID_PlanteAttaque) {
      fields.push('ID_PlanteAttaque = ?');
      params.push(champs.ID_PlanteAttaque);
    }

    if (fields.length === 0) {
      return 0;
    }

    params.push(id);
    const query = `UPDATE Partie_Plante SET ${fields.join(
      ', '
    )} WHERE ID_PartiePlante = ?`;
    return this.db.executeUpdate(query, params);
  }

  async delete(id: number): Promise<number> {
    const query = 'DELETE FROM Partie_Plante WHERE ID_PartiePlante = ?';
    return this.db.executeUpdate(query, [id]);
  }

  // Rechercher par une partiePlante
  async searchByPartiePlante(partiePlante: string): Promise<IPartie_plante[]> {
    const query = 'SELECT * FROM Partie_Plante WHERE partiePlante LIKE ?';
    return this.db.executeQuery(query, [`%${partiePlante.toLowerCase()}%`]);
  }
}
