import {IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent} from "@ionic/react";
import React, {useRef} from "react";
import {ClientForm} from "../features/clients/layouts/ClientForm";
import {LocationForm} from "../features/location/layouts/LocationForm";

import {VehiculeForm} from "../features/vehicules/layouts/VehiculeForm";
import {ModalLocationInputType} from "../type/LocationType";

type PropsType = {
  modalTitle: string;
  triggerOpenModal: string;
  formToDisplay: string;
  objectToManage: any;
  handleInput: Function;
  submitNewElement: Function;
  submitNewLocationElement: Function;
};

export const Modal = (props: PropsType) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  const closeModal = () => {
    modalRef.current?.dismiss();
  };

  const storeModalLocationData = useRef<ModalLocationInputType>();

  /**
   * Clique sur l'ionBoutons "valider" dans le header de la modale
   * invoke la fonction de submit provenant du parent.
   * Puis ferme la modale
   * @param clickEvent
   */
  const validateData = (clickEvent: any, locationdata: ModalLocationInputType | null) => {
    clickEvent.preventDefault();

    props.submitNewElement(clickEvent);

    if (locationdata !== null || locationdata !== undefined) {
      props.submitNewLocationElement(storeModalLocationData.current);
    }

    modalRef.current?.dismiss();
  };

  /**
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any) => {
    props.handleInput(onChangeEvent);
  };

  const getModalLocationData = (locationdata: ModalLocationInputType) => {
    if (locationdata !== undefined && locationdata.dateDebut && locationdata.dateFin && locationdata.idClient) {
      storeModalLocationData.current = locationdata;
    }
  };

  return (
    <IonModal
      id="modal-style"
      ref={modalRef}
      trigger={props.triggerOpenModal}
      initialBreakpoint={0.85}>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="custom-modal-title"> {props.modalTitle} </IonTitle>
          <IonButtons slot="start">
            <IonButton
              color="medium"
              onClick={closeModal}>
              Annuler
            </IonButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton onClick={(e) => validateData(e, null)}>Valider</IonButton>
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
          <LocationForm
            vehicule={props.objectToManage}
            getLocationData={getModalLocationData}
          />
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
