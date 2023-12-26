import faiss
import numpy as np
import spacy
# Load a pre-trained spaCy model with word vectors
print("Loading spaCy model...")
nlp = spacy.load("en_core_web_md")

with open("../quran_en_sahih.txt", "r") as f:
  texts = f.read().splitlines()

print(f"Preparation vector....")
vectors = np.array([nlp(text).vector for text in texts], dtype='float32')
index = faiss.IndexFlatL2(vectors.shape[1])  # L2 distance metric for a flat index
index.add(vectors)

# Query for the nearest neighbors
query_text = "Book of Allah"
query_vector = nlp(query_text).vector.reshape(1, -1).astype('float32')  # Convert query text to vector
k = 10  # Number of nearest neighbors to retrieve

print(f"Searching for: {query_text}")
# Perform the search
distances, indices = index.search(query_vector, k)

# Print the results
print(f"Query Text: {query_text}")
print("Nearest Neighbors:")
for idx, distance in zip(indices[0], distances[0]):
    print(f"{idx} -->  {texts[idx]}, Similarity: {1 / (1 + distance)}")
