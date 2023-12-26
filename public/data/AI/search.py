import faiss
import numpy as np
from transformers import AutoTokenizer, AutoModel

# Load a text embedding model
model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

# Define a function to embed a text into a vector
def embed_text(text):
    # Tokenize the text
    input_ids = tokenizer.encode(text, return_tensors="pt")
    # Get the output of the model
    output = model(input_ids)
    # Use the mean of the last hidden layer as the vector representation
    vector = output.last_hidden_state.mean(dim=1).squeeze().detach().numpy()
    return vector

with open("../quran_en_sahih.txt", "r") as f:
    lines = f.read().splitlines()

vectors = np.array([embed_text(line) for line in lines])
index = faiss.IndexFlatL2(vectors.shape[1])
index.add(vectors)

query = " Allah    is       Merciful.."
query_vector = embed_text(query)
k = 5  # Number of results to return
distances, indices = index.search(query_vector.reshape(1, -1).astype('float32'), k)

print(f"Searching for: {query}")
print(f"Top {k} results:")
for i in range(k):
    print(f"{indices[0][i]}- {lines[indices[0][i]]} (distance: {distances[0][i]:.4f})")
