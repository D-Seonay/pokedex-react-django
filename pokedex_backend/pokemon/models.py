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
    



    def __str__(self):
        return self.name