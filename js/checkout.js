const c=getCart(),ids=Object.keys(c).filter(i=>byId(i));let total=0;
if(!ids.length){$('#co').innerHTML='<div class="empty"><p>Корзина пуста — оформлять нечего</p><a class="btn" href="catalog.html">Перейти в каталог</a></div>'}
else{$('#sum').innerHTML=ids.map(i=>{const p=byId(i);total+=p.price*c[i];return `<div class="srow"><span>${p.name} × ${c[i]}</span><b>${fmt(p.price*c[i])}</b></div>`}).join('')+`<div class="total">Итого: <b>${fmt(total)}</b></div>`;
const u=LS.get('bg_user',null);if(u){$('#fn').value=u.name}
$('#form').onsubmit=e=>{e.preventDefault();const f=e.target;if(!/^[+\d][\d\s()-]{8,}$/.test(f.phone.value))return toast('Введите корректный номер телефона');
const o={id:'BG-'+Date.now().toString().slice(-6),date:new Date().toLocaleString('ru-RU'),name:f.fn.value,phone:f.phone.value,city:f.city.value,addr:f.addr.value,comment:f.comment.value,pay:f.pay.value,total,items:ids.map(i=>({n:byId(i).name,q:c[i]}))};
const os=LS.get('bg_orders',[]);os.unshift(o);LS.set('bg_orders',os);LS.set('bg_cart',{});badges();
$('#co').innerHTML=`<div class="empty ok"><h2>Заказ ${o.id} успешно оформлен!</h2><p>Спасибо, ${o.name}! Мы свяжемся с вами по номеру ${o.phone} для подтверждения.</p><a class="btn" href="profile.html">Мои заказы</a> <a class="btn ghost" href="index.html">На главную</a></div>`}}
