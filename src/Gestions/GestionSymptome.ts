import { Database } from '@/Database/Database';
import { ISymptome } from '@/Interfaces/ISymptome';

export class GestionSymptome {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  async create(symptome: ISymptome): Promise<number> {
    const query = `
            INSERT INTO Symptome
            (description, ID_PartiePlante) 
            VALUES (?, ?)
        `;
    const params = [symptome.description, symptome.ID_PartiePlante];
    return this.db.executeUpdate(query, params);
  }

  async findAll(): Promise<ISymptome[]> {
    const query = 'SELECT * FROM Symptome ORDER BY nomProd';
    return this.db.executeQuery(query);
  }

  async findById(id: number): Promise<ISymptome | null> {
    const query = 'SELECT * FROM Symptome WHERE ID_Symptome = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [id]);
    return results[0] || null;
  }

  async update(id: number, pa: Partial<ISymptome>): Promise<number> {
    const fields = [];
    const params = [];

    if (pa.description) {
      fields.push('description = ?');
      params.push(pa.description);
    }
    if (pa.ID_PartiePlante) {
      fields.push('ID_PartiePlante = ?');
      params.push(pa.ID_PartiePlante);
    }

    if (fields.length === 0) {
      return 0;
    }

    params.push(id);
    const query = `UPDATE Symptome SET ${fields.join(
      ', '
    )} WHERE ID_Symptome = ?`;
    return this.db.executeUpdate(query, params);
  }

  async delete(id: number): Promise<number> {
    const query = 'DELETE FROM Symptome WHERE ID_Symptome = ?';
    return this.db.executeUpdate(query, [id]);
  }
}
