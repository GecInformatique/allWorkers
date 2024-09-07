export interface ActionEntity {
  codeAction: number | null;
  numeroDeclaration: number | null;
  codeAgentCreateur: string | null;
  codeAgent: string;
  listeAgentAssistant: string | null;
  libelleAction: string;
  dateDebutPrevue: string;
  dateFinPrevue: string;
  dateDebutReele: string | null;
  dateFinReele: string | null;
  statut: string;
  nbreRelanceAuto: number | null;
  numeroPlanAction: number | null;
}
