# Generated by Django 4.0.2 on 2022-03-12 21:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_menu_comment_mid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='mid',
        ),
        migrations.AddField(
            model_name='menuitem',
            name='mid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurant.menu'),
        ),
    ]
