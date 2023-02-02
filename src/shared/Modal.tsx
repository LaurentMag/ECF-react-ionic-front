import {IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCheckbox} from "@ionic/react";
import React, {useRef, useState} from "react";
import {ClientForm} from "../features/clients/layouts/ClientForm";
import {LocationForm} from "../features/location/layouts/LocationForm";

import {VehiculeForm} from "../features/vehicules/layouts/VehiculeForm";

type PropsType = {
  modalTitle: string;
  triggerOpenModal: string;
  formToDisplay: string;
  objectToManage: any;
  handleInput: Function;
  submitModalForm: Function;
};

export const Modal = (props: PropsType) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  const closeModal = () => {
    modalRef.current?.dismiss();
  };

  /**
   * Clique sur l'ionBoutons "valider" dans le header de la modale
   * invoke la fonction de submit provenant du parent.
   * Puis ferme la modale
   * @param clickEvent
   */
  const validateData = (clickEvent: any) => {
    clickEvent.preventDefault();

    props.submitModalForm(clickEvent);
    modalRef.current?.dismiss();
  };

  /**
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any) => {
    props.handleInput(onChangeEvent);
  };

  console.log(props.triggerOpenModal);

  return (
    <IonModal
      id="modal-style"
      ref={modalRef}
      trigger={props.triggerOpenModal}
      initialBreakpoint={0.85}>
      <IonHeader>
        <IonToolbar>
          <IonTitle> {props.modalTitle} </IonTitle>
          <IonButtons slot="start">
            <IonButton
              color="medium"
              onClick={closeModal}>
              Annuler
            </IonButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton onClick={validateData}>Valider</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {props.formToDisplay === "vehicule" ? (
          <VehiculeForm
            handleInput={handleInput}
            objectToManage={props.objectToManage}
          />
        ) : props.formToDisplay === "clients" ? (
          <ClientForm
            handleInput={handleInput}
            objectToManage={props.objectToManage}
          />
        ) : (
          <LocationForm />
        )}
      </IonContent>
    </IonModal>
  );
};

/* 

  const [canDismiss, setCanDismiss] = useState(false);

// ION MODAL ATTTRIBUTE
canDismiss={canDismiss}

// INSIDE MODAL IONCONTENT
    <IonCheckbox
      id="terms"
      checked={canDismiss}
      onIonChange={(ev) => {
      setCanDismiss(ev.detail.checked);>
    </IonCheckbox>
*/
