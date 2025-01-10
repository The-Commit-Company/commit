import { Link } from 'react-router-dom'
import CommitLogo from '../../assets/commit-logo.png'

export const Header = ({ text }: { text?: string }) => {
    return (
        <header className='flex justify-between items-center px-4 py-3 border-b-[1px] h-14'>
            <div className='flex flex-col gap-1 sm:flex-row items-start sm:gap-2'>
                <Link to='/'>
                    <img src={CommitLogo} alt='Commit.' className="h-6" />
                </Link>
                {text && <h1 className='mt-[-1px] sm:text-lg text-sm'>{text}</h1>}
            </div>
        </header>
    )
}