import React, {useEffect, useRef, useState} from "react";
import {IonFab, IonFabButton, IonFabList, IonIcon, IonList, useIonAlert} from "@ionic/react";

import {PageLayout} from "../../../shared/PageLayout";
import {Modal} from "../../../shared/Modal";
import {CardLayout} from "../../../shared/CardLayout";
import {VehiculeCard} from "../layouts/VehiculeCard";

import {dataService} from "../../../services/dataServices";
import {dataURL} from "../../../services/dataUrl";
import {tools} from "../../../services/tools";

import {LocationTypeToSend, ModalLocationInputType} from "../../../type/LocationType";
import {VehiculeType} from "../../../type/VehiculeType";

import {add, car, chevronDownCircle, colorPalette, globe, key, keyOutline} from "ionicons/icons";
import {FabFilter} from "../layouts/FabFilter";

export const Vehicles = () => {
  // FETCH VEHICLE LIST :
  const [vehiculeList, setVehiculeList] = useState<VehiculeType[]>();
  // VEHICLE CREATION :
  const [vehiculeUnite, setVehiculeUnite] = useState<VehiculeType>();
  // filter coming from FabFilter component, sending state for it to update it
  const [filter, setFiler] = useState<string>("all");

  const [presentAlert] = useIonAlert();

  useEffect(() => {
    fetchVehicules();
  }, []);

  const fetchVehicules = () => {
    dataService.fetchData(dataURL.vehicules).then((data) => setVehiculeList(data));
  };

  /**
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any) => {
    tools.handleInput(onChangeEvent, setVehiculeUnite);
  };

  // VEHICLE CREATION
  const submitNewElement = () => {
    if (
      vehiculeUnite &&
      vehiculeUnite?.marque !== "" &&
      vehiculeUnite?.modele !== "" &&
      vehiculeUnite?.immatriculation !== ""
    ) {
      dataService.postData(dataURL.vehicules, vehiculeUnite).then(() => fetchVehicules());
      presentAlert({
        header: `${vehiculeUnite.marque}, ${vehiculeUnite.modele}`,
        message: "A bien été créé",
        buttons: ["OK"],
      });
    } else {
      console.log("incomplet");
    }
  };

  const submitNewLocationElement = (locationdata: ModalLocationInputType) => {
    const createLocationObj: LocationTypeToSend = {
      dateDebut: locationdata.dateDebut,
      dateFin: locationdata.dateFin,
      client: {
        id: locationdata.idClient,
      },
      vehicule: {
        id: locationdata.idVehicule,
      },
    };
    dataService.postData(dataURL.locations, createLocationObj);
    presentAlert({
      header: `La location de a été crée`,
      buttons: ["OK"],
    });
  };

  // VEHICLE EDIT :
  const submitEditedElement = (obj: VehiculeType) => {
    dataService.putData(dataURL.vehicules, obj).then(() => fetchVehicules());
    presentAlert({
      header: `${obj.modele}, ${obj.marque}`,
      message: "A bien été édité",
      buttons: ["OK"],
    });
  };

  // VEHICLE DELETION :
  const deleteElement = (id: string) => {
    if (vehiculeList) {
      let deletedElement = vehiculeList.filter((vehicule) => vehicule.id === id);

      presentAlert({
        header: `Voulez vous Supprimer : `,
        message: `${deletedElement[0].modele}, ${deletedElement[0].marque}`,
        buttons: [
          {
            text: "Annuler",
            role: "cancel",
          },
          {
            text: "Supprimer",
            role: "confirm",
            handler: () => {
              dataService.deleteData(dataURL.vehicules, id).then(() => fetchVehicules());
            },
          },
        ],
      });
    }
  };

  // DISPLAY
  return (
    <PageLayout
      title="Vehicules"
      isLogo={true}
      isBackButton={false}>
      <div slot="fixed">
        <IonFabButton
          size="small"
          id="to-open-modal-vehicle">
          <IonIcon icon={add} />
        </IonFabButton>
      </div>

      <FabFilter setStateFilter={setFiler} />

      <Modal
        elementToManage={vehiculeUnite}
        handleInput={handleInput}
        submitNewElement={submitNewElement}
        submitNewLocationElement={() => {}}
        modalTitle="Ajouter :"
        triggerOpenModal="to-open-modal-vehicle"
        formToDisplay="vehicule"></Modal>

      <IonList class="list-additional-style">
        {vehiculeList &&
          tools.filteredArr(vehiculeList, filter).map((vehicule) => {
            return (
              <CardLayout
                key={vehicule.id}
                elementToManage={vehicule}
                submitEditedElement={submitEditedElement}
                submitNewLocationElement={submitNewLocationElement}
                deleteElement={deleteElement}
                triggerModalId={`to-edit-client${vehicule.id}`}
                formToDisplay="vehicule"
                IsRental={true}>
                <VehiculeCard element={vehicule} />
              </CardLayout>
            );
          })}
      </IonList>
    </PageLayout>
  );
};
