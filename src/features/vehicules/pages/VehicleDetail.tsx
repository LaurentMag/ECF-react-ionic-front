import {IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {dataService} from "../../../services/dataServices";
import {dataURL} from "../../../services/dataUrl";

import {PageLayout} from "../../../shared/PageLayout";
import {VehiculeType} from "../../../type/VehiculeType";

import picture from "../../../assets/car-cardboard.jpg";

export const VehicleDetail = () => {
  const {id} = useParams() as {id: string};
  const [fetchedElement, setFetchedElement] = useState<VehiculeType>();

  useEffect(() => {
    dataService.fetchDataById(dataURL.vehicules, id).then((data) => setFetchedElement(data));
  }, [id]);

  return (
    <PageLayout
      title="Vehicule détail :"
      isLogo={false}
      isBackButton={true}>
      <div>
        <img
          className="card-page-details-image"
          alt="picture placeholder"
          src={picture}
        />
        <IonCardHeader class="custom-card-bottom-border">
          <IonCardTitle>{fetchedElement && fetchedElement.modele}</IonCardTitle>
          <IonCardSubtitle class="custom-card-subtitle">{fetchedElement && fetchedElement.marque}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent class="custom-card-content ">
          <IonCardSubtitle class="custom-card-subtitle">
            Immatriculation : {fetchedElement && fetchedElement.immatriculation}
          </IonCardSubtitle>
          <IonCardSubtitle class="custom-card-subtitle">Type : {fetchedElement && fetchedElement.type}</IonCardSubtitle>
          <IonCardSubtitle class="custom-card-subtitle">Etat : {fetchedElement && fetchedElement.etat}</IonCardSubtitle>
          <IonCardSubtitle class="custom-card-subtitle">
            Par jour : {fetchedElement && fetchedElement.prixJournee}€
          </IonCardSubtitle>
        </IonCardContent>

        <p className={`location-text-detail ${fetchedElement && fetchedElement.disponible ? "disponible" : "loue"}`}>
          {fetchedElement && fetchedElement.disponible ? "Disponible" : "Loué"}
        </p>
      </div>
    </PageLayout>
  );
};
