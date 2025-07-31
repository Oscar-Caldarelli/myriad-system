import MyriadSystemItemBase from "./base-item.mjs";

export default class MyriadSystemItemVoie extends MyriadSystemItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const baseSchema = super.defineSchema();

    // Add voie-specific fields
    const voieSchema = {
      grade: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
      xpCost: new fields.NumberField({ ...requiredInteger, initial: 15, min: 0 }),
      components: new fields.SchemaField({
        competences: new fields.ArrayField(new fields.ObjectField()),
        arts: new fields.ArrayField(new fields.ObjectField()),
        domains: new fields.ArrayField(new fields.ObjectField()),
        objects: new fields.ArrayField(new fields.ObjectField())
      }),
      bonusCharacteristics: new fields.SchemaField({
        puissance: new fields.NumberField({ initial: 0 }),
        coordination: new fields.NumberField({ initial: 0 }),
        ingeniosite: new fields.NumberField({ initial: 0 }),
        perspicacite: new fields.NumberField({ initial: 0 })
      }),
      malusCharacteristics: new fields.SchemaField({
        puissance: new fields.NumberField({ initial: 0 }),
        coordination: new fields.NumberField({ initial: 0 }),
        ingeniosite: new fields.NumberField({ initial: 0 }),
        perspicacite: new fields.NumberField({ initial: 0 })
      })
    };

    return foundry.utils.mergeObject(baseSchema, voieSchema);
  }

}
