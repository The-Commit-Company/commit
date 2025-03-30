import { Check } from "@/components/common/Checkbox/Check";
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FormElement } from "@/components/common/Forms/FormControl";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { SpinnerLoader } from "@/components/common/FullPageLoader/SpinnerLoader";
import { useGetCommitDocsDetails } from "@/components/features/meta_apps/useGetCommitDocsDetails";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CommitDocs } from "@/types/commit/CommitDocs";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import { Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import { Docs } from "../docs";
import { ImageUploader } from "@/components/common/ImageUploader2/ImageUploader";

export const DocsSettings = () => {
    const { ID } = useParams();

    if (ID) {
        return <Settings ID={ID} />;
    }

    return null;
};

const Settings = ({ ID }: { ID: string }) => {
    const { data, error, isLoading, mutate } = useGetCommitDocsDetails(ID, true);

    if (data) {
        return (
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <div className="mx-auto max-w-7xl flex flex-col gap-6">
                    <SettingsForm data={data?.commit_docs} mutate={mutate} />
                </div>
            </div>
        );
    }

    if (error) return <ErrorBanner error={error} />;

    if (isLoading) return <FullPageLoader />;

    return null;
}

const SettingsForm = ({ data, mutate }: {
    data: CommitDocs, mutate: KeyedMutator<{
        message: Docs;
    }>
}) => {

    const methods = useForm<CommitDocs>({
        defaultValues: {
            ...data
        }
    });

    const { formState: { isDirty }, register, reset } = methods

    const { updateDoc, error, loading } = useFrappeUpdateDoc<CommitDocs>();

    const { toast } = useToast()

    const onSubmit = (formData: CommitDocs) => {
        updateDoc("Commit Docs", formData.name, {
            ...formData
        }).then(() => {
            mutate().then((res) => {
                if (res) {
                    reset(res?.message?.commit_docs)
                }
            })
            toast({
                description: "Docs Updated Successfully",
                duration: 1500
            })
        })
    }

    return (
        <div className="flex flex-col gap-10">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="sm:flex sm:items-start justify-between gap-4">
                            <div className='flex flex-col gap-0'>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Settings
                                </h2>
                                {/* Helper Text Below Heading */}
                                <p className="text-sm text-gray-600">
                                    Update the settings of your documentation here. You can change the name, description, and other settings.
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={!isDirty}
                                onClick={methods.handleSubmit(onSubmit)}
                                className={`rounded-md flex items-center px-3 py-2 text-sm font-semibold text-white shadow-sm ${isDirty ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
                            >
                                Save
                                {loading ? <SpinnerLoader className="ml-2" /> : <Save className="ml-2 h-4 w-4" />}
                            </button>
                        </div>
                        <ErrorBanner error={error} />
                        <div className="flex flex-col gap-4 pt-6 mx-12">
                            <div className="grid grid-cols-3 gap-4">
                                <FormElement name="route" label="Route" aria-required>
                                    <Input {...register("route", {
                                        required: "Route is required"
                                    })} id="route" type="text" placeholder="eg. raven" />
                                    <p className="text-xs text-gray-500">Route is the URL slug for your documentation. It will be used to access your documentation.</p>
                                </FormElement>
                                <FormElement name="company_name" label="Company Name" aria-required>
                                    <Input {...register("company_name", {
                                        required: "Company Name is required"
                                    })} id="company_name" type="text" placeholder="eg. Raven" />
                                </FormElement>
                                <FormElement name="published" >
                                    <Check name="published" label="Published" id="published" alignWithLabel />
                                </FormElement>
                            </div>
                            <FormElement name="description" label="Description">
                                <textarea
                                    {...register("description")}
                                    id="description"
                                    placeholder="eg. Raven is a documentation tool for developers."
                                    className="resize-none w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </FormElement>
                            <div className="grid grid-cols-3 gap-4">
                                <FormElement name="twitter_url" label="Twitter URL">
                                    <Input {...register("twitter_url")} id="twitter_url" type="text" placeholder="eg. https://twitter.com/raven" />
                                </FormElement>
                                <FormElement name="linkedin" label="LinkedIn URL">
                                    <Input {...register("linkedin")} id="linkedin" type="text" placeholder="eg. https://linkedin.com/company/raven" />
                                </FormElement>
                                <FormElement name="youtube" label="YouTube URL">
                                    <Input {...register("youtube")} id="youtube" type="text" placeholder="eg. https://youtube.com/raven" />
                                </FormElement>
                                <FormElement name="github" label="GitHub URL">
                                    <Input {...register("github")} id="github" type="text" placeholder="eg. https://github.com/The-Commit-Company/raven" />
                                </FormElement>
                                <FormElement name="raven" label="Raven URL">
                                    <Input {...register("raven")} id="raven" type="text" placeholder="eg. https://raven.commit.com" />
                                </FormElement>
                                <FormElement name="telegram" label="Telegram URL">
                                    <Input {...register("telegram")} id="telegram" type="text" placeholder="eg. https://t.me/raven" />
                                </FormElement>
                                <FormElement name="slack" label="Slack URL">
                                    <Input {...register("slack")} id="slack" type="text" placeholder="eg. https://slack.com/raven" />
                                </FormElement>
                                <FormElement name="discord" label="Discord URL">
                                    <Input {...register("discord")} id="discord" type="text" placeholder="eg. https://discord.com/raven" />
                                </FormElement>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
            <div className="grid grid-cols-2 gap-4 mx-12 border-t border-gray-300 pt-6">
                <div className="flex flex-col gap-3 items-center">
                    <ImageUploader file={null} doctype='Commit Docs' docname={data?.name} onUpdate={mutate} boxSize={32} defaultFile={data.light_mode_logo} fieldname="light_mode_logo" />
                    <p className="text-md text-gray-500 font-semibold">Light Mode Logo</p>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <ImageUploader file={null} doctype='Commit Docs' docname={data?.name} onUpdate={mutate} boxSize={32} defaultFile={data.night_mode_logo} fieldname="night_mode_logo" />
                    <p className="text-md text-gray-500 font-semibold">Dark Mode Logo</p>
                </div>
            </div>
        </div>
    )
}