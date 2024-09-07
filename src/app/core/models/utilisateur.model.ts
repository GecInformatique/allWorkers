export interface UtilisateurModel {
  code: number;
  nom_complet: string;
  pseudo: string;
  email: string;
  login: string;
  type_role_groupe: string;
  statut: boolean;
}

export interface AuthModel {
  nom_complet: string;
  pseudo: string;
  code_agent: string;
  code_service: number;
  code_utilisateur: number;
  code_secteur: number;
  code_societe: number;
  statut: string;
  fonction: string;
  date_fonction: string;
  date_embauche: string;
  date_naissance: string;
  est_cnps: string;
  est_chef: number;
  email: string;
  ref_cnps: string;
  nom_service: string;
  nom_secteur: string;
  nom_societe: string;
  login: string;
}
