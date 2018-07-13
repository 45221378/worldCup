import { baseURL } from './ajax';

export default function sendForm({ url, method = 'post', data = {} }) {
  const childs = Object.keys(data).map(key => {
    return `<input type="hidden" name="${key}" value="${data[key]}" />`;
  });
  const form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', baseURL + url);
  form.innerHTML = childs.join('');
  document.body.appendChild(form);
  form.submit();
  form && form.remove();
}
