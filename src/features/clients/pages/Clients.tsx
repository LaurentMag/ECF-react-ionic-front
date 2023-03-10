import React, {useEffect, useState} from "react";
import {IonFabButton, IonIcon, IonList} from "@ionic/react";

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
    dataService.fetchData(dataURL.clients).then((data) => setClientList(data));
  };

  const submitNewElement = () => {
    if (clientUnit) {
      if (clientUnit.nom !== "" && clientUnit.prenom !== "" && clientUnit.telephone !== "") {
        dataService.postData(dataURL.clients, clientUnit).then(() => fetchClients());
      }
    }
  };

  /**
   * @param e click event
   */
  const submitEditedElement = (obj: ClientType): void => {
    dataService.putData(dataURL.clients, obj).then(() => fetchClients());
  };

  /**
   * Efface client selectionné après avoir clické sur
   * le bouton "delete". Renvoie l'ID du client.
   * @param e click event
   */
  const deleteElement = (id: string): void => {
    dataService.deleteData(dataURL.clients, id).then(() => fetchClients());
  };

  const handleInput = (onChangeEvent: any) => {
    tools.handleInput(onChangeEvent, setClientUnit);
  };

  return (
    <PageLayout
      title="Clients"
      isBackButton={false}
      isLogo={true}>
      <div slot="fixed">
        <IonFabButton
          size="small"
          id="to-open-modal-client">
          <IonIcon icon={add} />
        </IonFabButton>
      </div>

      <Modal
        elementToManage={clientUnit}
        handleInput={handleInput}
        submitNewElement={submitNewElement}
        submitNewLocationElement={() => {}}
        modalTitle="Ajouter :"
        triggerOpenModal="to-open-modal-client"
        formToDisplay="clients"></Modal>

      <IonList>
        {clientList &&
          clientList.map((client) => {
            return (
              <CardLayout
                key={client.id}
                elementToManage={client}
                submitEditedElement={submitEditedElement}
                submitNewLocationElement={() => {}}
                deleteElement={deleteElement}
                IsRental={false}
                triggerModalId={`to-edit-client${client.id}`}
                formToDisplay="clients">
                <ClientCard element={client} />
              </CardLayout>
            );
          })}
      </IonList>
    </PageLayout>
  );
};
