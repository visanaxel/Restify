# Note: VM uses python 3.10.2!

# create venv
python -m venv venv

# activate venv
source venv/bin/activate

# install required packages in venv
pip install -r requirements.txt

# makemigrations, migrate, setup db
python manage.py makemigrations
python manage.py migrate
