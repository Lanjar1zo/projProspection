import Database from '@/Database/Database';
import { IEchantillon } from '@/Interfaces/IEchantillon';

export class GestionEchantillon {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  async create(echantillon: IEchantillon): Promise<number> {
    const query = `
            INSERT INTO Echantillon
            (nature, poids, nbrEchantillon, analyseAFaire, ID_Prospection) 
            VALUES (?, ?, ?, ?, ?)
        `;
    const params = [
      echantillon.nature,
      echantillon.poids,
      echantillon.nbrEchantillon,
      echantillon.analyseAFaire,
      echantillon.ID_Prospection,
    ];
    return this.db.executeUpdate(query, params);
  }

  async findAll(): Promise<IEchantillon[]> {
    const query = 'SELECT * FROM Echantillon';
    return this.db.executeQuery(query);
  }

  async findById(id: number): Promise<IEchantillon | null> {
    const query = 'SELECT * FROM Echantillon WHERE ID_Echantillon = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [id]);
    return results[0] || null;
  }

  async update(
    id: number,
    echantillon: Partial<IEchantillon>
  ): Promise<number> {
    const fields = [];
    const params = [];

    if (echantillon.nature) {
      fields.push('nature = ?');
      params.push(echantillon.nature);
    }
    if (echantillon.poids) {
      fields.push('poids = ?');
      params.push(echantillon.poids);
    }
    if (echantillon.nbrEchantillon) {
      fields.push('nbrEchantillon = ?');
      params.push(echantillon.nbrEchantillon);
    }
    if (echantillon.analyseAFaire) {
      fields.push('analyseAFaire = ?');
      params.push(echantillon.analyseAFaire);
    }
    if (echantillon.ID_Prospection) {
      fields.push('ID_Prospection = ?');
      params.push(echantillon.ID_Prospection);
    }

    if (fields.length === 0) {
      return 0;
    }

    params.push(id);
    const query = `UPDATE Echantillon SET ${fields.join(
      ', '
    )} WHERE ID_Echantillon = ?`;
    return this.db.executeUpdate(query, params);
  }

  async delete(id: number): Promise<number> {
    const query = 'DELETE FROM Echantillon WHERE ID_Echantillon = ?';
    return this.db.executeUpdate(query, [id]);
  }

  // Rechercher par nature
  async searchByNature(nature: string): Promise<IEchantillon[]> {
    const query = 'SELECT * FROM Echantillon WHERE nature LIKE ?';
    return this.db.executeQuery(query, [`%${nature.toLowerCase()}%`]);
  }
}
