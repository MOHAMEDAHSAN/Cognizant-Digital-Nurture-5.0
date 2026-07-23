# courses/urls.py — URL patterns for the courses app (app-level router).
from django.urls import path
from . import views

urlpatterns = [
    # Task 2, Step 9: Map /api/hello/ to hello_view
    path('hello/', views.hello_view, name='hello'),
]
