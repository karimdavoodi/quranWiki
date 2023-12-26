import faiss
import numpy as np
from autofaiss import build_index
from transformers import AutoTokenizer, AutoModel
nnk_file = "my_index_folder/knn.index"
model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

def embed_text(text):
  # Tokenize the text
  input_ids = tokenizer.encode(text, return_tensors="pt")
  # Get the output of the model
  output = model(input_ids)
  # Use the mean of the last hidden layer as the vector representation
  vector = output.last_hidden_state.mean(dim=1).detach().numpy()
  return vector

with open("./quran/text.txt", "r") as f:
  lines = f.read().splitlines()

vectors = np.array([embed_text(line) for line in lines])

_, index_infos = build_index()
    vectors,
    save_on_disk=True,
    should_be_memory_mappable=True,
    index_path=nnk_file,
    max_index_memory_usage="8G",
    max_index_query_time_ms=50,
)
index = faiss.read_index(nnk_file, faiss.IO_FLAG_MMAP | faiss.IO_FLAG_READ_ONLY)

query = 'allah'
query_vector = embed_text(query)
k = 5 # Number of results to return
distances, indices = index.search(query_vector, k)

print(f"Searching for: {query}")
print(f"Top {k} results:")
for i in range(k):
  print(f"- {lines[indices[0][i]]} (distance: {distances[0][i]:.4f})")
