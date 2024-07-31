const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCount = document.getElementById("cart-count");
const adressInput = document.getElementById("adress");
const adressWarn = document.getElementById("adress-warn");

let cart = [];

// abrir o modal do carrinho
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
  updateCartModal();
});
// fecharquando clicar fora
cartModal.addEventListener("click", (even) => {
  if (even.target === cartModal) {
    cartModal.style.display = "none";
  }
});
// fechar o modal do carrinho
closeModalBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

menu.addEventListener("click", (event) => {
  //console.log(even.target)

  let parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    // adicionar no carinho


    addToCart(name, price);
  }
});

// funcao para adicionar no carrinho

const addToCart = (name, price) => {
  const existimItem = cart.find((item) => item.name === name);
  if (existimItem) {
    // se o item ja existem aumente apenas a quantidade
    existimItem.quantity += 1;
    return;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }
  updateCartModal();
};

// atualiza carrinho

const updateCartModal = () => {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("dev");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <h1>${item.name}</h1>
        <p>Qta: ${item.quantity}</p>
        <p>${item.price.toFixed(2)} KZ</p>  
      </div>

      <div>
        <button 
        class="remove-from-cart-btn bg-red-500  text-white rounded py-2 px-2"
        data-name="${item.name}"
        >
          Remover
        </button>
      </div>
    </div>
    `;

    total += item.price * item.quantity;
    cartTotal.textContent = total.toLocaleString("pt-AO", {
      style: "currency",
      currency: "AOA",
    });

    cartItemsContainer.appendChild(cartItemElement);
  });
  cartCount.innerHTML = cart.length;
};

// funcao para remover items do carrinho
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

const removeItemCart = (name) => {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }
  }
  cart.splice(index, 1);
  updateCartModal();
};


adressInput.addEventListener("input",(event)=>{
  let inputValue=event.target.value;
  if(inputValue !== ""){
    adressInput.classList.remove("border-red-500")
    adressWarn.classList.add("hidden")
  }
})
// Finalizar pedido
checkoutBtn.addEventListener("click",()=>{

  const isOpen = checkRestaurantOpen();
  if (!isOpen) {
    
    Toastify({
      text: "Ops o restaurante está fechado!",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },}).showToast()

    return;
  }

  // Enviar o pedido para api whatsapp
  const cartItems = cart.map((item)=>{
    return (`
      ${item.name} quantidade: (${item.quantity}) preço: ${item.price} Kz`)
  }).join("")

  const message=encodeURIComponent(cartItems)
  const phone="954938147"
  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${adressInput.value}`,"_blank")

  cart=[];
  updateCartModal()

  if (cart.length === 0) return;
  if(adressInput.value === ""){
    adressWarn.classList.remove("hidden")
    adressInput.classList.add("border-red-500")
    return;
  }
})

const checkRestaurantOpen=()=>{
  const data = new Date()
  const hora = data.getHours()
  return hora >=18 && hora< 22; 
  // true restaurante esta aberto
}

const spanItem = document.getElementById("data-span")

const isOpen = checkRestaurantOpen()

if (isOpen) {
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")
}else{
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-500")
}