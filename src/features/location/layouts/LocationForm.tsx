import React, {useEffect, useState} from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonCardSubtitle,
  IonCardHeader,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
  IonDatetimeButton,
} from "@ionic/react";

import {dataService} from "../../../services/dataServices";
import {dataURL} from "../../../services/dataUrl";
import {ClientType} from "../../../type/ClientType";
import {VehiculeType} from "../../../type/VehiculeType";
import {ModalLocationInputType} from "../../../type/LocationType";
import {tools} from "../../../services/tools";

type PropsType = {
  vehicule: VehiculeType;
  getLocationData: Function;
};

export const LocationForm = (props: PropsType) => {
  /**
   * state contenant la liste des clients ( fetch pour l'input select et avoir la liste des clients )
   */
  const [clientList, setClientList] = useState<ClientType[]>();

  /**
   * state contenant l'objet rassemblant les valeurs des inputs de la location (*date de début, de fin, l'id du client et véhicule )
   */
  const [modalInput, setModalInput] = useState<ModalLocationInputType>();
  /**
   * function déclenchant le fetch des clients, défini dans la class "DataService"
   */
  const fetchClients = (): void => {
    dataService.fetchData(dataURL.clients).then((data) => setClientList(data));
  };

  /**
   * Fetch des clients au "mount" du composant ,[]
   */
  useEffect((): void => {
    fetchClients();
  }, []);

  /**
   * UseEffect invoquant la fonction parente "props.getLocationData".
   * verification si le state modalInput contient toutes les valeurs requises avant d'invoquer l'invocation de la fonction parente.
   */
  useEffect((): void => {
    if (modalInput !== undefined && modalInput.dateDebut && modalInput.dateFin && modalInput.idClient) {
      props.getLocationData(modalInput);
    }
  }, [modalInput]);

  /**
   * Invoque la function "tools.handleInputLocation" pour créer l'objet "modalInput" en fonction des valeurs enregistré dans les inputs
   * @param onChangeEvent input change event
   */
  const handleInput = (onChangeEvent: any): void => {
    tools.handleInputLocation(onChangeEvent, modalInput, props.vehicule);
  };

  /**
   * Affiche le prix de la location dans la modale.
   * Vérifie si le state modaleInput existe, et si les dates de début et fin sont bien renseigné avant de calculer le prix "tools.setRentalPrice"
   * @returns message à afficher, le prix, ou un string
   */
  const setPrice = (): number | string => {
    let prix: number = 0;
    if (modalInput && modalInput.dateDebut && modalInput.dateFin) {
      prix = tools.setRentalPrice(modalInput.dateDebut, modalInput.dateFin, props.vehicule.prixJournee);
    }
    return prix === 0 ? "..." : prix;
  };

  return (
    <div className="form-container ">
      <IonCardHeader class="location-form-header">
        <IonCardSubtitle class="location-form-subtitle-custom">
          {props.vehicule.modele}, {props.vehicule.marque}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonList>
        <IonItem>
          <IonLabel position="stacked">Selection du locataire : </IonLabel>
          <IonSelect
            onIonChange={handleInput}
            name="idClient"
            cancelText="Annuler">
            {clientList &&
              clientList.map((client) => {
                return (
                  <IonSelectOption
                    key={client.id}
                    value={client.id}>
                    {client.prenom}, {client.nom}
                  </IonSelectOption>
                );
              })}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date de Début : </IonLabel>
          <IonDatetimeButton datetime="dateDebut"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="dateDebut"
              name="dateDebut"
              onIonChange={handleInput}
              value={modalInput?.dateDebut}></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date de Fin : </IonLabel>
          <IonDatetimeButton datetime="dateFin"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="dateFin"
              name="dateFin"
              onIonChange={handleInput}
              value={modalInput?.dateFin}></IonDatetime>
          </IonModal>
        </IonItem>

        <div className="location-form-price">
          <IonCardSubtitle class="location-form-subtitle-custom">Prix de la location :</IonCardSubtitle>
          <IonCardSubtitle class="location-form-subtitle-custom">{setPrice()}</IonCardSubtitle>
        </div>
      </IonList>
    </div>
  );
};
