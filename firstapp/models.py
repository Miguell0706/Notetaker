from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    user = models.ForeignKey(User, related_name='notes', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    folders = models.ManyToManyField('Folder', null=True, blank=True)
    pinned = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.title
class Folder(models.Model):
    user = models.ForeignKey(User, related_name='folders', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    notes = models.ManyToManyField(Note, null=True, blank=True)
    
    def __str__(self):
        return self.name