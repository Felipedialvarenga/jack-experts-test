import { iTask } from "../../interfaces";
import DetailsModal from "./DetailsModal";
import FormModal from "./FormModal";
import ConfirmationModal from "./ConfirmationModal";

export type ModalTypes = "" | "see" | "create" | "edit" | "delete" | "complete";

type Props = {
  type: ModalTypes;
  task: iTask | null;
  closeModal: () => void;
  onCreateTask: (taskData: Partial<iTask>) => void;
  onUpdateTask: (taskData: Partial<iTask>) => void;
  onDeleteTask: (taskData: iTask) => void;
  onCompleteTask: (taskData: iTask) => void;
};

export default function Modal({ type, task, closeModal, onCreateTask, onUpdateTask, onDeleteTask, onCompleteTask }: Props) {
  return (
    <div
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500/40"
    >
      {/* Direcionamento de qual modal estará em uso */}
      {type === "see" && <DetailsModal task={task} closeModal={closeModal} />}
      {type === "create" && (
        <FormModal task={task} closeModal={closeModal} type={type} onModalAction={onCreateTask}/>
      )}
      {type === "edit" && (
        <FormModal task={task} closeModal={closeModal} type={type} onModalAction={onUpdateTask}/>
      )}
      {type === "delete" && (
        <ConfirmationModal task={task} closeModal={closeModal} type={type} onModalAction={onDeleteTask}/>
      )}
      {type === "complete" && (
        <ConfirmationModal task={task} closeModal={closeModal} type={type} onModalAction={onCompleteTask}/>
      )}
      F
    </div>
  );
}
