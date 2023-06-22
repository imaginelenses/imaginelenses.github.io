---
title: 'Setting Up Wake On LAN in Ubuntu'
tags:
  - 'ubuntu'
  - 'server'
  - 'homelab'
description: 'How to setup Wake On LAN in Ubuntu.'
---

[Wake On LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) (WOL) allows you to turn on the computer from another device in the same network.

## {% title "Determining Network Interface Card (NIC) name" %}
```bash
sudo lshw -c network
```
Under the `Ethernet Interface` copy the `logical name`.

## {% title "Enabling WOL in the BIOS" %}
### {% title "Using Integrated NIC" %}
In the BIOS enable "Wake up on PCI event", "Wake up on LAN" or similar option.
### {% title  "Using Non-Integrated NIC" %}
In the BIOS enable the option to allow USB and/or PCI devices to wake-up the computer.

## {% title "Determining WOL support in NIC" %}
```bash
sudo ethtool <name>
```
where `<name>` is the `logical name` you copied.

The output would contain a line similar to `Supports Wake-on: <letters>` where `<letters>` contains the letter `g`, the NIC should support the [WOL Magic Packet](https://en.wikipedia.org/wiki/Wake-on-LAN#Magic_packet).

## {% title "Enabling WOL in the NIC" %}
The above output would also contain a line similar to `Wake-on: <letters>` and if `<letters>` contains `g` and not `d`, then Magic Packet is enabled. However, if <letters> does contain d, WoL needs to be enabled by running
```bash
sudo ethtool -s <name> wol g
```

## {% title "Enabling WOL on every boot" %}
Find the path to `ethtool` running the following and copy the output.
```bash
sudo which ethtool
```

Create a file named `wol.service` at `/etc/systemd/system/`.
```bash
sudo nano /etc/systemd/system/wol.service
```

Paste the following
```bash
[Unit]
Description=Enable Wake On Lan

[Service]
Type=oneshot
ExecStart=/usr/sbin/ethtool -s <name> wol g

[Install]
WantedBy=basic.target
```

`Ctrl+S` to save and `Ctrl+X` to exit.

Restart and enable the service.
 ```bash
sudo systemctl daemon-reload
sudo systemctl enable wol.service
```

Check whether the service is running.
```bash
systemctl status wol
```

## {% title "Testing WOL" %}
### {% title "Installing gWakeOnLan" %}
[Download](https://www.muflone.com/gwakeonlan/english/download.html) `gwakeonlan` on a different computer running Ubuntu or use [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

Navigate to the downloads folder and run
```bash
sudo dpkg -i ~/<downloads>/<filename>.deb
```
where `<downloads>` is the folder with the downloaded file and `<filename>` is the name of the file.

### {% title "Finding MAC address" %}
To find the [MAC address](https://en.wikipedia.org/wiki/MAC_address) of the target computer run
```bash
ip addr show
```
Against your NIC name you should find a sequence of the format `FF:FF:FF:FF:FF:FF`. Copy this.

### {% title "Listening for the MagicPacket" %}
On the computer you want to turn on, run the following
```bash
sudo tcpdump -UlnXi <name> ether proto 0x0842 or udp port 9 2>/dev/null | grep -P '((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}'
```
where `<name>` is the name of the NIC. You should see 1 line of output per Magic Packet received with IP address of the device sending the packet. 

**Note:** If your router supports sending Magic Packets you can send it on startup of the router and skip the following.

## {% title "Setting up WOL on ESPHome" %}
Paste the following to you ESPHome's `yaml` file.

### {% title "Adding a Button" %}
```yaml
# HA Server
button:
  - platform: wake_on_lan
    id: "start_server"
    name: "Start the Server"
    target_mac_address: <MAC>
```
where `<MAC>` is the MAC address of the computer you want to turn on.

### {% title "Configuring ESPHome to press the button on Startup" %}
```yaml
esphome:
  # ...
  on_boot:
    priority: 800
    then:
      - wait_until: 
          wifi.connected:
      - button.press: "start_server"
```
where `...` represents additional configuration you may already have.
 
Save and install the code.

You can now test by listening for the Magic Packet by pressing the button manually and then by turning off and on both the server and ESPHome (turn off and on the main supply). 
