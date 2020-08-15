from django.shortcuts import render
from django.core.mail import send_mail
from assets.models import Asset

# Create your views here.
def index(request):
    results = Asset.objects.all()
    for  result in results:
        print(result)
    
    #
    send_mail('Hello from Ronald',
    'Helo there. This isan automated message.',
    'ro8425fr@gmail.com',
    ['jevowix505@chikd73.com'],
    fail_silently = False)

    return render(request, 'send/index.html')
