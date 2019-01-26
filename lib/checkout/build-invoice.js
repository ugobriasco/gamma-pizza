/*
* Build a simple receipt to be sent via email
*
*/

// Renders one item of the processed order, including quantity, name and price
const renderItem = item =>
  `x${item.qty || "1"} ${item.name} - ${item.price}€\n`;

// List items for INVOICE
const listItems = items => {
  let list = "";
  items.forEach(item => (list += renderItem(item)));
  return list;
};

// Main function
const buildInvoice = data => {
  const { order, payment } = data;
  // Pick the keys required by invoicing
  const { orderID, items } = order;
  const { amount } = payment;

  // header
  const heading = `Dear customer,\nThank you for your purchase. Your pizza will be ready soon`;

  // Invoice body
  const invoice = `Invoice number ${orderID}\n\n${listItems(
    items
  )}\n Total: ${amount}€`;

  // Compose receipt body
  return `${heading}\n\n${invoice}`;
};

module.exports = buildInvoice;
