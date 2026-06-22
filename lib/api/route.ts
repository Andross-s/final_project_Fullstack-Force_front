import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const newRecipe = {
      _id: Date.now().toString(),
      name: formData.get('name'),
      descr: formData.get('descr'),
      cookingTime: formData.get('cookingTime'),
      category: formData.get('category'),
      instruction: formData.get('instruction'),
      cals: formData.get('cals'),
      ingredients: formData.get('ingredients'),
      recipeImg: formData.get('recipeImg'),
    };

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('POST /api/recipes error:', error);

    return NextResponse.json(
      { message: 'Failed to create recipe' },
      { status: 500 }
    );
  }
}