class ZigzagIterator2:
	"""
	@param: vecs: a list of 1d vectors
	"""
	def __init__(self, vecs):
		# do intialization if necessary
		self.vecs = filter(lambda v: len(v) > 0, vecs)
		self.maxColumn = [0, 0]
		self.i = -1
		self.j = 0
		if len(self.vecs) == 0:
			self.i = 0
			return
		self.columnCounts = []
		for i in xrange(0, len(self.vecs)):
			vec = self.vecs[i]
			self.columnCounts.append(len(vec))
			if self.maxColumn[1] <= len(vec):
				self.maxColumn[1] = len(vec)
				self.maxColumn[0] = i
		self.maxColumn[1] -= 1
	
	"""
	@return: An integer
	"""
	def next(self):
		# write your code here
		if self.i < len(self.vecs) - 1:
			self.i += 1
		else: 
			self.i = 0
			self.j += 1
	
		while self.j >= self.columnCounts[self.i] and self.hasNext(): 
			self.i += 1
			if self.i == len(self.vecs):
				self.j += 1
				self.i = 0
		
		return self.vecs[self.i][self.j]
		
	"""
	@return: True if has next
	"""
	def hasNext(self):
		# write your code here
		return [self.i, self.j] != self.maxColumn

# Your ZigzagIterator2 object will be instantiated and called as such:
# solution, result = ZigzagIterator2(vecs), []
# while solution.hasNext(): result.append(solution.next())
# Output result

solution = ZigzagIterator2([[9,3,2,4,8],[1,2,3,4,2]])
solution = ZigzagIterator2([[],[]])
solution = ZigzagIterator2([[],[1,7,5,10,2],[],[2,1]])
result = []
while solution.hasNext():
	result.append(solution.next())

print(result)

