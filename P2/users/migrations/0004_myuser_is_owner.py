# Generated by Django 3.2.12 on 2022-03-12 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_myuser_profile_pic'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='is_owner',
            field=models.BooleanField(default=False),
        ),
    ]
