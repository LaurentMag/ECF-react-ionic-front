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

import {add, chevronDownCircle, colorPalette, globe} from "ionicons/icons";

export const Vehicles = () => {
  // FETCH VEHICLE LIST :
  const [vehiculeList, setVehiculeList] = useState<VehiculeType[]>();
  // VEHICLE CREATION :
  const [vehiculeUnite, setVehiculeUnite] = useState<VehiculeType>();

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
    console.log("submit");
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
    console.log(locationdata);
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

  const filter = () => {
    console.log("filtre");
    let filteredVehicles: VehiculeType[] = [];
    if (vehiculeList && filtre.current === "all") {
      filteredVehicles = vehiculeList;
    }
    if (vehiculeList && filtre.current === "dispo") {
      filteredVehicles = vehiculeList.filter((vehicule) => vehicule.disponible === true);
    }
    if (vehiculeList && filtre.current === "loue") {
      filteredVehicles = vehiculeList.filter((vehicule) => vehicule.disponible === false);
    }

    return filteredVehicles;
  };

  const filtre = useRef<string>("all");

  const changeRef = (e: any, ref: string) => {
    filtre.current = ref;
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

      <IonFab
        slot="fixed"
        vertical="top"
        horizontal="end"
        edge={true}>
        <IonFabButton size="small">
          <IonIcon icon={chevronDownCircle} />
        </IonFabButton>
        <IonFabList side="bottom">
          <IonFabButton onClick={(e) => changeRef(e, "all")}>
            <IonIcon icon={colorPalette}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={(e) => changeRef(e, "dispo")}>
            <IonIcon icon={colorPalette}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={(e) => changeRef(e, "loue")}>
            <IonIcon icon={globe}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>

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
          vehiculeList.map((vehicule) => {
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
