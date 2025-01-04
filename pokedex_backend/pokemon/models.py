from django.db import models

class Pokemon(models.Model):
    name = models.CharField(max_length=100)
    number = models.IntegerField()
    sprite = models.URLField()
    chromatique_sprite = models.URLField(null=True, blank=True)
    animated_front_sprite = models.URLField(null=True, blank=True)
    animated_back_sprite = models.URLField(null=True, blank=True)
    types = models.CharField(max_length=100)
    height = models.FloatField()
    weight = models.FloatField()
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    special_attack = models.IntegerField()
    special_defense = models.IntegerField()
    speed = models.IntegerField()
    cry_url = models.URLField()
    moves = models.TextField(default="")  # Ajouter un défaut
    description = models.TextField(default="")  # Ajouter un défaut
    evolutions = models.TextField(max_length=255, null=True, blank=True)  # Ajouter un défaut
    abilities = models.TextField(default="")  # Ajouter un défaut
    base_experience = models.IntegerField(default=0)  # Ajouter un défaut
    capture_rate = models.IntegerField(default=0)  # Ajouter un défaut
    habitat = models.CharField(max_length=100, default="Unknown")
    forms = models.TextField(default="")  # Ajouter un défaut
    


class Item(models.Model):
    name = models.CharField(max_length=100)
    cost = models.IntegerField()
    fling_power = models.IntegerField(null=True, blank=True)  # Fling power peut être nul
    fling_effect = models.CharField(max_length=100, null=True, blank=True)
    attributes = models.JSONField(default=dict)  # Utiliser JSONField
    category = models.CharField(max_length=100)
    effect_entries = models.JSONField(default=dict)  # Utiliser JSONField
    flavor_text_entries = models.JSONField(default=dict)  # Utiliser JSONField
    game_indices = models.JSONField(default=dict)  # Utiliser JSONField
    names = models.JSONField(default=dict)  # Utiliser JSONField
    sprites = models.JSONField(default=dict)  # Utiliser JSONField
    held_by_pokemon = models.JSONField(default=dict)  # Utiliser JSONField
    baby_trigger_for = models.JSONField(default=dict)  # Utiliser JSONField
    machines = models.JSONField(default=dict)  # Utiliser JSONField


    def __str__(self):
        return self.name