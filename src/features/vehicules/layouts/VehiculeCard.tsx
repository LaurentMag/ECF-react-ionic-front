import {IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonFabButton} from "@ionic/react";
import React, {Fragment} from "react";
import {useHistory} from "react-router-dom";

import {VehiculeType} from "../../../type/VehiculeType";

import picture from "../../../assets/carboard-car-thin.png";
import {arrowForward} from "ionicons/icons";
import "../../../css/card-style.css";

type PropsType = {
  element: VehiculeType;
};

export const VehiculeCard = (props: PropsType) => {
  const history = useHistory();

  return (
    <Fragment>
      <img
        className="card-image-vehicule-list"
        alt="picture placeholder"
        src={picture}
      />
      <IonCardHeader class="card-list-custom-header">
        <div className="card-list-custom-header-content">
          <div>
            <IonCardTitle>{props.element.modele}</IonCardTitle>
            <IonCardSubtitle>{props.element.marque}</IonCardSubtitle>
          </div>
          <IonFabButton
            onClick={() => history.push(`/vehicles/${props.element.id}`)}
            color="dark"
            size="small">
            <IonIcon icon={arrowForward} />
          </IonFabButton>
        </div>
      </IonCardHeader>

      <p className={`location-text ${props.element.disponible ? "disponible" : "loue"}`}>
        {props.element.disponible ? "Disponible" : "Loué"}
      </p>
    </Fragment>
  );
};
