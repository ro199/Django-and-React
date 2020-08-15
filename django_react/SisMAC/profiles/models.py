from django.db import models
from django.contrib.auth.models import User

# Create your models here.
def upload_path(instance, filename):
    return '/'.join(['user', str(instance.first_name), filename])


class ProfileUser(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    photo = models.ImageField(blank=True, null=True, upload_to=upload_path)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    account = models.OneToOneField(User,null=True, on_delete=models.CASCADE, related_name="profileUsers")
