import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon} from "@ionic/react";
import React, {Fragment, useState} from "react";

import {VehiculeType} from "../type/VehiculeType";
import {Modal} from "../shared/Modal";
import {tools} from "../services/tools";

import {key, create, trash} from "ionicons/icons";
import "../css/card-style.css";
import {ClientType} from "../type/ClientType";
import {ModalLocationInputType} from "../type/LocationType";

/**
 * * elementToManage: object passé en props à la modal
 * * submitEditedElement : function pour "PUT" un objet édité (client ou véhicule)
 * * submitNewLocationElement : function pour "POST" un nouvel objet ( client ou véhicule )
 * * deleteElement : Function de suppréssion d'obj de la DB
 * * triggerModalId : permet de changer l'ID du bouton ouvrant la modale. Pour différencier la modale ouverte par
 * le client ou le vehicule, chaque element aura ainsi sa "propre modale" associé
 * * formToDisplay : string pour selectionné quel formulaire afficher dans la modale
 * * IsRental : active un 3ieme bouton si la location est nécessaire
 */
type PropsType = {
  elementToManage: VehiculeType | ClientType;
  submitEditedElement: Function;
  submitNewLocationElement: Function;
  deleteElement: Function;

  triggerModalId: string;
  formToDisplay: string;
  IsRental: boolean;

  children: any;
};

/**
 * Contenu du CardLayout :

 * - fonctions pour passer du parent à l'enfant ( la modale ) les gestions d'input, et sauvegarde des elements ( crée ou édité )
 * - le contenu de la card affiché avec les props.children
 * - les boutons nécessaires a l'ouverture des IonModales (utilisation de l'ID), 
 *   un sera affiché ou non dépendant si la location est requit (isRental)
 * - le composant modales.
 * ___
 *  Une modale pour les locations ( Limitations des button id lié aux modals "triggerOpenModal" )
 * "triggerModalId" pour l'édition est passé en props des pages parents (clients & vehicules), 
 *  hors celui des location est déf dans ce composant
 * ( solutions pour garder qu'un composant ? )
 * _____
 *  CardLayout composant invoqué lors d'un map des données dans le parent, il lui est passé en props
   Les elements individuels
 * @param props Composent props
 * @returns JSX
 */
export const CardLayout = (props: PropsType) => {
  /**
   * Gestion de l'element édité (state : currentElement) est géré dans le cardLayout par différenciation de l'ajout,
   * géré dans les parents respectifs. Gère ainsi de façon commune et "une fois" l'element (Client ou Véhicule) édité.
   */
  const [currentElement, setCurrentElement] = useState<VehiculeType | ClientType>(props.elementToManage);

  /**
   * Invoque la fonction handleInput déclaré dans la class Tools ( gestion des valeurs d'inputs )
   * Pour transmettre aux parents les inputs values venant de l'enfant (modal, contenant les input)
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any): void => {
    tools.handleInput(onChangeEvent, setCurrentElement);
  };

  /**
   * Click event de l'enfant (modale d'édition du client ou véhicule) invoque la fonction descendu du parent(page client ou véhicule).
   * Invocation de la fonction parente "submitEditedElement" passer en props ( props.submitEditedElement).
   * (utilisation de noms identique entre nom d'attribut et de fonction par soucis de clareté )
   * @param e click event
   */
  const submitEditedElement = (clickEvent: any): void => {
    clickEvent.preventDefault();
    props.submitEditedElement(currentElement);
  };

  /**
   * Fait transiter les données de location issuent du formulaire enfant (modal location)
   * et de les faire "remonter" à l'element parent.
   * submitNewLocationElement() sera invoqué chez l'enfant (modal) à chaque onChange d'input.
   * @param locationdata
   */
  const submitNewLocationElement = (locationdata: ModalLocationInputType) => {
    props.submitNewLocationElement(locationdata);
  };

  /**
   * Au click du button "delete", invoque la fonction parent (page client ou véhicule ).
   * Pour transmettre l'ID de l'element.
   * @param e click event
   */
  const deleteElement = (): void => {
    props.deleteElement(props.elementToManage.id);
  };

  return (
    <IonCard>
      <Fragment>{props.children}</Fragment>
      <div className="custom-card-layout-button-container">
        {props.IsRental && (
          <IonButton
            /* nécessaire d'ajouter l'id de l'element issue du .map() 
          pour avoir que chaque boutton ai un id différent, donc ouvre une seule modale */
            id={`to-open-modal-location${props.elementToManage.id}`}
            color="success">
            <IonIcon icon={key} />
          </IonButton>
        )}
        <IonButton
          /* nécessaire d'ajouter l'id de l'element issue du .map() 
          pour avoir que chaque boutton ai un id différent, donc ouvre une seule modale */
          id={`${props.triggerModalId}${props.elementToManage.id}`}
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
        triggerOpenModal={`${props.triggerModalId}${props.elementToManage.id}`}
        formToDisplay={props.formToDisplay}
        elementToManage={currentElement}
        handleInput={handleInput}
        submitNewElement={submitEditedElement}
        /* "désactive" cette fonction, car réservé au formulaire location */
        submitNewLocationElement={() => {}}></Modal>

      {/* MODAL utilisé uniquement pour la location, une différente causé par les id des boutons */}
      <Modal
        modalTitle={"Location : "}
        triggerOpenModal={`to-open-modal-location${props.elementToManage.id}`}
        formToDisplay={"locations"}
        elementToManage={currentElement}
        handleInput={handleInput}
        submitNewElement={submitEditedElement}
        submitNewLocationElement={submitNewLocationElement}></Modal>
    </IonCard>
  );
};
