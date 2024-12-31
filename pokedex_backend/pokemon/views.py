from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from .serializers import PokemonSerializer

class PokemonList(APIView):
    def get(self, request):
        response = requests.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        data = response.json()
        return Response(data['results'])
