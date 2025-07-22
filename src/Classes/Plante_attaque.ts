import { GestionPlante_attaque } from '@/Gestions/GestionPlante_attaque';
import { IPlante_attaque } from '@/Interfaces/IPlante_attaque';

export default class Plante_attaque {
  protected table_name = 'Plante_attaque';
  private gp: GestionPlante_attaque;

  constructor() {
    this.gp = new GestionPlante_attaque();
  }

  // Methode CRUD
  async create(pp: Omit<IPlante_attaque, 'ID_PlanteAttaque'>): Promise<number> {
    return this.gp.create(pp);
  }

  async select(): Promise<IPlante_attaque[]> {
    return this.gp.findAll();
  }

  async byId(id: number): Promise<IPlante_attaque | null> {
    return this.gp.findById(id);
  }

  async update(
    id: number,
    modifications: Partial<IPlante_attaque>
  ): Promise<number> {
    return this.gp.update(id, modifications);
  }

  async delete(id: number): Promise<number> {
    return this.gp.delete(id);
  }
}
