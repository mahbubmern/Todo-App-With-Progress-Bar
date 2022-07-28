const job = document.getElementById('job');
const msg = document.querySelector('.msg');
const box_footer = document.querySelector('.box-footer');
const job_content = document.querySelector('.job-content');




job.onsubmit = (e) => {
	e.preventDefault();

	let formData = new FormData(e.target);
	let { project, buyer, date, time } = Object.fromEntries(formData.entries());

	if (!project || !buyer || !date || !time) {
		msg.innerHTML = setAlert('All field must be filled up');
		setTimeout(() => {
			msg.innerHTML = '';
		}, 1500);
	} else {
		msg.innerHTML = setAlert('Job Loaded', 'success');
		setTimeout(() => {
			msg.innerHTML = '';
		}, 1500);
		let start_time = Date.now();
		let end_time = new Date(date + ' ' + time).getTime();
		let id = Math.floor(Math.random() * 1000) +'_'+ Date.now(); 
		let singleFormData = { project, buyer, start_time, end_time, id };

		if (start_time > end_time) {
			msg.innerHTML = setAlert('Please input Correct Data', 'warning');
			setTimeout(() => {
				msg.innerHTML = '';
				
			}, 1500);
		}else{
				sendData('to-do-list', singleFormData);
				getAllData();
				e.target.reset();
		}
				
	}
};

const getAllData = () => {
	let data = getData('to-do-list');

	let list = [];

	if (!data || data.length ==0) {
		list = `<p style="text-align:center; color:red; background-color: #000; margin-top:20px; padding:5px" ><strong>No Job Found</strong></p>`;
	}
	if (data) {
		data.reverse().map((item) => {
			list += job_content.innerHTML = `
		
		<div class="area">
		<div class="job-list">
			<span style="margin-right: 10px;">[Project : ${item.project}] [Client: ${item.buyer}]</span>
			<span>${timer(item.end_time)}</span>
			<div class="icon">
				<button delete="${item.id}" class="close">×</button>
			</div>	
		</div>
		<div class="bar" style="${timeBar(item.start_time, item.end_time)}"></div>
	</div>
		
		`;
		});
	}

	job_content.innerHTML = list;
	box_footer.innerHTML = `<p><strong>Total Project</strong> : <span><strong>${!data || data.length ==0  ? "No" : data.length}  Project Found</span></p>`
};
getAllData();


setInterval(() => {
	getAllData();
}, 1000);

job_content.onclick = (e)=>{
	e.preventDefault;

	let data = getData('to-do-list');
	let {id} = data;
	

	if (e.target.hasAttribute("delete")) {
		let id = e.target.getAttribute('delete');
		let search = (data)=>{
			return data.id == id;
		}
		let index = data.findIndex(search);

		
		data.splice(index,1);
		update('to-do-list', data);
		getAllData();
	}
	
}