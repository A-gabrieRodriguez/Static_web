let array_producto = [];
window.onload = () => {
    main();
  }
  const main = () => {
    const productos_Form = document.querySelector("#product-form");
    
    productos_Form.addEventListener("submit",(event) => {
        event.preventDefault();
        console.log("Entro en el principal");
        const formdata = new FormData(productos_Form);
        const productos = {
            nombre: formdata.get("form-producto"),
            precio: formdata.get("form-precio"),
            cantidad: formdata.get("form-cantidad"),
            marca: formdata.get("form-marca"),
            descripcion: formdata.get("form-descripcion")
        }
        //console.log("valor: ",{productos:productos.nombre});
        add_productos(productos.nombre,productos.precio,productos.cantidad,productos.marca,productos.descripcion);
        productos_Form.reset();
        
    })
    ///////////////////////////////////////////////////////////////////
    ///Buscador
    /*
    const buscador_Form = document.querySelector("#form-buscador");
    buscador_Form.addEventListener("submit",(event) => {
      event.preventDefault();
      console.log("Entro en el buscador");
    })
    */
  }

  const add_productos = (Nombre,Precio,Cantidad,Marca,Descripcion)=>{
      const producto_push = {
          producto : Nombre,
          precio : Precio,
          marca : Marca,
          cantidad : Cantidad,
          descripcion : Descripcion,
          id : `${Nombre}_${new Date().getTime()}`
      }
      array_producto.push(producto_push);
      ///console.log("Valor: ", array_producto);
      renderArrayProductos();
  }

  const renderArrayProductos = () =>{
    const container_To_Print = document.querySelector(".contenedor-productos");
    const element_productos = array_producto.map((array) => {
        return `
        <div class="item">
        <img src="img/imagen.png">
        <h2>${array.producto}</h2>
        <a>$${array.precio}</a>
        <p>${array.descripcion}</p>
        <button class="btn-eliminar" onclick="Eliminar_producto('${array.id}')" >Eliminar</button>
    </div>
        `;
      });
    
      container_To_Print.innerHTML = element_productos.join("\n");
    }  
///////////////////////////////////////////////////////////////////
////Buscador
const formulario = document.querySelector('#input_buscar');
//const boton = document.querySelector('#boton1');
const resultado = document.querySelector('.contenedor-productos');


const filtrar = ()=>{
  console.log(formulario.value);

  resultado.innerHTML = '';

  const texto = formulario.value.toLowerCase();
  for(let producto of array_producto){
      let nombre = producto.producto.toLowerCase();
      console.log("Buscador valor: ",array_producto.producto);
      if(nombre.indexOf(texto) !== -1){
          resultado.innerHTML +=`
          <div class="item">
          <img src="img/imagen.png">
          <h2>${producto.producto}</h2>
          <a>$${producto.precio}</a>
          <p>${producto.descripcion}</p>
          <button class="btn-eliminar" onclick="Eliminar_producto('${producto.id}')" >Eliminar</button>
      </div>
          `
      }
  }

  if(resultado.innerHTML === ''){
      resultado.innerHTML += `
 
      `

  }
}

//boton.addEventListener('click', filtrar)
formulario.addEventListener('keyup', filtrar)

filtrar();

//////////////////////////////////////////////////////////////
///boton eliminar
const Eliminar_producto = (Element_id) =>{
    const indice_producto = array_producto.findIndex(producto => producto.id==Element_id); /////Consultando si existe el ID y me debuelve el indice del areglo
    if(indice_producto == -1){
      console.log("No se encontro usuario");
      return ;
    }else{
      console.log("Indice: ",Element_id);
      array_producto.splice(indice_producto,1);
      renderArrayProductos();
    }
}

  