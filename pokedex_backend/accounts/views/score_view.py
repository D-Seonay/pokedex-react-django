from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_score(request):
    try:
        user = request.user
        profile = user.profile  # Récupération du profil de l'utilisateur
        score_to_add = request.data.get('score', 0)

        if not isinstance(score_to_add, int) or score_to_add <= 0:
            return Response(
                {'message': 'Score must be a positive integer.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile.score += score_to_add
        profile.save()

        return Response(
            {'message': 'Score added successfully.', 'new_score': profile.score},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {'message': f'Error while adding score: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_score(request):
    try:
        user = request.user
        profile = user.profile  # Récupération du profil de l'utilisateur
        score_to_remove = request.data.get('score', 0)

        if not isinstance(score_to_remove, int) or score_to_remove <= 0:
            return Response(
                {'message': 'Score must be a positive integer.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if profile.score < score_to_remove:
            return Response(
                {'message': 'Not enough score to remove.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile.score -= score_to_remove
        profile.save()

        return Response(
            {'message': 'Score removed successfully.', 'new_score': profile.score},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {'message': f'Error while removing score: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
