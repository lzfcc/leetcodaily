var myPow = function(x, n) {
	if (x == 1) return 1;
	return n >= 0 ? pow(x, n) : pow(1/x, -n);
};

function pow(x, n) {
	if (n == 0) return 1;
	const sqr = pow(x, (n >> 1));
	return (n & 1) ? sqr * sqr * x : sqr * sqr;
}

myPow(2.00000, -2147483648);  //Runtime Error