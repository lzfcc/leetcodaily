/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function(tasks) {
	tasks = tasks.map((t, i) => {
		return new Task(i, t[0], t[1])   
	}).sort((t1, t2) => {
		return t1.start - t2.start
	})
	const ans = []
	const waiting = []
	let k = 0
	let t = tasks[k].start
	while (k < tasks.length || waiting.length > 0) {
		while (k < tasks.length && tasks[k].start <= t) {
			waiting.push(tasks[k])
			k++
		}
		let min = 1e10, j = 0
		for (let i = 0; i < waiting.length; i++) {
			if (waiting[i].duration < min) {
				min = waiting[i].duration
				j = i
			}
			if (waiting[i].duration == min && waiting[i].index < waiting[j].index) {
				j = i
			}
		}
//		console.log(j, min, t)
		ans.push(waiting[j].index)
		waiting.splice(j, 1) // process and dequeue
		t += min
	}
	return ans
};

//getOrder([[1,2],[2,4],[3,2],[4,1]])
getOrder([[19,13],[16,9],[21,10],[32,25],[37,4],[49,24],[2,15],[38,41],[37,34],[33,6],[45,4],[18,18],[46,39],[12,24]])