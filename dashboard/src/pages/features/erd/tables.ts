import { PostgresTable, PostgresRelationship } from "@/types/Table";


const tables: PostgresTable[] = [
    {
        "name": "Opportunity",
        "id": "Opportunity",
        "module": "CRM",
        "columns": [
            {
                "name": "ID",
                "id": "name",
                "format": "Data"
            },
            {
                "name": "Series",
                "id": "naming_series",
                "format": "Select"
            },
            {
                "name": "Opportunity From",
                "id": "opportunity_from",
                "format": "Link"
            },
            {
                "name": "Customer Name",
                "id": "customer_name",
                "format": "Data"
            },
            {
                "name": "Title",
                "id": "title",
                "format": "Data"
            },
            {
                "name": "Opportunity Type",
                "id": "opportunity_type",
                "format": "Link"
            },
            {
                "name": "Status",
                "id": "status",
                "format": "Select"
            },
            {
                "name": "Detailed Reason",
                "id": "order_lost_reason",
                "format": "Small Text"
            },
            {
                "name": "Currency",
                "id": "currency",
                "format": "Link"
            },
            {
                "name": "Sales Stage",
                "id": "sales_stage",
                "format": "Link"
            },
            {
                "name": "Items",
                "id": "items",
                "format": "Table"
            },
            {
                "name": "Customer / Lead Address",
                "id": "customer_address",
                "format": "Link"
            },
            {
                "name": "Address",
                "id": "address_display",
                "format": "Small Text"
            },
            {
                "name": "Territory",
                "id": "territory",
                "format": "Link"
            },
            {
                "name": "Customer Group",
                "id": "customer_group",
                "format": "Link"
            },
            {
                "name": "Contact Person",
                "id": "contact_person",
                "format": "Link"
            },
            {
                "name": "Contact",
                "id": "contact_display",
                "format": "Small Text"
            },
            {
                "name": "Contact Email",
                "id": "contact_email",
                "format": "Data"
            },
            {
                "name": "Contact Mobile",
                "id": "contact_mobile",
                "format": "Data"
            },
            {
                "name": "Source",
                "id": "source",
                "format": "Link"
            },
            {
                "name": "Campaign",
                "id": "campaign",
                "format": "Link"
            },
            {
                "name": "Company",
                "id": "company",
                "format": "Link"
            },
            {
                "name": "Amended From",
                "id": "amended_from",
                "format": "Link"
            },
            {
                "name": "Print Language",
                "id": "language",
                "format": "Link"
            },
            {
                "name": "No of Employees",
                "id": "no_of_employees",
                "format": "Select"
            },
            {
                "name": "Industry",
                "id": "industry",
                "format": "Link"
            },
            {
                "name": "Market Segment",
                "id": "market_segment",
                "format": "Link"
            },
            {
                "name": "Opportunity Owner",
                "id": "opportunity_owner",
                "format": "Link"
            },
            {
                "name": "Website",
                "id": "website",
                "format": "Data"
            },
            {
                "name": "WhatsApp",
                "id": "whatsapp",
                "format": "Data"
            },
            {
                "name": "Phone",
                "id": "phone",
                "format": "Data"
            },
            {
                "name": "Phone Ext.",
                "id": "phone_ext",
                "format": "Data"
            },
            {
                "name": "Job Title",
                "id": "job_title",
                "format": "Data"
            },
            {
                "name": "Notes",
                "id": "notes",
                "format": "Table"
            },
            {
                "name": "City",
                "id": "city",
                "format": "Data"
            },
            {
                "name": "State",
                "id": "state",
                "format": "Data"
            },
            {
                "name": "Country",
                "id": "country",
                "format": "Link"
            }
        ]
    },
    {
        "name": "Prospect",
        "id": "Prospect",
        "module": "CRM",
        "columns": [
            {
                "name": "ID",
                "id": "name",
                "format": "Data"
            },
            {
                "name": "Company Name",
                "id": "company_name",
                "format": "Data"
            },
            {
                "name": "Industry",
                "id": "industry",
                "format": "Link"
            },
            {
                "name": "Market Segment",
                "id": "market_segment",
                "format": "Link"
            },
            {
                "name": "Customer Group",
                "id": "customer_group",
                "format": "Link"
            },
            {
                "name": "Territory",
                "id": "territory",
                "format": "Link"
            },
            {
                "name": "No. of Employees",
                "id": "no_of_employees",
                "format": "Select"
            },
            {
                "name": "Fax",
                "id": "fax",
                "format": "Data"
            },
            {
                "name": "Website",
                "id": "website",
                "format": "Data"
            },
            {
                "name": "Prospect Owner",
                "id": "prospect_owner",
                "format": "Link"
            },
            {
                "name": "Company",
                "id": "company",
                "format": "Link"
            },
            {
                "name": "Opportunities",
                "id": "opportunities",
                "format": "Table"
            },
            {
                "name": "leads",
                "id": "leads",
                "format": "Table"
            },
            {
                "name": "Notes",
                "id": "notes",
                "format": "Table"
            }
        ]
    },
    {
        "name": "Prospect Opportunity",
        "id": "Prospect Opportunity",
        "module": "CRM",
        "columns": [
            {
                "name": "ID",
                "id": "name",
                "format": "Data"
            },
            {
                "name": "Opportunity",
                "id": "opportunity",
                "format": "Link"
            },
            {
                "name": "Stage",
                "id": "stage",
                "format": "Data"
            },
            {
                "name": "Currency",
                "id": "currency",
                "format": "Link"
            },
            {
                "name": "Deal Owner",
                "id": "deal_owner",
                "format": "Data"
            },
            {
                "name": "Contact Person",
                "id": "contact_person",
                "format": "Link"
            }
        ]
    },
    {
        "name": "Prospect Lead",
        "id": "Prospect Lead",
        "module": "CRM",
        "columns": [
            {
                "name": "ID",
                "id": "name",
                "format": "Data"
            },
            {
                "name": "Lead",
                "id": "lead",
                "format": "Link"
            },
            {
                "name": "Lead Name",
                "id": "lead_name",
                "format": "Data"
            },
            {
                "name": "Status",
                "id": "status",
                "format": "Data"
            },
            {
                "name": "Email",
                "id": "email",
                "format": "Data"
            },
            {
                "name": "Mobile No",
                "id": "mobile_no",
                "format": "Data"
            },
            {
                "name": "Lead Owner",
                "id": "lead_owner",
                "format": "Data"
            }
        ]
    },
    {
        "name": "CRM Note",
        "id": "CRM Note",
        "module": "CRM",
        "columns": [
            {
                "name": "ID",
                "id": "name",
                "format": "Data"
            },
            {
                "name": "Added By",
                "id": "added_by",
                "format": "Link"
            }
        ]
    },
    {
        "name": "Lead",
        "id": "Lead",
        "module": "CRM",
        "columns": [
            {
                "name": "ID",
                "id": "name",
                "format": "Data"
            },
            {
                "name": "Series",
                "id": "naming_series",
                "format": "Select"
            },
            {
                "name": "Full Name",
                "id": "lead_name",
                "format": "Data"
            },
            {
                "name": "Organization Name",
                "id": "company_name",
                "format": "Data"
            },
            {
                "name": "Email",
                "id": "email_id",
                "format": "Data"
            },
            {
                "name": "Lead Owner",
                "id": "lead_owner",
                "format": "Link"
            },
            {
                "name": "Status",
                "id": "status",
                "format": "Select"
            },
            {
                "name": "Salutation",
                "id": "salutation",
                "format": "Link"
            },
            {
                "name": "Gender",
                "id": "gender",
                "format": "Link"
            },
            {
                "name": "Source",
                "id": "source",
                "format": "Link"
            },
            {
                "name": "From Customer",
                "id": "customer",
                "format": "Link"
            },
            {
                "name": "Campaign Name",
                "id": "campaign_name",
                "format": "Link"
            },
            {
                "name": "Phone",
                "id": "phone",
                "format": "Data"
            },
            {
                "name": "Mobile No",
                "id": "mobile_no",
                "format": "Data"
            },
            {
                "name": "Fax",
                "id": "fax",
                "format": "Data"
            },
            {
                "name": "Lead Type",
                "id": "type",
                "format": "Select"
            },
            {
                "name": "Market Segment",
                "id": "market_segment",
                "format": "Link"
            },
            {
                "name": "Industry",
                "id": "industry",
                "format": "Link"
            },
            {
                "name": "Request Type",
                "id": "request_type",
                "format": "Select"
            },
            {
                "name": "Company",
                "id": "company",
                "format": "Link"
            },
            {
                "name": "Website",
                "id": "website",
                "format": "Data"
            },
            {
                "name": "Territory",
                "id": "territory",
                "format": "Link"
            },
            {
                "name": "Unsubscribed",
                "id": "unsubscribed",
                "format": "Check"
            },
            {
                "name": "Blog Subscriber",
                "id": "blog_subscriber",
                "format": "Check"
            },
            {
                "name": "Title",
                "id": "title",
                "format": "Data"
            },
            {
                "name": "Print Language",
                "id": "language",
                "format": "Link"
            },
            {
                "name": "First Name",
                "id": "first_name",
                "format": "Data"
            },
            {
                "name": "Middle Name",
                "id": "middle_name",
                "format": "Data"
            },
            {
                "name": "Last Name",
                "id": "last_name",
                "format": "Data"
            },
            {
                "name": "No of Employees",
                "id": "no_of_employees",
                "format": "Select"
            },
            {
                "name": "WhatsApp",
                "id": "whatsapp_no",
                "format": "Data"
            },
            {
                "name": "Phone Ext.",
                "id": "phone_ext",
                "format": "Data"
            },
            {
                "name": "Qualified By",
                "id": "qualified_by",
                "format": "Link"
            },
            {
                "name": "Qualification Status",
                "id": "qualification_status",
                "format": "Select"
            },
            {
                "name": "Job Title",
                "id": "job_title",
                "format": "Data"
            },
            {
                "name": "Notes",
                "id": "notes",
                "format": "Table"
            },
            {
                "name": "Disabled",
                "id": "disabled",
                "format": "Check"
            },
            {
                "name": "City",
                "id": "city",
                "format": "Data"
            },
            {
                "name": "State",
                "id": "state",
                "format": "Data"
            },
            {
                "name": "Country",
                "id": "country",
                "format": "Link"
            }
        ]
    },
    {
        "name": "Campaign",
        "id": "Campaign",
        "module": "CRM",
        "columns": [
            {
                "name": "ID",
                "id": "name",
                "format": "Data"
            },
            {
                "name": "Campaign Name",
                "id": "campaign_name",
                "format": "Data"
            },
            {
                "name": "Naming Series",
                "id": "naming_series",
                "format": "Select"
            },
            {
                "name": "Campaign Schedules",
                "id": "campaign_schedules",
                "format": "Table"
            },
            {
                "name": "Description",
                "id": "description",
                "format": "Text"
            }
        ]
    },
    {
        "name": "Lead Source",
        "id": "Lead Source",
        "module": "CRM",
        "columns": [
            {
                "name": "ID",
                "id": "name",
                "format": "Data"
            },
            {
                "name": "Source Name",
                "id": "source_name",
                "format": "Data"
            }
        ]
    }
]

