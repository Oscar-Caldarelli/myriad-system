import MyriadSystemActorBase from "./base-actor.mjs";

export default class MyriadSystemCharacter extends MyriadSystemActorBase {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const baseSchema = super.defineSchema();

    // Define characteristics schema
    const characteristicFields = {};
    if (CONFIG.MYRIAD_SYSTEM?.characteristics) {
      for (const [key] of Object.entries(CONFIG.MYRIAD_SYSTEM.characteristics)) {
        characteristicFields[key] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 50, min: 0, max: 100 }),
          max: new fields.NumberField({ ...requiredInteger, initial: 100, min: 0, max: 200 }),
          bonus: new fields.NumberField({ ...requiredInteger, initial: 0 }),
          malus: new fields.NumberField({ ...requiredInteger, initial: 0 })
        });
      }
    }

    // Override the base health schema with character-specific values
    baseSchema.health = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 50, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 50, min: 0 }),
      _previousPuissance: new fields.NumberField({ initial: 0 }) // For tracking puissance changes
    });

    // Create a new object that includes both the base schema and our additions
    return foundry.utils.mergeObject(baseSchema, {
      attributes: new fields.SchemaField({
        level: new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 1 })
        })
      }),
      characteristics: new fields.SchemaField(characteristicFields),
      // XP tracking
      xp: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }), // Spent XP
        earned: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }), // Total earned XP
        unspent: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }) // Calculated field: earned - spent
      })
    });
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    
    // Loop through characteristic scores, and add their modifiers to our sheet output.
    if (this.characteristics) {
      for (let [key, characteristic] of Object.entries(this.characteristics)) {
        // Calculate the modifier using d20 rules.
        characteristic.mod = Math.floor((characteristic.value - 10) / 2);
        // Handle characteristic label localization.
        characteristic.label = game.i18n.localize(CONFIG.MYRIAD_SYSTEM.characteristics?.[key]) ?? key;
      }
    }
  }

  getRollData() {
    const data = {};

    // Copy the characteristic scores to the top level, so that rolls can use
    // formulas like `@puissance.mod + 4`.
    if (this.characteristics) {
      for (let [k, v] of Object.entries(this.characteristics)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes?.level?.value ?? 0;

    return data;
  }
}