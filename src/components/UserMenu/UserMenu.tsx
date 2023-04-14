import { useState } from 'react';
import avatar from '../../assets/images/avatar.png';

function UserMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div onClick={() => setOpen(!open)} className="userMenu">
      <div className="userMenu__avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <svg className="userName__arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.415 0.210022L6 4.79502L10.585 0.210022L12 1.62502L6 7.62502L0 1.62502L1.415 0.210022Z" fill="white"/>
      </svg>
      <div className={open ? 'userMenu__menu-active' : 'userMenu__menu'}>
        <a href="#">Profile</a>
        <a href="#">Log Out</a>
      </div>
    </div>
  )
}

export { UserMenu }