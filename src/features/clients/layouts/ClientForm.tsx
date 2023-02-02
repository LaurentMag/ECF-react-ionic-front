import {IonList, IonItem, IonLabel, IonInput, IonDatetime, IonDatetimeButton, IonModal} from "@ionic/react";
import React from "react";
import {tools} from "../../../services/tools";
import {ClientType} from "../../../type/ClientType";

type PropsType = {
  handleInput: Function;
  objectToManage: ClientType;
};

export const ClientForm = (props: PropsType) => {
  const handleInput = (e: any) => {
    props.handleInput(e);
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
            name="modele"
            value={props.objectToManage?.prenom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nom : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="marque"
            value={props.objectToManage?.nom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Telephone : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="immatriculation"
            value={props.objectToManage?.telephone}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Email : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="prixJournee"
            value={props.objectToManage?.email}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date de naissance : </IonLabel>

          <IonInput
            type="date"
            onIonChange={handleInput}
            name="type"></IonInput>
        </IonItem>
      </IonList>
    </div>
  );
};
