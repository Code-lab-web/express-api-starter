
import bz2
import os

file_path = "autorestic_1.8.3_linux_amd64.bz2"
new_file_path = "/usr/local/bin/autorestic"

with open(file_path, "rb") as f:
    data = f.read()

decompressed_data = bz2.decompress(data)

with open(new_file_path, "wb") as f:
    f.write(decompressed_data)

os.chmod(new_file_path, 0o755)
