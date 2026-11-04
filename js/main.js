const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LS={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const fmt=n=>n.toLocaleString('ru-RU')+' сом';
function toast(m){let t=document.createElement('div');t.className='toast';t.textContent=m;document.body.append(t);setTimeout(()=>t.classList.add('show'),10);setTimeout(()=>t.remove(),2500)}
const getCart=()=>LS.get('bg_cart',{});
function addCart(id,q=1){const c=getCart();c[id]=(c[id]||0)+q;LS.set('bg_cart',c);badges()}
function toggleFav(id){let f=LS.get('bg_fav',[]);const on=f.includes(id);f=on?f.filter(x=>x!=id):[...f,id];LS.set('bg_fav',f);badges();toast(on?'Удалено из избранного':'Добавлено в избранное');window.dispatchEvent(new Event('favchange'))}
function badges(){const c=Object.values(getCart()).reduce((a,b)=>a+b,0),f=LS.get('bg_fav',[]).length;$$('.bc').forEach(e=>e.textContent=c);$$('.bf').forEach(e=>e.textContent=f);$$('[data-fav]').forEach(b=>b.classList.toggle('on',f&&LS.get('bg_fav',[]).includes(+b.dataset.fav)))}
const NAV=[['index.html','Главная'],['catalog.html','Каталог'],['new.html','Новинки'],['sale.html','Акции'],['about.html','О нас'],['delivery.html','Доставка'],['contacts.html','Контакты']];
const cur=location.pathname.split('/').pop()||'index.html',user=LS.get('bg_user',null);
$('#hdr').outerHTML=`<header class="hdr"><div class="wrap row"><button class="burger" id="bg" aria-label="Меню">☰</button><a href="index.html" class="logo">BEAUTY <b>GLOW</b></a><nav id="nav">${NAV.map(([h,t])=>`<a href="${h}" class="${h==cur?'act':''}">${t}</a>`).join('')}</nav><form action="catalog.html" class="srch"><input name="q" placeholder="Поиск товаров" aria-label="Поиск"><button>🔍</button></form><div class="icons"><a href="favorites.html" title="Избранное">♡<i class="bf">0</i></a><a href="cart.html" title="Корзина">🛍<i class="bc">0</i></a><a href="${user?'profile.html':'login.html'}" class="btn sm">${user?'Профиль':'Войти'}</a></div></div></header>`;
$('#ftr').outerHTML=`<footer class="ftr"><div class="wrap grid4"><div><div class="logo">BEAUTY <b>GLOW</b></div><p>Премиальная косметика для вашей красоты.</p></div><div><h4>Магазин</h4><a href="catalog.html">Каталог</a><a href="new.html">Новинки</a><a href="sale.html">Акции</a></div><div><h4>Информация</h4><a href="about.html">О нас</a><a href="delivery.html">Доставка и оплата</a><a href="contacts.html">Контакты</a></div><div><h4>Контакты</h4><p>Бишкек, пр. Чуй 100<br>+996 555 123 456<br>info@beautyglow.kg</p></div></div><p class="copy">© 2026 BEAUTY GLOW</p></footer>`;
$('#bg').onclick=()=>$('#nav').classList.toggle('open');
document.addEventListener('click',e=>{const a=e.target.closest('[data-cart],[data-fav]');if(!a)return;if(a.dataset.cart){addCart(+a.dataset.cart);toast('Товар добавлен в корзину')}else toggleFav(+a.dataset.fav)});
const fill=(id,l)=>{const e=$(id);if(e)e.innerHTML=l.map(card).join('')};
fill('#h-pop',[...PRODUCTS].sort((a,b)=>b.pop-a.pop).slice(0,4));fill('#h-new',PRODUCTS.filter(p=>p.isNew).slice(0,4));fill('#h-sale',PRODUCTS.filter(p=>p.old).slice(0,4));
const hc=$('#h-cats');if(hc)hc.innerHTML=CATS.map((c,i)=>`<a class="cat" href="catalog.html?cat=${i}"><img src="images/p${i*3+1}.svg" alt="${c}"><span>${c}</span></a>`).join('');
const nl=$('#news');if(nl)nl.onsubmit=e=>{e.preventDefault();if(!/^\S+@\S+\.\S+$/.test($('#nemail').value))return toast('Введите корректный email');LS.set('bg_sub',$('#nemail').value);nl.reset();toast('Вы подписаны на новости!')};
const cf=$('#cform');if(cf)cf.onsubmit=e=>{e.preventDefault();const m=LS.get('bg_msgs',[]);m.push({t:Date.now(),n:cf.n.value,m:cf.m.value});LS.set('bg_msgs',m);cf.reset();toast('Сообщение отправлено. Мы свяжемся с вами!')};
badges();
