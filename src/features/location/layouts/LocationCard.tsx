import {IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from "@ionic/react";
import React, {Fragment} from "react";
import {LocationType} from "../../../type/LocationType";

type PropsType = {
  location: LocationType;
};

export const LocationCard = (props: PropsType) => {
  return (
    <Fragment>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
    </Fragment>
  );
};
