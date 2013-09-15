var exp = new function() {
	var that = this;
	this.curedit = $(null);
	this.load = function() {
		$('#expense').load('/exp/'+getDStr(nowday), function(){
			that.exp_dyn = $('#exp-dynamic').children().wrap('<td>').end().html();
			that.addRow();
			$('.exp-add').find('input, select').focus(that.autoAdd);
			$('#exp-table td').each(that.editable);
			$('.grid-input').children().blur(function(){
				that.curedit.children('input').val($(this).val());
				if ($(this).parent().attr('id') == 'input-text')
					that.curedit.children('span').text($(this).val());
				else
					that.curedit.children('span').text($(this).children('option:selected').text());
				$(this).val('').parent().hide();
				that.modify(that.curedit);

			});
		});
	};
	this.addRow = function() {
		$('#exp-table').append('<tr class="exp-add">');
		$('.exp-add').html(that.exp_dyn).find('input,select').focus(that.autoAdd);
		$('.exp-add td').each(that.editable);
	};
	this.autoAdd = function() {
		if ($('.exp-pre').length > 0) {
			if ($('.exp-pre').find('input,select').filter(that.checkData).length == 4)
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
			row.children('td').each(that.editable);
		});
	};
	this.select = function(e) {
		if (this != that) e = $(this);
		that.curedit.removeClass('current');
		that.curedit = e.addClass('current');
		return false;
	}
	this.edit = function(e, ele) {
		if (ele == undefined) ele = $(this);
		if (ele.attr('data-input') == undefined) return ;

		$('.grid-input').hide();

		var input = $('#' + ele.attr('data-input'));
		var pos = ele.position();
		var pad = Number(ele.css('padding').slice(0,-2));

		ele.addClass('current');
		input.css('left', pos.left+pad).css('top', pos.top+pad).width(ele.width());
		input.children().val(/*e ? */ele.children('input').val()/* : ''*/).end().show().children().focus();
		that.editing = 1;

	};
	this.editable = function(idx, ele) {
		$(ele).dblclick(that.edit).click(that.select);
	};
	this.modify = function(ele) {
		var id = ele.parent().children('input[name=id]').val();
		var qstr = 'id='+id+'&'+ele.children().serialize()+'&'+$('input[name=csrfmiddlewaretoken]').serialize();
		$.post('/exp/modify', qstr);
	};
	//check Data is valid
	this.checkData = function(idx, ele) {
		if (ele.name == 'name')
			return $(ele).val() != "";
		else
			return /^\d+$/.test($(ele).val());
	};
}