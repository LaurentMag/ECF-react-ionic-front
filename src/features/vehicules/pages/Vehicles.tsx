import React, {useEffect, useRef, useState} from "react";
import {IonButton, IonIcon, IonList} from "@ionic/react";

import {PageLayout} from "../../../shared/PageLayout";
import {Modal} from "../../../shared/Modal";
import {VehiculeCard} from "../layouts/VehiculeCard";

import {VehiculeType} from "../../../type/VehiculeType";

import {dataService} from "../../../services/dataServices";
import {dataURL} from "../../../services/dataUrl";
import {tools} from "../../../services/tools";
import {add} from "ionicons/icons";

export const Vehicles = () => {
  // FETCH VEHICLE LIST :
  const [vehiculeList, setVehiculeList] = useState<VehiculeType[]>();
  // VEHICLE CREATION :
  const [vehiculeUnite, setVehiculeUnite] = useState<VehiculeType>();

  useEffect(() => {
    fetchVehicules();
  }, []);

  useEffect(() => {
    console.log(vehiculeList);
  }, [vehiculeList]);

  const fetchVehicules = () => {
    dataService.fetchData(dataURL.vehicules).then((data) => setVehiculeList(data));
  };

  // VEHICLE CREATION
  const submitNewObj = () => {
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

  // VEHICLE EDIT :
  const submitEditedObj = (id: string, obj: VehiculeType) => {
    dataService.putData(dataURL.vehicules, id, obj).then(() => fetchVehicules());
  };

  // VEHICLE DELETION :
  const deleteVehicle = (id: string) => {
    dataService.deleteData(dataURL.vehicules, id).then(() => fetchVehicules());
  };

  /**
   * @param e onChange input event
   */
  const handleInput = (onChangeEvent: any) => {
    tools.handleInput(onChangeEvent, setVehiculeUnite);
  };

  // DISPLAY
  return (
    <PageLayout title="Vehicules">
      <div className="center-button">
        <IonButton id="to-open-modal-vehicle">
          <IonIcon
            slot="start"
            icon={add}
          />
          Nouveau vehicule
        </IonButton>
      </div>

      <Modal
        modalTitle="Nouveau vehicule :"
        triggerOpenModal="to-open-modal-vehicle"
        formToDisplay="vehicule"
        objectToManage={vehiculeUnite}
        handleInput={handleInput}
        submitModalForm={submitNewObj}></Modal>

      <IonList class="list-additional-style">
        {vehiculeList &&
          vehiculeList.map((vehicule) => {
            return (
              <VehiculeCard
                key={vehicule.id}
                vehicule={vehicule}
                submitEditedObj={submitEditedObj}
                deleteVehicle={deleteVehicle}
              />
            );
          })}
      </IonList>
    </PageLayout>
  );
};
