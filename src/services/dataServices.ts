import {dataURL} from "./dataUrl";
import {VehiculeType} from "../type/VehiculeType";
import {ClientType} from "../type/ClientType";
import {LocationType} from "../type/LocationType";

class DataService {
  fetchData = (url: string) => {
    return fetch(url).then((res) => res.json());
  };

  fetchDataById = (url: string, id: string) => {
    return fetch(`${url}/${id}`).then((res) => res.json());
  };

  postData = (url: string, data: ClientType | VehiculeType | LocationType) => {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${dataURL.base}`,
      },
    });
  };

  putData = (url: string, data: ClientType | VehiculeType | LocationType) => {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${dataURL.base}`,
      },
    }).then((res) => res.json);
  };

  patchData = (url: string, id: string, data: any) => {
    return fetch(`${url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${dataURL.base}`,
      },
    }).then((res) => res.json());
  };

  deleteData = (url: string, id: string) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json);
  };
}

export const dataService = Object.freeze(new DataService());
