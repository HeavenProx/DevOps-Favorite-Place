#!/bin/bash
set -e  # Exit immediately if any command fails

# Run Ansible playbook to configure the Docker Swarm cluster.
# Prerequisites:
#   - Swarm containers must be running: cd swarm && docker compose up -d --scale node=3
#   - Ansible + community.docker collection must be installed (see README)
#   - On Windows: run this script from WSL2 Ubuntu
#
# Usage: ANSIBLE_REMOTE_TMP=/tmp bash ansible.sh
#   ANSIBLE_REMOTE_TMP=/tmp is required on Windows (WSL) because the project folder
#   is mounted from Windows and is "world-writable", causing Ansible to ignore ansible.cfg.

echo "✅ Running Ansible Playbooks..."
ansible-playbook -i ansible/inventory.ini ansible/init_swarm_cluster.yml
