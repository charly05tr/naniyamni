from decouple import config
from .base import *


SECRET_KEY = 'django-insecure-v*j+6yj-0=re0!7m4@w!&4uj1wu6%irn#)(ebqjncq-(6li$%j'

#base de datos posgre en local (credenciales en .env)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': 'localhost',
    }
}

DEBUG = True