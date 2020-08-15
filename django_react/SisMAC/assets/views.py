from rest_framework import generics

from .models import Asset
from .serializers import AssetSerializer
# Create your views here.

class listAsset(generics.ListAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer