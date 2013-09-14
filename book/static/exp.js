var exp = new function() {
	var that = this;
	this.load = function() {
		$('#expense').load('/exp/'+getDStr(nowday), function(){
			that.exp_dyn = $('#exp-dynamic').children().wrap('<td>').end().html();
			that.addRow();
			$(".exp-add").find('input, select').focus(that.autoAdd);
		});
	};
	this.addRow = function() {
		$('#exp-table').append('<tr class="exp-add">');
		$('.exp-add').html(that.exp_dyn).find('input,select').focus(that.autoAdd);
	};
	this.autoAdd = function() {
		if ($('.exp-pre').length > 0) {
			if ($('.exp-pre').find('input,select').filter(that.checkNull).length == 4)
				that.add($('.exp-pre').removeClass('exp-pre'));
		}
		else {
			$('.exp-add').removeClass('exp-add').addClass('exp-pre').unbind('focus');
			that.addRow();
		}
	};
	this.add = function(row) {
		var qstr = row.find('input,select').serialize() + '&' + $('input[name=csrfmiddlewaretoken]').serialize();
		$.post('/exp/'+getDStr(nowday)+'/add', qstr, function(data) {
			row.html(data);
		});
	};
	//check not null
	this.checkNull = function(idx, ele) {
		return $(ele).val() != "";
	};
}