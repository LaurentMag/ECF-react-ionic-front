import {IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard} from "@ionic/react";
import React, {Fragment} from "react";
import {LocationType} from "../../../type/LocationType";

type PropsType = {
  location: LocationType;
};

export const LocationCard = (props: PropsType) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Client : </IonCardSubtitle>
        <IonCardTitle class="custom-card-location-title">
          {props.location.client.prenom}, {props.location.client.nom}
        </IonCardTitle>
      </IonCardHeader>

      <IonCardHeader>
        <IonCardSubtitle>Vehicule: </IonCardSubtitle>
        <IonCardTitle class="custom-card-location-title">
          {props.location.vehicule.modele}, {props.location.vehicule.marque}
        </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonCardSubtitle>Date de début : {props.location.dateDebut}</IonCardSubtitle>
        <IonCardSubtitle>Date de fin : {props.location.dateFin}</IonCardSubtitle>
      </IonCardContent>
    </IonCard>
  );
};
