import { GestionProspection } from '@/Gestions/GestionProspection';
import { IProspection } from '@/Interfaces/IProspection';

export default class Prospection {
  protected table_name = 'Prospection';
  private gp: GestionProspection;

  constructor() {
    this.gp = new GestionProspection();
  }

  // Methode CRUD
  async create(pp: Omit<IProspection, 'ID_Prospection'>): Promise<number> {
    return this.gp.create(pp);
  }

  async select(): Promise<IProspection[]> {
    return this.gp.findAll();
  }

  async byId(id: number): Promise<IProspection | null> {
    return this.gp.findById(id);
  }

  async update(
    id: number,
    modifications: Partial<IProspection>
  ): Promise<number> {
    return this.gp.update(id, modifications);
  }

  async delete(id: number): Promise<number> {
    return this.gp.delete(id);
  }
}
