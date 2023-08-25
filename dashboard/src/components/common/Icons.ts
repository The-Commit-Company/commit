import { IconType } from 'react-icons'
import { GrCurrency, GrFormAttachment, GrTextAlignFull } from 'react-icons/gr'
import { AiFillCode, AiFillFileImage, AiFillHtml5, AiOutlineHtml5, AiOutlineLink, AiOutlinePhone, AiOutlineStar, AiOutlineTable } from 'react-icons/ai'
import { BiBarcode, BiCheckboxChecked, BiColorFill, BiCurrentLocation, BiEdit, BiHeading, BiStopwatch, BiTime } from 'react-icons/bi'
import { BsBodyText, BsCalendarDate, BsFileEarmarkImage, BsFiletypeMdx, BsLink45Deg, BsMenuButton, BsPercent } from 'react-icons/bs'
import { TbTxt } from 'react-icons/tb'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { TiSortNumerically } from 'react-icons/ti'
import { MdOutlineFunctions, MdOutlineNumbers } from 'react-icons/md'
import { FaIcons } from 'react-icons/fa'
import { VscJson } from 'react-icons/vsc'
import { RiLockPasswordLine } from 'react-icons/ri'
import { CiRead } from 'react-icons/ci'
import { IoIosArrowDropdown } from 'react-icons/io'
import { PiSignatureLight } from 'react-icons/pi'
import { LuText } from 'react-icons/lu'

export type ICON_KEY = 'Autocomplete' | 'Attach' | 'Attach Image' | 'Barcode' | 'Button' | 'Check' | 'Code' | 'Color' | 'Currency' | 'Data' | 'Date' | 'Datetime' | 'Duration' | 'Dynamic Link' | 'Float' | 'Fold' | 'Geolocation' | 'Heading' | 'HTML' | 'HTML Editor' | 'Icon' | 'Image' | 'Int' | 'JSON' | 'Link' | 'Long Text' | 'Markdown Editor' | 'Password' | 'Percent' | 'Phone' | 'Read Only' | 'Rating' | 'Select' | 'Signature' | 'Small Text' | 'Table' | 'Table MultiSelect' | 'Text' | 'Text Editor' | 'Time'

export const ICON_KEY_MAP: Record<ICON_KEY, IconType> = {
    'Autocomplete': HiOutlineLightBulb as IconType,
    'Attach': GrFormAttachment as IconType,
    'Attach Image': AiFillFileImage as IconType,
    'Barcode': BiBarcode as IconType,
    'Button': BsMenuButton as IconType,
    'Check': BiCheckboxChecked as IconType,
    'Code': AiFillCode as IconType,
    'Color': BiColorFill as IconType,
    'Currency': GrCurrency as IconType,
    'Data': TbTxt as IconType,
    'Date': BsCalendarDate as IconType,
    'Datetime': BsCalendarDate as IconType,
    'Duration': BiStopwatch as IconType,
    'Dynamic Link': BsLink45Deg as IconType,
    'Float': TiSortNumerically as IconType,
    'Fold': MdOutlineFunctions as IconType,
    'Geolocation': BiCurrentLocation as IconType,
    'Heading': BiHeading as IconType,
    'HTML': AiOutlineHtml5 as IconType,
    'HTML Editor': AiFillHtml5 as IconType,
    'Icon': FaIcons as IconType,
    'Image': BsFileEarmarkImage as IconType,
    'Int': MdOutlineNumbers as IconType,
    'JSON': VscJson as IconType,
    'Link': AiOutlineLink as IconType,
    'Long Text': BsBodyText as IconType,
    'Markdown Editor': BsFiletypeMdx as IconType,
    'Password': RiLockPasswordLine as IconType,
    'Percent': BsPercent as IconType,
    'Phone': AiOutlinePhone as IconType,
    'Read Only': CiRead as IconType,
    'Rating': AiOutlineStar as IconType,
    'Select': IoIosArrowDropdown as IconType,
    'Signature': PiSignatureLight as IconType,
    'Small Text': LuText as IconType,
    'Table': AiOutlineTable as IconType,
    'Table MultiSelect': AiOutlineTable as IconType,
    'Text': GrTextAlignFull as IconType,
    'Text Editor': BiEdit as IconType,
    'Time': BiTime as IconType,
}


