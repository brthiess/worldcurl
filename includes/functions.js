module.exports = {
	ordinal_suffix_of: function(i) {
		var j = i % 10,
			k = i % 100;
		if (j == 1 && k != 11) {
			return i + "st";
		}
		if (j == 2 && k != 12) {
			return i + "nd";
		}
		if (j == 3 && k != 13) {
			return i + "rd";
		}
		return i + "th";
	},
	
	formatDate: function(date, format, utc) {
		var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		function ii(i, len) {
			var s = i + "";
			len = len || 2;
			while (s.length < len) s = "0" + s;
			return s;
		}

		var y = utc ? date.getUTCFullYear() : date.getFullYear();
		format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
		format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
		format = format.replace(/(^|[^\\])y/g, "$1" + y);

		var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
		format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
		format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
		format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
		format = format.replace(/(^|[^\\])M/g, "$1" + M);

		var d = utc ? date.getUTCDate() : date.getDate();
		format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
		format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
		format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
		format = format.replace(/(^|[^\\])d/g, "$1" + d);

		var H = utc ? date.getUTCHours() : date.getHours();
		format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
		format = format.replace(/(^|[^\\])H/g, "$1" + H);

		var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
		format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
		format = format.replace(/(^|[^\\])h/g, "$1" + h);

		var m = utc ? date.getUTCMinutes() : date.getMinutes();
		format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
		format = format.replace(/(^|[^\\])m/g, "$1" + m);

		var s = utc ? date.getUTCSeconds() : date.getSeconds();
		format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
		format = format.replace(/(^|[^\\])s/g, "$1" + s);

		var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
		format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
		f = Math.round(f / 10);
		format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
		f = Math.round(f / 10);
		format = format.replace(/(^|[^\\])f/g, "$1" + f);

		var T = H < 12 ? "AM" : "PM";
		format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
		format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

		var t = T.toLowerCase();
		format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
		format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

		var tz = -date.getTimezoneOffset();
		var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
		if (!utc) {
			tz = Math.abs(tz);
			var tzHrs = Math.floor(tz / 60);
			var tzMin = tz % 60;
			K += ii(tzHrs) + ":" + ii(tzMin);
		}
		format = format.replace(/(^|[^\\])K/g, "$1" + K);

		var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
		format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
		format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

		format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
		format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

		format = format.replace(/\\(.)/g, "$1");

		return format;
	},
	
	/* Social Media Posts */
	timeDifference: function(previous) {
		
		current = new Date();
		var msPerMinute = 60 * 1000;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;

		var elapsed = current - previous;

		if (current < previous) {
			return 'Just Now';
		}
		if (elapsed < msPerMinute) {
			 return Math.round(elapsed/1000) + ' seconds ago';   
		}

		else if (elapsed < msPerHour) {
			 return Math.round(elapsed/msPerMinute) + ' minutes ago';   
		}

		else if (elapsed < msPerDay ) {
			 return Math.round(elapsed/msPerHour ) + ' hours ago';   
		}

		else if (elapsed < msPerMonth) {
			return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
		}

		else if (elapsed < msPerYear) {
			return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
		}

		else {
			return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
		}
	},
	capitalizeFirstLetter : function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	numberWithCommas : function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	isSameMonth : function(date1, date2){
		if ((new Date(date1)).getMonth() == (new Date(date2)).getMonth()) {
			return true;
			
		}
		else {
			return false;
		}
	}
}

