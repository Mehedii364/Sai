import os
import zipfile

def make_project_zip():
    zip_filename = "project.zip"
    exclude_dirs = {
        "node_modules", ".git", "dist", ".gradle", "build"
    }
    exclude_extensions = {".log"}

    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk("."):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                if file == zip_filename:
                    continue
                ext = os.path.splitext(file)[1]
                if ext in exclude_extensions:
                    continue
                file_path = os.path.join(root, file)
                # Keep relative path without leading ./
                arcname = os.path.relpath(file_path, ".")
                zipf.write(file_path, arcname)
    print(f"Created {zip_filename} with size: {os.path.getsize(zip_filename)} bytes")

if __name__ == "__main__":
    make_project_zip()
