from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('test_token/', views.test_token, name='test_token'),
    path('user/profile/', views.user_profile, name='user_profile'),
    path('user/profile/update/', views.update_user_profile, name='update_user_profile'),
]
