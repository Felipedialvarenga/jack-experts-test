import { XMarkIcon } from "@heroicons/react/24/outline";
import { iTask } from "../../interfaces";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  task: iTask | null;
  closeModal: () => void;
  type: "edit" | "create";
  onModalAction: (taskData: Partial<iTask>) => void;
};

export default function FormModal({ task, closeModal, type, onModalAction }: Props) {

  const { register, handleSubmit, setValue } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if(task){
      onModalAction({...data, id: task.id})
    } else {
      onModalAction(data)
    }
  };

  useEffect(() => {
    if(task){
      setValue('title', task.title);
      setValue('description', task.description);
    }
  },[setValue,task])

  return (
    <>
      <div className="p-4 w-full max-w-2xl max-h-full mx-auto mt-[10%]">
        <div className="rounded-lg shadow bg-zinc-700">
          <div className="flex flex-1 items-center justify-between p-4 md:p-5 border-b rounded-t border-zinc-600">
            <h3 className="text-xl font-semibold text-white">
              {type === "create" ? "Criar Tarefa" : "Editar Tarefa"}
            </h3>
            <button
              onClick={closeModal}
              className="text-zinc-400 bg-transparent hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4 md:p-5 space-y-4">
              <input
                {...register("title")}
                id="title"
                name="title"
                type="text"
                placeholder="Título"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
              <input
                {...register("description")}
                id="description"
                name="description"
                type="text"
                placeholder="Descrição"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-zinc-600 rounded-b">
              <button
                type="submit"
                className="font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-800"
              >
                Confirmar
              </button>
              <button
                onClick={closeModal}
                className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border focus:ring-zinc-700 bg-zinc-800 text-zinc-400 border-zinc-600 hover:text-white dark:hover:bg-zinc-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
