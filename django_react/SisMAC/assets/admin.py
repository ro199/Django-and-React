from django.contrib import admin
from .models import Asset, AssetType, AssetClass, Resource, Brand

# Register your models here.
admin.site.register(Asset)
admin.site.register(AssetType)
admin.site.register(AssetClass)
admin.site.register(Resource)
admin.site.register(Brand)