import { redirect } from "next/navigation";
import { parse } from "path";

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

export function combineDateAndTime(dateStr?: string, timeStr?: string): string {
    if (!dateStr && !timeStr) {
        return "";
    }

    let date = new Date();

    if (dateStr) {
        date = new Date(dateStr);
    }

    if (!timeStr) {
        return date.toISOString();
    }

    const time = new Date(timeStr);

    date.setUTCHours(time.getUTCHours());
    date.setUTCMinutes(time.getUTCMinutes());
    date.setUTCSeconds(time.getUTCSeconds());
    date.setUTCMilliseconds(time.getUTCMilliseconds());

    return date.toISOString();
}

export function splitDateAndTime(isoString: string): {
    date: string;
    time: string;
} {
    const dateObj = new Date(isoString);

    if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid ISO date string");
    }

    const pad = (n: number) => n.toString().padStart(2, "0");

    const date = `${dateObj.getUTCFullYear()}-${pad(dateObj.getUTCMonth() + 1)}-${pad(dateObj.getUTCDate())}`;
    const time = `${pad(dateObj.getUTCHours())}:${pad(dateObj.getUTCMinutes())}:${pad(dateObj.getUTCSeconds())}`;

    return { date, time };
}

export function isEmptyString({ val }: { val: string }): Boolean {
    if (!val) {
        return true;
    }
    return false;
}
