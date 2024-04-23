from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Note
from .forms import NoteForm
from django.utils import timezone
from datetime import datetime, time
import logging


# Create your views here.
#Render the dashboard page here
@login_required(login_url='accounts:login')
def home(request):
    print('moe')
    folders = request.user.folders.all()
    notes = request.user.notes.all()
    pinned_notes = request.user.notes.filter(pinned=True)
    context = {'folders':folders,'notes':notes,'pinned_notes':pinned_notes}
    if request.user.is_authenticated == False:
        return redirect('accounts:login')
    if request.method == 'POST':
        print('here')
        form = NoteForm(request.POST)
        print('here1')
        if form.is_valid():
            print('here1')
            # Get the form data
            title = form.cleaned_data['title']
            text = form.cleaned_data['text']
            due_date = form.cleaned_data['due_date']
            due_time = form.cleaned_data['due_time']
            pinned = form.cleaned_data['pinned']
            folder_id = request.POST.get('folder')  # Retrieve selected folder ID

            # Parse date and time strings into datetime objects
            if due_date:    
                due_date = datetime.strptime(due_date, '%m/%d/%Y')
            if due_time:   
                due_time = datetime.strptime(due_time, '%I:%M%p').time()

            # Combine date and time into a single datetime object

            # Create and save the Note object
            note = Note.objects.create(
                title=title,
                text=text,
                due_date=due_date,
                due_time=due_time,
                created=timezone.now(),
                user=request.user,
                pinned=pinned,
            )
            if folder_id:  # Check if a folder is selected
                folder = Folder.objects.get(pk=folder_id)
                note.folders.add(folder)

            note.save()

            print(note)
            logging.info("Created Note object: %s", note)
            return redirect('')
    else:
        form = NoteForm()

    return render(request, 'firstapp/dashboard.html',context)

@login_required(login_url='accounts:login')
def note_detail(request,note_id):
    note = Note.objects.get(pk=note_id)
    context = {'note':note}
    return render(request, 'firstapp/note_detail.html',context)

@login_required(login_url='accounts:login')
def folders(request):
    folders = request.user.folders.all()
    context = {'folders':folders}
    return render(request, 'firstapp/folders.html',context)