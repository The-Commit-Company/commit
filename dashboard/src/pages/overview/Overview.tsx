import { Navbar } from "@/components/features/overview/Navbar"
import { Projects } from "@/components/features/projects/Projects"

export const navigation = [
    { name: 'Overview', content: <div>hello</div> },
    { name: 'Dashboard', content: <></> },
    { name: 'Team', content: <></> },
    { name: 'Projects', content: <Projects /> },
    { name: 'Settings', content: <></> },
]

export const Overview = () => {
    return (
        <div className="h-screen">
            <Navbar navigation={navigation} />
        </div>
    )
}