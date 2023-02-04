import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon} from "@ionic/react";
import React, {Fragment, useState} from "react";

import {VehiculeType} from "../type/VehiculeType";
import {Modal} from "../shared/Modal";
import {tools} from "../services/tools";

import {key, create, trash} from "ionicons/icons";
import "../css/card-style.css";
import {ClientType} from "../type/ClientType";
import {ModalLocationInputType} from "../type/LocationType";

type PropsType = {
  elementType: VehiculeType | ClientType;
  submitEditedElement: Function;
  submitNewLocationElement: Function;
  deleteElement: Function;

  triggerModalId: string;
  formType: string;
  IsRental: boolean;

  children: any;
};

/**
 * Contenu du CardLayout :

 * - fonctions pour passer du parent à l'enfant ( la modale ) les gestions d'input, et sauvegarde des elements ( crée ou édité )
 * - le contenu de la card affiché avec les props.children
 * - les boutons nécessaires a l'ouverture des IonModales (utilisation de l'ID), un sera affiché ou non dépendant si la location est requit
 * 
 * .
 * 
 * - le composant modales. Une pour les locations ( car limitation changement button id lié aux modals "triggerOpenModal" )
 * "triggerModalId" pour l'édition est passé en props des pages parents (clients & vehicules), hors celui des location est déf dans ce composant
 * ( solutions pour garder qu'un composant ? )
 *
 * @param props Composent props
 * @returns JSX
 */
export const CardLayout = (props: PropsType) => {
  // EDITED ELEMENT
  const [currentElement, setCurrentElement] = useState<VehiculeType | ClientType>(props.elementType);

  /**
   * invoque la fonction handleInput déclaré dans la class Tools ( gestion des valeurs d'inputs )
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any): void => {
    tools.handleInput(onChangeEvent, setCurrentElement);
  };

  /**
   * fait transiter le click event de l'enfant(modale d'édition du client ou véhicule) vers le parent(page client ou véhicule).
   * Avec l'invocation de la fonction parente "submitEditedElement" passer en props ( props.submitEditedElement).
   * (utilisation de noms identique entre nom d'attribut et de fonction par soucis de clareté )
   * @param e click event
   */
  const submitEditedElement = (clickEvent: any): void => {
    clickEvent.preventDefault();
    props.submitEditedElement(currentElement);
  };

  /**
   * Fait transiter les données de locatin issuent du formulaire enfant (modal location)
   * et de les faire "remonter" à l'element parent ()
   * @param locationdata
   */
  const submitNewLocationElement = (locationdata: ModalLocationInputType) => {
    props.submitNewLocationElement(locationdata);
  };

  /**
   * Au click du button "delete", invoque la fonction parent (page client ou véhicule ).
   * Pour transmettre l'ID de l'element.
   * CardLayout composant est invoqué lors d'un map des données, et lui est passé en props
   * les elements individuels. Donc recupération d'ID.
   * @param e click event
   */
  const deleteElement = (): void => {
    props.deleteElement(props.elementType.id);
  };

  return (
    <IonCard>
      <Fragment>{props.children}</Fragment>
      <div className="custom-card-layout-button-container">
        {props.IsRental && (
          <IonButton
            id={`to-open-modal-location${props.elementType.id}`}
            color="success">
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
        modalTitle={"Edition : "}
        triggerOpenModal={`${props.triggerModalId}${props.elementType.id}`}
        formToDisplay={props.formType}
        objectToManage={currentElement}
        handleInput={handleInput}
        submitNewElement={submitEditedElement}
        submitNewLocationElement={() => {}}></Modal>

      {/* MODAL utilisé uniquement pour la location */}
      <Modal
        modalTitle={"Location : "}
        triggerOpenModal={`to-open-modal-location${props.elementType.id}`}
        formToDisplay={"locations"}
        objectToManage={currentElement}
        handleInput={handleInput}
        submitNewElement={submitEditedElement}
        submitNewLocationElement={submitNewLocationElement}></Modal>
    </IonCard>
  );
};
