# Gamma Pizza

[![code style: prettier](https://camo.githubusercontent.com/687a8ae8d15f9409617d2cc5a30292a884f6813a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d70726574746965722d6666363962342e7376673f7374796c653d666c61742d737175617265)](https://github.com/prettier/prettier)

## Intro

This is a pure Node V8 REST API which prototypes a pizza-delivery-eCommerce service.

## Framework

- [Node](https://nodejs.org/dist/latest-v8.x/docs/api/index.html)
- [Stipe API](https://stripe.com/docs/api)
- [Mailgun API](https://documentation.mailgun.com/)

## Usage

Please refer to the [API documentation](https://documenter.getpostman.com/view/549644/RztitVWC#eac781e0-3891-4e73-8c75-bc1ff5b722e6)

## Development

Gamma Pizza is DB-free service, meaning that all the data is saved to file system. Keep it in mind before to deploy this applicatio to a productive environment.

### Prerequisites

- [node v8](https://nodejs.org/dist/latest-v8.x/docs/api/index.html) or higher
- [openssl](https://www.openssl.org/) (for https communication only)

### Setup

```bash
git clone git@github.com:ugobriasco/gamma-pizza && cd gamma-pizza
cp ./lib/config.js.template ./lib/config.js

# Edit configurations adding stripe and mailgun credentials
vim ./lib/config.js

# App setup
bash ./scripts/init.js
```

There are several way to start the application, here some of them:

```bash
# Start the application setting the environment (default stage)
NODE_ENV=production node .
NODE_ENV=stage node .

# Start the application with debugging options set
NODE_DEBUG=server NODE_ENV=stage node .

# Quickstart (runs the setup and starts the app on Stage with debug option enabled)
bash ./scripts/start.sh
```

Access the REST API via:

```bash
http://localhost:3000
https://localhost:3001
```

### Test

tbd.

## Release Notes

### Γ🍕 v0.0.0

1. New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address.
2. Users can log in and log out by creating or destroying a token.
3. When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system).
4. A logged-in user should be able to fill a shopping cart with menu items,
5. A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.com to accept their payment.
6. When an order is placed, you should email the user a receipt. You should integrate with the sandbox of Mailgun.com for this.

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## License

[MIT](https://github.com/ugobriasco/gamma-pizza/blob/master/LICENSE.md)
