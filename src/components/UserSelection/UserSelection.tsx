import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { task } from '../../type';

interface Props {
  tasks: task[]
  onSelect: Function
}

function UserSelection({ tasks, onSelect }: Props) {
  const [expand, setExpand] = useState(false)
  const [activeSelect, setActiveSelect] = useState('')

  useEffect(() => {
    onSelect(activeSelect)
  }, [activeSelect])

  const refUserSelection = useRef(null)
  const refUserSelectionActive = useRef(null)

  const [heightUserSelection, setHeightUserSelection] = useState(0)
  const [heightUserSelectionActive, setHeightUserSelectionActive] = useState(0)

  useLayoutEffect(() => {
    const curUserSelection: any = refUserSelection.current
    const curUserSelectionActive: any = refUserSelectionActive.current

    curUserSelection && setHeightUserSelection(curUserSelection.clientHeight)
    curUserSelectionActive &&
      setHeightUserSelectionActive(curUserSelectionActive.clientHeight)
  }, [])

  const styleUserSelection = {
    height: expand ? heightUserSelection : heightUserSelectionActive,
  }

  const styleArrow = {
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  }

  return (
    <div
      onClick={() => setExpand(!expand)}
      className="userSelection"
      style={ styleUserSelection }
      data-testid="userSelection"
    >
      <div ref={refUserSelection} className="wrap">
        <div ref={refUserSelectionActive} className="userSelection__active">
          <p>{activeSelect}</p>
          <svg style={styleArrow} width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.25 2.35936L2.24687 0.510406L11.5 9.07812L20.7531 0.510406L22.75 2.35936L11.5 12.776L0.25 2.35936Z" fill="black"/>
          </svg>
        </div>
        <div className="userSelection__options">
          {tasks.map((task) => (
            <div
              data-testid="userSelectionOption"
              key={task.id}
              onClick={() => {
                setActiveSelect(task.title)
              }}
              className="userSelection__option"
            >
              {task.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { UserSelection }