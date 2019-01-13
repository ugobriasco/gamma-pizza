const { listPizza, queryPizza } = require("./query-pizza");

const pizza = {};

// GET a pizza
// Required data none
// Optional data name, id
pizza.get = (req, res) => {
  // Destructuring query parameters
  const { id, name } = req.params;

  // If query parameters are included then get the related pizza
  if (id || name) {
    res({
      statusCode: 200,
      data: {
        message: "Some pizza",
        pizza: queryPizza({ id, name })
      }
    });
  } else {
    // If no parameter is defined, return all the pizza in store
    res({
      statusCode: 200,
      data: { message: "All pizza", pizza: listPizza() }
    });
  }
};

module.exports = pizza;
