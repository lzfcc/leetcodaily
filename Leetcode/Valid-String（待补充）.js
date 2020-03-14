var checkValidString = function(s) {
	// dp[i][j] 表示 s[i..j] 是一个合法的解
	const dp = new Array(s.length).fill(0).map(() => new Array(s.length).fill(-1));
	const solve = (i, j) => {
		if (i > j) return true;
		if (dp[i][j] >= 0) return dp[i][j];
		if (i == j) return dp[i][j] = (s[i] == '*');
		if ((s[i] == '(' || s[i] == '*')
			&&(s[j] == ')' || s[j] == '*')
			&& solve(i + 1, j - 1)) 
			return dp[i][j] = 1;        
			return dp[i][j] = 1;        
			
		for (let k = i; k < j; ++k)
			if (solve(i, k) && solve(k + 1, j))
				return dp[i][j] = 1;                        
			
		return dp[i][j] = 0;
	}
	return solve(0, s.length - 1);
};

const res = ["()", "(*)", "*))*(*", "**))*(*", "(**())", "(*((*)"].map(s => checkValidString(s));

console.log(res);