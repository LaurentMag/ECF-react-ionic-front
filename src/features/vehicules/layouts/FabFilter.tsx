import {IonFab, IonFabButton, IonIcon, IonFabList} from "@ionic/react";
import {car, keyOutline, key} from "ionicons/icons";
import React from "react";

type PropsType = {
  setStateFilter: Function;
};

export const FabFilter = (props: PropsType) => {
  return (
    <IonFab
      slot="fixed"
      vertical="top"
      horizontal="end"
      edge={false}>
      <IonFabButton
        color="medium"
        size="small">
        <IonIcon icon={car} />
      </IonFabButton>
      <IonFabList side="bottom">
        <IonFabButton onClick={(e) => props.setStateFilter("all")}>
          <IonIcon icon={car}></IonIcon>
        </IonFabButton>
        <IonFabButton onClick={(e) => props.setStateFilter("dispo")}>
          <IonIcon icon={keyOutline}></IonIcon>
        </IonFabButton>
        <IonFabButton onClick={(e) => props.setStateFilter("loue")}>
          <IonIcon icon={key}></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};
