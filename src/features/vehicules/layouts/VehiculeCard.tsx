import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon} from "@ionic/react";
import React, {Fragment, useState} from "react";

import {VehiculeType} from "../../../type/VehiculeType";
import {Modal} from "../../../shared/Modal";

import {key, create, trash} from "ionicons/icons";
import "../../../css/card-style.css";

type PropsType = {
  element: VehiculeType;
};

export const VehiculeCard = (props: PropsType) => {
  return (
    <Fragment>
      <img
        className="card-image"
        alt="picture placeholder"
        src="https://thumbs.dreamstime.com/b/red-race-car-made-cardboard-paper-red-race-car-made-cardboard-paper-white-background-104760203.jpg"
      />
      <IonCardHeader>
        <IonCardTitle>{props.element.modele}</IonCardTitle>
        <IonCardSubtitle>{props.element.marque}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent class="vehicle-card-content">
        <IonCardSubtitle>Immatriculation : {props.element.immatriculation}</IonCardSubtitle>
        <IonCardSubtitle>Type : {props.element.type}</IonCardSubtitle>
        <IonCardSubtitle>Etat : {props.element.etat}</IonCardSubtitle>
        <IonCardSubtitle>Par jour : {props.element.prixJournee}€</IonCardSubtitle>
      </IonCardContent>

      <p className={`location-text ${props.element.disponible ? "disponible" : "loue"}`}>
        {props.element.disponible ? "Disponible" : "Loué"}
      </p>
    </Fragment>
  );
};
