import { XMarkIcon } from "@heroicons/react/24/outline";
import { iTask } from "../../interfaces";

type Props = {
  task: iTask | null;
  closeModal: () => void;
};

export default function DetailsModal({ task, closeModal }: Props) {
  return (
    <>
      <div className="p-4 w-full max-w-2xl max-h-full mx-auto mt-[10%]">
        <div className="rounded-lg shadow bg-zinc-700">
          <div className={`flex flex-1 items-center justify-between p-4 md:p-5  rounded-t border-b ${task?.completed ? 'border-emerald-500' : 'border-zinc-600'}`}>
            <h3 className="text-xl font-semibold text-white">{task?.title}</h3>
            <button
              onClick={closeModal}
              className="text-zinc-400 bg-transparent hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-zinc-400 ">
              {task?.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
