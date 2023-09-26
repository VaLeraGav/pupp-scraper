import Product from './models/product.js'

async function main() {
  try {
    await Product.create({
      name: 'Иван',
    })

  } catch (err) {
    console.error(err);
    return;
  }
}

main();
