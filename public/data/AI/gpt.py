from gpt4all import GPT4All

model = GPT4All("/Users/karimdavoodi/Library/Application Support/nomic.ai/GPT4All/gpt4all-falcon-q4_0.gguf")
output = model.generate("is Pork permitted in Christainity")
print(output)
