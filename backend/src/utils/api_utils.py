import datetime
from typing import Tuple


def generate_object_meta(filename: str, content_type: str, file_length: int) -> dict:
    return {
        "last-update": str(datetime.datetime.utcnow()),
        "filename": filename,
        "type": content_type,
        "length": str(file_length),
    }


def generate_full_file_name(folder: str, file_name: str) -> Tuple[int, str]:
    if not folder or not file_name:
        return 400, "No Folder name or file name"

    if len(folder) > 100 or len(file_name) > 100:
        return 400, "Folder and file name must be below 100 chars"

    if "/" in str(folder) or "/" in str(file_name):
        return 400, "For file and folder a name with no '/' characters. Only one folder os allowed"

    return 200, f"{folder}/{file_name}"

