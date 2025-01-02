from django.urls import path
from .views import PokemonListView

urlpatterns = [
    path('pokemons/', PokemonListView.as_view(), name='pokemon-list'),
    path('pokemons/<int:id>/', PokemonListView.as_view(), name='pokemon-detail'),
]
