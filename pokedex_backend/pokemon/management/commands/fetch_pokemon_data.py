import requests
from django.core.management.base import BaseCommand
from pokemon.models import Pokemon

class Command(BaseCommand):
    help = "Fetch Pokémon data from PokeAPI"

    def handle(self, *args, **kwargs):
        api_url = "https://pokeapi.co/api/v2/pokemon?limit=151"  # Récupère les 151 premiers Pokémon
        response = self.safe_request(api_url)
        if not response:
            return

        data = response

        for pokemon_data in data['results']:
            details = self.safe_request(pokemon_data['url'])
            if not details:
                continue
            species = self.safe_request(details['species']['url'])
            if not species:
                continue
            evolution_chain = self.safe_request(species['evolution_chain']['url'])
            if not evolution_chain:
                continue

            cry_url = f"https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/{details['id']}.ogg"

            # Récupérer les moves sous forme de liste
            moves = [move['move']['name'] for move in details['moves']]

            # Récupérer la description en anglais
            flavor_texts = species['flavor_text_entries']
            description = next(
                (entry['flavor_text'].replace("\n", " ").replace("\f", " ")
                    for entry in flavor_texts if entry['language']['name'] == 'en'),
                "No description available."
            )

            # Récupérer les évolutions sous forme de tableau d'objets
            evolutions = self.get_evolutions(evolution_chain)

            abilities = ", ".join(ability['ability']['name'] for ability in details['abilities'])
            base_experience = details['base_experience']
            capture_rate = species['capture_rate']
            habitat = species['habitat']['name'] if species['habitat'] else "Unknown"

            # Enregistrement dans la base de données avec moves et évolutions comme tableaux
            Pokemon.objects.update_or_create(
                name=details['name'],
                defaults={
                    'sprite': details['sprites']['front_default'],
                    "number": details['id'],
                    'types': ", ".join(t['type']['name'] for t in details['types']),
                    'height': details['height'],
                    'weight': details['weight'],
                    'hp': details['stats'][0]['base_stat'],
                    'attack': details['stats'][1]['base_stat'],
                    'defense': details['stats'][2]['base_stat'],
                    'special_attack': details['stats'][3]['base_stat'],
                    'special_defense': details['stats'][4]['base_stat'],
                    'speed': details['stats'][5]['base_stat'],
                    'cry_url': cry_url,
                    'moves': moves,  # moves sous forme de tableau
                    'description': description,
                    'evolutions': evolutions,  # evolutions sous forme de tableau
                    'abilities': abilities,
                    'base_experience': base_experience,
                    'capture_rate': capture_rate,
                    'habitat': habitat,
                    'forms': ", ".join(form['name'] for form in details['forms']),
                    'chromatique_sprite': details['sprites']['front_shiny'],
                    'animated_front_sprite': details['sprites']['other']['showdown']['front_default'],
                    'animated_back_sprite': details['sprites']['other']['showdown']['back_default']
                }
            )

        self.stdout.write(self.style.SUCCESS("Pokémon data fetched successfully!"))

    def get_evolutions(self, evolution_chain):
        """Récupère les évolutions d'un Pokémon sous forme de tableau d'objets."""
        chain = evolution_chain['chain']
        evolutions = []

        while chain:
            species_name = chain['species']['name']
            species_url = chain['species']['url']

            species_details = self.safe_request(species_url)
            if not species_details:
                break

            # Récupérer le sprite du Pokémon dans la chaîne d'évolution
            sprite = species_details['sprites']['front_default'] if 'sprites' in species_details else None

            evolution_details = {
                'name': species_name,
                'id': species_details['id'],
                'sprite': "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png".format( 
                    id=species_details['id']
                ) if not sprite else
                sprite,
                'evolution_details': []  # Liste des détails d'évolution pour chaque Pokémon
            }

            for evolution in chain.get('evolves_to', []):
                evolution_conditions = evolution.get('evolution_details', [])
                for condition in evolution_conditions:
                    evolution_details['evolution_details'].append({
                        'min_level': condition.get('min_level', None),
                        'trigger': condition.get('trigger', {}).get('name', 'Unknown'),
                        'item': condition.get('item', {}).get('name', 'None') if condition.get('item') else 'None'
                    })

            evolutions.append(evolution_details)
            chain = chain['evolves_to'][0] if chain['evolves_to'] else None

        return evolutions

    def safe_request(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.stderr.write(self.style.ERROR(f"An error occurred: {e}"))
            return None
        