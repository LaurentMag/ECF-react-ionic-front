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
import {CardLayout} from "../../../shared/CardLayout";

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

  // VEHICLE EDIT :
  const submitEditedElement = (obj: VehiculeType) => {
    dataService.putData(dataURL.vehicules, obj).then(() => fetchVehicules());
  };

  // VEHICLE DELETION :
  const deleteItem = (id: string) => {
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
    <PageLayout
      title="Vehicules"
      isBackButton={false}>
      <div className="center-button">
        <IonButton id="to-open-modal-vehicle">
          <IonIcon
            slot="start"
            icon={add}
          />
          Nouveau vehicule :
        </IonButton>
      </div>

      <Modal
        modalTitle="Nouveau vehicule :"
        triggerOpenModal="to-open-modal-vehicle"
        formToDisplay="vehicule"
        objectToManage={vehiculeUnite}
        handleInput={handleInput}
        submitModalForm={submitNewElement}></Modal>

      <IonList class="list-additional-style">
        {vehiculeList &&
          vehiculeList.map((vehicule) => {
            return (
              <CardLayout
                key={vehicule.id}
                elementType={vehicule}
                submitEditedElement={submitEditedElement}
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
