from django.urls import path
from .views import PokemonListView, ItemListView

urlpatterns = [
    path('pokemons/', PokemonListView.as_view(), name='pokemon-list'),
    path('pokemons/<int:id>/', PokemonListView.as_view(), name='pokemon-detail'),
    path('items/', ItemListView.as_view(), name='item-list'),
    path('items/<int:id>/', ItemListView.as_view(), name='item-detail'),
]
