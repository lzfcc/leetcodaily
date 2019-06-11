//大胃王的烦恼 https://code.mi.com/problem/list/view?id=145

#include <stdio.h>
#include <iostream>
#include <algorithm>
#include <queue>
#include <vector>

using namespace std;
typedef long long LL;
typedef pair<long long, long long> pll;
const int maxn = 200100;
pll a[maxn];

priority_queue<LL, vector<LL>, greater<LL> > que;
int main() {
    LL n;
    scanf("%lld", &n);
    for(int i = 0; i < n; ++i){
        scanf("%lld", &a[i].first);
        scanf("%lld", &a[i].second);
    }
    sort(a, a + n);
    LL ans = 1;
    que.push(a[0].second);
    for(int i = 1; i < n; ++i){
        LL temp_end = que.top();
        if(a[i].first <= temp_end){
            ans++;
        }
        else{
            que.pop();
        }
        que.push(a[i].second);
    }
    printf("%lld\n", ans);
    return 0;
}