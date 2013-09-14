var exp = new function() {
	this.load = function(year, month, day) {
		if (arguments.length == 1)
		{
			var d = year;
			year = d.getYear() + 1900;
			month = d.getMonth() + 1;
			day = d.getDate();
		}
		$("#expense").load('/exp/'+year+'/'+month+'/'+day);
	}
}