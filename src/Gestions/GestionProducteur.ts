import Database from '@/Database/Database';
import IProducteur from '@/Interfaces/IProducteur';
import SQLiteService from '@/services/SQLiteService';

export class GestionProducteur {
  private db: Database;

  constructor() {
    this.db = new Database(new SQLiteService());
  }

  async create(producteur: IProducteur): Promise<number> {
    const query = `
            INSERT INTO Producteur
            (nomProd, cin, partenaire, fokotany, commune, district, region, ID_Prospecteur) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const params = [
      producteur.nomProd,
      producteur.cin,
      producteur.partenaire,
      producteur.fokotany,
      producteur.commune,
      producteur.district,
      producteur.region,
      producteur.ID_Prospecteur,
    ];
    return this.db.executeUpdate(query, params);
  }

  async findAll(): Promise<IProducteur[]> {
    const query = 'SELECT * FROM Producteur ORDER BY nomProd';
    return this.db.executeQuery(query);
  }

  async findById(id: number): Promise<IProducteur | null> {
    const query = 'SELECT * FROM Producteur WHERE ID_Producteur = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [id]);
    return results[0] || null;
  }

  async update(id: number, pa: Partial<IProducteur>): Promise<number> {
    const fields = [];
    const params = [];

    if (pa.nomProd) {
      fields.push('nomProd = ?');
      params.push(pa.nomProd);
    }
    if (pa.cin) {
      fields.push('cin = ?');
      params.push(pa.cin);
    }
    if (pa.partenaire) {
      fields.push('partenaire = ?');
      params.push(pa.partenaire);
    }
    if (pa.fokotany) {
      fields.push('fokotany = ?');
      params.push(pa.fokotany);
    }
    if (pa.commune) {
      fields.push('commune = ?');
      params.push(pa.commune);
    }
    if (pa.district) {
      fields.push('district = ?');
      params.push(pa.district);
    }
    if (pa.region) {
      fields.push('region = ?');
      params.push(pa.region);
    }
    if (pa.ID_Prospecteur) {
      fields.push('ID_Prospecteur = ?');
      params.push(pa.ID_Prospecteur);
    }

    if (fields.length === 0) {
      return 0;
    }

    params.push(id);
    const query = `UPDATE Producteur SET ${fields.join(
      ', '
    )} WHERE ID_Producteur = ?`;
    return this.db.executeUpdate(query, params);
  }

  async delete(id: number): Promise<number> {
    const query = 'DELETE FROM Producteur WHERE ID_Producteur = ?';
    return this.db.executeUpdate(query, [id]);
  }

  // Rechercher par nom
  async searchByNom(nom: string): Promise<IProducteur[]> {
    const query = 'SELECT * FROM Producteur WHERE nomProd LIKE ?';
    return this.db.executeQuery(query, [`%${nom.toLowerCase()}%`]);
  }
}
