
// Just to compute JS Date difference

function is_leap_year(y) {
	return ( y%4===0 && ((y%100===0 && y%400===0) || (y%100!==0)) );
}

function date_diff(date1, date2){
    var diff = {}                           
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             
    diff.sec = tmp % 60;                    
 
    tmp = Math.floor((tmp-diff.sec)/60);    
    diff.min = tmp % 60;                    
 
    tmp = Math.floor((tmp-diff.min)/60);    
    diff.hour = tmp % 24;                   
     
    tmp = Math.floor((tmp-diff.hour)/24);   
    diff.day = tmp;
    
    diff.year = 0;
    
	for (var i = date1.getFullYear()+1; i < date2.getFullYear(); i++) {
		if (is_leap_year(i)) {
			diff.year++;
			tmp = tmp - 366;
		}
	}

	diff.year = diff.year + Math.floor(tmp / 365);

    return diff;
}

document.getElementById("moreinfo").innerHTML = date_diff(new Date(1986,08,20), new Date()).year;