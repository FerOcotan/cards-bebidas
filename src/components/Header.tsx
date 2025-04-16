import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    });

    const { pathname } = useLocation();
    const isHome = useMemo(() => pathname === '/', [pathname]);

    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const categories = useAppStore((state) => state.categories);
    const searchRecipes = useAppStore((state) => state.searchRecipes);
    const showNotification = useAppStore((state) => state.showNotification);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        searchRecipes(searchFilters);
    };

    return (
        <header className={isHome ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'}>
            <div className={`mx-auto container px-5 py-10 ${isHome ? 'md:py-16' : ''}`}>
                <div className="flex justify-between items-center">
                    <img
                        className="w-32 cursor-pointer"
                        src="/logo.svg"
                        alt="logotipo"
                        onClick={() => (window.location.href = '/')}
                    />

                    <nav className="flex gap-6">
                        {['/', '/favoritos'].map((path) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `${isActive ? 'text-orange-500' : 'text-white'} transition-colors duration-300 uppercase font-bold`
                                }
                            >
                                {path === '/' ? 'Inicio' : 'Favoritos'}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {isHome && (
                    <form
                        className="md:w-2/3 lg:w-1/2 2xl:w-1/3 bg-orange-400/90 backdrop-blur-sm mt-20 p-10 rounded-xl shadow-xl space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="ingredient" className="block text-white uppercase font-bold text-lg mb-2">
                                Nombre o Ingredientes
                            </label>
                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                                placeholder="Ej. Vodka, Tequila, Café"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-white uppercase font-bold text-lg mb-2">
                                Categoría
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map((category) => (
                                    <option key={category.strCategory} value={category.strCategory}>
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Buscar Recetas"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-bold w-full p-3 rounded-md uppercase transition-colors duration-300"
                        />
                    </form>
                )}
            </div>
        </header>
    );
}
