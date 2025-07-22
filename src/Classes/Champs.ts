import { GestionChamps } from '@/Gestions/GestionChamps';
import { IChamps } from '@/Interfaces/IChamps';

export default class Champs {
  protected table_name = 'Champs';
  private gp: GestionChamps;

  constructor() {
    this.gp = new GestionChamps();
  }

  // Methode CRUD
  async create(Champs: Omit<IChamps, 'ID_Champs'>): Promise<number> {
    return this.gp.create(Champs);
  }

  async select(): Promise<IChamps[]> {
    return this.gp.findAll();
  }

  async byId(id: number): Promise<IChamps | null> {
    return this.gp.findById(id);
  }

  async update(id: number, modifications: Partial<IChamps>): Promise<number> {
    return this.gp.update(id, modifications);
  }

  async delete(id: number): Promise<number> {
    return this.gp.delete(id);
  }

  async byLocalite(nom: string): Promise<IChamps[]> {
    return this.gp.searchByLocalite(nom);
  }
}
