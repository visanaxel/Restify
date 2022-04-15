# Note: VM uses python 3.10.2!

# create venv
python3 -m venv venv

# activate venv
source venv/bin/activate

# install required packages in venv
pip3 install -r requirements.txt

# makemigrations, migrate, setup db
python3 manage.py makemigrations
python3 manage.py migrate
