# eventhub

## Conventions de commit

Ce projet suit la spécification **Conventional Commits** (v1.0.0) : une convention légère pour écrire des messages de commit lisibles par les humains et exploitables par des outils (génération de changelog, versionnage sémantique automatique, CI).

### Structure d'un message

```
<type>[scope optionnel]: <description>

[corps optionnel]

[footer(s) optionnel(s)]
```

| Élément         | Obligatoire | Rôle                                                                            |
| --------------- | ----------- | ------------------------------------------------------------------------------- |
| **type**        | oui         | Nature du changement (`feat`, `fix`, ...)                                       |
| **scope**       | non         | Partie du code concernée, entre parenthèses : `feat(parser): ...`               |
| **description** | oui         | Résumé court du changement, juste après `: `                                    |
| **corps**       | non         | Explication détaillée, séparée de l'en-tête par une ligne vide                  |
| **footer**      | non         | Métadonnées (`BREAKING CHANGE`, `Refs`, `Reviewed-by`...), après une ligne vide |

### Types

Seuls `feat` et `fix` sont imposés par la spécification. Les autres types sont ceux recommandés par la convention Angular, la plus utilisée.

| Type       | Usage                                                                |
| ---------- | -------------------------------------------------------------------- |
| `feat`     | Ajout d'une nouvelle fonctionnalité                                  |
| `fix`      | Correction d'un bug                                                  |
| `docs`     | Documentation uniquement                                             |
| `style`    | Formatage, espaces, points-virgules (aucun changement de logique)    |
| `refactor` | Restructuration du code sans ajout de fonctionnalité ni correction   |
| `perf`     | Amélioration des performances                                        |
| `test`     | Ajout ou correction de tests                                         |
| `build`    | Système de build, dépendances externes                               |
| `ci`       | Configuration de l'intégration continue                              |
| `chore`    | Tâches de maintenance qui ne touchent ni le code source ni les tests |
| `revert`   | Annulation d'un commit précédent                                     |

### Breaking changes

Un changement qui casse la compatibilité se signale de deux façons (cumulables) :

- un `!` juste avant les `:` → `feat!: ...` ou `feat(api)!: ...`
- un footer `BREAKING CHANGE: <description>` (en majuscules)

Un breaking change peut accompagner n'importe quel type.

### Lien avec le versionnage sémantique (SemVer)

| Commit                   | Version     | Exemple       |
| ------------------------ | ----------- | ------------- |
| `fix`                    | **PATCH**   | 1.0.0 → 1.0.1 |
| `feat`                   | **MINOR**   | 1.0.0 → 1.1.0 |
| `BREAKING CHANGE` ou `!` | **MAJOR**   | 1.0.0 → 2.0.0 |
| autres types             | aucun effet | —             |

### Bonnes pratiques

- Type en **minuscules**
- Description à l'**impératif**, courte, sans majuscule initiale ni point final
- En-tête de **100 caractères maximum**
- **Un commit = un changement** : si un commit relève de plusieurs types, le découper
- Le corps explique **pourquoi**, pas _comment_ (le code montre déjà le comment)

### Exemples

Commit simple :

```
docs: corriger l'orthographe du CHANGELOG
```

Avec un scope :

```
feat(lang): ajouter la langue polonaise
```

Avec un `!` pour signaler un breaking change :

```
feat(api)!: envoyer un email au client à l'expédition du produit
```

Avec un footer `BREAKING CHANGE` :

```
feat: autoriser l'objet de config à étendre d'autres configs

BREAKING CHANGE: la clé `extends` du fichier de config sert désormais à étendre d'autres fichiers de config
```

Avec un corps et plusieurs footers :

```
fix: empêcher les requêtes concurrentes

Introduit un identifiant de requête et une référence vers la dernière requête.
Les réponses entrantes autres que celle de la dernière requête sont ignorées.

Reviewed-by: Z
Refs: #123
```

Annulation :

```
revert: annuler "feat: ajouter la langue polonaise"

Refs: 676104e
```

### Exemples refusés

```
update                              → pas de type
Feat: ajout login                   → type en majuscule
fix: Correction du bug.             → majuscule initiale et point final
feat ajouter le login               → il manque les deux-points
```

### Références

- [Spécification Conventional Commits (FR)](https://www.conventionalcommits.org/fr/v1.0.0/)
- [Guide Conventional Commits — Stéphane Robert](https://blog.stephane-robert.info/docs/developper/conventional-commits/)
- [Convention Angular](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/lang/fr/)
