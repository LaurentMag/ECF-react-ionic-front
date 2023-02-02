class dataURLClass {
  base = "http://localhost:8080";
  clients = "http://localhost:8080/clients";
  vehicules = "http://localhost:8080/vehicules";
  locations = "http://localhost:8080/locations";
}

export const dataURL = Object.freeze(new dataURLClass());
