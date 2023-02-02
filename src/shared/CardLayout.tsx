import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon} from "@ionic/react";
import React, {Fragment, useState} from "react";

import {VehiculeType} from "../type/VehiculeType";
import {Modal} from "../shared/Modal";
import {tools} from "../services/tools";

import {key, create, trash} from "ionicons/icons";
import "../css/card-style.css";
import {ClientType} from "../type/ClientType";

type PropsType = {
  elementType: VehiculeType | ClientType;
  submitEditedElement: Function;
  deleteElement: Function;

  triggerModalId: string;
  formType: string;
  IsRental: boolean;

  children: any;
};

/**
 * Card contain :
 * - display coming from a "cardLayout" with props.children
 * - Button : rent (boolean), edit, delete
 * - Modal (with config )
 * - All function related to currentElement edition ( as card do manage this part ( if needed s))
 * @param props Composent props
 * @returns JSX
 */
export const CardLayout = (props: PropsType) => {
  // EDITED ELEMENT
  const [currentElement, setCurrentElement] = useState<VehiculeType | ClientType>(props.elementType);

  /**
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any): void => {
    tools.handleInput(onChangeEvent, setCurrentElement);
  };

  /**
   * @param e click event
   */
  const submitEditedElement = (clickEvent: any): void => {
    clickEvent.preventDefault();
    props.submitEditedElement(currentElement);
  };

  /**
   * Efface ELEMENT selectionné après avoir clické sur
   * le bouton "delete". Renvoie l'ID de l'element.
   * @param e click event
   */
  const deleteElement = (): void => {
    props.deleteElement(props.elementType.id);
  };

  return (
    <IonCard>
      <Fragment>{props.children}</Fragment>

      <div className="card-button-container">
        {props.IsRental && (
          <IonButton
            color="success"
            id={`to-open-modal-location${props.elementType.id}`}>
            <IonIcon icon={key} />
          </IonButton>
        )}
        <IonButton
          id={`${props.triggerModalId}${props.elementType.id}`}
          color="medium">
          <IonIcon icon={create} />
        </IonButton>
        <IonButton
          color="danger"
          onClick={deleteElement}>
          <IonIcon icon={trash} />
        </IonButton>
      </div>

      <Modal
        modalTitle={props.IsRental ? "Location : " : "Edition : "}
        triggerOpenModal={
          props.IsRental
            ? `to-open-modal-location${props.elementType.id}`
            : `${props.triggerModalId}${props.elementType.id}`
        }
        formToDisplay={props.IsRental ? "location" : props.formType}
        objectToManage={currentElement}
        handleInput={handleInput}
        submitModalForm={submitEditedElement}></Modal>
    </IonCard>
  );
};
