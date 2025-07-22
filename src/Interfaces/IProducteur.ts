export default interface IProducteur {
  ID_Producteur?: number;
  nomProd: string;
  cin: number;
  partenaire?: string;
  fokotany: string;
  commune: string;
  district: string;
  region: string;
  ID_Prospecteur: number;
}
