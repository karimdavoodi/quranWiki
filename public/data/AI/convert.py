import json
# read json from text file and convert to list

path = "../quran_en_sahih.json"

def read_json(path):
    with open(path, 'r') as f:
        data = json.load(f)
        return data
    
data = read_json(path)
for key, val in data.items():
    print(key)
