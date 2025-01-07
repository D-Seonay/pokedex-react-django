from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Profile
from ..serializers import ProfileSerializer
from django.http import JsonResponse


@api_view(['GET'])
def leaderboard(request):
    # Récupérer les 10 meilleurs utilisateurs triés par score décroissant
    top_users = Profile.objects.order_by('-score')[:10]
    leaderboard_data = [
        {
            "username": user.user.username,  # Suppose que UserProfile a une relation avec le modèle User
            "score": user.score,
            "favorite_pokemon": user.favorite_pokemon,
        }
        for user in top_users
    ]
    return Response(leaderboard_data)
