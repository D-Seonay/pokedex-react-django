from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
import logging
from .models import Profile

# Initialisation du logger
logger = logging.getLogger(__name__)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            # Normalisation de l'email
            email = request.data['email'].strip().lower()
            username = request.data['username'].strip()

            # Vérification des duplicatas
            if User.objects.filter(username=username).exists():
                return Response(
                    {"message": "Le nom d'utilisateur est déjà pris."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if User.objects.filter(email=email).exists():
                return Response(
                    {"message": "L'adresse email est déjà utilisée."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Création de l'utilisateur
            user = serializer.save()
            user.set_password(request.data['password'])
            user.email = email
            user.save()

            # Création du profil avec un score de 0 et un Pokémon préféré vide
            Profile.objects.create(user=user, score=0, favorite_pokemon="")

            # Création du token
            token = Token.objects.create(user=user)

            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Erreur lors de l'enregistrement: {str(e)}")
            return Response(
                {'message': 'Une erreur interne est survenue. Veuillez réessayer plus tard.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    else:
        return Response(
            {'message': 'Les données fournies sont invalides.', 'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
def login(request):
    username_or_email = request.data.get('username', None) or request.data.get('email', None)
    if not username_or_email:
        return Response(
            {'message': 'Un nom d\'utilisateur ou une adresse email est requis pour se connecter.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Recherche de l'utilisateur
        if '@' not in username_or_email:
            user = User.objects.get(username=username_or_email.strip())
        else:
            user = User.objects.get(email=username_or_email.strip().lower())

        if not user.check_password(request.data['password']):
            return Response(
                {'message': 'Le mot de passe est incorrect. Veuillez réessayer.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Création ou récupération du token
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        profile = user.profile  # Récupération du profil de l'utilisateur
        data = serializer.data
        data['profile'] = {'score': profile.score, 'favorite_pokemon': profile.favorite_pokemon}  # Ajouter les informations du profil

        return Response({'token': token.key, 'user': data})

    except User.DoesNotExist:
        return Response(
            {'message': 'Aucun utilisateur trouvé avec ces informations. Veuillez vérifier vos identifiants.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Erreur lors de la connexion: {str(e)}")
        return Response(
            {'message': 'Une erreur interne est survenue. Veuillez réessayer plus tard.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
@api_view(['GET'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    user = request.user
    profile = user.profile  # Récupération du profil de l'utilisateur
    serializer = UserSerializer(user)
    data = serializer.data
    data['profile'] = {
        'score': profile.score,
        'favorite_pokemon': profile.favorite_pokemon
    }  # Ajouter les informations du profil
    return Response({"message": "Token valide", "data": data}, status=status.HTTP_200_OK)



@api_view(['GET'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def user_profile(request):
    # Récupérer l'utilisateur actuellement authentifié
    user = request.user  # L'utilisateur est automatiquement récupéré via le token

    # Récupération du profil de l'utilisateur
    profile = user.profile  # Supposons que vous ayez un modèle Profile lié à User

    # Sérialisation des données de l'utilisateur et de son profil
    serializer = UserSerializer(user)
    data = serializer.data  # Sérialise les données de l'utilisateur
    data['profile'] = {
        'score': profile.score,
        'favorite_pokemon': profile.favorite_pokemon
    }  # Ajoute les informations du profil de l'utilisateur à la réponse

    return Response(data)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    data = request.data

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.save()

    profile = user.profile
    profile.favorite_pokemon = data.get('favorite_pokemon', profile.favorite_pokemon)
    profile.save()

    return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)
