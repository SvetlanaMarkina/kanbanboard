import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { task, data } from '../../type';
import { createId } from '../../data';
import { UserSelection } from '../UserSelection/UserSelection';
import { setData, getData } from '../../data';

interface Props {
  appData: data
  setAppData: Function
  abilityAddTask: boolean
  title: string
  tasks: task[]
  mode: string
  prevMode: string
  prevTasks: task[]
}

function List({
  appData,
  setAppData,
  tasks,
  prevTasks,
  title,
  abilityAddTask,
  mode, 
  prevMode,
}: Props) {
  const [stateList, setStateList] = useState(0)
  const [stateInput, setStateInput] = useState('')
  const [stateBtn, setStateBtn] = useState(false)

  const addTask = (task: task, mode: string) => {
    const curList: task[] = appData[mode]
    curList.push(task)
    setData(appData)
    setAppData(getData())
  }

  const delTask = (task: task, mode: string) => {
    const curList: task[] = appData[mode]
    curList.forEach(
      (deletedTask, index) =>
        task.id === deletedTask.id && curList.splice(index, 1)
    )
    setData(appData)
    setAppData(getData())
  }

  useEffect(() => {
    stateInput !== '' ? setStateBtn(true) : setStateBtn(false)
  }, [stateInput])

  const onClickAddCard = () => {
    if (mode === 'backlog') {
      setStateList(1)
    } else {
      setStateList(2)
    }
  }

  const onClickSubmitBtn = () => {
    const id = createId()
    if (mode === 'backlog') {
      const result: task = {
        id: id,
        title: stateInput,
        description: '',
      }
      addTask(result, mode)
      onClickCancelBtn()
    } else {
      prevTasks.forEach((task) => {
        if (task.title === stateInput) {
          addTask(task, mode)
          delTask(task, prevMode)
        }
      })
      onClickCancelBtn()
    }
  }

  const onClickCancelBtn = () => {
    setStateList(0)
    setStateBtn(false)
  }

  return (
    <div className="kanbanBoard__list">
      <div className="title">{title}</div>
      <div className="tasks">
        {tasks.map((task) => (
          <Link
            data-testid={`${mode}-task`}
            to={`details/${mode}/${task.id}`}
            key={task.id}
            className="task"
          >
            {task.title}
          </Link>
        ))}

        {stateList === 1 ? (
          <input
            data-testid={`${mode}-input`}
            onChange={(e) => setStateInput(e.target.value)}
            className="inputTask"
            type="text"
            autoFocus
          />
        ) : stateList === 2 ? (
          <UserSelection
            tasks={prevTasks}
            onSelect={(select: string) => {
              setStateInput(select)
            }}
          />
        ) : (
          ''
        )}
      </div>

      {stateList ? (
        <>
          <button
            data-testid={`${mode}-button`}
            disabled={!abilityAddTask}
            onClick={stateBtn ? onClickSubmitBtn : onClickAddCard}
            className={stateBtn ? 'submitBtn' : 'addBtn'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 6H8V1C8 0.448 7.552 0 7 0C6.448 0 6 0.448 6 1V6H1C0.448 6 0 6.448 0 7C0 7.552 0.448 8 1 8H6V13C6 13.552 6.448 14 7 14C7.552 14 8 13.552 8 13V8H13C13.552 8 14 7.552 14 7C14 6.448 13.552 6 13 6Z" fill="#5E6C84"/>
            </svg>
            <span>{stateBtn ? 'Submit' : 'Add card'}</span>
          </button>
          <button
            disabled={!abilityAddTask}
            onClick={onClickCancelBtn}
            className="cancelBtn"
          >
            <span>Cancel</span>
          </button>
        </>
      ) : (
        <button
          data-testid={`${mode}-button`}
          disabled={!abilityAddTask}
          onClick={onClickAddCard}
          className="addBtn"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 6H8V1C8 0.448 7.552 0 7 0C6.448 0 6 0.448 6 1V6H1C0.448 6 0 6.448 0 7C0 7.552 0.448 8 1 8H6V13C6 13.552 6.448 14 7 14C7.552 14 8 13.552 8 13V8H13C13.552 8 14 7.552 14 7C14 6.448 13.552 6 13 6Z" fill="#5E6C84"/>
          </svg>
          <span>{stateBtn ? 'Submit' : 'Add card'}</span>
        </button>
      )}
    </div>
  )
}

export { List }