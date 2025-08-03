import { gql } from '@apollo/client';

export const PROSPECTEUR = gql`
  mutation (
    #$ID_Prospecteur: BigInt!
    $nomProspecteur: String!
    $prenProspecteur: String!
    $fonction: String!
    $email: String!
    $tel: String!
    $password: String!
  ) {
    createProspecteur(
      #ID_Prospecteur: $ID_Prospecteur
      nomProspecteur: $nomProspecteur
      prenProspecteur: $prenProspecteur
      fonction: $fonction
      email: $email
      tel: $tel
      password: $password
    ) {
      #ID_Prospecteur
      nomProspecteur
      prenProspecteur
      fonction
      email
      tel
      password
    }
  }
`;

export const LOGIN = gql`
  query ProspecteurByEmail($email: String!) {
    prospecteurByEmail(email: $email) {
      ID_Prospecteur
      nomProspecteur
      prenProspecteur
      fonction
      email
      tel
      password
    }
  }
`;

export const PROSPECTION = gql`
  mutation (
    $ID_Prospection: BigInt!
    $ID_Prospecteur: BigInt!
    $date: DateTime!
  ) {
    createProspection(
      ID_Prospection: $ID_Prospection
      ID_Prospecteur: $ID_Prospecteur
      date: $date
    ) {
      ID_Prospection
      ID_Prospecteur
      date
    }
  }
`;

export const PRODUCTEUR = gql`
  mutation (
    $ID_Producteur: BigInt!
    $nomProd: String!
    $cin: Int!
    $partenaire: String
    $region: String!
    $district: String!
    $commune: String!
    $fokotany: String!
    $ID_Pospecteur: BigInt!
  ) {
    createProducteur(
      ID_Producteur: $ID_Producteur
      nomProd: $nomProd
      cin: $cin
      partenaire: $partenaire
      region: $region
      district: $district
      commune: $commune
      fokotany: $fokotany
      ID_Pospecteur: $ID_Pospecteur
    ) {
      ID_Producteur
      nomProd
      cin
      partenaire
      region
      district
      commune
      fokotany
      ID_Pospecteur
    }
  }
`;

export const CHAMPS = gql`
  mutation (
    $ID_Champs: BigInt!
    $culture: String!
    $variete: String!
    $supTotal: Float!
    $supInfecte: Float!
    $dateSemi: DateTime!
    $irrigation: String!
    $engrai: String!
    $stadeCroissance: String!
    $santeGle: String!
    $nomRavageur: String!
    $localisation: String!
    $ID_Producteur: BigInt!
  ) {
    createChamps(
      ID_Champs: $ID_Champs
      culture: $culture
      variete: $variete
      supTotal: $supTotal
      supInfecte: $supInfecte
      dateSemi: $dateSemi
      irrigation: $irrigation
      engrai: $engrai
      stadeCroissance: $stadeCroissance
      santeGle: $santeGle
      nomRavageur: $nomRavageur
      localisation: $localisation
      ID_Producteur: $ID_Producteur
    ) {
      ID_Champs
      culture
      variete
      supTotal
      supInfecte
      dateSemi
      irrigation
      engrai
      stadeCroissance
      santeGle
      nomRavageur
      localisation
      ID_Producteur
    }
  }
`;

export const PLANTE_ATTAQUE = gql`
  mutation (
    $ID_PlanteAttaque: BigInt!
    $point1: Int!
    $point2: Int!
    $point3: Int!
    $point4: Int!
    $point5: Int!
    $tauxInfestation: Float!
    $ID_Champs: BigInt!
  ) {
    createPlanteAttaque(
      ID_PlanteAttaque: $ID_PlanteAttaque
      point1: $point1
      point2: $point2
      point3: $point3
      point4: $point4
      point5: $point5
      tauxInfestation: $tauxInfestation
      ID_Champs: $ID_Champs
    ) {
      ID_PlanteAttaque
      point1
      point2
      point3
      point4
      point5
      tauxInfestation
      ID_Champs
    }
  }
`;

export const PARTIE_PLANTE = gql`
  mutation (
    $ID_PartiePlante: BigInt!
    $partiePlante: String!
    $ID_PlanteAttaque: BigInt!
  ) {
    createPartiePlante(
      ID_PartiePlante: $ID_PartiePlante
      partiePlante: $partiePlante
      ID_PlanteAttaque: $ID_PlanteAttaque
    ) {
      ID_PartiePlante
      partiePlante
      ID_PlanteAttaque
    }
  }
`;

export const SYMPTOME = gql`
  mutation (
    $ID_Symptome: BigInt!
    $description: String!
    $ID_PartiePlante: BigInt!
  ) {
    createSymptome(
      ID_Symptome: $ID_Symptome
      description: $description
      ID_PartiePlante: $ID_PartiePlante
    ) {
      ID_Symptome
      description
      ID_PartiePlante
    }
  }
`;

export const ECHANTILLON = gql`
  mutation (
    $ID_Echantillon: BigInt!
    $nature: String!
    $poids: Float!
    $nbrEchantillon: Float!
    $analyseAFaire: String!
    $ID_Prospection: BigInt!
  ) {
    createEchantillon(
      ID_Echantillon: $ID_Echantillon
      nature: $nature
      poids: $poids
      nbrEchantillon: $nbrEchantillon
      analyseAFaire: $analyseAFaire
      ID_Prospection: $ID_Prospection
    ) {
      ID_Echantillon
      nature
      poids
      nbrEchantillon
      analyseAFaire
      ID_Prospection
    }
  }
`;
