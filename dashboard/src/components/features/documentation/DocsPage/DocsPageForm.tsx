import { Check } from "@/components/common/Checkbox/Check";
import { FormElement, FormHelperText } from "@/components/common/Forms/FormControl/FormElement";
import { Input } from "@/components/ui/input";
import { CommitDocsPage } from "@/types/commit/CommitDocsPage";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const DocsPageForm = () => {
    const { register } = useFormContext<CommitDocsPage>();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col gap-4 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
            {/* Title Field */}
            <div className="flex flex-row gap-4 items-end">
                <FormElement name="title" label="Title" aria-required className="flex-grow" autoFocus>
                    <Input
                        {...register("title", { required: "Title is required" })}
                        id="title"
                        type="text"
                        placeholder="e.g. Get Started"
                        autoFocus
                    />
                </FormElement>
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-all"
                    aria-expanded={isExpanded}
                    aria-controls="additional-fields"
                >
                    {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
            </div>

            {/* Hidden Fields */}
            {isExpanded && (
                <div id="additional-fields" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormElement name="badge" label="Badge">
                            <Input
                                {...register("badge")}
                                id="badge"
                                type="text"
                                placeholder="e.g. GET"
                            />
                            <FormHelperText>
                                Badge is a short text that appears on the left side of the title in the sidebar.
                            </FormHelperText>
                        </FormElement>
                        <FormElement name="badge_color" label="Badge Color">
                            <Input
                                {...register("badge_color")}
                                id="badge_color"
                                type="text"
                                placeholder="e.g. green"
                            />
                            <FormHelperText>
                                Add Tailwind colors like red, green, blue, yellow, etc.
                            </FormHelperText>
                        </FormElement>
                        <FormElement name="icon" label="Icon">
                            <Input
                                {...register("icon")}
                                id="icon"
                                type="text"
                                placeholder="e.g. Twitter"
                            />
                            <FormHelperText>
                                Icon is the Lucide icon that appears on the left side of the title in the sidebar.
                            </FormHelperText>
                        </FormElement>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormElement name="published">
                            <Check name="published" label="Published" />
                        </FormElement>
                        <FormElement name="allow_guest">
                            <Check name="allow_guest" label="Allow Guest" />
                        </FormElement>
                        <FormElement name="is_group_page">
                            <Check name="is_group_page" label="Is Group Page" />
                        </FormElement>
                    </div>
                </div>
            )}
        </div>
    );
};
