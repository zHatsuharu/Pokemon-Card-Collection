# Pokemon Card Collection

### Techno :
- React TS (Vite)
- Firebase
- Pokemon TCG API

---
### Installation
Cloner le repo :
```sh
git clone git@github.com:zHatsuharu/Pokemon-Card-Collection.git
```

Aller dans le dossier cloné :
```sh
cd Pokemon-Card-Collection
```

Installer npm packages :
```sh
npm i
```

Créer le fichier `.env` à la racine et le compléter en suivant l'exemple `.env.exemple` avec :
- `VITE_API_KEY` votre clé api obtenable sur le site [Pokemon TCG API](https://dev.pokemontcg.io/) après vous êtes crées un compte
- `VITE_API_URL` url de base de l'api (mettez `https://api.pokemontcg.io/v2/`)

Lancer le projet :
```sh
npm run dev
```

Accéder au site via `http://localhost:5174/`

---
### Fonctionnalités
- `Home` : Regroupe toutes les cartes pokémons, on peut cliquer dessus pour obtenir les informations de ventes.
- `Login/Sign Up` : Système de connexion pour pouvoir sauvegarder sa propre collection.
- `Sets` : Contient tous les sets des cartes avec accès aux cartes qui appartiennent au set.
- `Collection` : Permet de gérer sa collection de cartes.

---
### To Do
> Cette liste contient les améliorations possible au site.

- [ ] Création de ses propres decks
- [ ] Améliorer certains affichages (collection, informations cartes)
- [ ] Création d'un blog d'aide pour chercher les cartes
- [ ] Refonte des utilisateurs
  - [ ] Utilisateur personnalisable (avatar)
  - [ ] Permettre le changement de mot de passe ou email
  - [ ] Ajouter des favoris sur les cartes
- [ ] Ajout récupération de compte si mot de passe oublié