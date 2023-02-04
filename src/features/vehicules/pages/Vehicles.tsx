import React, {useEffect, useRef, useState} from "react";
import {IonFab, IonFabButton, IonFabList, IonIcon, IonList} from "@ionic/react";

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
  };

  // VEHICLE EDIT :
  const submitEditedElement = (obj: VehiculeType) => {
    dataService.putData(dataURL.vehicules, obj).then(() => fetchVehicules());
  };

  // VEHICLE DELETION :
  const deleteItem = (id: string) => {
    dataService.deleteData(dataURL.vehicules, id).then(() => fetchVehicules());
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
        modalTitle="Ajouter :"
        triggerOpenModal="to-open-modal-vehicle"
        formToDisplay="vehicule"
        objectToManage={vehiculeUnite}
        handleInput={handleInput}
        submitNewElement={submitNewElement}
        submitNewLocationElement={() => {}}></Modal>

      <IonList class="list-additional-style">
        {vehiculeList &&
          tools.filteredArr(vehiculeList, filter).map((vehicule) => {
            return (
              <CardLayout
                key={vehicule.id}
                elementType={vehicule}
                submitEditedElement={submitEditedElement}
                submitNewLocationElement={submitNewLocationElement}
                deleteElement={deleteItem}
                IsRental={true}
                triggerModalId={`to-edit-client${vehicule.id}`}
                formType="vehicule">
                <VehiculeCard element={vehicule} />
              </CardLayout>
            );
          })}
      </IonList>
    </PageLayout>
  );
};
