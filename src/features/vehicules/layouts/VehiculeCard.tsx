import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon} from "@ionic/react";
import React, {useState} from "react";

import {VehiculeType} from "../../../type/VehiculeType";
import {Modal} from "../../../shared/Modal";
import {tools} from "../../../services/tools";

import {key, create, trash} from "ionicons/icons";
import "../../../css/card-style.css";

type PropsType = {
  vehicule: VehiculeType;
  submitEditedObj: Function;
  deleteVehicle: Function;
};

export const VehiculeCard = (props: PropsType) => {
  // EDITED VEHICLE
  const [vehiculeEdit, setVehiculeEdit] = useState<VehiculeType>(props.vehicule);

  /**
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any): void => {
    tools.handleInput(onChangeEvent, setVehiculeEdit);
  };

  /**
   * @param e click event
   */
  const submitEditedObj = (clickEvent: any): void => {
    clickEvent.preventDefault();
    props.submitEditedObj(vehiculeEdit.id, vehiculeEdit);
  };

  /**
   * Efface vehicule selectionné après avoir clické sur
   * le bouton "delete". Renvoie l'ID du vehicule.
   * @param e click event
   */
  const deleteItem = (): void => {
    props.deleteVehicle(props.vehicule.id);
  };

  return (
    <IonCard>
      <img
        className="card-image"
        alt="picture placeholder"
        src="https://thumbs.dreamstime.com/b/red-race-car-made-cardboard-paper-red-race-car-made-cardboard-paper-white-background-104760203.jpg"
      />
      <IonCardHeader>
        <IonCardTitle>{props.vehicule.modele}</IonCardTitle>
        <IonCardSubtitle>{props.vehicule.marque}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent class="vehicle-card-content">
        <IonCardSubtitle>Immatriculation : {props.vehicule.immatriculation}</IonCardSubtitle>
        <IonCardSubtitle>Type : {props.vehicule.type}</IonCardSubtitle>
        <IonCardSubtitle>Etat : {props.vehicule.etat}</IonCardSubtitle>
        <IonCardSubtitle>Par jour : {props.vehicule.prixJournee}€</IonCardSubtitle>
      </IonCardContent>

      <p className={`location-text ${props.vehicule.disponible ? "disponible" : "loue"}`}>
        {props.vehicule.disponible ? "Disponible" : "Loué"}
      </p>

      <div className="card-button-container">
        <IonButton color="success">
          <IonIcon icon={key} />
        </IonButton>
        <IonButton
          id={`to-edit-vehicle${props.vehicule.id}`}
          color="medium">
          <IonIcon icon={create} />
        </IonButton>
        <IonButton
          color="danger"
          onClick={deleteItem}>
          <IonIcon icon={trash} />
        </IonButton>
      </div>

      <Modal
        modalTitle="Edition :"
        triggerOpenModal={`to-edit-vehicle${props.vehicule.id}`}
        formToDisplay="vehicule"
        objectToManage={vehiculeEdit}
        handleInput={handleInput}
        submitModalForm={submitEditedObj}></Modal>
    </IonCard>
  );
};
