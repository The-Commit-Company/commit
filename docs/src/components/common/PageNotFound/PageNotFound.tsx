import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Cloud } from 'lucide-react';

const PageNotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-600 to-blue-400 text-white">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-6xl font-bold mb-4"
            >
                404
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="text-2xl font-semibold text-center mb-6"
            >
                Oops! We couldn't find that page.
            </motion.div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="mb-10"
            >
                <Cloud size={24} className="w-24 h-24 opacity-60 text-white" />
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="text-lg text-center max-w-md mb-8"
            >
                It seems you're floating in the clouds! Let us guide you back.
            </motion.p>

            <Button
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-lg text-white bg-indigo-500 hover:bg-indigo-400 transition duration-200"
            >
                Go Back
            </Button>
        </div>
    );
}

export default PageNotFound;