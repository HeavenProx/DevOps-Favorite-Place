# My Favorite Places app

This is a demo app to work arround Docker and CI, you should clone this repo, remove the `.git` folder and push it to your own public repo!

The client folder is empty, you may create an interface to communicate with the server! This is kind of a bonus

---

## Docker Swarm + Ansible

### Structure

```
swarm/
  Dockerfile        # Custom DinD image with Python + sudo (required for Ansible)
  compose.yml       # DinD cluster: 1 manager + N nodes
ansible/
  inventory.ini     # Ansible inventory (container names for Docker connection)
  init_swarm_cluster.yml  # Playbook: init Swarm on manager, join workers
ansible.sh          # Script to run the playbook
```

### Prerequisites

- Docker Desktop with WSL2 Ubuntu integration enabled
- In WSL2 Ubuntu:
  ```bash
  sudo apt install ansible python3-docker
  ansible-galaxy collection install community.docker
  ```

### Usage

**1. Start the Swarm cluster** (from WSL2 Ubuntu, at the repo root):
```bash
cd swarm
docker compose up -d --scale node=3
cd ..
```

**2. Run the Ansible playbook** to configure Docker Swarm automatically:
```bash
# ANSIBLE_REMOTE_TMP=/tmp is required on Windows/WSL (world-writable filesystem)
ANSIBLE_REMOTE_TMP=/tmp bash ansible.sh
```

**3. Verify the cluster:**
```bash
docker exec swarm-manager-1 docker node ls
```

### Notes

- The inventory uses `ansible_connection=community.docker.docker`: Ansible connects to containers via `docker exec` (no SSH needed).
- Workers join the manager via its Docker Compose service name `manager:2377` (resolved by Docker's internal DNS).
- The playbook is idempotent: re-running it on an already-configured cluster produces no errors (nodes already in the swarm are handled via `failed_when`).
