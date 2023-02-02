import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons} from "@ionic/react";
import React from "react";

type propsType = {
  title: string;
  isBackButton: boolean;
  children: any;
};

export const PageLayout = (props: propsType) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
          {props.isBackButton && (
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">{props.children}</IonContent>
    </IonPage>
  );
};
