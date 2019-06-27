// const quantityInput = '.js-quantity';
// const maxQuantity = 5;

const quantityInput = ['js-quantity', 'js-quantity-x'];
const maxQuantity = [5, 8];

function increaseQuantity(targetClass,i) {
  let oldQuantity = parseInt(targetClass.siblings('.' + quantityInput[i]).val());
  if (oldQuantity < parseInt(maxQuantity[i])) {
    targetClass.siblings('.' + quantityInput[i]).val(oldQuantity + 1);
  } else {
    alert('The maximum of products per basket is ' + maxQuantity[i]);
  }
};

function decreaseQuantity(targetClass) {
  let oldQuantity = parseInt(targetClass.siblings(quantityInput).val());
  if (oldQuantity > 1) {
    targetClass.siblings(quantityInput).val(oldQuantity - 1);
  } else {
    alert('This would delete the product');
  }
};

function handler($this) {
  let targetClass = $($this.target);

  if (targetClass.hasClass('js-increaseValue')) {
    for (let i = 0; i < quantityInput.length; i++ ) {
      if ($(targetClass.siblings(quantityInput)).hasClass(String(quantityInput[i]))) {
        increaseQuantity(targetClass,i);
        console.log('Current product quantity is ' + targetClass.siblings('.' + quantityInput[i]).val());
        break;
      }
    }
  } else if (targetClass.hasClass('js-decreaseValue')) {
    decreaseQuantity(targetClass);
    console.log('Current product quantity is ' + targetClass.siblings(quantityInput).val());
  }
  else {
    for (let i = 0; i < quantityInput.length; i++ ) {
      if ($(targetClass).hasClass(String(quantityInput[i]))) {
        if (parseInt(targetClass.val()) > maxQuantity[i]) {
          alert('The maximum of products per basket is ' + maxQuantity[i]);
          targetClass.val(maxQuantity[i]);
        } else if (parseInt(targetClass.val()) < 1) {
          alert('Your basket must contain at least 1 item');
          targetClass.val(1);
        }
        break;
      }
    };
    console.log('Current product quantity is ' + targetClass.val());
  }
}

$('body').on('click', handler);

// verze ktera odchytava behem psani s debounce

// const debounceEvent = (callback, time = 250, interval) =>
//   (...args) => {
//     clearTimeout(interval);
//     interval = setTimeout(() => {
//       interval = null;
//       callback(...args);
//     }, time);
//   };
//
// $('body').on('input', debounceEvent(function($this) {
//   let targetClass = $($this.target);
//   for (let i = 0; i < quantityInput.length; i++ ) {
//     if ($(targetClass).hasClass(String(quantityInput[i]))) {
//       if (parseInt(targetClass.val()) > maxQuantity[i]) {
//         alert('The maximum of products per basket is ' + maxQuantity[i]);
//         targetClass.val(maxQuantity[i]);
//       } else if (parseInt(targetClass.val()) < 1) {
//         alert('Your basket must contain at least 1 item');
//         targetClass.val(1);
//       }
//       break;
//     }
//   };
//   console.log('Current product quantity is ' + targetClass.val());
// }, 300));
