export interface ActiviteEntity {
  codeActivite: string;
  typeActivite: string;
  codeDirecion: number;
  codeResponsable: string;
  codeDemandeur: string;
  codeBeneficiaire: string;
  numeroDo: string;
  numeroNpc: string;
  domaine: string;
  classeDanger: string;
  demandeAction: string;
  tacheObserve: string;
  typeObservation: string;
  commentaire: string;
  actionNorme: string;
  statut: string;
  dateDebutPrevue: string;
  dateFinPrevue: string | null;
  dateDebutReele: string | null;
  dateFinReele: string | null;
  sourceVerification: string;
  indicatateurMesure: string;
  ressources: string;
  typeEnquete: string;
  constatation: string;
  risque: string;
  equipe: string;
  numeroDocument: string;
  zoneCommerciale: string;
  thematiqueIncriminee: string;
  causeProbable: string;
  actionRetenue: string;
  fondee: string;
  descriptionReclamation: string;
  processusConcerne: string;
  correctionRetenue: string;
  actionCorrective: string;
  categorie: string;
  penalite: string;
  delaiConformite: string;
  dateCreation: string | null;
}
export interface ActiviteFilterEntity {
  typeActivite: string;
  dateDebut: string;
  dateFin: number;
}
