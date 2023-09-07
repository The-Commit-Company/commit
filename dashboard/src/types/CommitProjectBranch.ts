export interface CommitProjectBranch {
    commit_project: string
    branch_name: string
    path_to_folder: string
    commit_hash: string
    app_name: string
    last_fetched: string
    modules: string
    module_doctypes_map: string
    doctype_module_map: string
    whitelisted_apis: string
}
export interface ModuleData {
    [key: string]: {
        doctype_names: string[];
        module: string;
        number_of_doctypes: number;
    };
}