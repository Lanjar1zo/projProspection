import { GestionLogin } from '@/Gestions/GestionLogin';
import { ILogin } from '@/Interfaces/ILogin';

export default class Login {
  protected table_name = 'Login';
  private gp: GestionLogin;

  constructor() {
    this.gp = new GestionLogin();
  }

  async create(login: ILogin): Promise<number> {
    return this.gp.create(login);
  }

  async select(): Promise<ILogin[]> {
    return this.gp.findAll();
  }

  async byEmail(email: string): Promise<ILogin | null> {
    return this.gp.findByEmail(email);
  }
}
