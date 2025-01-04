from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Pokemon, Item
from .serializers import PokemonSerializer, ItemSerializer


class PokemonListView(APIView):
    def get(self, request, id=None):
        if id:
            # Récupérer un Pokémon par son ID
            pokemon = Pokemon.objects.get(pk=id)
            # Sérialiser les données
            serializer = PokemonSerializer(pokemon)
            # Renvoyer les données sérialisées sous forme de JSON
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Récupérer tous les Pokémon de la base de données
            pokemons = Pokemon.objects.all()
            # Sérialiser les données
            serializer = PokemonSerializer(pokemons, many=True)
            # Renvoyer les données sérialisées sous forme de JSON
            return Response(serializer.data, status=status.HTTP_200_OK)

class ItemListView(APIView):
    def get(self, request, id=None):
        if id:
            # Récupérer un objet Item par son ID
            item = Item.objects.get(pk=id)
            # Sérialiser les données
            serializer = ItemSerializer(item)
            # Renvoyer les données sérialisées sous forme de JSON
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Récupérer tous les objets Item de la base de données
            items = Item.objects.all()
            # Sérialiser les données
            serializer = ItemSerializer(items, many=True)
            # Renvoyer les données sérialisées sous forme de JSON
            return Response(serializer.data, status=status.HTTP_200_OK)