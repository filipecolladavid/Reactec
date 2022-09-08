import os
from collections import namedtuple

Environment = namedtuple(
    "Environment",
    ["env", "host", "port", "s_access", "s_secret", "s_endpoint", "s_bucket"
     ])


def read_environments() -> Environment:
    env_config = Environment(
        os.getenv("ENV", "dev"),
        os.getenv("HOST", "0.0.0.0"),
        os.getenv("PORT", int(8000)),
        os.getenv("S_ACCESS_KEY"),
        os.getenv("S_SECRET_KEY"),
        os.getenv("S_ENDPOINT"),
        os.getenv("S_BUCKET"),

    )

    if env_config.s_endpoint == "" or env_config.s_secret == "" or env_config.s_access == "":
        raise ValueError("S3 environment variables missing")

    return env_config
