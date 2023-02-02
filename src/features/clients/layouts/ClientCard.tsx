import {IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from "@ionic/react";
import React, {Fragment} from "react";
import {ClientType} from "../../../type/ClientType";
import {VehiculeType} from "../../../type/VehiculeType";

import avatar from "../../../assets/avatar.png";
import "../../../css/card-style.css";

type PropsType = {
  element: ClientType;
};

export const ClientCard = (props: PropsType) => {
  return (
    <Fragment>
      <img
        className="card-image-client"
        alt="picture placeholder"
        src={avatar}
      />
      <IonCardHeader>
        <IonCardTitle>{props.element.prenom}</IonCardTitle>
        <IonCardSubtitle>{props.element.nom}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent class="vehicle-card-content">
        <IonCardSubtitle>Telephone : {props.element.telephone}</IonCardSubtitle>
        <IonCardSubtitle>Email : {props.element.email}</IonCardSubtitle>
        <IonCardSubtitle>Date : {props.element.dateDeNaissance}</IonCardSubtitle>
      </IonCardContent>
    </Fragment>
  );
};
