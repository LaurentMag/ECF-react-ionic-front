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
  const [clientList, setClientList] = useState<ClientType[]>();

  const [modalInput, setModalInput] = useState<ModalLocationInputType>();

  const fetchClients = () => {
    dataService.fetchData(dataURL.clients).then((data) => setClientList(data));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    props.getLocationData(modalInput);
  }, [modalInput]);

  const handleInput = (onChangeEvent: any) => {
    const input = onChangeEvent.target;
    setModalInput((prev: any) => {
      return {
        ...prev,
        idVehicule: props.vehicule.id,
        [input.name]: input.nodeName === "ION-DATETIME" ? input.value.split("T")[0] : input.value,
      };
    });
  };

  const setPrice = () => {
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
