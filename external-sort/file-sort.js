const fs = require('fs')

// generate data 
function generateData (N, M) {
	for (let i = 0; i < N; i++) {
		const arr = []
		for (let j = 0; j < M; j++) {
			const rand = (-1) ** Math.floor(Math.random() * 10) * Math.floor(Math.random() * 1e8)
			arr.push(String(rand))
		}
		fs.writeFileSync(i + '.txt', arr.join('\n'))
	}	 
}










