from django.conf.urls.defaults import *
from views import *

urlpatterns = patterns('book.views',
	url(r'^exp/(\d+)/(\d+)/(\d+)$', ExpShow.as_view()),
)
