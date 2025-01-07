from django.urls import path
from .views import auth_view, leaderboard_view, score_view

urlpatterns = [
    path('login/', auth_view.login, name='login'),
    path('register/', auth_view.register, name='register'),
    path('test_token/', auth_view.test_token, name='test_token'),
    path('user/profile/', auth_view.user_profile, name='get_user_profile'),
    path('user/profile/update/', auth_view.update_user_profile, name='update_user_profile'),
    
    
    path('leaderboard/', leaderboard_view.leaderboard, name='leaderboard'),
    
    path('user/score/add/', score_view.add_score, name='add_score'),
    path('user/score/remove/', score_view.remove_score, name='remove_score'),
]
