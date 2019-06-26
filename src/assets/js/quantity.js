const quantityInput = '.js-quantity';
const maxQuantity = 5;

console.log('Current product quantity is ' + $(quantityInput).val());

function increaseQuantity(targetClass) {
  let oldQuantity = parseInt(targetClass.siblings(quantityInput).val());
  if (oldQuantity < parseInt(maxQuantity)) {
    targetClass.siblings(quantityInput).val(oldQuantity + 1);
  } else {
    alert('The maximum of products per basket is ' + maxQuantity);
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
    increaseQuantity(targetClass);
    console.log('Current product quantity is ' + targetClass.siblings(quantityInput).val());
  } else if (targetClass.hasClass('js-decreaseValue')) {
    decreaseQuantity(targetClass);
    console.log('Current product quantity is ' + targetClass.siblings(quantityInput).val());
  } else if (targetClass.hasClass($(quantityInput).attr('class'))) {
    if (parseInt(targetClass.val()) > 5) {
      alert('The maximum of products per basket is ' + maxQuantity);
      targetClass.val(maxQuantity);
    } else if (parseInt(targetClass.val()) < 1) {
      alert('Your basket must contain at least 1 item');
      targetClass.val(1);
    }
    console.log('Current product quantity is ' + targetClass.val());
  }

}

$('body').on('click change', handler);

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
// $('body').on('input', $(quantityInput), debounceEvent(function($this) {
//   let targetClass = $($this.target);
//   console.log('input ' + targetClass.val());
//   if (parseInt(targetClass.val()) > 5) {
//     alert('The maximum of products per basket is ' + maxQuantity);
//     targetClass.val(maxQuantity);
//   } else if (parseInt(targetClass.val()) < 1) {
//     alert('Your basket must contain at least 1 item');
//     targetClass.val(1);
//   }
// }, 300));
