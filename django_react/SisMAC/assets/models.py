from django.db import models
from .validators import validate_file_extension
from django.contrib.auth.models import User

# Create your models here.
class Asset(models.Model):
    code = models.CharField(max_length=10)
    description = models.CharField(max_length=300)
    purchase_date = models.DateField()
    purchase_value = models.DecimalField(max_digits=10, decimal_places=3)
    lifespan = models.DateField(auto_now_add=True)
    account = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="assets")

    def __str__(self):
        return f"{self.code}"

class AssetType(models.Model):
    #asset = models.OneToOneField(Asset, null=True, blank=True, on_delete=models.CASCADE)
    name_type = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.name_type}"


class AssetClass(models.Model):
    asset_type = models.ForeignKey(AssetType, null=True, blank=True, on_delete=models.CASCADE, related_name="classes")
    name_class = models.CharField(max_length=50)
    unit_quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=3)


class Resource(models.Model):
    asset = models.ForeignKey(Asset, null=True, blank=True, on_delete=models.CASCADE, related_name="resources")
    name_resource = models.CharField(max_length=60)
    author = models.CharField(max_length=50)
    file = models.FileField(upload_to="documents", validators=[validate_file_extension])


class Brand(models.Model):
    #asset_class = models.OneToOneField(AssetClass, null=True, blank=True, on_delete=models.CASCADE, related_name="brands")
    name_brand = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=300)