from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    user = models.ForeignKey(User, related_name='notes', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    folders = models.ManyToManyField('Folder', related_name='folders', blank=True)
    pinned = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    due_time = models.TimeField(null=True, blank=True)
    
    def __str__(self):
        return self.title
class Folder(models.Model):
    user = models.ForeignKey(User, related_name='folders', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    notes = models.ManyToManyField(Note, related_name='notes', blank=True)
    
    def __str__(self):
        return self.name