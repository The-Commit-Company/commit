import { Link } from 'react-router-dom'
import CommitLogo from '../../assets/commit-logo.png'
import { Button } from "@/components/ui/button"


export const Header = ({ text }: { text?: string }) => {
    return (
        <header className='flex justify-between px-4 py-2 border-b-[1px] h-12'>
            <div className='flex space-x-2'>
                <Link to='/'>
                    <img src={CommitLogo} alt='Commit.' className="h-6" />
                </Link>
                {text && <h1 className='mt-[-1px] text-lg'>{text}</h1>}
            </div>
            <div>
                <Button size={'sm'}>Take our survey</Button>
            </div>
        </header>
    )
}