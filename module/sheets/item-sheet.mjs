import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {foundry.appv1.sheets.ItemSheet}
 */
export class MyriadSystemItemSheet extends foundry.appv1.sheets.ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['myriad-system', 'sheet', 'item'],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    const path = 'systems/myriad-system/templates/item';
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.hbs`;

    // Map competence type to feature template since they're now unified
    const itemType = this.item.type === 'competence' ? 'feature' : this.item.type;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.hbs`.
    return `${path}/item-${itemType}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = await super.getData();

    // Add the item's data to context.item for easier access
    context.item = this.item;

    // Enrich description info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.item.system.description,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        async: true,
        // Data to fill in for inline rolls
        rollData: this.item.getRollData(),
        // Relative UUID resolution
        relativeTo: this.item,
      }
    );

    // Add the item's system data and flags for easier access
    context.system = this.item.system;
    context.flags = this.item.flags;

    // Adding a pointer to CONFIG.MYRIAD_SYSTEM
    context.config = CONFIG.MYRIAD_SYSTEM;

    // Prepare active effects for easier access
    context.effects = prepareActiveEffectCategories(this.item.effects);

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;
    
    // Gestion des prérequis
    html.on('click', '.add-prerequisite', this._onAddPrerequisite.bind(this));
    html.on('click', '.delete-prerequisite', this._onDeletePrerequisite.bind(this));

    // Gestion des pips de grade
    html.on('click', '.grade-pip', this._onGradePipClick.bind(this));

    // Active Effect management
    html.on('click', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );
  }
  
  /**
   * Gestion du clic sur un pip de grade
   * @param {Event} event - L'événement déclencheur
   * @private
   */
  async _onGradePipClick(event) {
    event.preventDefault();
    const gradePip = event.currentTarget;
    const gradeValue = Number(gradePip.dataset.grade);
    
    // Mise à jour du grade dans le système
    await this.item.update({ 'system.grade': gradeValue });
  }
  
  /**
   * Gestion de l'ajout d'un prérequis
   * @param {Event} event - L'événement déclencheur
   * @private
   */
  async _onAddPrerequisite(event) {
    event.preventDefault();
    const prerequisites = this.item.system.acquisition?.prerequisites || [];
    return this.item.update({ 'system.acquisition.prerequisites': [...prerequisites, ''] });
  }
  
  /**
   * Gestion de la suppression d'un prérequis
   * @param {Event} event - L'événement déclencheur
   * @private
   */
  async _onDeletePrerequisite(event) {
    event.preventDefault();
    const index = Number(event.currentTarget.dataset.index);
    const prerequisites = [...(this.item.system.acquisition?.prerequisites || [])];
    prerequisites.splice(index, 1);
    return this.item.update({ 'system.acquisition.prerequisites': prerequisites });
  }
  
  /**
   * Gestion de l'ajout d'un prérequis
   * @param {Event} event - L'événement déclencheur
   * @private
   */
  async _onAddPrerequisite(event) {
    event.preventDefault();
    const prerequisites = this.item.system.acquisition?.prerequisites || [];
    return this.item.update({ 'system.acquisition.prerequisites': [...prerequisites, ''] });
  }
  
  /**
   * Gestion de la suppression d'un prérequis
   * @param {Event} event - L'événement déclencheur
   * @private
   */
  async _onDeletePrerequisite(event) {
    event.preventDefault();
    const index = Number(event.currentTarget.dataset.index);
    const prerequisites = [...(this.item.system.acquisition?.prerequisites || [])];
    prerequisites.splice(index, 1);
    return this.item.update({ 'system.acquisition.prerequisites': prerequisites });
  }
}
