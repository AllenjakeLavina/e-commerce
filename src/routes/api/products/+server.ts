import fs from 'fs';
import path from 'path';
import type { RequestHandler } from '@sveltejs/kit';

interface Product {
  name: string;
  price: number;
  imagePath: string;
}

// POST handler for adding a product
export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name')?.toString();
    const price = formData.get('price')?.toString();
    const image = formData.get('image') as File;

    if (!name || !price || !image) {
      return new Response(
        JSON.stringify({ error: 'All fields are required, including a valid image.' }),
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const imagePath = path.join(uploadsDir, image.name);
    const imageBuffer = await image.arrayBuffer();
    fs.writeFileSync(imagePath, Buffer.from(imageBuffer));

    const productsPath = path.join(process.cwd(), 'products.json');
    const products: Product[] = fs.existsSync(productsPath)
      ? JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
      : [];

    products.push({ name, price: parseFloat(price), imagePath });

    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

    return new Response(
      JSON.stringify({ message: 'Product added successfully!' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while adding the product.' }),
      { status: 500 }
    );
  }
};

// GET handler for fetching all products
export const GET: RequestHandler = async () => {
  try {
    const productsPath = path.join(process.cwd(), 'products.json');
    const products: Product[] = fs.existsSync(productsPath)
      ? JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
      : [];

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch products.' }),
      { status: 500 }
    );
  }
};
