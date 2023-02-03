import {IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon} from "@ionic/react";
import React, {Fragment} from "react";
import {ClientType} from "../../../type/ClientType";

import avatar from "../../../assets/avatar.png";
import "../../../css/card-style.css";
import {calendar, call, mailOpen} from "ionicons/icons";

type PropsType = {
  element: ClientType;
};

export const ClientCard = (props: PropsType) => {
  return (
    <Fragment>
      <img
        className="card-image-client-list"
        alt="picture placeholder"
        src={avatar}
      />
      <IonCardHeader>
        <IonCardTitle>{props.element.prenom}</IonCardTitle>
        <IonCardSubtitle>{props.element.nom}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent class="custom-card-content">
        <IonCardSubtitle class="custom-card-client-subtitle">
          <IonIcon icon={call} /> : {props.element.telephone}
        </IonCardSubtitle>
        <IonCardSubtitle class="custom-card-client-subtitle">
          <IonIcon icon={mailOpen} /> : {props.element.email}
        </IonCardSubtitle>
        <IonCardSubtitle class="custom-card-client-subtitle">
          <IonIcon icon={calendar} /> : {props.element.dateDeNaissance}
        </IonCardSubtitle>
      </IonCardContent>
    </Fragment>
  );
};
