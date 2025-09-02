import os
from decouple import config

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

ALLOWED_HOSTS = ['api.naniyamni.app']