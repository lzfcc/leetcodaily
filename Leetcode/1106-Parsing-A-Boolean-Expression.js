function TokenNode(token) {
    this.token = token;
    this.exprs = [];
}

TokenNode.prototype.booleanValue = function() {
    if (this.token == 't') {
        return true;
    }
    if (this.token == 'f') {
        return false;
    }
    if (this.token == '|') {
        return this.exprs.reduce((res, node) => res || node.booleanValue(), false);
    }
    if (this.token == '&') {
        return this.exprs.reduce((res, node) => res && node.booleanValue(), true);
    }
    if (this.token == '!') {
        return !this.exprs[0].booleanValue();
    }
    return false;
}


/**
 * @param {string} expression
 * @return {boolean}
 */
var parseBoolExpr = function(expression) {
    const stack = [];
    let i, token, root;
    i = 0;
    while(i < expression.length) {
        token = expression[i];
        if (token == '(') {
            stack.push(root);
        } else if (token == ')') {
            node = stack.pop();
            if (stack.length > 0) {
                root = stack[stack.length - 1];
                root.exprs.push(node);
            } else {
                root = node;
            }
        } else if (token == '&' || token == '|' || token == '!') {
            root = new TokenNode(token);        
        } else if (token == 't' || token == 'f') {
            node = new TokenNode(token);
            root.exprs.push(node);     
        } else { // comma
        }
        i++;
    }
    console.log(root.booleanValue());
};

tests = ["!(f)",
"|(&(t,f,t),!(t))",
"|(!(&(t,f,t)),|(t,f))",
"&(!(f),t,&(t,t,f))",
"!(!(f))"];

tests.forEach(element => {
    parseBoolExpr(element);
});