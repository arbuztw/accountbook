var monthly = new function() {
	var that = this;
	this.curmon = -1;
	this.load = function() {
		that.curmon = nowday.getMonth();
		var qstr = (nowday.getYear()+1900) + '/' + (that.curmon+1);
		$('#monthly').load('/monthly/'+qstr);
	}
}