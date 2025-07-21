const botonesAgregar = document.querySelectorAll('.item button');
const carritoLista = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');
const formPedido = document.getElementById('form-pedido');
let carrito = [];

botonesAgregar.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const nombre = item.getAttribute('data-nombre');
        const precio = parseInt(item.getAttribute('data-precio'));
        const input = item.querySelector('input[type="number"]');
        const cantidad = input ? parseInt(input.value) : 1;

        const existente = carrito.find(prod => prod.nombre === nombre);
        if (existente) {
            existente.cantidad += cantidad;
        } else {
            carrito.push({ nombre, precio, cantidad });
        }

        actualizarCarrito();
    });
});

function actualizarCarrito() {
    carritoLista.innerHTML = '';
    let total = 0;
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}`;
        carritoLista.appendChild(li);
        total += producto.precio * producto.cantidad;
    });
    totalSpan.textContent = total;
}

function mostrarFormulario() {
    document.getElementById('formulario').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}

formPedido.addEventListener('submit', e => {
    e.preventDefault();
    alert('¡Pedido confirmado! Gracias por tu compra.');
    formPedido.reset();
    carrito = [];
    actualizarCarrito();
    document.getElementById('formulario').style.display = 'none';
});
