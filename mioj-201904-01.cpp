//不一样的排序 https://code.mi.com/problem/list/view?id=128&cid=12
#include <stdio.h>
#include <iostream>
#include <map>
#include <vector>
#include <algorithm>
using namespace std;

long factor(int n) {
    long a = 1, s = 1;
    for(int i=2; i * i <= n; i += a, a = 2) {
        int c = 1;
        if(n % i == 0) while(n % i == 0) {
            c++;
            n /= i;
        }
        s *= (c + 1);
    }
    if(n > 1) s = s << 1;
    return s;
}

int main() {
    int k, n, x;
    map<int, long> res;
    scanf("%d%d", &k, &n);
    while(n--) {
        scanf("%d", &x);
        res[x] = factor(x);
    }
    vector<pair<int, int> > v{make_move_iterator(begin(res)), make_move_iterator(end(res))};
    sort(begin(v), end(v), [](pair<int, int> p1, pair<int, int> p2){return p1.second < p2.second;});
    cout << v[k-1].first;
    return 0;
}
