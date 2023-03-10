import {VehiculeType} from "../type/VehiculeType";

class Tools {
  /**
   * Function récupérant les valeurs d'inputs pour créer l'objet state.
   * Associe le nom de l'input identique à l'attribut, pour y assigné sa valeur
   * @param onChangeEvent Input onChange event
   * @param setState useState state à changer
   */
  handleInput(onChangeEvent: any, setState: any): void {
    setState((prevState: any) => {
      return {
        ...prevState,
        [onChangeEvent.target.name]:
          onChangeEvent.target.nodeName === "ION-CHECKBOX"
            ? onChangeEvent.target.checked
            : onChangeEvent.target.nodeName === "ION-DATETIME"
            ? onChangeEvent.target.value.split("T")[0]
            : onChangeEvent.target.value,
      };
    });
  }

  /**
   * Function récupérant les valeurs d'inputs pour créer l'objet location.
   * Assigne à chaque changement de valeur l'id du vehicule à louer, et assigne soit la valeur d'input (id du client)
   * soit les dates de locations
   * @param onChangeEvent Input onChange event
   * @param setState useState state à changer
   * @param propsVehicule : propsVehicule contenant l'objet véhicule passé au form location
   */
  handleInputLocation(onChangeEvent: any, setState: any, propsVehicule: any): void {
    const input = onChangeEvent.target;
    setState((prev: any) => {
      return {
        ...prev,
        idVehicule: propsVehicule.id,
        [input.name]: input.nodeName === "ION-DATETIME" ? input.value.split("T")[0] : input.value,
      };
    });
  }

  /**
   * calcule le prix en se basant sur les dates de début et de fin de location
   * vérification des dates
   * ___
   * Vérification si la date de début de location est bien avant la date de fin de location.
   * Sinon aucun prix ne sera calculé
   * @param dateStart
   * @param dateEnd
   * @param prixJournee prix pour une journée
   * @returns prix calculé
   */
  setRentalPrice = (dateStartparam: string, dateEndparam: string, prixJournee: number): number => {
    const dayConvert: number = 1000 * 60 * 60 * 24;
    const dateStart: Date = new Date(dateStartparam);
    const dateEnd: Date = new Date(dateEndparam);

    let prix: number = 0;
    let jours: number;

    jours = Math.ceil(dateEnd.getTime() - dateStart.getTime()) / dayConvert;

    if (jours > 0) {
      prix = jours * prixJournee;
    } else {
      console.log(" Séléction de date incorrect pour le calcul de prix ");
    }

    return prix;
  };

  /**
   *  Filtre la liste des véhicules en fonction d'un filtre de disponibilité ou de location
   * @param vehiculeList
   * @param filter (string issue du filtre selectionné)
   * @returns vehicules[] filtré
   */
  filteredArr = (vehiculeList: VehiculeType[], filter: string): VehiculeType[] => {
    let filteredVehicles: VehiculeType[] = [];
    if (vehiculeList && filter === "all") {
      filteredVehicles = vehiculeList;
    }
    if (vehiculeList && filter === "dispo") {
      filteredVehicles = vehiculeList.filter((vehicule) => vehicule.disponible === true);
    }
    if (vehiculeList && filter === "loue") {
      filteredVehicles = vehiculeList.filter((vehicule) => vehicule.disponible === false);
    }
    return filteredVehicles;
  };

  /**
   * créer la date du jour au format YYYY/MM//DD
   * @returns date: string
   */
  setTodayDate = (): string => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };
}

export const tools = new Tools();
