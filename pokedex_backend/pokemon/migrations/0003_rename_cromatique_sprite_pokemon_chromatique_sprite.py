# Generated by Django 5.1.4 on 2025-01-02 23:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon', '0002_pokemon_animated_back_sprite_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pokemon',
            old_name='cromatique_sprite',
            new_name='chromatique_sprite',
        ),
    ]
