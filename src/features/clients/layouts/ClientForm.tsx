import {IonList, IonItem, IonLabel, IonInput, IonDatetime, IonDatetimeButton, IonModal} from "@ionic/react";
import React from "react";
import {ClientType} from "../../../type/ClientType";

type PropsType = {
  handleInput: Function;
  elementToManage: ClientType;
};

export const ClientForm = (props: PropsType) => {
  const handleInput = (onChangeEvent: any) => {
    props.handleInput(onChangeEvent);
  };

  return (
    <div className="form-container">
      <IonList>
        <IonItem>
          <IonLabel position="floating">Prenom : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="prenom"
            value={props.elementToManage?.prenom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nom : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="nom"
            value={props.elementToManage?.nom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Telephone : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="telephone"
            value={props.elementToManage?.telephone}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Email : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="email"
            value={props.elementToManage?.email}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date de naissance : </IonLabel>
          <IonItem>
            <IonDatetimeButton datetime="dateDebut"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="dateDebut"
                onIonChange={handleInput}
                value={props.elementToManage?.dateDeNaissance}></IonDatetime>
            </IonModal>
          </IonItem>
        </IonItem>
      </IonList>
    </div>
  );
};
