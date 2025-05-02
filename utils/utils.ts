import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
    type: "error" | "success",
    path: string,
    message: string
) {
    return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export interface MessageHandlerProps {
    status: "error" | "success";
    text: string;
}
export function messageHandler({ status, text }: MessageHandlerProps) {
    return {
        status,
        text,
    };
}

export function combineDateAndTime(date?: string, time?: string): string {
    if (!date && !time) {
        return "";
    }

    let newDate = new Date();

    // If date is provided, parse it
    if (date) {
        newDate = new Date(date);
    }

    // If time is provided, update the hours and minutes
    if (time) {
        const [hour, minute] = time.split(":").map(Number);
        newDate.setHours(hour);
        newDate.setMinutes(minute);
    }

    // Set seconds and milliseconds to zero to match the format
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    // Return the date and time as an ISO string
    return newDate.toISOString();
}

export function splitDateAndTime(isoString?: string): {
    date: string;
    time: string;
} {
    if (!isoString) {
        return { date: "", time: "" };
    }

    const dateObj = new Date(isoString);

    // Format date as YYYY-MM-DD
    const date = dateObj.toISOString().slice(0, 10);

    // Format time as HH:MM
    const time = dateObj.toISOString().slice(11, 16);

    return { date, time };
}

export function isEmptyString({ val }: { val: string }): Boolean {
    if (!val) {
        return true;
    }
    return false;
}
