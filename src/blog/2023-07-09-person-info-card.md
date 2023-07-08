---
title: 'Custom Person Card for Home Assistant'
tags:
 - homelab
 - home assistant
 - frontend
description: "A custom Person Card for the UI Lovelace Minimalist theme for Home Assistant."
---

A custom Person Card for the [UI Lovelace Minimalist](https://ui-lovelace-minimalist.github.io/UI/) theme for {% link "https://www.home-assistant.io/", "Home Assistant" %}.

<div>
{% image imgSrc, "custom_card_person_info_small_dark.png", "" %}
</div>
<div>
{% image imgSrc, "custom_card_person_info_small_light.png", "" %}
</div>
<br>

## {% title "Variables" %}

<div class="tableWrapper">

| Variable                                     | Default              | Required         | Notes                                                                                                                                           |
| -------------------------------------------- | -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ulm_card_person_entity                       |                      | &#10004;| The person entity                                                                                                                               |
| ulm_card_person_use_entity_picture           | true                 | &#10006; | If you set this to true, the card shows the entity picture from your user, otherwise (set to false) shows the icon. Default is false.           |
| ulm_card_person_zone1                        |                      | &#10006; | Set another zone (beside "home") to use for the card. You can set up two zones besides "home".                                                  |
| ulm_card_person_zone2                        |                      | &#10006; | Set another zone (beside "home") to use for the card. You can set up two zones besides "home".                                                  |
| ulm_address                                  |                      | &#10006; | Show an address as label, add an entity with a geo location                                                                                     |
| ulm_card_person_driving_entity               |                      | &#10006; | Set a binary sensor that depicts when this person is driving                                                                                    |
| ulm_card_person_battery_entity               |                      | &#10006; | Set a battery level sensor                                                                                                                      |
| ulm_card_person_battery_state_entity         |                      | &#10006; | Set a battery state sensor (eg the battery state sensor from the home assistant companion app will have the states "charging" or "discharging") |
| ulm_card_battery_battery_level_danger        | 15                | &#10006; | Changes the color of the Icon, if the battery level falls below the provided value. Must be higher than ulm_card_battery_battery_level_waring
| ulm_card_battery_battery_level_waring        | 30                   | &#10006; | Changes the color of the Icon, if the battery level falls below the provided value.
| ulm_card_battery_color_battery_level_danger  | var(--google-red)  | &#10006; | Color of icon if battery level is within the 'danger' zone.
| ulm_card_battery_color_battery_level_warning | var(--google-yellow) | &#10006; | Color of icon if battery level is within the 'warning' zone.
| ulm_card_battery_color_battery_level_ok      | var(--google-green)  | &#10006; | Color of icon if battery level is not within the 'danger' or 'warning' zone.

</div>

<style>
  tbody > tr > td:nth-child(2) {
    font-family: monospace;
  }
</style>


## {% title "Usage" %}

Download the UI Lovelace Minimalist theme from {% link "https://hacs.xyz/docs/setup/download", "Home Assistant Community Store" %} (HACS).

Add the following to any view in `config/ui_lovelace_minimalist/dashboard/views/` folder.

```yaml
- type: "custom:button-card"
  template: card_person_info_small
  variables:
    ulm_card_person_entity: person.imaginelenses
    ulm_card_person_zone1: zone.work
    ulm_card_person_driving_entity: binary_sensor.driving
    ulm_card_person_battery_entity: sensor.phone_battery_level
    ulm_card_person_battery_state_entity: sensor.phone_battery_state
```

Create a new file called `custom_card_person_info_small.yaml` in `config/ui_lovelace_minimalist/custom_cards/` folder and paste the following template code in it.

<details>
<summary>Template Code</summary>

```yaml title="custom_card_person_info_small.yaml"
---
card_person_info_small:
  template:
    - "icon_info_bg"
    - "ulm_translation_engine"
  variables:
    ulm_card_person_use_entity_picture: true
    ulm_card_person_zone1: ""
    ulm_card_person_zone2: ""
    ulm_card_person_icon: "mdi:face-man"
    ulm_address: ""
    ulm_address_locality: ""
    ulm_card_person_driving_entity: ""
    ulm_card_person_battery_entity: ""
    ulm_card_person_battery_state_entity: ""
    ulm_card_battery_battery_level_danger: 15
    ulm_card_battery_battery_level_warning: 30
    ulm_card_battery_color_battery_level_danger: "var(--google-red)"
    ulm_card_battery_color_battery_level_warning: "var(--google-yellow)"
    ulm_card_battery_color_battery_level_ok: "var(--google-green)"
  triggers_update: "all"
  tap_action:
    action: "more-info"
    entity: "[[[ return variables.ulm_card_person_entity; ]]]"
  hold_action:
    action: "more-info"
    entity: "[[[ return variables.ulm_card_person_battery_entity; ]]]"
  show_label: true
  show_name: true
  label: >
    [[[
      if (variables.ulm_address){
        return states[variables.ulm_address].state;
      } else if (variables.ulm_address_locality){
        return states[variables.ulm_address_locality].attributes.Locality;
      }
      else if (states[variables.ulm_card_person_driving_entity]?.state === "on") {
        let state = states[variables.ulm_card_person_entity].state;
        return `Driving - ${variables.ulm_translation_state}`;
      } else {
        let state = states[variables.ulm_card_person_entity].state;
        return hass.resources[hass["language"]]["component.person.entity_component._.state." + state] ? hass.resources[hass["language"]]["component.person.entity_component._.state." + state] : state;
      }
    ]]]
  name: "[[[ return states[variables.ulm_card_person_entity].attributes.friendly_name ]]]"
  entity: "[[[ return variables.ulm_card_person_entity; ]]]"
  icon: "[[[ return variables.ulm_card_person_icon; ]]]"
  show_entity_picture: "[[[ return variables.ulm_card_person_use_entity_picture ]]]"
  entity_picture:
    "[[[ return variables.ulm_card_person_use_entity_picture != false ? states[variables.ulm_card_person_entity].attributes.entity_picture\
    \ : null ]]]"
  styles:
    grid:
      - grid-template-areas: "'i battery' 'n n' 'l l'"
    icon:
      - color: "rgba(var(--color-theme),0.9)"
      - width: "42px"
      - place-self: "start"
    name:
      - place-self: "center"
      - margin-left: 0
      - margin-top: "6%"
    label:
      - place-self: "center"
      - margin-left: 0
      - text-transform: "capitalize"
    custom_fields:
      notification:
        - position: "absolute"
        - top: "7%"
        - left: "38px"
        - height: "16px"
        - width: "16px"
        - border: "2px solid var(--card-background-color)"
        - border-radius: "50%"
        - font-size: "12px"
        - line-height: "14px"
        - background-color: >
            [[[
              if (states[variables.ulm_card_person_entity].state == 'home') {
                return "rgba(var(--color-blue),1)";
              } else {
                return "rgba(var(--color-yellow),1)";
              }
            ]]]
      battery:
        - width: "30px"
        - height: "30px"
        - place-self: "end"
        - align-self: "center"
        - background-color: "rgba(var(--primary-background-color), 0.5)"
        - border: "2px solid var(--card-background-color)"
        - border-radius: "50%"

  custom_fields:
    notification: >
      [[[
        let height = "11px";
        let width = "11px";
        if (states[variables.ulm_card_person_entity].state !== 'home') {
          if (states[variables.ulm_card_person_entity].state === states[variables.ulm_card_person_zone1]?.attributes?.friendly_name) {
            var icon = states[variables.ulm_card_person_zone1].attributes.icon !== null ? states[variables.ulm_card_person_zone1].attributes.icon : 'mdi:help-circle'
            return `<ha-icon icon="' + icon + '" style="height: ${height}; width: ${width}; color: var(--primary-background-color);"></ha-icon>`;
          } else if (states[variables.ulm_card_person_entity].state === states[variables.ulm_card_person_zone2]?.attributes?.friendly_name) {
            var icon = states[variables.ulm_card_person_zone2].attributes.icon !== null ? states[variables.ulm_card_person_zone2].attributes.icon : 'mdi:help-circle'
            return `<ha-icon icon="' + icon + '" style="height: ${height}; width: ${width}; color: var(--primary-background-color);"></ha-icon>`;
          } else {
            return `<ha-icon icon="mdi:home-minus" style="height: ${height}; width: ${width}; color: var(--primary-background-color);"></ha-icon>`;
          }
        } else {
          return `<ha-icon icon="mdi:home-variant" style="height: ${height}; width: ${width}; color: var(--primary-background-color);"></ha-icon>`;
        }
      ]]]
    battery: >
      [[[
        if (states[variables.ulm_card_person_battery_entity]?.state) {
          let battery_level = states[variables.ulm_card_person_battery_entity]?.state;
          battery_level = Number(battery_level);
          let charging = states[variables.ulm_card_person_battery_state_entity]?.state.toLowerCase() === "charging";
          var infix = charging ? "-charging" : "";
          let icon = "mdi:help-circle-outline";
          if (battery_level == 100) {
            icon = "mdi:battery";
          } else if (battery_level < 10) {
            icon = "mdi:battery" + infix + "-outline";
          } else if (battery_level == "unknown" || battery_level == "unavailable") {
            icon = "mdi:battery-off";
          } else {
            icon = "mdi:battery" + infix + "-" + Math.floor(battery_level / 10) * 10;
          }
          let color = variables.ulm_card_battery_color_battery_level_ok;
          if (battery_level !== "unavailable") {
            if (battery_level <= variables.ulm_card_battery_battery_level_danger) {
              color = variables.ulm_card_battery_color_battery_level_danger;
            } else if (battery_level <= variables.ulm_card_battery_battery_level_warning) {
              color = variables.ulm_card_battery_color_battery_level_warning;
            } else {
              color = variables.ulm_card_battery_color_battery_level_ok;
            }
          }
          return `
            <ha-icon icon="${icon}" style="height: 27px; width: 27px; color: ${color};"></ha-icon>
          `;
        }
      ]]]
```

</details>

Restart Home Assistant.

## {% title "Credits" %}

- Version: 1.0.0
- Author: Imaginelenses <@imaginelenses>
- Based on [`person info card`](https://ui-lovelace-minimalist.github.io/UI/usage/custom_cards/custom_card_person_info/) by Jordan Janzen <@jordandrako>
