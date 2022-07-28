const setAlert = (mgs, type = 'danger') => {
	return `<p style="font-size: 14px;" class="alert alert-${type} d-flex justify-content-between">${mgs}<button class="btn-close" data-bs-dismiss="alert"></button></p>`;
};

const sendData = (key, value) => {
	let data = [];

	if (localStorage.getItem(key)) {
		data = JSON.parse(localStorage.getItem(key));
	}
	data.push(value);

	localStorage.setItem(key, JSON.stringify(data));
};

const getData = (key) => {
	if (localStorage.getItem(key)) {
		return JSON.parse(localStorage.getItem(key));
	} else {
		return false;
	}
};


const timer = (end_time)=>{

	let start_time = Date.now();
	let duration = end_time - start_time;
	
	let total_sec = Math.floor(duration / 1000);
	let total_min = Math.floor(total_sec / 60);
	let total_hour = Math.floor(total_min / 60);
	let total_day = Math.floor(total_hour / 24);

	let hour = (total_hour - (total_day * 24));
	let min = (total_min - (total_day * 24 * 60) - (hour * 60));
	let sec = (total_sec - (total_day * 24 * 60 * 60)- (hour * 60 * 60) - (min * 60));

	if (end_time < start_time) {
		return `[ <strong style="color:red">Time Over</strong>]`
	}else{
		return `<strong>[${total_day} Days : ${hour} Hours : ${min} Mins : ${sec} Sec Left] </strong>`
	}

}

const timeBar = (start_time, end_time)=>{

	let duration = end_time - start_time;
	let current_time = end_time - Date.now();

	let timebarper = Math.floor(( 100 * current_time ) / duration);

	let width = '';
	if (timebarper >= 1 && timebarper < 30) {
		width = `width: ${timebarper}%; background-color:red; `;
	}else if(timebarper >= 30 && timebarper < 60){
		width = `width: ${timebarper}%; background-color:orange; `;
	}else if(timebarper >= 60 && timebarper <= 100){
		width = `width: ${timebarper}%; background-color:green; `;
	}else{
		width = `width: 100%; background-color:red; `;
	}

	return width;
}


const update = (key, array)=>{
	localStorage.setItem(key, JSON.stringify(array))
}