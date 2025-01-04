from rest_framework import serializers
from .models import Pokemon
from .models import Item

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = '__all__'  # Cela inclura tous les champs de ton modèle

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'  # Cela inclura tous les champs de ton modèle