export const relationships: PostgresRelationship[] = [
    {
        "id": "Opportunity_opportunity_type",
        "source_table_name": "Opportunity",
        "source_column_name": "opportunity_type",
        "target_table_name": "Opportunity Type",
        "target_column_name": "name"
    },
    {
        "id": "Opportunity_sales_stage",
        "source_table_name": "Opportunity",
        "source_column_name": "sales_stage",
        "target_table_name": "Sales Stage",
        "target_column_name": "name"
    },
    {
        "id": "Opportunity_items",
        "source_table_name": "Opportunity",
        "source_column_name": "items",
        "target_table_name": "Opportunity Item",
        "target_column_name": "name"
    },
    {
        "id": "Opportunity_source",
        "source_table_name": "Opportunity",
        "source_column_name": "source",
        "target_table_name": "Lead Source",
        "target_column_name": "name"
    },
    {
        "id": "Opportunity_campaign",
        "source_table_name": "Opportunity",
        "source_column_name": "campaign",
        "target_table_name": "Campaign",
        "target_column_name": "name"
    },
    {
        "id": "Opportunity_amended_from",
        "source_table_name": "Opportunity",
        "source_column_name": "amended_from",
        "target_table_name": "Opportunity",
        "target_column_name": "name"
    },
    {
        "id": "Opportunity_market_segment",
        "source_table_name": "Opportunity",
        "source_column_name": "market_segment",
        "target_table_name": "Market Segment",
        "target_column_name": "name"
    },
    {
        "id": "Opportunity_notes",
        "source_table_name": "Opportunity",
        "source_column_name": "notes",
        "target_table_name": "CRM Note",
        "target_column_name": "name"
    },
    {
        "id": "Prospect_market_segment",
        "source_table_name": "Prospect",
        "source_column_name": "market_segment",
        "target_table_name": "Market Segment",
        "target_column_name": "name"
    },
    {
        "id": "Prospect_opportunities",
        "source_table_name": "Prospect",
        "source_column_name": "opportunities",
        "target_table_name": "Prospect Opportunity",
        "target_column_name": "name"
    },
    {
        "id": "Prospect_leads",
        "source_table_name": "Prospect",
        "source_column_name": "leads",
        "target_table_name": "Prospect Lead",
        "target_column_name": "name"
    },
    {
        "id": "Prospect_notes",
        "source_table_name": "Prospect",
        "source_column_name": "notes",
        "target_table_name": "CRM Note",
        "target_column_name": "name"
    },
    {
        "id": "Prospect Opportunity_opportunity",
        "source_table_name": "Prospect Opportunity",
        "source_column_name": "opportunity",
        "target_table_name": "Opportunity",
        "target_column_name": "name"
    },
    {
        "id": "Prospect Lead_lead",
        "source_table_name": "Prospect Lead",
        "source_column_name": "lead",
        "target_table_name": "Lead",
        "target_column_name": "name"
    },
    {
        "id": "Lead_source",
        "source_table_name": "Lead",
        "source_column_name": "source",
        "target_table_name": "Lead Source",
        "target_column_name": "name"
    },
    {
        "id": "Lead_campaign_name",
        "source_table_name": "Lead",
        "source_column_name": "campaign_name",
        "target_table_name": "Campaign",
        "target_column_name": "name"
    },
    {
        "id": "Lead_market_segment",
        "source_table_name": "Lead",
        "source_column_name": "market_segment",
        "target_table_name": "Market Segment",
        "target_column_name": "name"
    },
    {
        "id": "Lead_notes",
        "source_table_name": "Lead",
        "source_column_name": "notes",
        "target_table_name": "CRM Note",
        "target_column_name": "name"
    },
    {
        "id": "Campaign_campaign_schedules",
        "source_table_name": "Campaign",
        "source_column_name": "campaign_schedules",
        "target_table_name": "Campaign Email Schedule",
        "target_column_name": "name"
    }
]
export default tables;