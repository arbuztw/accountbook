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

class ExpAdd(View):
	def post(self, request, year, month, day):
		year = int(year)
		month = int(month)
		day = int(day)
		try:
			d = date(year, month, day)
		except:
			raise Http404

		data = {
			'name': request.POST['name'],
			'amount': int(request.POST['amount']),
			'categ': int(request.POST['categ']),
			'pay': int(request.POST['pay'])
		}

		exp = Exp(date=d, categ_id=data['categ'], name=data['name'], amount=data['amount'], pay_id=data['pay'])
		exp.save()

		if data['pay'] == 1:
			p = Monthly.objects.get(year=year, month=month)
			p.exp += data['amount']
			p.save()
		else:
			p = Credit.objects.get(id=data['pay'])
			l = map(lambda x: int(x), p.amout.split(','))
			l[month-1] += data['amount']
			p.amount = ','.join(map(lambda x:str(x), l))
			p.save()

			p = Monthly.objects.get(year=year, month=month+1)
			p.credit += data['amount']
			p.save()

		return render(request, 'exp_add.html', {'exp': exp})
