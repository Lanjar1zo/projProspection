import { GestionSymptome } from "@/Gestions/GestionSymptome";
import { ISymptome } from "@/Interfaces/ISymptome";

export default class Symptome {
  protected table_name = 'Symptome';
  private gp: GestionSymptome;

  constructor() {
    this.gp = new GestionSymptome();
  }

  // Methode CRUD
  async create(pp: Omit<ISymptome, 'ID_Symptome'>): Promise<number> {
    return this.gp.create(pp);
  }

  async select(): Promise<ISymptome[]> {
    return this.gp.findAll();
  }

  async byId(id: number): Promise<ISymptome | null> {
    return this.gp.findById(id);
  }

  async update(
    id: number,
    modifications: Partial<ISymptome>
  ): Promise<number> {
    return this.gp.update(id, modifications);
  }

  async delete(id: number): Promise<number> {
    return this.gp.delete(id);
  }
}
