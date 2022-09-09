import os
from collections import namedtuple

Environment = namedtuple(
    "Environment",
    ["env", "host", "port", "s3_access", "s3_secret", "s3_endpoint", "s3_bucket"
     ])


def read_environments() -> Environment:
    env_config = Environment(
        os.getenv("ENV", "dev"),
        os.getenv("HOST", "0.0.0.0"),
        os.getenv("PORT", int(8000)),
        os.getenv("S3_ACCESS_KEY"),
        os.getenv("S3_SECRET_KEY"),
        os.getenv("S3_ENDPOINT"),
        os.getenv("S3_BUCKET"),
    )

    if env_config.s3_endpoint == "" or env_config.s3_secret == "" or env_config.s3_access == "":
        raise ValueError("S3 environment variables missing")

    return env_config
