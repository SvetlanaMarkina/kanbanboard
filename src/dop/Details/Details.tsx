import { useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom';
import { data } from '../../type';
import { getData, setData } from '../../data';

function Details() {
  const res: any = useLoaderData()
  const title = res.task.title
  const description = res.task.description
  const [editMode, setEditMode] = useState(false)
  const [editFieldState, setEditFieldState] = useState('')

  const editDescription = (e: any) => {
    const value: string | null = e.target.value
    value ? setEditFieldState(value) : setEditFieldState('')
  }

  return (
    <div className="kanbanBoard__details">
      <h2 className="title">{title}</h2>
      {editMode ? (
        <textarea
          onChange={(e) => editDescription(e)}
          className="editField"
          autoFocus
        />
      ) : (
        <p className="description">{description}</p>
      )}

      <div className="buttonBlock">
        <Link
          className={editMode ? 'completeBtn' : 'editBtn'}
          to={window.location.pathname}
          onClick={() => {
            if (editMode) {
              const data: data = getData()
              const task = data[res.mode].find(
                (task) => task.id === Number(res.task.id)
              )
              if (task && editFieldState !== '') {
                task.description = editFieldState
                setData(data)
              }
            }
            setEditMode(!editMode)
          }}
        >
          
          {editMode ? (
            <svg xmlns="http://www.w3.org/2000/svg"  height="23" viewBox="0 96 960 960" width="23">
              <path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z"/>
            </svg>
          ) : (
            <svg width="23" height="23" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 14.2524V18.0024H3.75L14.81 6.94244L11.06 3.19244L0 14.2524ZM17.71 4.04244C17.8027 3.94993 17.8763 3.84004 17.9264 3.71907C17.9766 3.59809 18.0024 3.46841 18.0024 3.33744C18.0024 3.20648 17.9766 3.07679 17.9264 2.95582C17.8763 2.83485 17.8027 2.72496 17.71 2.63244L15.37 0.292444C15.2775 0.19974 15.1676 0.126193 15.0466 0.0760114C14.9257 0.02583 14.796 0 14.665 0C14.534 0 14.4043 0.02583 14.2834 0.0760114C14.1624 0.126193 14.0525 0.19974 13.96 0.292444L12.13 2.12244L15.88 5.87244L17.71 4.04244Z" fill="black"/>
            </svg>
          )}
        </Link>
        <Link className="closeBtn" to="/">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.4286 22.4286L1 1M22.4286 1L1 22.4286" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export { Details }