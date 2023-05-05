/** This is property types that are supported by Screeb. */
export type PropertyType = number | boolean | string | Date | PropertyRecord;

/** This is a property object that are supported by Screeb. */
export type PropertyRecord = {
  [key: string]: PropertyType | PropertyType[];
};

/** This is the Screeb tag options object. */
export type ScreebOptions = {
  /** If you're running Screeb tag in an iframe, please set the inner window here. */
  window?: Window;
  /** Please don't do this. */
  screebEndpoint?: string;
};

// eslint-disable-next-line no-unused-vars
type ScreebFunction = (..._: unknown[]) => void | Promise<unknown>;

export type ScreebObject = ScreebFunction & { q?: unknown[][] };

declare const window: Window & { $screeb?: ScreebObject };
declare const $screeb: ScreebObject;

const SCREEB_TAG_ENDPOINT = "https://t.screeb.app/tag.js";

let _window = window;

/**
 * Appends Screeb tag into your dom.
 *
 * @param options Screeb module options.
 * @param options.window If you're running Screeb tag in an iframe, please set the inner window here.
 * @param options.screebEndpoint Please don't do this.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.load();
 * ```
 */
export const load = (options: ScreebOptions = {}) =>
  new Promise<undefined>((resolve, reject) => {
    _window = options.window ?? window;

    const scriptElement = document.createElement("script");

    scriptElement.async = true;
    scriptElement.src = options.screebEndpoint ?? SCREEB_TAG_ENDPOINT;

    scriptElement.addEventListener("load", () => resolve(undefined));
    scriptElement.addEventListener("error", reject);

    _window.$screeb =
      _window.$screeb ??
      function (...args) {
        if (_window.$screeb) {
          (_window.$screeb.q = _window.$screeb.q ?? []).push(args);
        }
      };

    _window.document.head.appendChild(scriptElement);
  });

/**
 * Initializes Screeb tag.
 *
 * @param websiteId Your website/channel id.
 * @param visitorId The unique identifier of your visitor.
 * @param visitorProperties The properties of your visitor.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date
 * ```
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.init(
 *   "<your-website-id>",
 *   "<your-visitor-id>",
 *   {
 *     firstname: '<user-firstname>',
 *     lastname: '<user-lastname>',
 *     plan: '<user-plan>',
 *     last_seen_at: new Date(),
 *     authenticated: true
 *   }
 * );
 * ```
 */
export const init = (
  websiteId: string,
  visitorId?: string,
  visitorProperties?: PropertyRecord
) => {
  let identityObject;

  if (visitorId || visitorProperties) {
    identityObject = {
      identity: {
        id: visitorId,
        properties: visitorProperties,
      },
    };
  }

  return $screeb("init", websiteId, identityObject);
};

/**
 * Checks if Screeb tag has been loaded.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * console.log(Screeb.isLoaded()); // false
 * Screeb.load();
 * console.log(Screeb.isLoaded()); // true
 * ```
 */
export const isLoaded = () => $screeb && typeof $screeb === "function";

/**
 * Shutdowns current Screeb session.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.close();
 * ```
 */
export const close = () => $screeb("close");

/**
 * Prints the actual state information of Screeb tag.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.debug();
 * // ******************* SCREEB SESSION DEBUG *********************
 * // Screeb channel id: <UUID>
 * // Screeb channel type: widget
 * // Screeb respondent id: <UUID>
 * // Screeb survey id: none
 * // Screeb response id: none
 * //
 * // Screeb current session start: Thu May 04 2023 16:53:49 GMT+0200 (Central European Summer Time)
 * // Screeb current session last activity: Thu May 04 2023 17:41:30 GMT+0200 (Central European Summer Time)
 * //
 * // Screeb targeting engine status: disabled
 * // Screeb targeting engine: 3 surveys
 * //
 * // Detected platform: desktop
 * // Detected locale: en-GB
 * // Detected timezone: -120
 * // **************************************************************
 * ```
 */
export const debug = () => $screeb("debug");

/**
 * Tracks a visitor event.
 *
 * @param eventName The event name.
 * @param eventProperties The properties of your event.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date.
 * ```
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.init(
 *   "event.track",
 *   "Product added to cart",
 *   {
 *     product_name: 'Red bike 2021',
 *     category: 'sport',
 *     color: 'red',
 *     price: 299,
 *     count: 1,
 *     reference: '2CF093TG1',
 *     delivery_method: 'UPS',
 *     user_logged: false,
 *     added_at: new Date(),
 *   }
 * );
 * ```
 */
export const eventTrack = (
  eventName: string,
  eventProperties?: PropertyRecord
) => $screeb("event.track", eventName, eventProperties);

/**
 * Change the current visitor identity.
 * Warning: Running surveys will be closed.
 *
 * @param visitorId The unique identifier of your visitor.
 * @param visitorProperties The properties of your visitor.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date.
 * ```
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.identity(
 *   "<your-visitor-id>",
 *   {
 *     firstname: '<user-firstname>',
 *     lastname: '<user-lastname>',
 *     plan: '<user-plan>',
 *     last_seen_at: new Date(),
 *     authenticated: true
 *   }
 * );
 * ```
 */
