from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def hello_view(request):
    """
    Task 2, Step 8: A simple function-based view that returns an HttpResponse
    confirming the Course Management API is running.

    Accessible at: /api/hello/
    """
    return HttpResponse('Course Management API is running')
