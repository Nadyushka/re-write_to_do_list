import React, {ChangeEvent, useState} from 'react';
import {FilerType} from "./App";

export type TaskType = {
    id: string
    taskTitle: string
    isDone: boolean
}

type ToDoListType = {
    toDoListTitle: string
    filter: FilerType
    tasks: Array<TaskType>
    addNewTask: (newTask: string) => void
    deleteTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    changeToDoListFilter: (filterValue: FilerType) => void
}

const ToDoList: React.FC<ToDoListType> = (props) => {

    const {toDoListTitle, tasks, addNewTask, deleteTask, changeTaskStatus,changeToDoListFilter} = props
    const [error, setError] = useState<boolean>(false)
    const [newTask, setNewTask] = useState<string>('')

        return (
        <div>
            <div>
                <h2>{toDoListTitle}</h2>
                <input value={newTask}
                       onChange={(e) => {
                           setNewTask(e.currentTarget.value)
                       }}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               if (newTask.trim().length === 0) {
                                   setError(true)
                               } else {
                                   setError(false)
                                   addNewTask(newTask)
                                   setNewTask('')
                               }
                           }
                       }}
                />
                <button onClick={() => {
                    if (newTask.trim().length === 0) {
                        setError(true)
                    } else {
                        setError(false)
                        addNewTask(newTask)
                        setNewTask('')
                    }
                }}> + </button>
                <div>{error && 'You need to add information'}</div>
            </div>
            <ul>
                {tasks.map(t => {

                    const onClickTaskRemoveHandler = () => deleteTask(t.id)
                    const onClickTaskInputCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={t.id}>
                            <input type={"checkbox"}
                                   checked={t.isDone}
                                   onChange={onClickTaskInputCheckboxChange}
                            />
                            <span>{t.taskTitle}</span>
                            <button onClick={onClickTaskRemoveHandler}> x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>changeToDoListFilter('all')}>All</button>
                <button onClick={()=>changeToDoListFilter('active')}>Active</button>
                <button onClick={()=>changeToDoListFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;