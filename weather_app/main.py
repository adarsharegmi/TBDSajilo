# run the backend 
from backend.app import main as backend_main
import sys
import os



def run_backend():
    backend_main.runserver()
    

def run_frontend():
    pass

# run the app 


if __name__ == "__main__":
    # take args from user if it says activate call source venv/bin/activate
    if len(sys.argv) > 1 and sys.argv[1] == "backend":
        run_backend()
    else:
        run_frontend()
    # run_frontend()
    # run_app()

