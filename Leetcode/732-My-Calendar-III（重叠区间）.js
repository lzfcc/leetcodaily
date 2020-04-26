function Point(val, type) {
    this.val = val;
    this.type = type; // 0: start, 1: end
}

var MyCalendarThree = function() {
    this.points = [];
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {number}
 */
MyCalendarThree.prototype.book = function(start, end) {
    this.points.push(new Point(start, 0));
    this.points.push(new Point(end, 1));
    this.points.sort((p1, p2) => {
        if (p1.val === p2.val) { // 位置相同，end 点应该排在前面，这样 overlap 先减
            return p2.type - p1.type;
        }
        return p1.val - p2.val
    });
    let overlap = 0;
    let ans = 0;
    for (const p of this.points) {
        if (p.type == 0) {
            overlap++;
            ans = Math.max(overlap, ans);
        } else {
            overlap--;
        }
    }
    return ans;
};