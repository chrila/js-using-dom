/******************************************************************************
 * create_form.js
 * 
 * Desafío: Introducción a JavaScript - Sesión 2 - Usando DOM
 * Fecha: 2021-03-03
 * Alumno: Christian Lampl
 * 
 *****************************************************************************/

function createNode(tag, clases, text=undefined) {
  var node  = document.createElement(tag);  
  if (text != undefined) {
    var textTag  = document.createTextNode(text);    
    node.appendChild(textTag);        
  }  
  if (clases != undefined) {
    node.className = clases
  }    
  return node  
}

function header() {
  var div = createNode('div', 'py-5 text-center');
  var img = document.createElement('img');
  var img = createNode('img', 'd-block mx-auto mb-4');
  img.src = 'assets/img/bootstrap-solid.svg';
  img.width = 72;
  img.height = 72;
  div.appendChild(img);

  var h2 = createNode('h2', undefined, 'Checkout form');
  div.appendChild(h2);

  var p = createNode('p', 'lead', 'Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.');
  div.appendChild(p);

  return div;
}

function cartItem(name, description, price, promo=false) {
  var li = document.createElement('li');
  var div = document.createElement('div');
  
  var h6 = createNode('h6', 'my-0', name);
  var small = createNode('small', undefined, description);
  var span = createNode('span', undefined, price);

  if (promo) {
    div.className = 'text-success';
    span.className = 'text-success';
    li.className = 'list-group-item d-flex justify-content-between bg-light';
  }
  else {
    small.className = 'text-muted';
    span.className = 'text-muted';
    li.className = 'list-group-item d-flex justify-content-between lh-condensed';
  }

  div.appendChild(h6);
  div.appendChild(small);
  li.appendChild(div);
  li.appendChild(span);

  return li;
}

function promoCode() {
  var form = createNode('form', 'card p-2');
  var div = createNode('div', 'input-group');
  form.appendChild(div);

  var input = createNode('input', 'form-control');
  input.type = 'text';
  input.placeholder = 'Promo code';
  div.appendChild(input);

  var divButton = createNode('div', 'input-group-append');
  var button = createNode('button', 'btn btn-secondary', 'Redeem');
  button.type = 'submit';
  divButton.appendChild(button);
  div.appendChild(divButton);

  return form;            
}

function cart() {
  var container = createNode('div', 'col-md-4 order-md-2 mb-4');
  var h4 = createNode('h4', 'd-flex justify-content-between align-items-center mb-3');
  var span = createNode('span', 'text-muted', 'Your cart');
  h4.appendChild(span);
  
  span = createNode('span', 'badge badge-secondary badge-pill', '3');
  h4.appendChild(span);
  container.appendChild(h4);

  var ul = createNode('ul', 'list-group mb-3');
  ul.appendChild(cartItem('Product name', 'Brief description', '$12'));
  ul.appendChild(cartItem('Second Product', 'Brief description', '$8'));
  ul.appendChild(cartItem('Third item', 'Brief description', '$5'));
  ul.appendChild(cartItem('Promo code', 'EXAMPLECODE', '-$5', true));

  var total = createNode('li', 'list-group-item d-flex justify-content-between');
  var totalSpan = createNode('span', undefined, 'Total (USD)');
  var totalPrice = createNode('strong', undefined, '$20');
  total.appendChild(totalSpan);
  total.appendChild(totalPrice);
  ul.appendChild(total);

  container.appendChild(ul);
  container.appendChild(promoCode());
  return container;
}

function footerLink(text) {
  var li = createNode('li', 'list-inline-item');
  var a = createNode('a', undefined, text);
  a.href = '#';
  li.appendChild(a);

  return li;
}

function footer() {
  var footer = createNode('footer', 'my-5 pt-5 text-muted text-center text-small');
  var p = createNode('p', 'mb-1', '2017-2019 Company Name');
  footer.appendChild(p);

  var ul = createNode('ul', 'list-inline');
  ul.appendChild(footerLink('Privacy'));
  ul.appendChild(footerLink('Terms'));
  ul.appendChild(footerLink('Support'));
  footer.appendChild(ul);
  
  return footer;
}

