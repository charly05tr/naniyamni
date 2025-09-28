from rest_framework import routers
from .views import *
from django.urls import path, include

router = routers.DefaultRouter()

router.register('', UserViewSet, 'users')

urlpatterns = [path('', include(router.urls)), 
               path('register',RegisterView.as_view(), name='register'),
               path('change-password', ChangePasswordView.as_view(), name='change_password'),
               path('reset-password/', ResetPasswordRequestView.as_view(), name='reset_password_request'),
               path('reset-password-confirm/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),
               path("auth/google", GoogleLoginView.as_view(), name="google-login"),
]   