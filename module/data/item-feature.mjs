import MyriadSystemItemBase from "./base-item.mjs";

export default class MyriadSystemFeature extends MyriadSystemItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const baseSchema = super.defineSchema();

    // Add feature-specific fields (same as competence)
    const featureSchema = {
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
        max: new fields.NumberField({ ...requiredInteger, initial: 5, min: 1, max: 5 })
      }),
      grade: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
      xpCost: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
      isUnique: new fields.BooleanField({ initial: false }) // Whether this is a unique ability vs. a standard feature
    };

    return foundry.utils.mergeObject(baseSchema, featureSchema);
  }

}