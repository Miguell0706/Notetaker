from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Note
from .forms import NoteForm
from django.utils import timezone
from datetime import datetime, time
import logging
from copy import deepcopy


# Create your views here.
#Render the dashboard page here
@login_required(login_url='accounts:login')
def home(request):
    folders = request.user.folders.all()
    notes = request.user.notes.all()
    pinned_notes = request.user.notes.filter(pinned=True)
    context = {'folders':folders,'notes':notes,'pinned_notes':pinned_notes}
    if request.user.is_authenticated == False:
        return redirect('accounts:login')
    if request.method == 'POST':
        post_data = deepcopy(request.POST)
        print(post_data)
    # Preprocess due_time before passing it to the form
        if post_data['due_time']!='':
            print('time found for conversion')
            time_str = post_data.get('due_time')
            formatted_time = convert_time_string(time_str)  # Implement your time conversion function
            post_data['due_time'] = formatted_time
        # Initialize the form with the updated request data
        form = NoteForm(post_data)
        if form.is_valid():
            # Get the form data
            title = form.cleaned_data['title']
            text = form.cleaned_data['text']
            due_date = form.cleaned_data['due_date']
            due_time = form.cleaned_data['due_time']  # Retrieve the time string
            pinned = form.cleaned_data['pinned']
            folder_id = request.POST.get('folder')  # Retrieve selected folder ID

            # Convert the time string to the desired format
            # Create and save the Note object
            note = Note.objects.create(
                title=title,
                text=text,
                due_date=due_date,
                due_time=due_time,  # Use the converted time
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
            print("Form data:", post_data)
            # Form is invalid, access the errors
            errors = form.errors
            # You can then iterate through the errors dictionary to get more details
            for field, field_errors in errors.items():
                # `field` is the name of the field with errors
                # `field_errors` is a list of error messages for that field
                for error in field_errors:
                    # Print or handle the error message as needed
                    print(f"Error in field {field}: {error}")
    else:
        form = NoteForm()

    return render(request, 'firstapp/dashboard.html', context)

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

def convert_time_string(time_str):
    # Parse the time string into a datetime object
    time_obj = datetime.strptime(time_str, '%I:%M%p')
    
    # Convert the datetime object to a string in the format '00:00:00'
    formatted_time = time_obj.strftime('%H:%M:%S')

    return formatted_time