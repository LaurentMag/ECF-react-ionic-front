class dataURLClass {
  base = "http://localhost:8080";
  client = "http://localhost:8080/clients";
  vehicles = "http://localhost:8080/vehicules";
  location = "http://localhost:8080/locations";
}

export const dataURL = Object.freeze(new dataURLClass());
