export default interface IProducteur {
  ID_Producteur?: number;
  nomProd: string;
  cin: number;
  partenaire?: string;
  region: string;
  district: string;
  commune: string;
  fokotany: string;
  ID_Prospecteur: number;
}
