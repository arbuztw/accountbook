from django.db import models

# Create your models here.

class Categ(models.Model):
	prim = models.CharField(max_length=30)
	scnd = models.CharField(max_length=50)
	order = models.IntegerField(default=0)

	def __unicode__(self):
		return self.prim + "(" + self.scnd + ")"

class Fix_inc(models.Model):
	year = models.IntegerField()
	name = models.CharField(max_length=100)
	amount = models.IntegerField()

class Inc(models.Model):
	date = models.DateField()
	name = models.CharField(max_length=100)
	amount = models.IntegerField()

class Exp(models.Model):
	date = models.DateField()
	categ = models.ForeignKey('Categ')
	name = models.CharField(max_length=100)
	amount = models.IntegerField()
	pay = models.ForeignKey('Credit')

	def __unicode__(self):
		return self.name

	def __getitem__(self, name):
		return self.__getattribute__(name)

	def __setitem__(self, name, val):
		self.__setattr__(name, val)

class Credit(models.Model):
	year = models.IntegerField()
	name = models.CharField(max_length=50)
	exday = models.IntegerField()
	amount = models.TextField(default='0,0,0,0,0,0,0,0,0,0,0,0')

	def __unicode__(self):
		return self.name + str(self.year)

class Monthly(models.Model):
	year = models.IntegerField()
	month = models.IntegerField()
	inc = models.IntegerField()
	exp = models.IntegerField()
	credit = models.IntegerField()

	def __unicode__(self):
		return str(self.year) + "-" + str(self.month)
	
