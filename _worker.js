addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// 验证 UUID
const VALID_UUID = 'ce37b8b5-ffac-47b2-a5df-d011d3b7df7e';

async function handleRequest(request) {
  // 获取请求头中的 UUID
  const uuid = request.headers.get('X-UUID');

  // 验证 UUID
  if (uuid !== VALID_UUID) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 代理目标 URL
  const url = 'https://chat.openai.com';

  // 创建新请求，继承原始请求的一些属性
  const newRequest = new Request(url, {
    body: request.body,
    headers: request.headers,
    method: request.method,
  });

  // 发送请求到目标 URL，并返回其响应
  return fetch(newRequest);
}
