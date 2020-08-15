from rest_framework import routers
from .api import AssetViewSet, TypeViewSet, ClassViewSet, ResourceViewSet, BrandViewSet

router = routers.DefaultRouter()
router.register('api/assets', AssetViewSet, 'assets')
router.register('api/types', TypeViewSet, 'types')
router.register('api/classes', ClassViewSet, 'classes')
router.register('api/recources', ResourceViewSet, 'recources')
router.register('api/brands', BrandViewSet, 'brands')

urlpatterns = router.urls