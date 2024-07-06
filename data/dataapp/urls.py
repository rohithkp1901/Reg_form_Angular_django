from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, StateViewSet, DistrictViewSet, RegistrationViewSet

router = DefaultRouter()
router.register(r'countries', CountryViewSet, basename='country')
router.register(r'states', StateViewSet, basename='state')
router.register(r'districts', DistrictViewSet, basename='district')
router.register(r'registrations', RegistrationViewSet, basename='registration')

urlpatterns = [
    path('', include(router.urls)),
]

# Adding custom paths for state and district filtering
state_list = StateViewSet.as_view({'get': 'list'})
district_list = DistrictViewSet.as_view({'get': 'list'})

urlpatterns += [
    path('country/<int:country>/states/', state_list, name='state-list'),
    path('state/<int:state>/districts/', district_list, name='district-list'),
]
