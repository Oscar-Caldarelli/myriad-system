import MyriadSystemItemBase from "./base-item.mjs";

export default class MyriadSystemFeature extends MyriadSystemItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const baseSchema = super.defineSchema();

    // Schéma des compétences avec les valeurs essentielles
    const featureSchema = {
      // Grade de la compétence (I à V)
      grade: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
      // Indique si c'est une capacité passive/unique ou une aptitude standard
      isPassive: new fields.BooleanField({ initial: false }),
      // Tags pour catégoriser les compétences
      tags: new fields.ArrayField(new fields.StringField()),
      // Informations d'acquisition
      acquisition: new fields.SchemaField({
        prerequisites: new fields.ArrayField(new fields.StringField()),
        xpCost: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 })
      })
    };

    return foundry.utils.mergeObject(baseSchema, featureSchema);
  }

}