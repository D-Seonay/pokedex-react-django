from django.db import models

class Pokemon(models.Model):
    name = models.CharField(max_length=100, unique=True)
    number = models.IntegerField(null=True, blank=True)
    sprite = models.URLField(null=True, blank=True)
    types = models.CharField(max_length=200)
    height = models.IntegerField()
    weight = models.IntegerField()
    hp = models.IntegerField(null=True, blank=True)  # Exemple pour ajouter hp
    attack = models.IntegerField(null=True, blank=True)  # Exemple pour ajouter attack
    defense = models.IntegerField(null=True, blank=True)  # Exemple pour ajouter defense
    special_attack = models.IntegerField(null=True, blank=True)  # Exemple pour ajouter special_attack
    special_defense = models.IntegerField(null=True, blank=True)  # Exemple pour ajouter special_defense
    speed = models.IntegerField(null=True, blank=True)  # Exemple pour ajouter speed
    cry_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name