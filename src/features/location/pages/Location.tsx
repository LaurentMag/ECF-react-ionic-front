import {useIonViewDidEnter, useIonViewWillEnter} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {dataService} from "../../../services/dataServices";
import {dataURL} from "../../../services/dataUrl";
import {PageLayout} from "../../../shared/PageLayout";
import {LocationType} from "../../../type/LocationType";
import {LocationCard} from "../layouts/LocationCard";

export const Location = () => {
  const [locationList, setLocationList] = useState<LocationType[]>();

  // not the best solution to fetch at each page enter ( i guess )
  useIonViewWillEnter(() => {
    fetchLocation();
  });

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
              <LocationCard
                key={location.id}
                location={location}
              />
            );
          })}
      </div>
    </PageLayout>
  );
};
