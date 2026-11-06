if (!window.$) {
  window.$ = (s, r = document) => r.querySelector(s);
  window.$$ = (s, r = document) => [...r.querySelectorAll(s)];
}

const CATS=["Уход за лицом","Макияж","Уход за телом","Уход за волосами","Парфюмерия","Наборы косметики"];
const PRODUCTS=[{id:1,cat:0,name:"Сыворотка с гиалуроновой кислотой",desc:"Интенсивное увлажнение и гладкость кожи.",price:1450,old:0,pop:95,isNew:0},
{id:2,cat:0,name:"Увлажняющий крем для лица",desc:"Лёгкий крем на каждый день с SPF 15.",price:1100,old:1400,pop:80,isNew:0},
{id:3,cat:0,name:"Очищающий гель для умывания",desc:"Мягко очищает, не пересушивает.",price:690,old:0,pop:70,isNew:1},
{id:4,cat:1,name:"Помада матовая Rose",desc:"Стойкий матовый цвет, 8 часов носки.",price:890,old:0,pop:99,isNew:0},
{id:5,cat:1,name:"Тушь для ресниц Volume",desc:"Объём и разделение ресниц.",price:780,old:980,pop:85,isNew:0},
{id:6,cat:1,name:"Палетка теней Nude",desc:"12 тёплых оттенков для макияжа.",price:1650,old:0,pop:75,isNew:1},
{id:7,cat:2,name:"Масло для тела Almond",desc:"Питательное миндальное масло.",price:950,old:0,pop:60,isNew:0},
{id:8,cat:2,name:"Скраб для тела Сахарный",desc:"Нежное обновление кожи.",price:720,old:890,pop:65,isNew:0},
{id:9,cat:2,name:"Лосьон для тела Vanilla",desc:"Увлажнение с ароматом ванили.",price:640,old:0,pop:55,isNew:1},
{id:10,cat:3,name:"Шампунь восстанавливающий",desc:"Для повреждённых волос.",price:830,old:0,pop:72,isNew:0},
{id:11,cat:3,name:"Маска для волос Keratin",desc:"Глубокое питание и блеск.",price:1250,old:1550,pop:78,isNew:0},
{id:12,cat:3,name:"Сыворотка для кончиков",desc:"Защита от секущихся кончиков.",price:760,old:0,pop:50,isNew:1},
{id:13,cat:4,name:"Парфюмерная вода Rose Gold",desc:"Нежный цветочный аромат, 50 мл.",price:3200,old:0,pop:90,isNew:0},
{id:14,cat:4,name:"Парфюмерная вода Velvet",desc:"Тёплый древесно-ванильный, 50 мл.",price:3450,old:3900,pop:82,isNew:0},
{id:15,cat:4,name:"Мист для тела Peony",desc:"Свежий аромат пиона, 150 мл.",price:980,old:0,pop:68,isNew:1},
{id:16,cat:5,name:"Набор «Уход за лицом»",desc:"Очищение, тоник и крем в подарочной коробке.",price:2800,old:3500,pop:88,isNew:0},
{id:17,cat:5,name:"Набор «Праймер и тон»",desc:"Основа для безупречного макияжа.",price:2300,old:0,pop:66,isNew:1},
{id:18,cat:5,name:"Набор «Подарочный Glow»",desc:"Крем, помада и мист для тела.",price:2950,old:3600,pop:92,isNew:1}];
const byId=id=>PRODUCTS.find(p=>p.id==id);
const PRODUCT_IMAGES={
1:"images/stock/stock3.jpg",2:"images/stock/stock2.jpg",3:"images/stock/stock4.jpg",
4:"images/stock/stock5.jpg",5:"images/stock/stock1.jpg",6:"images/stock/stock5.jpg",
7:"images/stock/stock3.jpg",8:"images/stock/stock2.jpg",9:"images/stock/stock10.jpg",
10:"images/stock/stock1.jpg",11:"images/stock/stock7.jpg",12:"images/stock/stock3.jpg",
13:"images/stock/stock4.jpg",14:"images/stock/stock10.jpg",15:"images/stock/stock6.jpg",
16:"images/stock/stock8.jpg",17:"images/stock/stock5.jpg",18:"images/stock/stock10.jpg"
};
const imageFor=p=>PRODUCT_IMAGES[p.id];
function card(p){const f=LS.get('bg_fav',[]).includes(p.id);return `<article class="card"><a href="product.html?id=${p.id}" class="img"><img src="${imageFor(p)}" alt="${p.name}" loading="lazy">${p.old?`<span class="tag">-${Math.round(100-p.price/p.old*100)}%</span>`:p.isNew?'<span class="tag">New</span>':''}</a><button class="heart ${f?'on':''}" data-fav="${p.id}" aria-label="В избранное">♥</button><div class="info"><small>${CATS[p.cat]}</small><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><div class="price">${fmt(p.price)} ${p.old?`<s>${fmt(p.old)}</s>`:''}</div><div class="btns"><button class="btn" data-cart="${p.id}">В корзину</button><a class="btn ghost" href="product.html?id=${p.id}">Подробнее</a></div></div></article>`}
function initCatalog(){const g=window.$('#grid');if(!g||!window.$('#cat'))return;const mode=document.body.dataset.mode,u=new URLSearchParams(location.search);
window.$('#cat').innerHTML='<option value="">Все категории</option>'+CATS.map((c,i)=>`<option value="${i}">${c}</option>`).join('');
window.$('#q').value=u.get('q')||'';window.$('#cat').value=u.get('cat')||'';
function r(){let q=window.$('#q').value.toLowerCase().trim(),c=window.$('#cat').value,mn=+window.$('#min').value||0,mx=+window.$('#max').value||1e9,s=window.$('#sort').value;
let l=PRODUCTS.filter(p=>(mode!='new'||p.isNew)&&(mode!='sale'||p.old)&&(c===''||p.cat==c)&&p.price>=mn&&p.price<=mx&&(p.name+p.desc).toLowerCase().includes(q));
l.sort((a,b)=>s=='asc'?a.price-b.price:s=='desc'?b.price-a.price:b.pop-a.pop);
window.$('#count').textContent='Найдено: '+l.length;g.innerHTML=l.length?l.map(card).join(''):'<p class="empty">Ничего не найдено. Измените фильтры.</p>'}
window.$$('.filters input,.filters select').forEach(e=>e.addEventListener('input',r));window.$('#reset').onclick=()=>{window.$$('.filters input').forEach(e=>e.value='');window.$('#cat').value='';window.$('#sort').value='pop';r()};r();window.addEventListener('favchange',r)}
function initProduct(){const b=window.$('#product');if(!b)return;const p=byId(new URLSearchParams(location.search).get('id'));if(!p){location.replace('404.html');return}
document.title=p.name+' — BEAUTY GLOW';
b.innerHTML=`<div class="pimg"><img src="${imageFor(p)}" alt="Иллюстративное фото косметики для товара «${p.name}»"></div><div><small>${CATS[p.cat]}</small><h1>${p.name}</h1><p>${p.desc}</p><p class="photo-note">Фото иллюстративное: товар, бренд или упаковка на снимке могут отличаться.</p><div class="price big">${fmt(p.price)} ${p.old?`<s>${fmt(p.old)}</s>`:''}</div><div class="qty"><button id="m">−</button><span id="n">1</span><button id="pl">+</button></div><div class="btns"><button class="btn" id="add">В корзину</button><button class="btn dark" id="buy">Купить</button><button class="btn ghost" data-fav="${p.id}">В избранное</button></div><p><a class="btn ghost" href="javascript:history.back()">← Назад</a> <a class="btn ghost" href="catalog.html">Продолжить покупки</a></p></div>`;
let n=1;window.$('#m').onclick=()=>window.$('#n').textContent=n=Math.max(1,n-1);window.$('#pl').onclick=()=>window.$('#n').textContent=++n;
window.$('#add').onclick=()=>{addCart(p.id,n);toast('Товар добавлен в корзину')};window.$('#buy').onclick=()=>{addCart(p.id,n);location.href='checkout.html'};
window.$('#related').innerHTML=PRODUCTS.filter(x=>x.cat==p.cat&&x.id!=p.id).map(card).join('')}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    initProduct();
  });
} else {
  initCatalog();
  initProduct();
}
