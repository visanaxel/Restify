# Generated by Django 4.0.3 on 2022-03-11 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_myuser_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='profile_pic',
            field=models.ImageField(default='https://cbwc.ca/wp-content/uploads/2019/03/blank-profile-picture-973460_640.png', upload_to=''),
        ),
    ]
