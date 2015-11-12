
var data ;
var revenueTypeArray = [];
var amountTypeArray = [];
var startYearArray = [];
var endYearArray = [];
var amountArray = [];

$(document).ready(
function search() {
	$.getJSON('http://cors.io/?u=http://preview.sokrati.com/data/open_spendings.json').then(
		function(response){
		   window.data = response.data;
		   revenueTypeArray =_.chain(response.data).pluck('eng_rev_type').unique().value();
		   amountTypeArray =_.chain(response.data).pluck('type').unique().value();
		   startYearArray =_.chain(response.data).pluck('year_start').unique().value();
		   endYearArray =_.chain(response.data).pluck('year_end').unique().value();
		   amountArray =_.chain(response.data).pluck('amount').unique().value();
	    $('#categoryList').html(tabularize(data));
	    $('#revenue_type').append(makeList(revenueTypeArray));
        $('#start_year').append(makeList(startYearArray));
        $('#end_year').append(makeList(endYearArray));
        $('#amount').append(makeList(amountArray));
        $('#type').append(makeList(amountTypeArray));
		},
		function(error){
			console.log("Error...");
		},
		function(failure){
			console.log("failure..........");
		});
},

$('#custom-filter').on('click',function(e){
		var rev_type = $("#revenue_type select").val();
		var start_Year = $("#start_year select").val();
		var end_Year = $("#end_year select").val();
		var amount = $("#amount select").val();
		var type = $("#type select").val();
		var customData = [];
		$.map(data, function(obj) {
            if(obj.eng_rev_type === rev_type)
                 customData.push(obj);
        });
        console.log(customData);
        $('#categoryList').html(tabularize(customData));
		$('#revenue_type').append(makeList(revenueTypeArray));
		$('#start_year').append(makeList(startYearArray));
		$('#end_year').append(makeList(endYearArray));
		$('#amount').append(makeList(amountArray));
		$('#type').append(makeList(amountTypeArray));
}),

$('#sortBox').on('change', function(e){
        // calling search function and a callback function
        var SortBy = $('#sortBox').val();
        window.data.sort(function(a, b){
            if(SortBy=="rev_Type"){
                return a.eng_rev_type.toLowerCase().charCodeAt(0) -  b.eng_rev_type.toLowerCase().charCodeAt(0);
            }
            if (SortBy=="type") {
                return a.type.toLowerCase().charCodeAt(0) -  b.type.toLowerCase().charCodeAt(0);
            }
            if (SortBy=="start_Year") {
                return a.year_start -  b.year_start;
            }
            if (SortBy=="end_Year") {
                return a.year_end  -  b.year_end;
            }
            if (SortBy=="amount") {
                return a.amount -  b.amount;
            }
            });

        $('#categoryList').html(tabularize(data));
		$('#revenue_type').append(makeList(revenueTypeArray));
		$('#start_year').append(makeList(startYearArray));
		$('#end_year').append(makeList(endYearArray));
		$('#amount').append(makeList(amountArray));
		$('#type').append(makeList(amountTypeArray));
}),

window.makeList = function(array) {
    var list = document.createElement('select');
    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('option');
        item.value = array[i];
        item.appendChild(document.createTextNode(array[i]));
        list.appendChild(item);
    }
    return list;
},

window.tabularize = function(data) {
	var table = '';
	$.each(data, function(i, data){
		table += '<tr>' +
		            '<td>' + data.eng_rev_type + '</td>'+
					'<td>' + data.year_start     + '</td>'+
					'<td>' + data.year_end + '</td>'+
					'<td>' + data.type + '</td>'+
					'<td>' + data.amount + '</td>'+
				 '</tr>';
	});

	var returnItem =  '<table cellspacing="0" cellpadding="0">'+
				'<thead><tr>'+
					'<th>REVENUE TYPE </th>' +
					'<th>START YEAR </th>'+
					'<th>END YEAR </th>'+
					'<th>TYPE</th>'+
					'<th>AMOUNT</th>'+
				'</tr>'+
			'</thead>'+
				'<thead><tr>'+
					'<th id="revenue_type"></th>' +
					'<th id="start_year"></th>'+
					'<th id="end_year"></th>'+
					'<th id="type"></th>'+
					'<th id="amount"></th>'+
				'</tr></thead>'+
			table+
			'</table>';
	return returnItem;
}



);