function appendLabeledInput(parent, id, name, placeholder, invalidText, required=false, smallText=undefined) {
  var label = createNode('label', undefined, name);
  label.htmlFor = id;

  if (!required) {
    var span = createNode('span', 'text-muted', ' (Optional)');
    label.appendChild(span);
  }

  parent.appendChild(label);

  var input = createNode('input', 'form-control');
  input.type = 'text';
  input.id = id;
  input.placeholder = placeholder;
  input.required = required;
  parent.appendChild(input);

  if (smallText && smallText.length > 0) {
    parent.appendChild(createNode('small', 'text-muted', smallText));
  }

  if (invalidText && invalidText.length > 0) {
    var div = createNode('div', 'invalid-feedback', invalidText);
    parent.appendChild(div);
  }
}

function appendLabeledSelect(parent, id, name, placeholder, invalidText, options) {
  var label = createNode('label', undefined, name);
  label.htmlFor = id;
  parent.appendChild(label);

  var select = createNode('select', 'custom-select d-block w-100');
  select.required = true;
  var option = createNode('option', undefined, placeholder);
  option.value = '';
  select.appendChild(option);
  parent.appendChild(select);

  options.forEach(o => {
    select.appendChild(createNode('option', undefined, o))
  });

  if (invalidText && invalidText.length > 0) {
    var div = createNode('div', 'invalid-feedback', invalidText);
    parent.appendChild(div);
  }
}

function countryStateZip() {
  var row = createNode('div', 'row');
  
  var col1 = createNode('div', 'col-md-5 mb-3');
  appendLabeledSelect(col1, 'country', 'Country', 'Choose...', 'Please select a valid country.', ['United States']);
  row.appendChild(col1);

  var col2 = createNode('div', 'col-md-4 mb-3');
  appendLabeledSelect(col2, 'state', 'State', 'Choose...', 'Please provide a valid state.', ['California']);
  row.appendChild(col2);

  var col3 = createNode('div', 'col-md-3 mb-3');
  appendLabeledInput(col3, 'zip', 'Zip', '', 'Zip code required.', true);
  row.appendChild(col3);

  return row;
}

function nameFields() {
  var row = createNode('div', 'row');

  var containerFirstName = createNode('div', 'col-md-6 mb-3');
  appendLabeledInput(containerFirstName, 'firstName', 'First name', '', 'Valid first name is required.', true);
  row.appendChild(containerFirstName);

  var containerLastName = createNode('div', 'col-md-6 mb-3');
  appendLabeledInput(containerLastName, 'lastName', 'Last name', '', 'Valid last name is required.', true);
  row.appendChild(containerLastName);

  return row;
}

function formInputField(id, name, placeholder, invalid_text, required=false, smallText=undefined) {
  var div = createNode('div', 'mb-3');
  appendLabeledInput(div, id, name, placeholder, invalid_text, required, smallText);
  return div;
}

function userNameField() {
  var name = 'Username';
  var id = name.toLowerCase();
  
  var div = createNode('div', 'mb-3');
  
  var label = createNode('label', undefined, name);
  label.htmlFor = id;
  div.appendChild(label);

  var inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';

  var inputGroupPrepend = createNode('div', 'input-group-prepend');
  var span = createNode('span', 'input-group-text', '@');
  inputGroupPrepend.appendChild(span);
  inputGroup.appendChild(inputGroupPrepend);

  var input = createNode('input', 'form-control');
  input.type = 'text';
  input.id = id;
  input.placeholder = name;
  input.required = true;
  inputGroup.appendChild(input);

  var invalidFeedback = createNode('div', 'invalid-feedback', 'Your username is required.');
  invalidFeedback.style = 'width: 100%;';
  inputGroup.appendChild(invalidFeedback);
  
  div.appendChild(inputGroup);

  return div;
}

