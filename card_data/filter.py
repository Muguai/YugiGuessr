import json

# Read the JSON file
with open('card_data.json', 'r') as json_file:
    json_data = json_file.read()

# Parse the JSON data
data = json.loads(json_data)

# Filter and trim the data
filtered_data = []

for item in data['data']:
    if item['type'] not in ['Token', 'Skill Card']:
        # Remove unwanted fields
        item.pop('card_images', None)
        item.pop('card_prices', None)
        item.pop('card_sets', None)
        item.pop('frameType', None)

        # Keep only 'tcg_date' and 'ocg_date' in 'misc_info'
        if 'misc_info' in item:
            misc_info = item['misc_info']
            if isinstance(misc_info, list) and len(misc_info) > 0:
                misc_info = misc_info[0]
                misc_info = {
                    'tcg_date': misc_info.get('tcg_date'),
                    'ocg_date': misc_info.get('ocg_date')
                }
                item['misc_info'] = [misc_info]

        # Remove 'inkmarkers', 'linkval', and 'scale' if present
        item.pop('linkmarkers', None)
        item.pop('linkval', None)
        item.pop('scale', None)

        # Append the filtered item to the new list
        filtered_data.append(item)

# Create a new dictionary with the filtered data
filtered_json = {'data': filtered_data}

# Write the filtered data to a new JSON file
with open('filtered_output.json', 'w') as json_file:
    json.dump(filtered_json, json_file, indent=4)