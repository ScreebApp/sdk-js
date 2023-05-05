@screeb/sdk-browser

# @screeb/sdk-browser

## Table of contents

### Type Aliases

- [PropertyRecord](README.md#propertyrecord)
- [PropertyType](README.md#propertytype)
- [ScreebOptions](README.md#screeboptions)

### Functions

- [close](README.md#close)
- [debug](README.md#debug)
- [eventTrack](README.md#eventtrack)
- [identity](README.md#identity)
- [identityGet](README.md#identityget)
- [identityGroupAssign](README.md#identitygroupassign)
- [identityGroupUnassign](README.md#identitygroupunassign)
- [identityProperties](README.md#identityproperties)
- [identityReset](README.md#identityreset)
- [init](README.md#init)
- [isLoaded](README.md#isloaded)
- [load](README.md#load)
- [surveyClose](README.md#surveyclose)
- [surveyStart](README.md#surveystart)
- [targetingCheck](README.md#targetingcheck)
- [targetingDebug](README.md#targetingdebug)
- [targetingStart](README.md#targetingstart)
- [targetingStop](README.md#targetingstop)

## Type Aliases

### PropertyRecord

Ƭ **PropertyRecord**: `Object`

#### Index signature

▪ [key: `string`]: [`PropertyType`](README.md#propertytype) \| [`PropertyType`](README.md#propertytype)[]

#### Defined in

index.ts:12

___

### PropertyType

Ƭ **PropertyType**: `number` \| `boolean` \| `string` \| `Date` \| [`PropertyRecord`](README.md#propertyrecord)

#### Defined in

index.ts:9

___

### ScreebOptions

Ƭ **ScreebOptions**: `Object`

This is the Screeb tag options.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `screebEndpoint?` | `string` |
| `window?` | `Window` |

#### Defined in

index.ts:19

## Functions

### close

▸ **close**(): `void` \| `Promise`<`unknown`\>

Shutdowns current Screeb session.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.close();
```

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:146

___

### debug

▸ **debug**(): `void` \| `Promise`<`unknown`\>

Prints the actual state information of Screeb tag.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.debug();
// ******************* SCREEB SESSION DEBUG *********************
// Screeb channel id: <UUID>
// Screeb channel type: widget
// Screeb respondent id: <UUID>
// Screeb survey id: none
// Screeb response id: none
//
// Screeb current session start: Thu May 04 2023 16:53:49 GMT+0200 (Central European Summer Time)
// Screeb current session last activity: Thu May 04 2023 17:41:30 GMT+0200 (Central European Summer Time)
//
// Screeb targeting engine status: disabled
// Screeb targeting engine: 3 surveys
//
// Detected platform: desktop
// Detected locale: en-GB
// Detected timezone: -120
// **************************************************************
```

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:178

___

### eventTrack

▸ **eventTrack**(`eventName`, `eventProperties?`): `void` \| `Promise`<`unknown`\>

Tracks a visitor event.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.init(
  "event.track",
  "Product added to cart",
  {
    product_name: 'Red bike 2021',
    category: 'sport',
    color: 'red',
    price: 299,
    count: 1,
    reference: '2CF093TG1',
    delivery_method: 'UPS',
    user_logged: false,
    added_at: new Date(),
  }
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The event name. |
| `eventProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your event. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:215

___

### identity

▸ **identity**(`visitorId`, `visitorProperties?`): `void` \| `Promise`<`unknown`\>

Change the current visitor identity.
Warning: Running surveys will be closed.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identity(
  "<your-visitor-id>",
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  }
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `visitorId` | `string` | The unique identifier of your visitor. |
| `visitorProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your visitor. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:251

___

### identityGet

▸ **identityGet**(): `void` \| `Promise`<`unknown`\>

Retrieves the current visitor identity.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

console.log(await Screeb.identityGet());
// {
//   anonymous_id: "<UUID>",
//   user_id: "<UUID>",
//   session_id: "<UUID>",
//   session_start: "2023-05-04T16:30:15.882Z",
//   session_end: "2023-05-04T17:02:09.087Z",
//   channel_id: "<UUID>",
//   is_ready: true,
// }
```

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:324

___

### identityGroupAssign

▸ **identityGroupAssign**(`groupName`, `groupType?`, `groupProperties?`): `void` \| `Promise`<`unknown`\>

Assigns the current visitor to a group.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityGroupAssign(
  'company',
  'Apple',
  {
    address_line_1: 'Apple Campus',
    address_line_2: '1 Infinite Loop',
    city: 'Cupertino',
    zipcode: 95014,
    state: 'California',
    country: 'United states',
  }
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` | The name of your visitor group. |
| `groupType?` | `string` | The type of your visitor group. |
| `groupProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your visitor group. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:359

___

### identityGroupUnassign

▸ **identityGroupUnassign**(`groupName`, `groupType?`): `void` \| `Promise`<`unknown`\>

Unassigns the current visitor to a group.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityGroupUnassign('company', 'Apple');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` | The name of your visitor group. |
| `groupType?` | `string` | The type of your visitor group. |

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:385

___

### identityProperties

▸ **identityProperties**(`visitorProperties`): `void` \| `Promise`<`unknown`\>

Adds properties to the current visitor identity.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityProperties(
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  }
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `visitorProperties` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your visitor. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:284

___

### identityReset

▸ **identityReset**(): `void` \| `Promise`<`unknown`\>

Resets the current visitor identity.
Warning: This command must be called only once, since it creates a new identity on Screeb side.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityReset();
```

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:300

___

### init

▸ **init**(`websiteId`, `visitorId?`, `visitorProperties?`): `void` \| `Promise`<`unknown`\>

Initializes Screeb tag.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.init(
  "<your-website-id>",
  "<your-visitor-id>",
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  }
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `websiteId` | `string` | Your website/channel id. |
| `visitorId?` | `string` | The unique identifier of your visitor. |
| `visitorProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your visitor. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:117

___

### isLoaded

▸ **isLoaded**(): `boolean`

Checks if Screeb tag has been loaded.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

console.log(Screeb.isLoaded()); // false
Screeb.load();
console.log(Screeb.isLoaded()); // true
```

#### Returns

`boolean`

#### Defined in

index.ts:85

___

### load

▸ **load**(`options?`): `Promise`<`unknown`\>

Appends Screeb tag into your dom.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.load();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ScreebOptions`](README.md#screeboptions) | Screeb module options. |

#### Returns

`Promise`<`unknown`\>

#### Defined in

index.ts:52

___

### surveyClose

▸ **surveyClose**(): `void` \| `Promise`<`unknown`\>

Interrupts a running survey.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.surveyClose();
```

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:403

___

### surveyStart

▸ **surveyStart**(`surveyId`, `allowMultipleResponses?`, `hiddenFields?`): `void` \| `Promise`<`unknown`\>

Starts a survey by its ID.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.surveyStart(
  '<UUID>',
  {
    hidden_fields: {
      color: "green",
      article_id: 42
    }
  }
);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `surveyId` | `string` | `undefined` | The id of the survey to start. |
| `allowMultipleResponses` | `boolean` | `false` | If true, displays again the survey to users that has already replied. |
| `hiddenFields` | [`PropertyRecord`](README.md#propertyrecord) | `{}` | Values that will be listed alongside your survey answers. |

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:429

___

### targetingCheck

▸ **targetingCheck**(`clearServerCache?`): `void` \| `Promise`<`unknown`\>

Forces a targeting check.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.targetingCheck();
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `clearServerCache` | `boolean` | `false` | Clears the small chache that our backend have on server-side targeting checks. |

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:452

___

### targetingDebug

▸ **targetingDebug**(): `void` \| `Promise`<`unknown`\>

Prints the current state of the targeting engine.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.targetingDebug();
// targeting ************ SCREEB TARGETING RULES DEBUG **************
// Disabled surveys are not listed here.
//
// Screeb channel id: <UUID>
// Screeb respondent id: <UUID>
//
// Survey <UUID>:
// https://admin.screeb.app/org/last/survey/<UUID>/share
//
//   - Rule of type "Device type (desktop/mobile/tablet)": true 🟢
//   - Rule of type "Multiple display": true 🟢
//   - Rule of type "Capping per time between survey display on current respondent": true 🟢
//   - Rule of type "User event count": false 🔴
//   - Rule of type "Capping per respondent display count": false 🔴
```

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:481

___

### targetingStart

▸ **targetingStart**(): `void` \| `Promise`<`unknown`\>

Starts the targeting engine.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.targetingStart();
```

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:496

___

### targetingStop

▸ **targetingStop**(): `void` \| `Promise`<`unknown`\>

Stops the targeting engine.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.targetingStop();
```

#### Returns

`void` \| `Promise`<`unknown`\>

#### Defined in

index.ts:511