function labeledCheckbox(id, text) {
  var div = createNode('div', 'custom-control custom-checkbox');
  
  var input = createNode('input', 'custom-control-input');
  input.type = 'checkbox';
  input.id = id;
  div.appendChild(input);
  
  var label = createNode('label', 'custom-control-label', text);
  label.HtmlFor = id;
  div.appendChild(label);

  return div;
}

function labeledRadioButton(id, name, text, checked=false, required=false) {
  var div = createNode('div', 'custom-control custom-radio');
  
  var input = createNode('input', 'custom-control-input');
  input.id = id;
  input.type = 'radio';
  input.name = name;
  input.checked = checked;
  input.required = required;
  div.appendChild(input);

  var label = createNode('label', 'custom-control-label', text);
  label.HtmlFor = id;
  div.appendChild(label);

  return div;
}

function appendCheckboxes(parent) {
  parent.appendChild(labeledCheckbox('same-address', 'Shipping address is the same as my billing address'));
  parent.appendChild(labeledCheckbox('save-info', 'Save this information for next time'));
}

function appendPaymentOptions(parent) {
  var div = createNode('div', 'd-block my-3');
  
  div.appendChild(labeledRadioButton('credit', 'paymentMethod', 'Credit card', true, true));
  div.appendChild(labeledRadioButton('debit', 'paymentMethod', 'Debit card', false, true));
  div.appendChild(labeledRadioButton('paypal', 'paymentMethod', 'PayPal', false, true));

  parent.appendChild(div);
}

function appendCreditCardDetails(parent) {
  var row1 = createNode('div', 'row');
  var col1 = createNode('div', 'col-md-6 mb-3');
  appendLabeledInput(col1, 'cc-name', 'Name on card', '', 'Name on card is required', true, 'Full name as displayed on card');
  row1.appendChild(col1);

  var col2 = createNode('div', 'col-md-6 mb-3');
  appendLabeledInput(col2, 'cc-number', 'Credit card number', '', 'Credit card number is required', true);
  row1.appendChild(col2);

  parent.appendChild(row1);

  var row2 = createNode('div', 'row');
  var col3 = createNode('div', 'col-md-3 mb-3');
  appendLabeledInput(col3, 'cc-expiration', 'Expiration', '', 'Expiration date required', true);
  row2.appendChild(col3);

  var col4 = createNode('div', 'col-md-3 mb-3');
  appendLabeledInput(col4, 'cc-cvv', 'CVV', '', 'Security code required', true);
  row2.append(col4);

  parent.appendChild(row2);
}

function form() {
  var container = createNode('div', 'col-md-8 order-md-1');

  container.appendChild(createNode('h4', 'mb-3', 'Billing address'));

  var form = createNode('form', 'needs-validation');
  form.appendChild(nameFields());
  form.appendChild(userNameField());
  form.appendChild(formInputField('email', 'Email', 'you@example.com', 'Please enter a valid email address for shipping updates.', false))
  form.appendChild(formInputField('address', 'Address', '1234 Main St', 'Please enter your shipping address.', true));
  form.appendChild(formInputField('address2', 'Address 2', 'Apartment or suite', '', false));
  
  form.appendChild(countryStateZip());
  form.appendChild(createNode('hr', 'mb-4'));
  appendCheckboxes(form);
  form.appendChild(createNode('hr', 'mb-4'));

  form.appendChild(createNode('h4', 'mb-3', 'Payment'));
  appendPaymentOptions(form);
  appendCreditCardDetails(form);
  form.appendChild(createNode('hr', 'mb-4'));
  
  var button = createNode('button', 'btn btn-primary btn-lg btn-block', 'Continue to checkout');
  button.type = 'submit';
  form.appendChild(button);

  container.appendChild(form);

  return container;
}

// construct the page

var body = document.getElementsByTagName('body')[0];
body.className = 'bg-light';

var container = createNode('div', 'container');
body.appendChild(container);
container.appendChild(header());

var row = createNode('div', 'row');
container.appendChild(row);
row.appendChild(form());
row.appendChild(cart());
container.appendChild(footer());
