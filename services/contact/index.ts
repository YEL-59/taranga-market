"use server";

const NEXT_PUBLIC_BASE_API = "https://raymondred.thesyndicates.team/api";

export interface ContactResponse {
    success: boolean;
    message: string;
    data: any;
}

export interface ContactData {
    full_name: string;
    email: string;
    phone?: string;
    subject_id: number;
    message: string;
}

export const contactUsService = async (data: ContactData): Promise<ContactResponse> => {
    try {
        const formData = new FormData();
        formData.append("full_name", data.full_name);
        formData.append("email", data.email);
        if (data.phone) {
            formData.append("phone", data.phone);
        }
        formData.append("subject_id", data.subject_id.toString());
        formData.append("message", data.message);

        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/contact-us`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body: formData,
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            return {
                success: false,
                message: responseData.message || `Failed to send message: ${response.status}`,
                data: null
            };
        }

        return {
            success: true,
            message: responseData.message || "Message sent successfully!",
            data: responseData.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "An unexpected error occurred",
            data: null
        };
    }
};
