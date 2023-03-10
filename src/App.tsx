import {Redirect, Route} from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {key, car, sad, archive} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./css/main.css";

import {Vehicles} from "./features/vehicules/pages/Vehicles";
import {Clients} from "./features/clients/pages/Clients";
import {VehicleDetail} from "./features/vehicules/pages/VehicleDetail";
import {Location} from "./features/location/pages/Location";
import {Debug} from "./features/Debug";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect
            exact
            from="/"
            to="/vehicles"
          />
          <Route
            exact
            path="/vehicles"
            component={Vehicles}></Route>
          <Route
            exact
            path="/vehicles/:id"
            component={VehicleDetail}></Route>
          <Route
            exact
            path="/clients"
            component={Clients}></Route>
          <Route
            path="/locations"
            component={Location}></Route>
          <Route
            path="/debug"
            component={Debug}></Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton
            tab="vehicules"
            href="/vehicles">
            <IonIcon icon={car} />
            <IonLabel>Vehicules</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="locations"
            href="/locations">
            <IonIcon icon={key} />
            <IonLabel>Locations</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="clients"
            href="/clients">
            <IonIcon icon={sad} />
            <IonLabel>Clients</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="debug"
            href="/debug">
            <IonIcon icon={archive} />
            <IonLabel>debug</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
