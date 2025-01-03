from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
import logging

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
                logger.warning(f"Nom d'utilisateur déjà pris: {username}")
                return Response(
                    message="Le nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
                    status=status.HTTP_400_BAD_REQUEST
                )

            if User.objects.filter(email=email).exists():
                logger.warning(f"Email déjà utilisé: {email}")
                return Response(
                    message="L'adresse email est déjà utilisée. Veuillez en choisir une autre.",
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Création de l'utilisateur
            user = serializer.save()
            user.set_password(request.data['password'])
            user.email = email  # Mise à jour de l'email normalisé
            user.save()

            # Création du token
            token = Token.objects.create(user=user)

            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Erreur lors de l'inscription: {str(e)}")
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

        return Response({'token': token.key, 'user': serializer.data})

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
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("Token valide")
