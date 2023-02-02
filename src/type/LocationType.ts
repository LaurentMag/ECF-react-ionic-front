export type LocationType = {
  id: string;
  dateDebut: string;
  dateFin: string;
  client: {
    id: string;
    nom: string;
    prenom: string;
    dateDeNaissance: string;
    email: string;
    telephone: string;
  };
  vehicule: {
    id: string;
    marque: string;
    modele: string;
    immatriculation: string;
    etat: string;
    prixJournee: number;
    disponible: boolean;
    type: string;
  };
};

export type LocationTypeToSend = {
  dateDebut: string;
  dateFin: string;
  client: {
    id: string;
  };
  vehicule: {
    id: string;
  };
};
