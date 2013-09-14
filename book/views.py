#-*- coding: utf-8 -*-
from django.http import HttpResponse, Http404
from django.shortcuts import render
from django.views.generic.base import View
from book.models import *
from datetime import date

class ExpShow(View):
	wds = ["一", "二", "三", "四", "五", "六", "日"]
	def get(self, request, year, month, day):
		try:
			d = date(int(year), int(month), int(day))
		except:
			raise Http404

		expl = Exp.objects.filter(date__year=year, date__month=month, date__day=day)
		credit = Credit.objects.filter(year=year)
		categ = Categ.objects.all()	

		return render(request, 'exp.html', {
			'expl': expl,
			'date': d,
			'wd': self.wds[d.weekday()],
			'credit': credit,
			'categ': categ
		})
