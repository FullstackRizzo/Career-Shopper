
const CART_KEY = "cart";

export const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cartData));
};

export const getCartFromLocalStorage = () => {
  const cartData = localStorage.getItem(CART_KEY);
  if (cartData) {
    return JSON.parse(cartData);
  } else {
    return null;
  }
};
