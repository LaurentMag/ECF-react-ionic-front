import {IonButton, IonCard, IonCardSubtitle, IonPage} from "@ionic/react";
import React, {useEffect, useRef, useState} from "react";
import {PageLayout} from "../shared/PageLayout";

import {dataService} from "../services/dataServices";
import {dataURL} from "../services/dataUrl";
import {cloudyNight} from "ionicons/icons";
import {Console, log} from "console";

export const Debug = () => {
  const [dataJson, setDataJson] = useState<any>();
  const [buttonsDisable, setButtonsDisable] = useState({clients: true, vehicules: true});

  const fetchJson = () => {
    return fetch("./ressources.json")
      .then((res) => res.json())
      .then((data) => setDataJson(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchJson();
  }, []);

  const changeClientBtnState = () => {
    setButtonsDisable((prev) => {
      return {...prev, clients: !prev.clients};
    });
  };

  const changeVehiculeBtnState = () => {
    setButtonsDisable((prev) => {
      return {...prev, vehicules: !prev.vehicules};
    });
  };

  const fillDataBaseClient = () => {
    dataJson.clients.map((client: any) => {
      return dataService.postData(dataURL.clients, client).then(() => changeClientBtnState());
    });
  };

  const fillDataBaseVehicules = () => {
    dataJson.voitures.map((vehicule: any) => {
      return dataService.postData(dataURL.vehicules, vehicule).then(() => changeVehiculeBtnState());
    });
  };

  const clearDatabaseClient = () => {
    let tempData: any = [];
    dataService
      .fetchData(dataURL.clients)
      .then((data) => (tempData = data))
      .then(() => {
        return tempData.map((obj: any) => {
          dataService.deleteData(dataURL.clients, obj.id);
        });
      })
      .then(() => changeClientBtnState());
  };

  const clearDatabaseVehicule = () => {
    let tempData: any = [];
    dataService
      .fetchData(dataURL.vehicules)
      .then((data) => (tempData = data))
      .then(() => {
        return tempData.map((obj: any) => {
          dataService.deleteData(dataURL.vehicules, obj.id);
        });
      })
      .then(() => changeVehiculeBtnState());
  };

  return (
    <PageLayout
      title="Debug"
      isBackButton={false}
      isLogo={false}>
      <IonCard>
        <div className="debug-card-content">
          <IonCardSubtitle class="custom-card-location-title">Ajout data : </IonCardSubtitle>
          <IonButton
            disabled={buttonsDisable.clients ? false : true}
            onClick={fillDataBaseClient}>
            Ajout clients
          </IonButton>
          <IonButton
            disabled={buttonsDisable.vehicules ? false : true}
            onClick={fillDataBaseVehicules}>
            Ajout Vehicules
          </IonButton>
        </div>
      </IonCard>
      <IonCard>
        <div className="debug-card-content">
          <IonCardSubtitle class="custom-card-location-title">Supprime data : </IonCardSubtitle>
          <IonButton
            disabled={buttonsDisable.clients ? true : false}
            onClick={clearDatabaseClient}>
            Suppression des clients
          </IonButton>
          <IonButton
            disabled={buttonsDisable.vehicules ? true : false}
            onClick={clearDatabaseVehicule}>
            Suppression des vehicules
          </IonButton>
        </div>
      </IonCard>
      <IonCardSubtitle>* Les clients ou vehicules doivent être effacé avant d'être ajouté de nouveau</IonCardSubtitle>
    </PageLayout>
  );
};
