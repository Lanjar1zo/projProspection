import Database from '@/Database/Database';
import { IProspecteur } from '@/Interfaces/IProspecteur';
import SQLiteService from '@/services/SQLiteService';

export class GestionProspecteur {
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
  async create(prospecteur: IProspecteur): Promise<number> {
    await this.ensureInitialized();

    const query = `
            INSERT INTO Prospecteur 
            (ID_Prospecteur, nomProspecteur, prenProspecteur, fonction, email, tel, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const params = [
      prospecteur.ID_Prospecteur,
      prospecteur.nomProspecteur,
      prospecteur.prenProspecteur,
      prospecteur.fonction,
      prospecteur.email,
      prospecteur.tel,
      prospecteur.password,
    ];

    //return this.db.executeUpdate(query, params);

    try {
      return await this.db.executeUpdate(query, params);
    } catch (error) {
      console.error('Error in GestionProspecteur.create:', error);
      throw error;
    }
  }

  // Récupérer tous les prospecteurs
  async findAll(): Promise<IProspecteur[]> {
    const query = 'SELECT * FROM Prospecteur ORDER BY nomProspecteur';
    return this.db.executeQuery(query);
  }

  // Trouver un prospecteur par son ID
  async findById(id: number): Promise<IProspecteur | null> {
    const query = 'SELECT * FROM Prospecteur WHERE ID_Prospecteur = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [id]);
    return results[0] || null;
  }

  // Mettre à jour un prospecteur
  async update(
    id: number,
    prospecteur: Partial<IProspecteur>
  ): Promise<number> {
    const fields = [];
    const params = [];

    if (prospecteur.nomProspecteur) {
      fields.push('nomProspecteur = ?');
      params.push(prospecteur.nomProspecteur);
    }
    if (prospecteur.prenProspecteur) {
      fields.push('prenProspecteur = ?');
      params.push(prospecteur.prenProspecteur);
    }
    if (prospecteur.fonction) {
      fields.push('fonction = ?');
      params.push(prospecteur.fonction);
    }
    if (prospecteur.email) {
      fields.push('email = ?');
      params.push(prospecteur.email);
    }
    if (prospecteur.tel) {
      fields.push('tel = ?');
      params.push(prospecteur.tel);
    }
    if (prospecteur.password) {
      fields.push('password = ?');
      params.push(prospecteur.password);
    }

    if (fields.length === 0) {
      return 0;
    }

    params.push(id);
    const query = `UPDATE Prospecteur SET ${fields.join(
      ', '
    )} WHERE ID_Prospecteur = ?`;
    return this.db.executeUpdate(query, params);
  }

  // Supprimer un prospecteur
  async delete(id: number): Promise<number> {
    const query = 'DELETE FROM Prospecteur WHERE ID_Prospecteur = ?';
    return this.db.executeUpdate(query, [id]);
  }

  async findByEmail(email: string): Promise<IProspecteur | null> {
    const query = 'SELECT * FROM Prospecteur WHERE email = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [email]);
    return results[0] || null;
  }
}
