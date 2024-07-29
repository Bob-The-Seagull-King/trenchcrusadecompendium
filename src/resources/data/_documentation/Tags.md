# TAGS

A tag is the name given to a way to structure data for use in scenarios in which we want a flexible way to identify a given data object in many different ways. Tags are intended to be used regularly whenever we need to give an object a variety of bits of information that may not apply to all instances of that type.

For example, not all models are ELITE, not all models cause FEAR, and not all models are STRONG. Rather than having an "ELITE", "FEAR", and "STRING" attribute in every model (which would leave a lot of redundancy) we simply apply an attack, interrupt, or stance tag when applicable - and check for the presence of that tag when needed.

## Structure

Tags are found in many json files and use the following structure.

```
tag_name: string
val: any
```

- **tag_name** - The identity of the tag, useful for checking if a tag is associated with a given object, has a wide variety of applications (see [below](#tag_name-types)) depending on where the tag is used.
- **val** - The value of the tag, should ideally be limited to integer and string values only.

## Tag_Name types

| Name              | Use Case    |
| ----------------- | ----------------- |
| category          | Determining what kind of rule a glossary term is. |
| desc_type         | Shows how to render a description component. |
| action            | Tells how many actions an model takes. |
| type              | Tells if an model is an attack, interrupt, stance, etc. |
| inflict           | Shows that an model causes this to it's targets. |
| attack            | Says an model is an attack, and any potential boons/curses. |
| blast_size        | Tells the size of a blast it creates. |
| blast_distance    | Tells the range of a blast it creates. |
| interrupt         | Says an model is an interrupt, any how many times it can be used a round. |
| range             | Tells the range of an model. |