<h1 align="center">Trench Crusade Compendium</h1>


Welcome to the Trench Crusade Compendium, the free browser-reference tool for the Trench Crusade wargame. As an open source project, we're always open to new contributors to help with data entry and testing. Contact Bob (@KingOfSeagulls on twitter) to get added as a contributor.

## Suggestions and Bug Reporting

You can, in addition to messaging me on Twitter or Discord, fill out the [Trench Compendium Feedback](https://forms.gle/HKjwjfDCWSWdc2C68) form if you want to report a bug, incorrect data, or just suggest a new feature to be added.

As the compendium is purely a product of passion, I cannot garuntee anything will be added and that every bug will be squashed the day of - but I certainly try my best!

## Data Documentation

### Data Responder

The core of the compendium is a data search utility tool that parses a query and returns results within a set of data (stored as JSON) which match the requirements. Information on how queries are constructed can be found at the [Data Request Structure](./src/resources/data/_documentation/search_util/Request_Structure.md) page and how the tool searches can be found at the [Data Responder](./src/resources/data/_documentation/search_util/Data_Responder.md) page

### Data Structures

An array of data structures are used to represent the various aspects of Trench Crusade, you can view information on how they're built and example data below:
- [Injuries](./src/resources/data/_documentation/data_structures/general/Injuries.md)
- [Scenario Bases](./src/resources/data/_documentation/data_structures/general/ScenarioBases.md)
- [Scenario Deeds](./src/resources/data/_documentation/data_structures/general/ScenarioDeeds.md)
- [Scenario Deployment](./src/resources/data/_documentation/data_structures/general/ScenarioDeployment.md)
- [Scenarios](./src/resources/data/_documentation/data_structures/general/Scenarios.md)
- [Addons](./src/resources/data/_documentation/data_structures/Player/Addons.md)
- [Equipment](./src/resources/data/_documentation/data_structures/Player/Equipment.md)
- [Factions](./src/resources/data/_documentation/data_structures/Player/Factions.md)
- [Models](./src/resources/data/_documentation/data_structures/Player/Models.md)
- [Upgrades](./src/resources/data/_documentation/data_structures/Player/Upgrades.md)
- [Variants](./src/resources/data/_documentation/data_structures/Player/Variants.md)
- [Glossary](./src/resources/data/_documentation/data_structures/References/Glossary.md)
- [Quick Rules](./src/resources/data/_documentation/data_structures/References/QuickRules.md)
- [List Group](./src/resources/data/_documentation/data_structures/ListGroup.md)
- [List Partial Item](./src/resources/data/_documentation/data_structures/ListPartialItem.md)

Various core concepts are reused throughout the compendium data, these are explained in more depth below:
- [Description](./src/resources/data/_documentation/Description.md)
- [Rules](./src/resources/data/_documentation/Rules.md)
- [Tags](./src/resources/data/_documentation/Tags.md)

### Content Packs

Trench Compendium allows people to create custom Content Packs. Information on the individual data structures can be found above, and info on how to structure a Content Pack can be accessed on the [relevant documentation page](./src/resources/data/_documentation/ContentPack.md).