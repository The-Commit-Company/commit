import { getCommitDocsHeaderAndDescription } from '@/utils/defaults'
import  DocsDoodle  from '../../../assets/Docs.svg'

const HeroSection = () => {

    const { header, description, image } = getCommitDocsHeaderAndDescription()

    const defaultHeader = `Boring docs? Not on our watch!`
    const defaultDescription = `Meet <span className="font-bold">Commit Docs</span>, built with Frappe Framework, it is the modern standard for public-facing documentation. Beautiful out of the box, easy to maintain, and <span className="text-gray-500">Open Source ✨</span>.`
    return (
        <div className="flex flex-col md:flex-row min-h-[50vh] md:h-[50vh] items-center justify-start px-4 sm:px-6 lg:px-6 ">
            <div className="w-full md:w-1/2 p-4 md:p-8 text-center md:text-left">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-title_font tracking-tighter mb-6"
                    dangerouslySetInnerHTML={{ __html: header ? header : defaultHeader }} />
                <div className="font-title_font tracking-tight text-base sm:text-lg md:text-xl mb-8"
                    dangerouslySetInnerHTML={{ __html: description ? description : defaultDescription }} />
            </div>
            <div className="w-full md:w-1/2 p-4 md:p-8">
                    <img
                    src={image ? image : DocsDoodle}
                        alt="ManDoodle."
                        className="w-full h-auto max-h-96 md:max-h-[250px] sm:max-h-[200px] lg:max-h-[300px]
                        object-contain"
                />
            </div>
        </div>
    )
}

export default HeroSection