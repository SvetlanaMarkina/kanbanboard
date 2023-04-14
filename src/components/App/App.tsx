import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Lists } from '../../dop/Lists/Lists';
import { Details } from '../../dop/Details/Details';
import { getData, setData, dataCounter, finishedCounter } from '../../data';
import { UserMenu } from '../UserMenu/UserMenu';
import { data } from '../../type';

function App() {
  const [appData, setAppData] = useState(getData())
  const [countTasks, setCountTasks] = useState(dataCounter()) 
  const [countTasksFinished, setCountTasksFinished] = useState(finishedCounter())
  
  useEffect(() => {
    setCountTasks(dataCounter())
    setCountTasksFinished(finishedCounter())
  }, [appData])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Lists appData={appData} setAppData={setAppData} />,
    },
    {
      path: 'details/:mode/:id',
      element: <Details />,
      loader: ({ params }) => {
        const data: data = getData()
        const id: string | undefined = params.id
        const mode: string | undefined = params.mode
        const res = mode && data[mode].find((task) => task.id === Number(id))
        return {
          task: res,
          mode: mode,
        }
      },
    },
  ])

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Awesome Kanban Board</h1>
        <UserMenu />
      </header>
      <main className="kanbanBoard">
        <RouterProvider router={router} />
      </main>
      <footer className="footer">
        <div className="footer__span">
          Active tasks: <span>{countTasks}</span>
        </div>
        <div className="footer__span">
          Finished tasks: <span>{countTasksFinished}</span>
        </div>
        <div className="footer__span">
          Kanban board by <span>Name,</span> <span>Year</span>
        </div>
      </footer>
    </div>
  )
}

export default App