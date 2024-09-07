
/// AVANT MailInformationEntity  == POUR INFORMATION
/// AVANT MailSimpleEntity  == POUR ACTION


export interface MailDeclEntity { 
  lien_decl: string;
  numero_decl: string;
  reference_decl: string;
  email_emetteur: string;
  email_destinataire: string;
  action_effectue: string;
  type_action: string;
  type_envoi?: string;
}


export interface MailActionSimpleEntity {
  lien_action: string;
  code_action: string | null;
  type_envoi: string;
  email_emetteur: string;
  email_destinataire: string;
  numero_decl: string;
}

export interface MailActiviteSimpleEntity {
  lienActivite: string;
  codeActivite: string;
  titreActivite: string;
  type_envoi: string;
  emailEmetteur: string;
  emailDestinataire: string;
}
