# Generated by Django 3.0.8 on 2020-07-15 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0002_auto_20200714_1528'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assettype',
            name='asset',
        ),
        migrations.AlterField(
            model_name='assettype',
            name='name_type',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='brand',
            name='name_brand',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
