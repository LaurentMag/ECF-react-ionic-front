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

<hr />

##### REMPLIR LA DB :

Une tab "debug" à été ajouté pour ajouter des clients / véhicule à la base de donnée en vue de tester l'application.
/!\ ne devrait pas être conservé autre que pour le dev.
