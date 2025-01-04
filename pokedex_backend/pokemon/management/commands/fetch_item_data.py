import requests
from django.core.management.base import BaseCommand
from pokemon.models import Item

class Command(BaseCommand):
    help = "Fetch and store items from PokeAPI"

    def handle(self, *args, **kwargs):
        api_url = "https://pokeapi.co/api/v2/item?limit=1000"
        response = self.safe_request(api_url)

        if not response or "results" not in response:
            self.stdout.write(self.style.ERROR("No items found in API response."))
            return

        for item_data in response['results']:
            details = self.safe_request(item_data['url'])
            if not details:
                continue

            name = details.get('name', 'Unknown')
            cost = details.get('cost', 0)
            fling_power = details.get('fling_power')

            # Correction ici
            fling_effect_data = details.get('fling_effect')
            fling_effect = fling_effect_data['name'] if fling_effect_data else None

            attributes = [attr['name'] for attr in details.get('attributes', [])]
            category = details.get('category', {}).get('name', 'Unknown')
            sprites = details.get('sprites', {})
            effect_entries = details.get('effect_entries', [])
            flavor_text_entries = details.get('flavor_text_entries', [])
            held_by_pokemon = details.get('held_by_pokemon', [])

            Item.objects.update_or_create(
                name=name,
                defaults={
                    'cost': cost,
                    'fling_power': fling_power,
                    'fling_effect': fling_effect,
                    'attributes': attributes,
                    'category': category,
                    'sprites': sprites,
                    'effect_entries': effect_entries,
                    'flavor_text_entries': flavor_text_entries,
                    'held_by_pokemon': held_by_pokemon,
                },
            )

        self.stdout.write(self.style.SUCCESS("Items successfully fetched and stored."))

    def safe_request(self, url):
        """Réalise une requête sécurisée à l'API."""
        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.stderr.write(self.style.ERROR(f"Error fetching data from {url}: {e}"))
            return None
