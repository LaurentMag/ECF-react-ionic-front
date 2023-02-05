import {IonCheckbox, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption} from "@ionic/react";

import {VehiculeType} from "../../../type/VehiculeType";

import "../../../css/form.css";

type PropsType = {
  handleInput: Function;
  elementToManage: VehiculeType;
};

export const VehiculeForm = (props: PropsType) => {
  const handleInput = (onChangeEvent: any) => {
    props.handleInput(onChangeEvent);
  };

  return (
    <div className="form-container">
      <IonList>
        <IonItem>
          <IonLabel position="floating">Modele : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="modele"
            value={props.elementToManage?.modele}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Marque : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="marque"
            value={props.elementToManage?.marque}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Immatriculation : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="immatriculation"
            value={props.elementToManage?.immatriculation}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Etat : </IonLabel>
          <IonSelect
            class="custom"
            onIonChange={handleInput}
            name="etat"
            cancelText="Annuler"
            value={props.elementToManage?.etat}>
            <IonSelectOption value="A">A</IonSelectOption>
            <IonSelectOption value="B">B</IonSelectOption>
            <IonSelectOption value="C">C</IonSelectOption>
            <IonSelectOption value="D">D</IonSelectOption>
            <IonSelectOption value="E">E</IonSelectOption>
            <IonSelectOption value="F">F</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Prix à la journée : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            type="number"
            onIonChange={handleInput}
            clearInput={true}
            name="prixJournee"
            value={props.elementToManage?.prixJournee}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Type : </IonLabel>
          <IonInput
            class="custom"
            placeholder="..."
            onIonChange={handleInput}
            clearInput={true}
            name="type"
            value={props.elementToManage?.type}></IonInput>
        </IonItem>

        <div className="check-box-container">
          <IonItem>
            <IonCheckbox
              slot="end"
              name="disponible"
              onIonChange={handleInput}
              checked={props.elementToManage?.disponible}></IonCheckbox>
            <IonLabel class={`${props.elementToManage?.disponible ? "disponible" : "loue"}`}>
              {props.elementToManage?.disponible ? "Disponible" : "Indisponible"}
            </IonLabel>
          </IonItem>
        </div>
      </IonList>
    </div>
  );
};
