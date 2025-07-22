import { GestionProspecteur } from '@/Gestions/GestionProspecteur';
import { IProspecteur } from '@/Interfaces/IProspecteur';

export default class Prospecteur {
  protected table_name = 'Prospecteur';
  private gp: GestionProspecteur;

  constructor() {
    this.gp = new GestionProspecteur();
  }

  // Methode CRUD
  async create(pp: Omit<IProspecteur, 'ID_Prospecteur'>): Promise<number> {
    return this.gp.create(pp);
  }

  async select(): Promise<IProspecteur[]> {
    return this.gp.findAll();
  }

  async byId(id: number): Promise<IProspecteur | null> {
    return this.gp.findById(id);
  }

  async update(
    id: number,
    modifications: Partial<IProspecteur>
  ): Promise<number> {
    return this.gp.update(id, modifications);
  }

  async delete(id: number): Promise<number> {
    return this.gp.delete(id);
  }

  async byName(nom: string): Promise<IProspecteur[]> {
    return this.gp.searchByName(nom);
  }

  async authentification(
    email: string,
    password: string
  ): Promise<IProspecteur | null> {
    return this.gp.authenticate(email, password);
  }
}
