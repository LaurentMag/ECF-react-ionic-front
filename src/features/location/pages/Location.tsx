import React, {useEffect, useState} from "react";
import {dataService} from "../../../services/dataServices";
import {dataURL} from "../../../services/dataUrl";
import {PageLayout} from "../../../shared/PageLayout";
import {LocationType} from "../../../type/LocationType";

export const Location = () => {
  const [locationList, setLocationList] = useState<LocationType[]>();

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    dataService.fetchData(dataURL.locations).then((data) => setLocationList(data));
  };

  return (
    <PageLayout
      title="Locations"
      isBackButton={false}
      isLogo={true}>
      <div>
        {locationList &&
          locationList.map((location) => {
            return (
              <div key={location.id}>
                <p>{location.client.nom}</p>
                <p>{location.vehicule.modele}</p>
              </div>
            );
          })}
      </div>
    </PageLayout>
  );
};
