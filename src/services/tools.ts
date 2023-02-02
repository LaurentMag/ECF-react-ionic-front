class Tools {
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
   * calcule le prix en se basant sur les dates de début et de fin de location
   * vérification des dates
   * @param dateStart
   * @param dateEnd
   * @param oneDayPrice prix pour une journée
   * @returns prix calculé
   */
  rentalPriceCalculation = (dateStartparam: string, dateEndparam: string, oneDayPrice: number) => {
    const dayConvert: number = 1000 * 60 * 60 * 24;
    const dateStart: Date = new Date(dateStartparam);
    const dateEnd: Date = new Date(dateEndparam);

    let price: number = 0;
    let getDayCount: number;

    getDayCount = Math.ceil(dateEnd.getTime() - dateStart.getTime()) / dayConvert;

    if (getDayCount > 0) {
      price = getDayCount * oneDayPrice;
    } else {
      console.log(" Séléction de date incorrect pour le calcul de prix ");
    }

    return price;
  };
}

export const tools = new Tools();
