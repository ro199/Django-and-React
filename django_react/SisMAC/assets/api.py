from .models import Asset, AssetType, Brand, AssetClass, AssetType, Resource
from rest_framework import viewsets, permissions
from .serializers import AssetSerializer, TypeSerializer, ClassSerializer, ResourceSerializer, BrandSerializer


# Asset Viewset
class AssetViewSet(viewsets.ModelViewSet):
    
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = AssetSerializer

    def get_queryset(self):
        return self.request.user.assets.all()
    
    def perform_create(self, serializer):
        serializer.save(account=self.request.user)

# Type Viewset
class TypeViewSet(viewsets.ModelViewSet):
    queryset = AssetType.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]

    serializer_class = TypeSerializer

# Class Viewset
class ClassViewSet(viewsets.ModelViewSet):
    queryset = AssetClass.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]

    serializer_class = ClassSerializer

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]

    serializer_class = ResourceSerializer


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]

    serializer_class = BrandSerializer