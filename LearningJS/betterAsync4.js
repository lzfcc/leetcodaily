// http://es6.ruanyifeng.com/#docs/async#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%8C%89%E9%A1%BA%E5%BA%8F%E5%AE%8C%E6%88%90%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C

const fetch = require('./MockFetch/mockFetch');

/**
 ����ʹ��fetch������ͬʱԶ�̶�ȡһ�� URL��
 ÿ��fetch����������һ�� Promise ���󣬷���textPromises���顣
 Ȼ��reduce�������δ���ÿ�� Promise ����ʹ��then������ Promise �����������Ϳ���������������
 */
// function requestOrder(urls) {
//     // Զ�̶�ȡ����URL
//     const textPromises = urls.map(url => fetch(url).then(response => response.toString()));

//     // ���������
//     textPromises.reduce((chain, textPromise) => {
//       return chain.then(() => textPromise)
//         .then(text => console.log(text));
//     }, Promise.resolve());
//   }

/**
����д����ֱ̫�ۣ��ɶ��ԱȽϲ������ async ����ʵ�֡�
 */
async function requestOrder(urls) {
    try {
        for (const url of urls) {
            const response = await fetch(url);
            console.log(await response.text());
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * �������ȷʵ���򻯣�����������Զ�̲������Ǽ̷���
 * ֻ��ǰһ�� URL ���ؽ�����Ż�ȥ��ȡ��һ�� URL��������Ч�ʺܲ�ǳ��˷�ʱ�䡣
 * ������Ҫ���ǲ�������Զ������
 */
// async function requestOrder(urls) {
//     // ������ȡԶ��URL

//     // ����д�� fetch ���ص��� Promise ����
//     // const textPromises = urls.map(url => {
//     //     const response = fetch(url);
//     //     return response.text();
//     // });

//     const textPromises = urls.map(async url => {
//         const response = await fetch(url);
//         return response.text();
//     });

//     // ���������
//     for (const textPromise of textPromises) {
//         console.log(await textPromise);
//     }
// }

requestOrder([1, 2, 3, 4])


