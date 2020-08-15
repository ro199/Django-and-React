# Generated by Django 3.0.8 on 2020-07-13 08:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ProfileUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=60)),
                ('last_name', models.CharField(max_length=60)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profileUsers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
