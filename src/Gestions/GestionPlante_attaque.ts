import Database from '@/Database/Database';
import { IPlante_attaque } from '@/Interfaces/IPlante_attaque';

export class GestionPlante_attaque {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  async create(pa: IPlante_attaque): Promise<number> {
    const query = `
            INSERT INTO Plante_Attaque
            (point1, point2, point3, point4, point5, tauxInfestation, ID_Champs) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const params = [
      pa.point1,
      pa.point2,
      pa.point3,
      pa.point4,
      pa.point5,
      pa.tauxInfestation,
      pa.ID_Champs,
    ];
    return this.db.executeUpdate(query, params);
  }

  async findAll(): Promise<IPlante_attaque[]> {
    const query = 'SELECT * FROM Plante_Attaque';
    return this.db.executeQuery(query);
  }

  async findById(id: number): Promise<IPlante_attaque | null> {
    const query = 'SELECT * FROM Plante_Attaque WHERE ID_Champs = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [id]);
    return results[0] || null;
  }

  async update(id: number, pa: Partial<IPlante_attaque>): Promise<number> {
    const fields = [];
    const params = [];

    if (pa.point1) {
      fields.push('point1 = ?');
      params.push(pa.point1);
    }
    if (pa.point2) {
      fields.push('point2 = ?');
      params.push(pa.point2);
    }
    if (pa.point3) {
      fields.push('point3 = ?');
      params.push(pa.point3);
    }
    if (pa.point4) {
      fields.push('point4 = ?');
      params.push(pa.point4);
    }
    if (pa.point5) {
      fields.push('point5 = ?');
      params.push(pa.point5);
    }
    if (pa.tauxInfestation) {
      fields.push('tauxInfestation = ?');
      params.push(pa.tauxInfestation);
    }
    if (pa.ID_Champs) {
      fields.push('ID_Champs = ?');
      params.push(pa.ID_Champs);
    }

    if (fields.length === 0) {
      return 0;
    }

    params.push(id);
    const query = `UPDATE Plante_Attaque SET ${fields.join(
      ', '
    )} WHERE ID_PlanteAttaque = ?`;
    return this.db.executeUpdate(query, params);
  }

  async delete(id: number): Promise<number> {
    const query = 'DELETE FROM Plante_Attaque WHERE ID_PlanteAttaque = ?';
    return this.db.executeUpdate(query, [id]);
  }

  
}
