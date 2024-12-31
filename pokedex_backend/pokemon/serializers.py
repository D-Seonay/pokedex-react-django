from rest_framework import serializers
class PokemonSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    url = serializers.URLField()