export const identity = (
  visitorId: string,
  visitorProperties?: PropertyRecord
) => $screeb("identity", visitorId, visitorProperties);

type ScreebIdentityGetReturn = {
  anonymous_id: string;
  user_id: string;
  session_id: string;
  session_start: string;
  session_end: string;
  channel_id: string;
  is_ready: boolean;
};

/**
 * Retrieves the current visitor identity.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * console.log(await Screeb.identityGet());
 * // {
 * //   anonymous_id: "<UUID>",
 * //   user_id: "<UUID>",
 * //   session_id: "<UUID>",
 * //   session_start: "2023-05-04T16:30:15.882Z",
 * //   session_end: "2023-05-04T17:02:09.087Z",
 * //   channel_id: "<UUID>",
 * //   is_ready: true,
 * // }
 * ```
 */
export const identityGet = (): Promise<ScreebIdentityGetReturn> =>
  $screeb("identity.get") as Promise<ScreebIdentityGetReturn>;

/**
 * Assigns the current visitor to a group.
 *
 * @param groupName
 * @param groupType
 * @param groupProperties The properties of your visitor group.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date.
 * ```
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.identityGroupAssign(
 *   'company',
 *   'Apple',
 *   {
 *     address_line_1: 'Apple Campus',
 *     address_line_2: '1 Infinite Loop',
 *     city: 'Cupertino',
 *     zipcode: 95014,
 *     state: 'California',
 *     country: 'United states',
 *   }
 * );
 * ```
 */
export const identityGroupAssign = (
  groupName: string,
  groupType?: string,
  groupProperties?: PropertyRecord
) => $screeb("identity.group.assign", groupType, groupName, groupProperties);

/**
 * Unassigns the current visitor to a group.
 *
 * @param groupName The name of your visitor group.
 * @param groupType The type of your visitor group.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.identityGroupUnassign('company', 'Apple');
 * ```
 */
export const identityGroupUnassign = (groupName: string, groupType?: string) =>
  $screeb("identity.group.unassign", groupType, groupName);

/**
 * Adds properties to the current visitor identity.
 *
 * @param visitorProperties The properties of your visitor.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date.
 * ```
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * // Set visitor properties
 * Screeb.identityProperties(
 *   {
 *     firstname: '<user-firstname>',
 *     lastname: '<user-lastname>',
 *     plan: '<user-plan>',
 *     last_seen_at: new Date(),
 *     authenticated: true
 *   }
 * );
 *
 * // Delete visitor property : set values to null
 * Screeb.identityProperties(
 *   {
 *     age: null,
 *     company: null,
 *     logged: true,
 *   }
 * );
 * ```
 */
export const identityProperties = (visitorProperties: PropertyRecord) =>
  $screeb("identity.properties", visitorProperties);

/**
 * Resets the current visitor identity.
 * Warning: This command must be called only once, since it creates a new identity on Screeb side.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.identityReset();
 * ```
 */
export const identityReset = () => $screeb("identity.reset");

/**
 * Interrupts a running survey.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.surveyClose();
 * ```
 */
export const surveyClose = () => $screeb("survey.close");

/**
 * Starts a survey by its ID.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.surveyStart(
 *   '<UUID>',
 *   false,
 *   {
 *     color: "green",
 *     article_id: 42
 *   }
 * );
 * ```
 */
export const surveyStart = (
  surveyId: string,
  allowMultipleResponses = false,
  hiddenFields: PropertyRecord = {}
) =>
  $screeb("survey.start", surveyId, {
    allow_multiple_responses: allowMultipleResponses,
    hidden_fields: hiddenFields,
  });

/**
 * Forces a targeting check.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.targetingCheck();
 * ```
 */
export const targetingCheck = () => $screeb("targeting.check");

/**
 * Prints the current state of the targeting engine.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.targetingDebug();
 * // targeting ************ SCREEB TARGETING RULES DEBUG **************
 * // Disabled surveys are not listed here.
 * //
 * // Screeb channel id: <UUID>
 * // Screeb respondent id: <UUID>
 * //
 * // Survey <UUID>:
 * // https://admin.screeb.app/org/last/survey/<UUID>/share
 * //
 * //   - Rule of type "Device type (desktop/mobile/tablet)": true 🟢
 * //   - Rule of type "Multiple display": true 🟢
 * //   - Rule of type "Capping per time between survey display on current respondent": true 🟢
 * //   - Rule of type "User event count": false 🔴
 * //   - Rule of type "Capping per respondent display count": false 🔴
 * ```
 */
export const targetingDebug = () => $screeb("targeting.debug");

/**
 * Starts the targeting engine.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.targetingStart();
 * ```
 */
export const targetingStart = () => $screeb("targeting.start");

/**
 * Stops the targeting engine.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.targetingStop();
 * ```
 */
export const targetingStop = () => $screeb("targeting.stop");
