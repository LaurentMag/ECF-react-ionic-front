import {dataURL} from "./dataUrl";
import {VehiculeType} from "../type/VehiculeType";
import {ClientType} from "../type/ClientType";
import {LocationType} from "../type/LocationType";

class DataService {
  /**
   * fetch data on the appropriate url ( url defined in client & vehicle pages)
   * @param url URL to choosed data ( here Client or Vehicle )
   * @returns  the fetch "get"
   */
  fetchData = (url: string) => {
    return fetch(url).then((res) => res.json());
  };

  /**
   *
   * @param url URL to choosed data ( here Client or Vehicle )
   * @param data data of ClientType or VehiculeType depending of which function use this service
   * @returns fetch POST
   */
  postData = (url: string, data: ClientType | VehiculeType | LocationType) => {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": `${dataURL.base}`,
      },
    });
  };

  /**
   *  update data / override with a PUT
   * @param url URL to choosed data ( here Client or Vehicle )
   * @param id ID of the selected object
   * @param data data to be used to udpated the selected object
   * @returns  fetch PUT
   */
  putData = (url: string, id: string, data: ClientType | VehiculeType | LocationType) => {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": `${dataURL.base}`,
      },
    }).then((res) => res.json);
  };

  /**
   *  Patch a part of the selected object ( override only attribute send in the data obj)
   * @param url URL to choosed data ( here Client or Vehicle )
   * @param id ID of the selected object
   * @param data data to be used to udpated the selected object
   * @returns fetch PATCH
   */
  patchData = (url: string, id: string, data: any) => {
    return fetch(`${url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": `${dataURL.base}`,
      },
    }).then((res) => res.json());
  };

  /**
   * Deleted selected obj based on his id
   * @param url URL to choosed data ( here Client or Vehicle )
   * @param id ID of the selected object
   * @returns DELETE
   */
  deleteData = (url: string, id: string) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json);
  };
}

export const dataService = Object.freeze(new DataService());
