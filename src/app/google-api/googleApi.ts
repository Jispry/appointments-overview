import { InjectionToken } from '@angular/core';

export let GOOGLEAPI_TOKEN = new InjectionToken('gapi');
export let APICONFIG_TOKEN = new InjectionToken<ClientSettings>('api-config');
export let KALENDARID_TOKEN = new InjectionToken<string>('kalendarId');

export interface GoogleApi {
    client: Client;
    auth2: Auth2;
    /**
     * Pragmatically initialize gapi class member.
     */
    load(object: string, fn: any): any;
}

interface Client {
    calendar: CalendarApi;
    init(settings: ClientSettings): Promise<any>;
}

export interface ClientSettings {
    apiKey: string;
    discoveryDocs: Array<string>;
    clientId: string;
    scope: string;
}

interface Auth2 {
    getAuthInstance(): AuthInstance;
}

interface AuthInstance {
    isSignedIn: IsSignedIn;
    signIn(): void;
    signOut(): void;
}

interface IsSignedIn {
    listen(callback: any);
    get(): boolean;
}

interface CalendarApi {
    events: CalendarEvents;
}

interface CalendarEvents {
    list(CalendarQuery): Promise<CalendarListResponse>;
}

interface Creator {
    email: string;
}

export interface CalendarQuery {
    calendarId: string;
    timeMin?: string;
    timeMax?: string;
    showDeleted?: boolean;
    maxResults?: number;
    orderBy?: string;
}

interface CalendarListResponse {
    result: CalendarListResult;
    body: string;
    headers: any;
}

interface CalendarListResult {
    kind: string;
    etag: any;
    summary: string;
    description: string;
    updated: Date;
    timeZone: string;
    accessRole: string;
    defaultReminders: [
        {
            method: string,
            minutes: number
        }
    ];
    items: Array<CalendarEvent>;
};

export interface CalendarEvent {
    attendees: Array<any>;
    created: string;
    creator: Creator;
    end: DateObject;
    etag: any;
    hangoutLink: string;
    htmlLink: string;
    iCalUID: string;
    id: string;
    kind: string;
    organizer: any;
    reminders: any;
    sequence: any;
    start: DateObject;
    status: string;
    summary: string;
    updated: string;
};

export interface DateObject {
    dateTime?: string;
    date?: string;
}
