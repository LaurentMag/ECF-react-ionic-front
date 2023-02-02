import {IonList, IonItem, IonLabel, IonInput, IonDatetime, IonDatetimeButton, IonModal} from "@ionic/react";
import React from "react";
import {tools} from "../../../services/tools";
import {ClientType} from "../../../type/ClientType";

type PropsType = {
  handleInput: Function;
  objectToManage: ClientType;
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
            value={props.objectToManage?.prenom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nom : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="nom"
            value={props.objectToManage?.nom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Telephone : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="telephone"
            value={props.objectToManage?.telephone}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Email : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="email"
            value={props.objectToManage?.email}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date de naissance : </IonLabel>
          <IonItem>
            <IonDatetimeButton datetime="dateDebut"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="dateDebut"
                onIonChange={handleInput}></IonDatetime>
            </IonModal>
          </IonItem>
        </IonItem>
      </IonList>
    </div>
  );
};
