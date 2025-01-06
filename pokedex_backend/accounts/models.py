from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)  # Photo de profil
    score = models.IntegerField(default=0)  # Score de l'utilisateur
    favorite_pokemon = models.CharField(max_length=100, blank=True, null=True)  # Pokémon préféré

    def __str__(self):
        return f"{self.user.username}'s Profile"
