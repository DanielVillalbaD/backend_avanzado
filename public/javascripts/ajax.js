var xhr = new XMLHttpRequest();
var url = "http://localhost:3000/api/anuncios?";

var tipo = document.getElementById('bytype');
var etiqueta = document.querySelector('#bytag');
var nombre = document.querySelector('#byname');
var preciomin = document.querySelector('#minprice');
var preciomax = document.querySelector('#maxprice');
var pricebutton = document.querySelector('button');
var prev = document.querySelector('li.prev');
var next = document.querySelector('li.next');

var tipourl = '';
var tagsurl = '';
var nameurl = '';
var priceurl = '';
var limiturl = '';
var skipurl = '';
var pagskip = 0;
var booleanopt = false;
var booleanprice = false;
var booleantag = false;
var skipcount = 0;



function typeChange() {   
    var vtipo = tipo.options[tipo.selectedIndex].value;

    if (vtipo == 0) {
        tipourl = '';
    } else if (vtipo == 1) {
        tipourl = 'venta=true';
    } else if (vtipo == 2) {
        tipourl = 'venta=false';
    }

    console.log(url);
    url = "http://localhost:3000/api/anuncios?";
    getData();
}


function tagChange() {
    var vtag = etiqueta.options[etiqueta.selectedIndex].value;

    if (booleantag !== false) {
        url = "http://localhost:3000/api/anuncios?";
        booleantag = false;  
    }

    if (vtag == 0) {
        tagsurl = '';
    } else if (vtag == 1) {
        tagsurl = 'tags=lifestyle';
    } else if (vtag == 2) {
        tagsurl = 'tags=mobile';
    } else if (vtag == 3) {
        tagsurl = 'tags=work';
    } else if (vtag == 4) {
        tagsurl = 'tags=motor';
    }  

    getData();
    booleantag = true;
}

function nameChange() {
    console.log(nombre.value);

    if (booleanopt !== false) {
        url = "http://localhost:3000/api/anuncios?";
        booleanopt = false;  
    }

    nameurl = 'name=' + nombre.value;    
    getData();
    booleanopt = true;
}

function priceChange() {

    if (booleanprice !== false) {
        url = "http://localhost:3000/api/anuncios?";
        contador = false;  
    }

    priceurl = 'precio=' + preciomin.value + '-' + preciomax.value;
    getData();
    booleanprice = true;
}

function nextPagination() {
    pagskip = skipcount + 6;
    skipurl = 'skip=' + pagskip.toString();
    skipcount += 6;
    url = "http://localhost:3000/api/anuncios?";
    getData();
}

function prevPagination() {
    pagskip = skipcount - 6;
    skipurl = 'skip=' + pagskip.toString();
    skipcount -= 6;
    url = "http://localhost:3000/api/anuncios?";
    getData();
}

tipo.addEventListener('change', typeChange);
etiqueta.addEventListener('change', tagChange);
nombre.addEventListener('change', nameChange);
window.addEventListener('load', getData);
pricebutton.addEventListener('click', priceChange);
prev.addEventListener('click', prevPagination);
next.addEventListener('click', nextPagination);


function getData() {
    var and1 = '';
    var and2 = '';
    var and3 = '';
    var and4 = '';
    var and5 = '';

    if (tipourl !== '') {
        and1 = '&';
    } 
    
    if (tagsurl !== '') {
        and2 = '&';
    } 
    
    if (nameurl !== '') {
        and3 = '&';
    } 
    
    if (priceurl !== '') {
        and4 = '&';
    }

    if (skipurl !== '') {
        and5 = '&';
    }

    url = url + 'limit=6&' + tipourl + and1 + tagsurl + and2 + nameurl + and3 + priceurl + and4 + skipurl + and5;
    console.log(url);
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var response = JSON.parse(xhr.response);
            var children = "";
            var container = document.querySelector('.ads-container');
            
            for (var i in response.result) {

                var ad = response.result[i];

                var tags = '';
                if (Object.entries(ad)[0][1].length === 1) {
                    tags = Object.entries(ad)[0][1][0];
                }   else {
                    tags = Object.entries(ad)[0][1][0] + ', ' + Object.entries(ad)[0][1][1];
                }

                var _id = Object.entries(ad)[1][1];
                var name = Object.entries(ad)[2][1];
                var type = '';
                var typeclass = '';
                
                if (Object.entries(ad)[3][1] === true) {
                    type = '¿Quieres adquirirlo?';
                    typeclass = 'sell';
                } else {
                    type = '¿Vendes el tuyo?'
                    typeclass = 'buy';
                }

                var precio = Object.entries(ad)[4][1];
                var foto = Object.entries(ad)[5][1];

                children += '<div class="block ' + typeclass + '"> <h2 class="title">' + name + '</h2><div class="content"><img src=' + foto + ' alt=' + name + ' width="304"></div><ul class="features"><li>' + precio.toLocaleString('de-DE') + ' €</li><li>' + tags + '</li></ul><div class="pt-footer"><p>' + type + '</p></div></div>';           
                container.innerHTML = children;  
            }            

        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.log("ha existido un error");
        }
    };

    xhr.send ();
}

/*
* BACK LATER - AJAX POST REQ
*
var nameinput = document.getElementById('nameinput');
var ventainput = document.getElementById('ventainput');
var numberinput = document.getElementById('numberinput');
var fileinput = document.getElementById('fileinput');
var taginput = document.getElementById('taginput');
var submitinput = document.getElementById('submitinput');

var data = {};

submitinput.addEventListener('click', getDataObject);

function getDataObject() {
    if (ventainput.value == 0) {
        ventainput = true;
    } else {
        ventainput = false;
    }

    data = {
        name: nameinput.value,
        venta: ventainput,
        precio: numberinput.value,
        foto: fileinput.value,
        tags: taginput.value
    }
}

function createData(data) {
    xhr.open("POST", "http://localhost:3000/api/anuncios", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log('ok');
        } else if (xhr.readyState === 4 && xhr.status !== 201) {
            console.log("ha existido un error");
        }
    };

    xhr.send(JSON.stringify(data));
}
*/

/*HTML PARTS*/

/*

    <form method="POST" class="form hide">
      <input type="text" name="name" id="nameinput" placeholder="Nombre del producto" required>
      <p>Selecciona una opción:</p>
      <select name="venta" id="ventainput">
        <option value="0">Vender</option>
        <option value="1">Comprar</option>
      </select>
      <input type="number" name="precio" id="precioinput" placeholder="Precio" required>
      <p>Sube una imagen:</p>
      <input type="file" id="fileinput" />
      <input type="text" name="tag" id="taginput" placeholder="Etiquetas" required>
      <input type="submit" id="submitinput" value="Enviar">
    </form>

*/