import os
from decouple import config
from dotenv  import load_dotenv
from .base import *

load_dotenv()

SECRET_KEY = os.environ.get('SECRET_KEY', '')
DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': 'localhost',
    }
}

ALLOWED_HOSTS = [
    'api.naniyamni.app',
    'https://api.devconnect.network',
]