# Request Structures

Different types of Data Responder requests use a different format for the necessary JSON request object. Below is an explination of each request type and their relevant request structure.

## Single Entry

```
type    : string
id      : string
```
- **type** - The [file type](./Data_Responder.md#files-hooked-up-to-dataresponder) to be searched through.
- **id** - The desired *id* value for the data object we want returned.

## Full Data

```
type    : string
```
- **type** - The [file type](./Data_Responder.md#files-hooked-up-to-dataresponder) to be searched through.

## All Of Key

```
type    : string
id      : string
```
- **type** - The [file type](./Data_Responder.md#files-hooked-up-to-dataresponder) to be searched through.
- **id** - The name of the *key* that is being searched.

## All Tags

```
type    : string
```
- **type** - The [file type](./Data_Responder.md#files-hooked-up-to-dataresponder) to be searched through.

## Complex Search
```
type    : string
request : IDataRequestSearchParam
```
- **type** - The [file type](./Data_Responder.md#files-hooked-up-to-dataresponder) to be searched through.
- **request** - The complex request (see below) for the search.

### IDataRequestSearchParam

```
operator    : string
terms       : IDataRequestSearchTerm[]
subparams   : IDataRequestSearchParam[]
```
- **operator** - Can be either "and" or "or" and determines how the truth of the parameter is resolved (based on the outcome of terms and subparams).
- **terms** - Array of search terms, these are the base components of a complex search.
- **subparams** - Array of search parameters. Subparameters are resolves separately before the total truth value of the parameter is decided.

### IDataRequestSearchTerm

```
item        : string
value       : any
equals      : boolean
strict      : boolean
istag?      : boolean
tagvalue?   : any
```
- **item** - The key that is being searched
- **value** - The expected value of that key
- **equals** - Determines if the search returns true or false upon a successful match.
- **strict** - Determines if the search requires an exact match.
- **istag** - Optional, if true then the search travel through the tags of an object.
    - *value* is the expected tag_name.
- **tagvalue** - Optional, if non-null then the tag search checks the *val* of tags in addition to if the tag exists.