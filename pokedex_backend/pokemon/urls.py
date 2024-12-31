from django.urls import path
from .views import PokemonList

urlpatterns = [
    path('pokemons/', PokemonList.as_view(), name='pokemon-list'),
]
