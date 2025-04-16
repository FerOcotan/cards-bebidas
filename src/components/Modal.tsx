import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);
  const favoriteExists = useAppStore((state) => state.favoriteExists);
  const closeModal = useAppStore((state) => state.closeModal);

  const renderIngredients = () => {
    const ingredients = Object.entries(selectedRecipe).filter(([key, value]) => {
      return key.startsWith('strIngredient') && value !== '' && value !== null;
    });

    return (
      <ul className="list-disc list-inside space-y-1 mt-2">
        {ingredients.map(([key, value]) => (
          <li key={key} className="text-gray-600 text-lg">
            {value} - {selectedRecipe[`strMeasure${key.slice(13)}` as keyof typeof selectedRecipe]}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white px-6 pt-6 pb-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <h3 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
                  {selectedRecipe.strDrink}
                </h3>

                <img
                  src={selectedRecipe.strDrinkThumb}
                  alt={`Imagen de ${selectedRecipe.strDrink}`}
                  className="w-full max-h-96 object-cover rounded-xl shadow mb-6"
                />

                <div>
                  <h4 className="text-2xl font-bold text-gray-800">Ingredientes</h4>
                  {renderIngredients()}
                </div>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Instrucciones</h4>
                  <p className="text-gray-600 text-lg whitespace-pre-line">{selectedRecipe.strInstructions}</p>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition duration-300"
                  >
                    Cerrar
                  </button>

                  <button
                    onClick={() => handleClickFavorite(selectedRecipe)}
                    className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition duration-300"
                  >
                    {favoriteExists(selectedRecipe.idDrink)
                      ? 'Eliminar de Favoritos'
                      : 'Agregar a Favoritos'}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
