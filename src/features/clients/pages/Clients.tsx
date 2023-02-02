import React, {useEffect, useState} from "react";
import {IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonList} from "@ionic/react";

import {PageLayout} from "../../../shared/PageLayout";
import {Modal} from "../../../shared/Modal";

import {ClientType} from "../../../type/ClientType";
import {dataService} from "../../../services/dataServices";
import {dataURL} from "../../../services/dataUrl";
import {tools} from "../../../services/tools";

import {add, image} from "ionicons/icons";

import {CardLayout} from "../../../shared/CardLayout";
import {ClientCard} from "../layouts/ClientCard";

export const Clients = () => {
  const [clientList, setClientList] = useState<ClientType[]>();
  const [clientUnit, setClientUnit] = useState<ClientType>();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    dataService.fetchData(dataURL.client).then((data) => setClientList(data));
  };

  const submitNewObj = () => {};

  /**
   * @param e click event
   */
  const submitEditedObj = (clickEvent: any): void => {
    clickEvent.preventDefault();
    //props.submitEditedObj(vehiculeEdit.id, vehiculeEdit);
  };

  /**
   * Efface vehicule selectionné après avoir clické sur
   * le bouton "delete". Renvoie l'ID du vehicule.
   * @param e click event
   */
  const deleteItem = (): void => {
    //props.deleteVehicle(props.vehicule.id);
  };

  const handleInput = (onChangeEvent: any) => {
    tools.handleInput(onChangeEvent, setClientUnit);
  };

  return (
    <PageLayout
      title="Clients"
      isBackButton={false}
      isLogo={true}>
      <div className="center-button">
        <IonButton id="to-open-modal-client">
          <IonIcon
            slot="start"
            icon={add}
          />
          Nouveau Client
        </IonButton>
      </div>

      <Modal
        modalTitle="Nouveau Client :"
        triggerOpenModal="to-open-modal-client"
        formToDisplay="client"
        objectToManage={clientUnit}
        handleInput={handleInput}
        submitModalForm={submitNewObj}></Modal>

      <IonList>
        {clientList &&
          clientList.map((client) => {
            return (
              <CardLayout
                key={client.id}
                elementType={client}
                submitEditedElement={submitEditedObj}
                deleteElement={deleteItem}
                IsRental={false}
                triggerModalId={`to-edit-client${client.id}`}
                formType="client">
                <ClientCard element={client} />
              </CardLayout>
            );
          })}
      </IonList>
    </PageLayout>
  );
};
