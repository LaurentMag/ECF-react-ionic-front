import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from "@ionic/react";
import React from "react";

type propsType = {
  title: string;
  children: any;
};

export const PageLayout = (props: propsType) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">{props.children}</IonContent>
    </IonPage>
  );
};
