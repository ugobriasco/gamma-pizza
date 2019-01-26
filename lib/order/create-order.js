/*
* Create an order given the payoad
*
*/

// Internal Dependancies
const _data = require("../data");

const createOrder = payload => {
  // Get user and items from payload
  const { user, items } = payload;
  // Get timestamp
  const now = new Date();

  // Set orderID based on timestamp
  const orderID = new Date(now).toISOString();

  console.log(user);

  // Build order object
  const newOrder = {
    orderID,
    items,
    created_at: now,
    email: user.email,
    deliveryAddress: user.address,
    status: "NEW"
  };

  // Save the newly created order
  return _data.pCreate("orders", orderID, newOrder).then(() => newOrder);
};

module.exports = createOrder;