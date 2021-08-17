// https://www.geeksforgeeks.org/two-water-jug-puzzle/

const gcd = (a, b) => b == 0 ? a : gcd(b, a % b)

/**
 *
 * @param {number} fromCap Capacity of jug from which water is poured
 * @param {number} toCap Capacity of jug to which water is poured
 * @param {number} d Amount to be measured
 * @returns
 */
function pour(fromCap, toCap, d) {
    const steps = []

    // Initialize current amount of water in source and destination jugs
	let from = fromCap
	let to = 0

    const mark = () => steps.push(from + ',' + to)
    mark()

	// Break the loop when either of the two jugs has d litre water
	while (from != d && to != d) {
        // Find the maximum amount that can be poured
		let temp = Math.min(from, toCap - to)

		// Pour "temp" liters from "from" to "to"
		to += temp
		from -= temp
        mark()

		if (from == d || to == d) {
            break
        }

		// If first jug becomes empty, fill it
		if (from == 0) {
			from = fromCap
            mark()
		}

		// If second jug becomes full, empty it
		if (to == toCap) {
			to = 0
			mark()
		}
    }

	return steps
}

// Returns count of minimum steps needed to measure d liter
function minSteps(m, n, d) {
    // To make sure that m is smaller than n
	if (m > n) {
		let t = m
		m = n
		n = t
	}

	if (d > n) {
        return -1
    }

	// If gcd of n and m does not divide d then solution is not possible
	if ((d % gcd(n, m)) != 0) {
		return -1;
    }

	// Return minimum two cases:
	// a) Water of n liter jug is poured into m liter jug
	// b) Vice versa of "a"
	let s1 = pour(n, m, d)
    let s2 = pour(m, n, d)
    if (s1.length < s2.length) {
        console.log(s1)
    } else {
        console.log(s2)
    }
}

minSteps(3, 5, 4)
