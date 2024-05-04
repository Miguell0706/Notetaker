from django import forms
from .models import Note, Folder

class NoteForm(forms.ModelForm):
    class Meta:
        model = Note
        fields = ['title', 'text', 'due_date','due_time', 'pinned', 'folder']
class FolderForm(forms.ModelForm):
    class Meta:
        model = Folder
        fields = ['name']