import { Link } from 'react-router-dom'
import CommitLogo from '../../assets/commit-logo.png'
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from '@radix-ui/react-icons'


export const Header = ({ text }: { text?: string }) => {
    return (
        <header className='flex justify-between items-center px-4 py-3 border-b-[1px] h-14'>
            <div className='flex space-x-2'>
                <Link to='/'>
                    <img src={CommitLogo} alt='Commit.' className="h-6" />
                </Link>
                {text && <h1 className='mt-[-1px] text-lg'>{text}</h1>}
            </div>
            <div className='flex space-x-2'>
                <Button variant='outline' color='primary' size={'sm'} onClick={() => window.open('https://github.com/The-Commit-Company', '_blank')}>
                    <GitHubLogoIcon className='w-4 h-4 mr-2' /> Github
                </Button>
                <Button size={'sm'}>Take our survey</Button>
            </div>
        </header>
    )
}