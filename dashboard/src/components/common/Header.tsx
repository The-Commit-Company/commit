import { Link } from 'react-router-dom'
import CommitLogo from '../../assets/commit-logo.png'
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from '@radix-ui/react-icons'


export const Header = ({ text }: { text?: string }) => {
    return (
        <header className='flex justify-between items-center px-4 py-3 border-b-[1px] h-14'>
            <div className='flex flex-col gap-1 sm:flex-row items-start sm:gap-2'>
                <Link to='/'>
                    <img src={CommitLogo} alt='Commit.' className="h-6" />
                </Link>
                {text && <h1 className='mt-[-1px] sm:text-lg text-sm'>{text}</h1>}
            </div>
            <div className='flex gap-2 items-center'>
                <Button variant='outline' color='primary' size='sm' onClick={() => window.open('https://github.com/The-Commit-Company', '_blank')}>
                    <GitHubLogoIcon className='w-4 h-4 mr-2' /> GitHub
                </Button>
                <Button asChild size='sm'>
                    <Link to={'https://forms.gle/cNpbkGRKbwnthQ6Q8'} target='_blank' rel='noreferrer' className='text-center'>
                        Take our survey
                    </Link>
                </Button>
            </div>
        </header>
    )
}