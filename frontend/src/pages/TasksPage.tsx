import { PlusIcon } from "@heroicons/react/24/outline";
import Task from "../components/Task";
import { iTask } from "../interfaces";
import { useEffect, useMemo, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api";
import { useAuth } from "../hooks/useAuth";
import TaskModal, { ModalTypes } from "../components/TaskModal";

type TaskStatus = 'Todas' | 'Completas' | 'Incompletas';

export default function TasksPage() {
    const [tasks, setTasks] = useState<iTask[]>([]);
    const [selectedTask, setSelectedTask] = useState<iTask | null>(null)
    const [searchBar, selectSearchBar] = useState('')
    const [tasksStatus, selectTasksStatus] = useState<TaskStatus | string>('Todas')
    const [modalType, setModalType] = useState<ModalTypes>('');
    const {token} = useAuth();

    useEffect(() => {
        getTasks(token)
        .then((data) => {
            setTasks(data)
        })
    }, [token])

    // Realiza filtragem das tarefas de acordo com a barra de pesquisa e o select de status da tarefa
    const filteredTasks = useMemo(() => {
        let filteredArray: iTask[] = tasks;
        if(searchBar){
            filteredArray = tasks.filter(task => task.title.toLowerCase().includes(searchBar.toLowerCase()))
        }

        if(tasksStatus === 'Completas') return filteredArray.filter(task => task.completed)

        if(tasksStatus === 'Incompletas') return filteredArray.filter(task => !task.completed)

        return filteredArray
    },[tasks, searchBar, tasksStatus])


    //Todas as ações de Tasks retornam as tasks atualizadas do usuário que são usadas pra atualizar a os dados da página
    const onCreateTask = async(taskData: Partial<iTask>) => {
        const response = await createTask(token, taskData)
        if(response){
            closeModal();
            setTasks(response.userTasks)
        }    
    }

    const onUpdateTask = async(taskData: Partial<iTask>) => {
        const response = await updateTask(token, taskData.id!, {title: taskData.title, description: taskData.description})
        if(response){
            closeModal();
            setTasks(response.userTasks)
        } 
    }

    const onDeleteTask = async(taskData: iTask) => {
        const response = await deleteTask(token, taskData.id);
        if(response){
            closeModal();
            setTasks(response.userTasks)
        } 
    }

    const onCompleteTask = async(taskData: iTask) => {
        const response = await updateTask(token,taskData.id, {...taskData, completed: !taskData.completed})
        if(response){
            closeModal();
            setTasks(response.userTasks)
        } 
    }

    const closeModal = () => {
        setModalType('');
        setSelectedTask(null);
    }
    //Seleção de tarefa para utilizar nas ações da Tarefa
    const selectTask = (taskData: iTask) => {
        setSelectedTask(taskData);
    }
    //Utilizado para mudar o tipo de modal dentre os modais de tarefa (TaskModal)
    const selectModalType = (modalTypeChosed: ModalTypes) => {
        setModalType(modalTypeChosed);
    }
    //Variável para checagem da exibição do modal (no caso do modal ser create não há tarefa selecionada pois ela estará sendo criada)
    const showModal = modalType && selectedTask || modalType == 'create';
    return(
        <>
        <div className="mt-10 w-full flex flex-col items-center">
            <div className="min-w-80 w-10/12 md:w-3/5 md:min-w-[640px] md:max-w-[800px]">
                <div className="flex gap-4">
                    
                    <input
                    id="search-bar"
                    name="search-bar"
                    type="text"
                    value={searchBar}
                    onChange={e => selectSearchBar(e.target.value)}
                    placeholder="Pesquisar Tarefa"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                    />
                    <select value={tasksStatus} onChange={e => selectTasksStatus(e.target.value)} id="task-status" name="task-status" className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6">
                        <option>Todas</option>
                        <option>Completas</option>
                        <option>Incompletas</option>
                    </select>
                    <button onClick={() => selectModalType('create')}
                    className="flex justify-center rounded-md bg-emerald-600 px-6 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                    <PlusIcon className="size-6"/>
                    </button>
                </div>
                <div className="bg-zinc-700/30 rounded-md flex flex-col py-5 divide-y-2 divide-emerald-700 mt-4">
                    {!filteredTasks.length && <p className="text-center text-zinc-400">Sem Tarefas</p>}              
                    {filteredTasks.map((task: iTask) => <Task taskData={task} key={task.id} selectTask={selectTask} selectModalType={selectModalType} />)}
                </div>
            </div>          
        </div>

        {showModal && <TaskModal closeModal={closeModal} type={modalType} task={selectedTask} onCreateTask={onCreateTask} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} onCompleteTask={onCompleteTask}/>}
        </>
    )
}