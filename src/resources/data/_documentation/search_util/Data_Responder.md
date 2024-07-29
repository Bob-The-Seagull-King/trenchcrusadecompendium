# Data Repsonder

The data responder is a utility class that can be called from external tools in order to search and filter data based on a flexible request system. This allows searching to be done reliably and safely, and exists as a possible vector for API integration.

Usage of the *DataResponder.ts* class must be **static** and it only responds to being given a special data format, documentation for which can be read [here](./Data_Responder.md).

Searching data directly is not prevented by the Data Responder, however it is reccomended to request improvements to the data responder rather than working directly with the data - that way we can all benefit from the collective needs of the community increasing the breadth of searches the data responder can handle.

## Files Hooked Up To DataResponder

All search requests have a *type* value which determines what json data file will be searched through for the search. Currently, the following files can be searched with the following types.

| File Name | Type Value |
| --------- | ---------- |
| models.json | "models" |
| addons.json | "addons" |
| equipment.json | "equipment" |
| factions.json | "faction" |
| variants.json | "variants" |
| glossary.json | "glossary" |
| scenarios.json | "scenario" |
| injuries.json | "injuries" |
| skills.json | "skills" |
| skillgroup.json | "skillgroup" |
| tablecharts.json | "tablechart" |
| tableresults.json | "tableresult" |
| quickrules.json | "quickrules" |
| upgrades.json | "upgrade" |
| gen_deeds.json | "genDeed" |
| gen_deployment.json | "genDeployment" |
| gen_scenario.json | "genScenario" |

## Search Options

Multiple types of search can be performed through the data responder. Simple searches exist to avoid uneccesary validation and iteration, improving overall performance.

- **GetSingleEntry()** This returns the first entry whose *id* value matches a specified *id*. If an entry with the requested id does not exist, it returns an empty JSON object {}. 

- **GetFullDataEntry()** This returns an array of all entries in the file whose [*type*](#files-hooked-up-to-dataresponder) matches the requested data type.

- **GetAllOfKeyInData()** This returns an array of all values for a given key that currently exist in the file. For example, if the key is "class_id", it will return an array of all different kinds of class_id that exist in the file.

- **GetAllTagsInData()** This returns an array of all the different kinds of tag (based on *tag_name*) that currently exist in the *tag* key of the given file. This does not distinguish between tags with the same *tag_name* but different *val*.

- **ComplexSearch()** This returns an array of all the entries of a given type that meet criteria that is dependant on the content of the *terms* and *subparams*. Complex searches can be based on key values, existance of tags, and can combine multiple AND and OR statements together.