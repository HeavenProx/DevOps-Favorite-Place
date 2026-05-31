# My Favorite Places app

Il s'agit d'une application de démonstration pour travailler autour de Docker et de la CI. Vous devez cloner ce dépôt, supprimer le dossier `.git` et le pousser sur votre propre dépôt public !

Le dossier client est vide, vous pouvez créer une interface pour communiquer avec le serveur ! C'est en quelque sorte un bonus.

---

## Docker Swarm + Ansible

### Structure

```
swarm/
  Dockerfile        # Image DinD personnalisée avec Python + sudo (requis pour Ansible)
  compose.yml       # Cluster DinD : 1 manager + N nœuds
ansible/
  inventory.ini     # Inventaire Ansible (noms des conteneurs pour la connexion Docker)
  init_swarm_cluster.yml  # Playbook : init Swarm sur le manager, ajout des workers
ansible.sh          # Script pour lancer le playbook
```

### Prérequis

- Docker Desktop avec l'intégration WSL2 Ubuntu activée
- Dans WSL2 Ubuntu :
  ```bash
  sudo apt install ansible python3-docker
  ansible-galaxy collection install community.docker
  ```

### Utilisation

**1. Démarrer le cluster Swarm** (depuis WSL2 Ubuntu, à la racine du dépôt) :

```bash
cd swarm
docker compose up -d --scale node=3
cd ..
```

**2. Lancer le playbook Ansible** pour configurer Docker Swarm automatiquement :

```bash
# ANSIBLE_REMOTE_TMP=/tmp est requis sur Windows/WSL (système de fichiers accessible en écriture globale)
ANSIBLE_REMOTE_TMP=/tmp bash ansible.sh
```

**3. Vérifier le cluster :**

```bash
docker exec swarm-manager-1 docker node ls
```

### Notes

- L'inventaire utilise `ansible_connection=community.docker.docker` : Ansible se connecte aux conteneurs via `docker exec` (pas de SSH nécessaire).
- Les workers rejoignent le manager via le nom de service Docker Compose `manager:2377` (résolu par le DNS interne de Docker).
- Le playbook est idempotent : le relancer sur un cluster déjà configuré ne génère aucune erreur (les nœuds déjà dans le swarm sont gérés via `failed_when`).
