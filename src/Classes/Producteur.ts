import { GestionProducteur } from '@/Gestions/GestionProducteur';
import IProducteur from '@/Interfaces/IProducteur';

export default class Producteur {
  protected table_name = 'Producteur';
  private gp: GestionProducteur;

  constructor() {
    this.gp = new GestionProducteur();
  }

  // Methode CRUD
  async create(
    producteur: Omit<IProducteur, 'ID_Producteur'>
  ): Promise<number> {
    return this.gp.create(producteur);
  }

  async select(): Promise<IProducteur[]> {
    return this.gp.findAll();
  }

  async byId(id: number): Promise<IProducteur | null> {
    return this.gp.findById(id);
  }

  async update(id: number, modifications: Partial<IProducteur>): Promise<number> {
    return this.gp.update(id, modifications);
  }

  async delete(id: number): Promise<number> {
    return this.gp.delete(id);
  }

  async byName(nom: string): Promise<IProducteur[]> {
    return this.gp.searchByNom(nom);
  }
}
