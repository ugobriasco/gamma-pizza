/*
* Create an order given the payoad
*
*/

// Internal Dependancies
const _data = require("../data");

// Main function
const createOrder = payload => {
  // Get user and items from payload
  const { user, items, transactionID } = payload;
  // Get timestamp
  const now = new Date();

  // Set orderID based on timestamp
  const orderID = now.getTime();

  // Build order object
  const newOrder = {
    orderID,
    transactionID,
    items,
    created_at: now,
    email: user.email,
    deliveryAddress: user.address,
    status: "NEW"
  };

  // Save the newly created order
  return _data.pCreate("orders", orderID, newOrder).then(() => newOrder);
};

// Export create order
module.exports = createOrder;
