import React, {useEffect, useState} from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonCardSubtitle,
  IonCardTitle,
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
import {LocationType, LocationTypeToSend} from "../../../type/LocationType";
import {tools} from "../../../services/tools";

type PropsType = {
  vehicule: VehiculeType;
};

type ModalInputType = {
  dateDebut: string;
  dateFin: string;
  id: string;
};

export const LocationForm = (props: PropsType) => {
  const [clientList, setClientList] = useState<ClientType[]>();
  const [locationState, setLocationState] = useState<LocationTypeToSend>();
  const [modalInput, setModalInput] = useState<ModalInputType>();

  const fetchClients = () => {
    dataService.fetchData(dataURL.clients).then((data) => setClientList(data));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleInput = (onChangeEvent: any) => {
    const input = onChangeEvent.target;
    setModalInput((prev: any) => {
      return {
        ...prev,
        [input.name]: input.nodeName === "ION-DATETIME" ? input.value.split("T")[0] : input.value,
      };
    });
  };

  useEffect(() => {
    // const prix = tools.rentalPriceCalculation(modalInput?.dateFin, modalInput?.dateFin, props.vehicule.prixJournee);
    // console.log(prix);
  }, [modalInput]);

  return (
    <div className="form-container">
      <IonCardHeader class="location-form-header">
        <IonCardTitle class="location-form-title-custom">Location de : </IonCardTitle>
        <IonCardSubtitle class="location-form-subtitle-custom">
          {props.vehicule.modele}, {props.vehicule.marque}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonList>
        <IonItem>
          <IonLabel position="stacked">Selection du locataire : </IonLabel>
          <IonSelect
            class="custom"
            onIonChange={handleInput}
            name="id"
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
              onIonChange={handleInput}></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date de Fin : </IonLabel>
          <IonDatetimeButton datetime="dateFin"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="dateFin"
              name="dateFin"
              onIonChange={handleInput}></IonDatetime>
          </IonModal>
        </IonItem>

        <div className="location-form-price">
          <IonCardSubtitle class="location-form-subtitle-custom">Prix de la location :</IonCardSubtitle>
          <IonCardSubtitle class="location-form-subtitle-custom">Prix de la location :</IonCardSubtitle>
        </div>
      </IonList>
    </div>
  );
};
