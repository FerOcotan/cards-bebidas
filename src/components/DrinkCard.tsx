import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
            <div className="overflow-hidden">
                <img 
                    src={drink.strDrinkThumb} 
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-110 hover:rotate-1 transition-transform duration-500 w-full h-64 object-cover"
                />
            </div>

            <div className="p-5">
                <h2 className="text-2xl font-extrabold text-gray-800 truncate">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 mt-5 w-full py-3 rounded-xl font-bold text-white text-lg transition-colors duration-300"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    Ver Receta
                </button>
            </div>
        </div>
    )
}
