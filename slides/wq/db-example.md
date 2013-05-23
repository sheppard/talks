```python
# models.py
from wq.db.patterns import models
from django.conf import settings

class Report(models.AnnotatedModel):
    entered = models.DateField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

```
