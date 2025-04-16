import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {
  const drinks = useAppStore((state) => state.drinks)
  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks])

  return (
    <>
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mt-10 text-gray-600">
        Recetas
      </h1>

      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 my-14 px-5">
          {drinks.drinks.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <p className="my-20 text-center text-2xl text-gray-600 max-w-xl mx-auto">
          No hay resultados aún. Utiliza el formulario para buscar recetas según el ingrediente o categoría.
        </p>
      )}
    </>
  )
}
