var nowday = new Date();
function getDStr(d) {
	return (d.getYear()+1900) + '/' + (d.getMonth()+1) + '/' + d.getDate();
}
$(function(){
	exp.load();
	monthly.load();
	$(document).click(function(){
		exp.select($(null));
	});
});