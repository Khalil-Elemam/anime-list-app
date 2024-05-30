import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Header() {


    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Website logo" />
                    <h1>Anime List</h1>
                </div>
                <Link 
                    to={'/card'}
                    className='btn add-btn'
                >
                    Add
                </Link>
            </div>
        </header>
    )
}