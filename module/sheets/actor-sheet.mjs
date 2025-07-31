import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {foundry.appv1.sheets.ActorSheet}
 */
export class MyriadSystemActorSheet extends foundry.appv1.sheets.ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['myriad-system', 'sheet', 'actor'],
      width: 600,
      height: 600,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'features',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/myriad-system/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve the data structure from the base sheet.
    const context = await super.getData();

    // Add the actor's data to context.actor for easier access
    context.actor = this.actor;
    context.system = this.actor.system;
    context.flags = this.actor.flags;

    // Adding a pointer to CONFIG.MYRIAD_SYSTEM
    context.config = CONFIG.MYRIAD_SYSTEM;

    // Prepare character data and items.
    if (this.actor.type === 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (this.actor.type === 'npc') {
      this._prepareItems(context);
    }

    // Enrich biography info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedBiography = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.actor.system.biography,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        async: true,
        // Data to fill in for inline rolls
        rollData: this.actor.getRollData(),
        // Relative UUID resolution
        relativeTo: this.actor,
      }
    );

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Character-specific context modifications
   *
   * @param {object} context The context object to mutate
   */
  _prepareCharacterData(context) {
    try {
      // List all voies (paths) for the character
      context.allVoies = [...(context.paths || [])]; // Create a shallow copy
      
      // Calculate health points based on Puissance - don't modify system directly
      if (context.system.characteristics && context.system.characteristics.puissance) {
        const puissanceValue = Number(context.system.characteristics.puissance.value || 0);
        
        // Calculate health for display only (don't modify the actual system data)
        if (!context.system.health) {
          context.calculatedHealth = {
            value: puissanceValue,
            max: puissanceValue
          };
        } else {
          context.calculatedHealth = {
            value: context.system.health.value !== undefined ? context.system.health.value : puissanceValue,
            max: context.system.health.max !== undefined ? context.system.health.max : puissanceValue
          };
        }
      }
      
      // Calculate total XP (earned and unspent) - don't modify system directly
      if (context.system.xp) {
        const earned = Number(context.system.xp.earned || 0);
        const spent = Number(context.system.xp.value || 0);
        context.calculatedXP = {
          earned: earned,
          spent: spent,
          unspent: Math.max(0, earned - spent)
        };
      }
      
      // Determine if magic points should be displayed (character has arts and domains)
      context.hasMagic = Boolean(
        (context.arts && context.arts.length > 0) && 
        (context.domains && context.domains.length > 0)
      );
      
      // Calculate total characteristic values including bonuses and maluses - don't modify system directly
      context.calculatedCharacteristics = {};
      if (context.system.characteristics) {
        for (const [key, characteristic] of Object.entries(context.system.characteristics)) {
          if (characteristic) {
            const value = Number(characteristic.value || 0);
            const bonus = Number(characteristic.bonus || 0);
            const malus = Number(characteristic.malus || 0);
            context.calculatedCharacteristics[key] = {
              ...characteristic,
              total: value + bonus - malus
            };
          }
        }
      }
    } catch (error) {
      console.error("Error in _prepareCharacterData:", error);
    }
  }

  /**
   * Organize and classify Items for Actor sheets.
   *
   * @param {object} context The context object to mutate
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const features = [];
    const skills = []; // was: competences
    const paths = [];  // was: voies
    const arts = [];
    const domains = [];
    const overflowItems = [];
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
      // Append to skills (competences).
      else if (i.type === 'competence' || i.type === 'skill') {
        skills.push(i);
      }
      // Append to paths (voies).
      else if (i.type === 'voie' || i.type === 'path') {
        paths.push(i);
      }
      // Append to arts.
      else if (i.type === 'art') {
        arts.push(i);
      }
      // Append to domains.
      else if (i.type === 'domain') {
        domains.push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.system.spellLevel != undefined) {
          spells[i.system.spellLevel].push(i);
        }
      }
      // Handle overflow items (items that don't fit in specific categories)
      else {
        overflowItems.push(i);
      }
    }

    // Assign and return
    context.gear = gear;
    context.features = features;
    context.skills = skills;      // was: competences
    context.competences = skills; // Keep both for backwards compatibility
    context.paths = paths;        // was: voies
    context.voies = paths;        // Keep both for backwards compatibility
    context.arts = arts;
    context.domains = domains;
    context.overflowItems = overflowItems;
    context.spells = spells;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }
  
  /**
   * Handle dropping of an item reference or item data onto an Actor Sheet
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {Object} data         The data transfer extracted from the event
   * @override
   */
  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;
    
    const item = await Item.implementation.fromDropData(data);
    const itemData = item.toObject();
    
    // Handle special processing for "voie" items
    if (item.type === "voie") {
      // We create the voie and then process its components
      const createdVoie = await this.actor.createEmbeddedDocuments("Item", [itemData]);
      if (createdVoie && createdVoie.length > 0) {
        await this._processVoieComponents(createdVoie[0]);
        
        // Apply bonuses/maluses to characteristics
        if (createdVoie[0].system.bonusCharacteristics || createdVoie[0].system.malusCharacteristics) {
          await this._applyVoieCharacteristicModifiers(createdVoie[0]);
        }
      }
      return true;
    }
    
    // Otherwise, proceed with the standard item drop
    return super._onDropItem(event, data);
  }
  
  /**
   * Process the components of a voie and add them to the character
   * @param {Item} voieItem The voie item that was just added
   * @private
   */
  async _processVoieComponents(voieItem) {
    try {
      // Extract components from the voie
      const system = voieItem.system;
      const components = [];
      
      // Handle old format for backward compatibility
      if (system.competences && Array.isArray(system.competences)) {
        for (const comp of system.competences) {
          if (comp) components.push(comp);
        }
      }
      
      if (system.arts && Array.isArray(system.arts)) {
        for (const art of system.arts) {
          if (art) components.push(art);
        }
      }
      
      if (system.domaines && Array.isArray(system.domaines)) {
        for (const domaine of system.domaines) {
          if (domaine) components.push(domaine);
        }
      }
      
      // Handle new components format
      if (system.components) {
        // Process competences from components object
        if (system.components.competences && Array.isArray(system.components.competences)) {
          for (const comp of system.components.competences) {
            if (comp) components.push(comp);
          }
        }
        
        // Process arts from components object
        if (system.components.arts && Array.isArray(system.components.arts)) {
          for (const art of system.components.arts) {
            if (art) components.push(art);
          }
        }
        
        // Process domains from components object
        if (system.components.domains && Array.isArray(system.components.domains)) {
          for (const domain of system.components.domains) {
            if (domain) components.push(domain);
          }
        }
        
        // Process objects from components object
        if (system.components.objects && Array.isArray(system.components.objects)) {
          for (const obj of system.components.objects) {
            if (obj) components.push(obj);
          }
        }
      }
      
      // Create all the components
      if (components.length > 0) {
        await this.actor.createEmbeddedDocuments("Item", components);
      }
    } catch (error) {
      console.error("Error processing voie components:", error);
    }
  }
  
  /**
   * Apply characteristic bonuses and maluses from a voie
   * @param {Item} voieItem The voie item with bonuses/maluses
   * @private
   */
  async _applyVoieCharacteristicModifiers(voieItem) {
    try {
      const system = voieItem.system;
      const updates = {};
      
      // Apply bonuses
      if (system.bonusCharacteristics) {
        for (const [key, value] of Object.entries(system.bonusCharacteristics)) {
          // Convert value to number to avoid string concatenation
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue > 0) {
            const currentBonus = Number(this.actor.system.characteristics[key]?.bonus || 0);
            updates[`system.characteristics.${key}.bonus`] = currentBonus + numValue;
          }
        }
      }
      
      // Apply maluses
      if (system.malusCharacteristics) {
        for (const [key, value] of Object.entries(system.malusCharacteristics)) {
          // Convert value to number to avoid string concatenation
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue > 0) {
            const currentMalus = Number(this.actor.system.characteristics[key]?.malus || 0);
            updates[`system.characteristics.${key}.malus`] = currentMalus + numValue;
          }
        }
      }
      
      // Apply updates if any
      if (Object.keys(updates).length > 0) {
        await this.actor.update(updates);
      }
    } catch (error) {
      console.error("Error applying voie characteristic modifiers:", error);
    }
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }
}
