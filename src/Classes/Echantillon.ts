import { GestionEchantillon } from '@/Gestions/GestionEchantillon';
import { IEchantillon } from '@/Interfaces/IEchantillon';

export default class Echantillon {
  protected table_name = 'Echantillon';
  private gp: GestionEchantillon;

  constructor() {
    this.gp = new GestionEchantillon();
  }

  // Methode CRUD
  async create(
    echantillon: Omit<IEchantillon, 'ID_Echantillon'>
  ): Promise<number> {
    return this.gp.create(echantillon);
  }

  async select(): Promise<IEchantillon[]> {
    return this.gp.findAll();
  }

  async byId(id: number): Promise<IEchantillon | null> {
    return this.gp.findById(id);
  }

  async update(
    id: number,
    modifications: Partial<IEchantillon>
  ): Promise<number> {
    return this.gp.update(id, modifications);
  }

  async delete(id: number): Promise<number> {
    return this.gp.delete(id);
  }

  async byNature(nature: string): Promise<IEchantillon[]> {
    return this.gp.searchByNature(nature);
  }
}
