import Database from '@/Database/Database';
import { ILogin } from '@/Interfaces/ILogin';
import SQLiteService from '@/services/SQLiteService';

export class GestionLogin {
  private db: Database;

  constructor() {
    this.db = new Database(new SQLiteService());
  }

  // Créer un nouveau prospecteur
  async create(login: ILogin): Promise<number> {
    const query = `
            INSERT INTO Login
            (email, password) 
            VALUES (?, ?)
        `;
    const params = [login.email, login.password];
    return this.db.executeUpdate(query, params);
  }

  async findAll(): Promise<ILogin[]> {
    const query = 'SELECT * FROM Login';
    return this.db.executeQuery(query);
  }

  async findByEmail(email: string): Promise<ILogin | null> {
    const query = 'SELECT * FROM Login WHERE email = ? LIMIT 1';
    const results = await this.db.executeQuery(query, [email]);
    return results[0] || null;
  }
}
