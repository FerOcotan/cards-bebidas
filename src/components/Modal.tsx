import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
 
export default function Modal() {

  useAppStore((state) => state.modal)
  const modal = useAppStore((state) => state.modal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);

  const renderIngredients = () => {
    const ingredients = Object.entries(selectedRecipe).filter(([key, value]) => {
      return key.startsWith('strIngredient') && value !== '' && value !== null;
    });
    return ingredients.map(([key, value]) => (
      <li key={key} className="text-gray-500 text-lg font-normal">
        {value} - {selectedRecipe[`strMeasure${key.slice(13)}` as keyof typeof selectedRecipe]}
      </li>
    ));
  }

  const closeModal = useAppStore((state) => state.closeModal)
  return (
    <>
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
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <DialogTitle as="h3" className="text-gray-300 text-4xl font-extrabold my-5 text-center">
                      {selectedRecipe.strDrink}
                  </DialogTitle>
                  <img src={selectedRecipe.strDrinkThumb} 
                   alt={`Imagen de ${selectedRecipe.strDrink}`}
                    className='mx-auto mb-5 rounded-lg shadow-lg'
                  />
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes
                    <p>
                      {renderIngredients()}
                    </p>
                  </DialogTitle>
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    <p className='text-gray-500 text-lg font-normal'>

                      {selectedRecipe.strInstructions}

                    </p>
                  </DialogTitle>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}