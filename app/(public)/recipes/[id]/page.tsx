import NotFoundRecipe from '@/components/recipes/NotFoundRecipe/NotFoundRecipe';

async function getRecipe(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    return <NotFoundRecipe />;
  }

  return <main className="page">{JSON.stringify(recipe)}</main>;
}