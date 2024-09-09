// const taskTest = {
//     "completed": false,
//     "id": 1,
//     "title": "Primeira Task",
//     "description": "minha primeira task",
//     "userId": null
// }

import {
  CheckIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { iTask } from "../interfaces";
import { ModalTypes } from "./TaskModal";

type Props = {
  taskData: iTask;
  selectTask: (taskData: iTask) => void;
  selectModalType: (modalType: ModalTypes) => void;
};

export default function Task({ taskData, selectTask, selectModalType }: Props) {
  const onSelectAction = (typeSelected: ModalTypes) => {
    selectModalType(typeSelected);
    selectTask(taskData);
  };

  return (
    <div className="px-3 py-3 flex items-center">
      {/* Marcador de conclusão de tarefa */}
      {taskData.completed && (
        <div
          onClick={() => onSelectAction("complete")}
          className="transition-all rounded-md size-6 border-solid border-2 border-emerald-500 hover:cursor-pointer flex items-center justify-center "
        >
          <CheckIcon className="size-5 text-emerald-500 " />
        </div>
      )}
      {/* Marcador de conclusão de tarefa */}
      {!taskData.completed && (
        <div
          onClick={() => onSelectAction("complete")}
          className="transition-all rounded-md size-6 border-solid border-2 border-zinc-600 hover:border-emerald-500 hover:cursor-pointer flex items-center justify-center group"
        >
          <CheckIcon className="size-5 text-emerald-500/0 group-hover:text-emerald-500" />
        </div>
      )}

      <p className="text-lg ml-3 mr-auto truncate">{taskData.title}</p>
      <div className="flex">
      <EyeIcon
        onClick={() => onSelectAction("see")}
        className="task-icon ml-3 mr-3 hover:text-emerald-500"
      />
      <PencilSquareIcon
        onClick={() => onSelectAction("edit")}
        className="task-icon mr-3 hover:text-sky-500"
      />
      <TrashIcon
        onClick={() => onSelectAction("delete")}
        className="task-icon hover:text-red-500 "
      />
      </div>
    </div>
  );
}
