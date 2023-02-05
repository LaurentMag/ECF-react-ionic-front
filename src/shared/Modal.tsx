import {IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent} from "@ionic/react";
import React, {useRef} from "react";
import {ClientForm} from "../features/clients/layouts/ClientForm";
import {LocationForm} from "../features/location/layouts/LocationForm";

import {VehiculeForm} from "../features/vehicules/layouts/VehiculeForm";
import {ClientType} from "../type/ClientType";
import {ModalLocationInputType} from "../type/LocationType";
import {VehiculeType} from "../type/VehiculeType";

/**
 * * elementToManage: Quel objet sera passé en props vers l'input
 * ( permet de passé l'objet courant en cas d'édition pour récupérer les valeurs);
 * * handleInput: Function pour que le parent récupére les changements de valeur d'input du "formulaire"
 * * submitEditedElement : function pour "PUT" un objet édité (client ou véhicule)
 * * submitNewLocationElement : function pour "POST" un nouvel objet ( client ou véhicule )
 * * modalTitle: Titre de la modale à afficher;
 * * triggerOpenModal: l'ID du boutton qui va ouvrir une modale associé;
 * * formToDisplay: string pour selectionné quel formulaire afficher dans la modale;
 */
type PropsType = {
  // any est conservé car chaque form aura l'objToManage typé.
  // Si typé créera soucis ou deux type peuvent pas être assigné à un
  elementToManage: any;
  handleInput: Function;
  submitNewElement: Function;
  submitNewLocationElement: Function;
  modalTitle: string;
  triggerOpenModal: string;
  formToDisplay: string;
};

/**
 * Modal générique, contenu :
 * - Gestion des elements du useRef modal (<HTMLIonModalElement>) pour affichage et fermeture
 * - En fonction de la props "formToDisplay", change le formulaire à afficher
 * pour correspondre au parent ( clients - vehicules - location )
 * - Sauvegarde dans un useRef ( pas de re-render ) l'objet obtenu par le fomulaire de locations
 * ___
 * Les informations sont envoyé aux parents respectif par la modal car celle-ci contient les boutons de validations
 * Contrairements aux formulaires "classique" où la validation se fait dans le même composant.
 * @param props
 * @returns
 */
export const Modal = (props: PropsType) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  const closeModal = () => {
    modalRef.current?.dismiss();
  };

  /**
   * conserve les informations du formulaire de location.
   * Provient du formaulaire location ( useRef, pas de re-render)
   */
  const storeModalLocationData = useRef<ModalLocationInputType>();

  /**
   * Function passé en props du formulaire location, permet d'assigner au useRef "storeModalLocationData"
   * La valeur des inputs du formulaire de location ( *cette fonction sera appelé à chaque change du state où est crée l'obj location* ).
   * @param locationdata
   */
  const getModalLocationData = (locationdata: ModalLocationInputType) => {
    storeModalLocationData.current = locationdata;
  };

  /**
   * Invoqué par le click de l'IonButton "validé" du header de la modal.
   * ___
   * Invoque la fonction provenant du parent, "props.submitNewElement", qui récupère le click event du bouton validé.
   * (*cette fonction sert à "POST" un nouvel element ( client ou véhicule créer par le formulaire associé* ))
   * ___
   * Vérifie si le "locationdata" n'est ni null, ni undefined, pour l'envoyer vers une autre fonction issue du parent ( vehicule page )
   * "props.submitNewLocationElement"
   *
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
   * Invoque la fonction handleInput déclaré dans la class Tools ( gestion des valeurs d'inputs )
   * Transmet au parent les input values issue du composant input utilisé
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any) => {
    props.handleInput(onChangeEvent);
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
            elementToManage={props.elementToManage}
          />
        ) : props.formToDisplay === "clients" ? (
          <ClientForm
            handleInput={handleInput}
            elementToManage={props.elementToManage}
          />
        ) : (
          <LocationForm
            vehicule={props.elementToManage}
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
