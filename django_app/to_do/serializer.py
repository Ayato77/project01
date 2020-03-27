from rest_framework import serializers

from .models import Todo

# シリアライズとはオブジェクトからデータを取り出すこと
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'status','created_at')
