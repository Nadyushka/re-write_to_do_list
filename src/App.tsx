import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from './toDoList'
import {v1} from "uuid";

export type FilerType = 'active' | 'completed' | 'all'

function App() {

    const toDoListTitle: string = "What to learn"
    const [filter, setFilter] = useState<FilerType>('all')
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), taskTitle: 'HTML', isDone: true},
            {id: v1(), taskTitle: 'CSS', isDone: true},
            {id: v1(), taskTitle: 'JS', isDone: false}
        ]
    )

    const addNewTask = (taskTitle: string) => {
        taskTitle.trim() && setTasks([{id: v1(), taskTitle: taskTitle, isDone: false}, ...tasks])
    }

    const deleteTask = (taskId: string) => {
        setTasks([...tasks.filter(task => task.id !== taskId)])
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
        setTasks([...tasks.map(task => task.id === taskId ? {...task, isDone: newStatus} : {...task})])
    }

    const changeToDoListFilter = (nextFilterValue: FilerType) => {
        setFilter(nextFilterValue)
    }

    const getNewFilterValue = (filterValue: FilerType) => {
        if (filterValue === "active") {
            return tasks.filter(task => !task.isDone)
        } else if (filterValue === "completed") {
            return tasks.filter(task => task.isDone)
        }
        return tasks;
    }

    return (
        <div className="App">
            <ToDoList
                toDoListTitle={toDoListTitle}
                filter={filter}
                addNewTask={addNewTask}
                deleteTask={deleteTask}
                changeTaskStatus={changeTaskStatus}
                tasks={getNewFilterValue(filter)}
                changeToDoListFilter = {changeToDoListFilter}
            />

        </div>
    );
}

export default App;
