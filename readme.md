# Projet :

Mobile version de localib avec Ionic

<hr />

##### Requis :

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)

<hr />

##### BACK-END :

```
git clone  git@github.com:LaurentMag/ECF-cda-backEnd.git
```

Dans un terminal, dans le dossier **ECF-cda-backEnd**

```
docker compose up -d
```

API et mongo database seront dockerisé.

<hr />

##### FRONT-END :

git clone :

```
git clone git@github.com:LaurentMag/ECF-react-ionic-front.git
```

Dans un terminal, dans le dossier **ECF-react-ionic-front**

```
npm i
```

Puis :

```
npm run start
```

Vehicules & client seront vide car nouvelle DB, CRUD fonctionnel ainsi que la création de "location"
BUG : après la création de location nécessité de reload la page de location pour avoir l'affichage de la dernière créé, trop court pour fixer les bug

<hr />

##### REMPLIR LA DB :

Dans le fichier **ECF-react-ionic-front/ressources.json**
Une liste d'utilisateur et vehicules sont présent ( ne pas utiliser la liste des locations, à créer par l'application )

**Avec POSTMAN**

Pour ajouter les objets clients individuel en POST :

```
http://localhost:8080/clients
```

Pour ajouter les objets vehicules individuel en POST :

```
http://localhost:8080/vehicules
```
