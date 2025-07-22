import { GestionPartie_plante } from '@/Gestions/GestionPartie_plante';
import { IPartie_plante } from '@/Interfaces/IPartie_plante';

export default class Partie_plante {
  protected table_name = 'Partie_plante';
  private gp: GestionPartie_plante;

  constructor() {
    this.gp = new GestionPartie_plante();
  }

  // Methode CRUD
  async create(pp: Omit<IPartie_plante, 'ID_PartiePlante'>): Promise<number> {
    return this.gp.create(pp);
  }

  async select(): Promise<IPartie_plante[]> {
    return this.gp.findAll();
  }

  async byId(id: number): Promise<IPartie_plante | null> {
    return this.gp.findById(id);
  }

  async update(
    id: number,
    modifications: Partial<IPartie_plante>
  ): Promise<number> {
    return this.gp.update(id, modifications);
  }

  async delete(id: number): Promise<number> {
    return this.gp.delete(id);
  }

  async byPartiePlante(partiePlante: string): Promise<IPartie_plante[]> {
    return this.gp.searchByPartiePlante(partiePlante);
  }
}
