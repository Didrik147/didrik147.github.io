from livereload import Server
import subprocess

def build():
    # Re-run your generator script
    subprocess.run(["python", "generate.py"])

# Run once at startup
build()

server = Server()

# Watch your template
server.watch("card_template.html", build)

# Watch your CSS
server.watch("style.css", build)

# Watch your generator script
server.watch("generate.py", build)

# Serve the folder so index.html is visible
server.serve(root=".")
