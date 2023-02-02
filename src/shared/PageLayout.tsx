import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons} from "@ionic/react";
import React from "react";

import logo from "../assets/localib-logo-nobg.png";

type propsType = {
  title: string;
  isBackButton: boolean;
  isLogo: boolean;
  children: any;
};

export const PageLayout = (props: propsType) => {
  return (
    <IonPage>
      <IonHeader
        translucent={true}
        class="testHeader">
        <IonToolbar>
          {props.isLogo && (
            <img
              alt="logo"
              height="60"
              src={logo}
            />
          )}
          <IonTitle class="page-title">{props.title}</IonTitle>
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
