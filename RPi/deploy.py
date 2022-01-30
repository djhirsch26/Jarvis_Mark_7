# Flashes over all files to the Rasperry Pi
from config.overlay import CONFIG, PATHS
import subprocess

REMOTE_ADDRESS = "pi@192.168.1.200"

for directory in PATHS:
    subprocess.run(["ssh", REMOTE_ADDRESS, f"mkdir -p {directory}"])

for local_path,remote_path in CONFIG.items():
    print(f"Copying ./overlay/{local_path} to {REMOTE_ADDRESS}:{remote_path}")
    subprocess.run(["rsync", f"./overlay/{local_path}", f"{REMOTE_ADDRESS}:{remote_path}"])
