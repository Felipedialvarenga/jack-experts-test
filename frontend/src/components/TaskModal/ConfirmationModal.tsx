import { XMarkIcon } from "@heroicons/react/24/outline";
import { iTask } from "../../interfaces";

type Props = {
  task: iTask | null;
  closeModal: () => void;
  type: "delete" | "complete";
  onModalAction: (taskData: iTask) => void;
};

export default function ConfirmationModal({ task, closeModal, type, onModalAction }: Props) {

    const handleAction = () => {
      if(task){
        onModalAction(task);
      }
    }

  return (
    <>
      <div className="p-4 w-full max-w-2xl max-h-full mx-auto mt-[10%]">
        <div className="rounded-lg shadow bg-zinc-700">
          <div className="flex flex-1 items-center justify-between p-4 md:p-5 border-b rounded-t border-zinc-600">
            <h3 className="text-xl font-semibold text-white">
              {type === "complete" ? task?.completed ? "Descompletar Tarefa" : "Completar Tarefa" : ''}
              {type === 'delete' ? "Deletar Tarefa" : ''}
            </h3>
            <button
              onClick={closeModal}
              className="text-zinc-400 bg-transparent hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-zinc-400 ">
            {type === "complete" ? task?.completed ? "Descompletar " : "Completar " : ''}
            {type === 'delete' ? "Deletar " : ''}
            {task?.title + '?'}
            </p>
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-zinc-600 rounded-b">
            <button onClick={handleAction} className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-800`}>
              Confirmar
            </button>
            <button
              onClick={closeModal}
              className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border focus:ring-zinc-700 bg-zinc-800 text-zinc-400 border-zinc-600 hover:text-white hover:bg-zinc-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
